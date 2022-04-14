# proxy

[![Build Status](https://github.com/lspserver/proxy/workflows/CI/badge.svg?branch=main&event=push)](https://github.com/lspserver/proxy/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/lspserver/proxy/branch/main/graph/badge.svg?token=FS77A6KD37)](https://codecov.io/gh/lspserver/proxy)
[![License](https://img.shields.io/github/license/lspserver/proxy.svg?color=brightgreen)](https://github.com/lspserver/proxy/blob/main/LICENSE)
[![Tag](https://img.shields.io/github/tag/lspserver/proxy.svg?color=brightgreen)](https://github.com/lspserver/proxy/tags)
[![Gitter chat](https://badges.gitter.im/craftslab/lspserver.png)](https://gitter.im/craftslab/lspserver)



## Introduction

*proxy* is the proxy of [lspserver](https://github.com/lspserver) written in JavaScript.



## Run

```bash
# Set proxy
yarn config set proxy http://proxy_host:port
yarn config set https-proxy https://proxy_host:port

# Run server
git clone https://github.com/lspserver/proxy.git
cd proxy
yarn && yarn run start
```



## Docker

```bash
git clone https://github.com/lspserver/proxy.git
cd proxy
docker build --no-cache -f Dockerfile -t ghcr.io/lspserver/proxy:latest .
docker run --rm -p 49093:49093 -v $PWD:/tmp ghcr.io/lspserver/proxy:latest --port 49093 --servers /tmp/config.yml
```



## License

Project License can be found [here](LICENSE).



## Reference

- [codemirror-lsp-example](https://github.com/wylieconlon/codemirror-lsp-example)
- [codemirror-mode](https://github.com/codemirror/CodeMirror/tree/master/mode)
- [jsonrpc-ws-proxy](https://github.com/wylieconlon/jsonrpc-ws-proxy)
- [language-server-protocol](https://microsoft.github.io/language-server-protocol/)
- [lsp-editor-adapter-example](https://github.com/wylieconlon/lsp-editor-adapter/tree/master/example)
- [monaco-editor](https://microsoft.github.io/monaco-editor/)
- [monaco-languageclient](https://github.com/TypeFox/monaco-languageclient)
- [vscode-json-languageservice](https://github.com/microsoft/vscode-json-languageservice)
