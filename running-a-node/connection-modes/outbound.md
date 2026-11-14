# Outbound (default)

The agent opens one secure WebSocket to
`wss://api.podtorrent.com/v0/node/connect` and keeps it open. Requests come
down that connection and answers go back up it.

You don't configure anything. Run the agent as usual:

```bash
PODTORRENT_NODE_TOKEN=... podtorrent-agent -engine http://127.0.0.1:8000 -manifest manifest.json
```

* Works behind NAT and strict firewalls, as long as outbound port 443 is open.
* If the link drops, the agent reconnects with backoff, from 1 second up to
  60 seconds.
* If a newer connection for the same node arrives, it replaces the older one.
