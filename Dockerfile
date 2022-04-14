FROM ghcr.io/lspserver/servers:latest

USER craftslab
WORKDIR /home/craftslab
RUN mkdir proxy
COPY . proxy/
RUN pushd proxy && \
    yarn && yarn run build && \
    popd

USER craftslab
WORKDIR /home/craftslab/proxy
ENTRYPOINT [ "node", "dist/proxy.js" ]
