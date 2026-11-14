# Test before going live

The agent repository ships a fake network, so you can try your real engine
end to end on your own machine before connecting to PodTorrent.

## Rehearse with the mock network

```bash
git clone https://github.com/Munerate/podtorrent-agent
cd podtorrent-agent
make build

./bin/mock-network &      # listens on :8787; client key dev-api-key, node token dev-node-token

PODTORRENT_NODE_TOKEN=dev-node-token ./bin/podtorrent-agent \
  -network ws://127.0.0.1:8787/v0/node/connect \
  -engine http://127.0.0.1:8000 -manifest manifest.json
```

In another terminal, send a request the way the network would:

```bash
curl -N localhost:8787/v1/chat/completions -H 'Authorization: Bearer dev-api-key' \
  -d '{"model":"<your model id>","stream":true,"stream_options":{"include_usage":true},
       "messages":[{"role":"user","content":"hi"}]}'
```

**Check the end of the stream.** The last chunk before `data: [DONE]` must
contain `usage` with token counts. If it doesn't, the network can't count
your tokens and you won't be paid.

No engine yet? `make dev` starts a mock engine, the mock network and the
agent together.

## Check conformance

`podtorrent-conformance` plays the network and checks that a node follows
the protocol, using your real engine:

```bash
podtorrent-conformance -listen 127.0.0.1:8787 -token test &
PODTORRENT_NODE_TOKEN=test podtorrent-agent \
  -network ws://127.0.0.1:8787/v0/node/connect \
  -engine http://127.0.0.1:8000 -manifest manifest.json
```

For an inbound node:

```bash
podtorrent-conformance -dial http://127.0.0.1:8443/v0/node/connect -token <node token>
```

It prints `conformant` and exits with 0 when every check passes.
