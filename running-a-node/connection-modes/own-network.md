# Your own network

Use this when the link must stay on a private network you control, such as
WireGuard.

The network's gateway runs on Cloudflare, which can't join a WireGuard
network directly. So a small `cloudflared` connector runs on a machine inside
your network (it can be the same machine as the agent) and carries the
network's connection in. You decide what that connector can reach.

## Steps

1. **Run the agent in inbound mode** on a private address, with TLS, and
   ideally requiring the network's client certificate:

   ```bash
   podtorrent-agent -listen 10.8.0.2:8443 \
     -tls-cert node.crt -tls-key node.key \
     -client-ca podtorrent-network-ca.pem \
     -engine http://127.0.0.1:8000 -manifest manifest.json
   ```

   Get `podtorrent-network-ca.pem` from the PodTorrent team.
2. **Tell the team** the agent's private address and how your network is
   joined. They set up the connector details with you.
3. **The team registers the link**, and the network connects within a minute.

A WireGuard hub run by PodTorrent might be offered later if a connector
doesn't fit your policy. It doesn't exist yet.
