import * as fs from 'fs';
import * as http from 'http';
import * as parseArgs from 'minimist';
import * as rpc from '@sourcegraph/vscode-ws-jsonrpc';
import * as rpcServer from '@sourcegraph/vscode-ws-jsonrpc/lib/server';
import * as ws from 'ws';
import * as yaml from 'js-yaml';

let argv = parseArgs(process.argv.slice(2));

if (argv.help || !argv.servers) {
  console.log('Usage: proxy.js --port 49093 --servers config.yml');
  process.exit?.(1);
}

let port : number = parseInt(argv.port) || 49093;
let servers;

try {
  let parsed = yaml.safeLoad(fs.readFileSync(argv.servers), 'utf8');
  if (!parsed.servers) {
    console.log('The config file is not a valid format');
    process.exit?.(1);
  }
  servers = parsed.servers;
} catch (e) {
  console.error(e);
  process.exit?.(1);
}

const wss : ws.Server = new ws.Server({
  port: port,
  perMessageDeflate: false
}, () => {
  console.log(`Listening to http and ws requests on ${port}`);
});

wss.on('connection', (client : ws, request : http.IncomingMessage) => {
  let server : string[];

  Object.keys(servers).forEach((key) => {
    if (request.url === '/' + key) {
      server = servers[key];
    }
  });
  if (!server || !server.length) {
    console.error('Invalid language server', request.url);
    client.close();
    return;
  }

  let localConnection = rpcServer.createServerProcess('proxy', server[0], server.slice(1));
  let socket : rpc.IWebSocket = toSocket(client);
  let connection = rpcServer.createWebSocketConnection(socket);
  rpcServer.forward(connection, localConnection);
  console.log(`Forwarding new client`);
  socket.onClose((code, reason) => {
    console.log('Client closed', reason);
    localConnection.dispose();
  });
});

function toSocket(webSocket: ws): rpc.IWebSocket {
  return {
    send: content => webSocket.send(content),
    onMessage: cb => webSocket.onmessage = event => cb(event.data),
    onError: cb => webSocket.onerror = event => {
      if ('message' in event) {
        cb((event as any).message)
      }
    },
    onClose: cb => webSocket.onclose = event => cb(event.code, event.reason),
    dispose: () => webSocket.close()
  }
}
