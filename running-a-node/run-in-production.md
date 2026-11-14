# Run it in production

The agent should restart on its own if it stops or the machine reboots.

## With systemd

```ini
# /etc/systemd/system/podtorrent-agent.service
[Unit]
Description=PodTorrent agent
After=network-online.target
Wants=network-online.target

[Service]
EnvironmentFile=/etc/podtorrent/agent.env
ExecStart=/usr/local/bin/podtorrent-agent -engine http://127.0.0.1:8000 -manifest /etc/podtorrent/manifest.json
Restart=always
DynamicUser=yes
NoNewPrivileges=yes

[Install]
WantedBy=multi-user.target
```

Put the token in `/etc/podtorrent/agent.env` (readable by root only):

```bash
PODTORRENT_NODE_TOKEN=...
```

Then:

```bash
sudo systemctl enable --now podtorrent-agent
journalctl -u podtorrent-agent -f
```

## With Docker

```bash
docker run -d --name podtorrent-agent --restart unless-stopped \
  --read-only --cap-drop ALL --security-opt no-new-privileges \
  -e PODTORRENT_NODE_TOKEN=... \
  -v /etc/podtorrent/manifest.json:/manifest.json:ro \
  ghcr.io/munerate/podtorrent-agent:v0.2.0 \
  -manifest /manifest.json -engine http://engine:8000
```

Put the agent on a Docker network where it can reach only your engine and
the internet. It needs no GPU, no volumes besides the manifest, and no host
networking.

## What it does once running

1. Checks your engine lists every model in the manifest. It waits up to a
   minute for the engine to come up.
2. Connects, sends the manifest, and gets a welcome from the network.
3. Reports free slots per model whenever they change, and every 30 seconds.
4. Passes each request to your engine and streams the answer back. It
   refuses requests for models it doesn't serve, or when that model is full.

## Upgrading

Stop the agent, replace the binary or image tag, start it again. Requests
in flight on the old process are lost, so upgrade at a quiet time. Releases
are listed on [GitHub](https://github.com/Munerate/podtorrent-agent/releases).
Use v0.2.0 or newer: older agents don't send [receipts](../concepts/receipts-and-billing.md),
so their work isn't paid.
