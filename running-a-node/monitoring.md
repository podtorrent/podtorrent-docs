# Monitor your node

Turn on Prometheus metrics with `-metrics-listen`:

```bash
podtorrent-agent -metrics-listen 127.0.0.1:9100 ...
curl http://127.0.0.1:9100/metrics
```

| Metric | Meaning |
| --- | --- |
| `podtorrent_agent_connected` | `1` while the link to the network is up |
| `podtorrent_agent_connects_total` | Links made since the agent started |
| `podtorrent_agent_slots{model}` | Slots from your manifest |
| `podtorrent_agent_busy_slots{model}` | Requests running now |
| `podtorrent_agent_requests_total{model,outcome}` | Requests by outcome: `ok`, `engine_error`, `failed`, `refused` |
| `podtorrent_agent_network_receipts_total{result}` | Network receipts by result: `matched`, `mismatch`, `bad_signature`, `unknown` |

The metrics endpoint has no login. Keep it on localhost or your monitoring
network.

## Good alerts to set

* `podtorrent_agent_connected == 0` for more than a few minutes: the node is
  offline. Check the logs.
* `podtorrent_agent_connects_total` rising quickly: the link keeps dropping.
* A growing share of `engine_error` or `failed`: your engine is struggling.
* Any `mismatch` receipts: your engine's token counts and the network's
  disagree, so that work isn't paid.

## Logs

The agent logs connections, errors and request ids. It never logs prompts or
answers. See [Troubleshooting](troubleshooting.md) for what the messages mean.
