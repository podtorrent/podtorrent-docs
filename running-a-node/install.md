# Install the agent

Pick a binary or a container. Both are the same program.

## Binary

Download the file for your platform from
[GitHub Releases](https://github.com/podtorrent/podtorrent-agent/releases):
linux/amd64, linux/arm64, darwin/arm64 or windows/amd64. Check it against
`SHA256SUMS` from the same release:

```bash
sha256sum -c SHA256SUMS --ignore-missing
```

Then check it runs:

```bash
podtorrent-agent -version
```

## Container

```bash
docker pull ghcr.io/munerate/podtorrent-agent:v0.5.0
```

The image is distroless, runs as a non-root user and has no shell.
Pin a version tag rather than `latest` so upgrades happen when you choose.

## Build from source

The agent is open source (Apache-2.0). With Go 1.24 or newer:

```bash
git clone https://github.com/podtorrent/podtorrent-agent
cd podtorrent-agent
make build      # output in bin/
```

Next: [Write your manifest](manifest.md).
