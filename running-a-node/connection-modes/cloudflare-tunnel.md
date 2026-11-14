# Cloudflare Tunnel

Use this when you want no public endpoint and no inbound ports. Your
`cloudflared` makes outbound connections only, and the network reaches your
agent through it.

## Steps

1. **Ask the PodTorrent team for a tunnel.** They create one for your node
   and send you a tunnel token and a hostname such as
   `node-01.tunnel.podtorrent.com`. The hostname is locked down so only the
   network can reach it.
2. **Run the agent in inbound mode** on a local address. Plain HTTP is fine
   here because the tunnel encrypts the traffic:

   ```bash
   podtorrent-agent -listen 127.0.0.1:8443 -insecure-plaintext \
     -engine http://127.0.0.1:8000 -manifest manifest.json
   ```

3. **Run `cloudflared`** next to it:

   ```bash
   cloudflared tunnel run --token <tunnel token> --url http://127.0.0.1:8443
   ```

4. **Tell the team it's running.** They register the link, and the network
   connects within a minute.

{% hint style="warning" %}
Only use `-insecure-plaintext` on a local address behind the tunnel, never on
an address other machines can reach.
{% endhint %}
