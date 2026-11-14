# Inbound with mutual TLS

Use this if you'd rather expose one HTTPS port than have the agent dial out.

```bash
podtorrent-agent -listen :8443 \
  -tls-cert node.crt -tls-key node.key \
  -client-ca podtorrent-network-ca.pem \
  -engine http://127.0.0.1:8000 -manifest manifest.json
```

* `-tls-cert`, `-tls-key`: your server certificate and key, for the hostname
  the network will dial.
* `-client-ca`: the network's client CA, from the PodTorrent team. With it,
  only the network can complete the TLS handshake. Without it the agent
  warns you and relies on the node token alone.

Allow inbound TCP on that port. To narrow it down, allow only Cloudflare's
published IP ranges.

Then give the team your URL, for example
`https://node-02.example.net:8443/v0/node/connect`. Once they register it,
the network connects within a minute.
