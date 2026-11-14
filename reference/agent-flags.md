# Agent flags and environment

Every setting can be a flag or, where listed, an environment variable.

| Flag | Environment | Default | Meaning |
| --- | --- | --- | --- |
| — | `PODTORRENT_NODE_TOKEN` | — | Node token. **Required.** |
| `-engine` | `PODTORRENT_ENGINE` | `http://127.0.0.1:8000` | Engine base URL, without `/v1` |
| `-manifest` | `PODTORRENT_MANIFEST` | `manifest.json` | Manifest file |
| `-network` | `PODTORRENT_NETWORK` | `wss://api.podtorrent.com/v0/node/connect` | Network URL (outbound mode) |
| `-metrics-listen` | `PODTORRENT_METRICS_LISTEN` | off | Serve Prometheus metrics at `/metrics`, e.g. `127.0.0.1:9100` |
| `-skip-engine-check` | — | off | Don't check `/v1/models` at start |
| `-engine-kind` | `PODTORRENT_ENGINE_KIND` | empty | `exo` for an exo cluster (**Preview**). See [Serve from several Macs with exo](../running-a-node/exo-cluster.md). |
| `-first-event` | — | `1m` | exo only: fail a streamed request that sends nothing within this time, so the network can retry it elsewhere |
| `-version` | — | — | Print the version and exit |

## Inbound mode

| Flag | Environment | Meaning |
| --- | --- | --- |
| `-listen` | `PODTORRENT_LISTEN` | Listen on this address; turns on inbound mode |
| `-tls-cert`, `-tls-key` | `PODTORRENT_TLS_CERT`, `PODTORRENT_TLS_KEY` | Server certificate and key (PEM) |
| `-client-ca` | `PODTORRENT_CLIENT_CA` | Accept only client certificates signed by this CA |
| `-insecure-plaintext` | — | No TLS. Only behind a tunnel or for local tests. |

## Signals

`SIGHUP` reloads the manifest immediately.
