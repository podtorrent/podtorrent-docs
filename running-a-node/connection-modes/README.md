# Choose a connection mode

The agent can reach the network in four ways. What travels over the link is
the same in all of them; only who opens the connection, and over what,
changes.

| Mode | Who connects | Open ports on your side | Use it when |
| --- | --- | --- | --- |
| [Outbound](outbound.md) (default) | Agent → network | none | Outbound HTTPS is allowed. Simplest. |
| [Cloudflare Tunnel](cloudflare-tunnel.md) | Network → agent, through your tunnel | none | You want no public endpoint and don't want to run a VPN |
| [Your own network](own-network.md) | Network → agent, over your WireGuard or VPN | none to the internet | The link must stay on a network you control |
| [Inbound with mutual TLS](inbound-public.md) | Network → agent, over HTTPS | one TLS port | You prefer to expose an endpoint behind your own firewall |

**Not sure? Use outbound.** Switch only if your security policy requires it.

In the three inbound modes the network authenticates with your node token,
and the agent rejects anything else. If the link drops, the network dials
again within a minute. The PodTorrent team registers your node's address on
their side, so talk to them before you switch.
