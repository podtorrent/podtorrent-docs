# Troubleshooting

## Agent log messages

| Message | Cause | Fix |
| --- | --- | --- |
| `PODTORRENT_NODE_TOKEN is not set` | No token | Set the environment variable |
| `engine at ... not reachable` | Engine isn't listening at `-engine`, or the container can't reach it | Check the URL and Docker network |
| `engine ... does not list these manifest models` | Model ids don't match | Make `models[].id` match `/v1/models` exactly |
| `link down, reconnecting ... 401` | Wrong or revoked node token | Check the token, or ask the team for a new one |
| `link down, reconnecting ... dial` | Can't reach the network | Check the firewall and any proxy for outbound 443 |
| `request failed ... engine unreachable` | Engine stopped or restarted mid-request | Check your engine's health |

## Common questions

**The agent is connected but I get no requests.**
Clients may not be asking for your model, or other nodes may be cheaper or
less busy. Compare your price with the [network offers](../using-the-api/models-and-offers.md#network-offers).
Also check your `tiers` setting.

**My work shows as not paid.**
Run agent v0.2.0 or newer, and make sure your engine returns `usage` in the
last stream chunk. See [Receipts and billing](../concepts/receipts-and-billing.md).

**Inbound node never connects.**
Check the agent is listening on the address you gave the team, the token is
right (a `401` in the logs), and the tunnel or firewall lets the network
through. The network retries every minute.

**I edited the manifest and nothing changed.**
Look for an "invalid" message in the logs. The agent keeps the old manifest
when the new one is broken, or when the engine doesn't serve a listed model.
