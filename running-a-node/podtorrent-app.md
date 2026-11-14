# Use the PodTorrent app

The PodTorrent app splits a model's layers across machines and serves it on
the network. Each machine serves the layers that fit it, so together they can
run a model none could hold alone. One machine can also serve a whole model.

* No model server to run: the app downloads models from Hugging Face.
* No manifest to write: the app offers every model it fully covers.

Already run a model server? Use the
[agent](../getting-started/node-quickstart.md#then-connect-the-agent) instead.

## What you need

* A machine with one of these builds:

  | Build | For |
  | --- | --- |
  | `macos-arm64` | macOS, Apple silicon |
  | `windows-x64-cuda` | Windows, NVIDIA |
  | `linux-x64-cuda` | Linux desktop, NVIDIA |
  | `linux-x64-rocm` | Linux desktop, AMD Ryzen AI Max |
  | `linux-x64-rocm-headless` | Linux over SSH (no display), AMD Ryzen AI Max |

* Disk space for the model layers you serve (often 10–60 GB). The AMD builds
  also install PyTorch for your GPU the first time (about 25 GB).
* A node id and token. See
  [Get a node id and token](../getting-started/node-quickstart.md#first-get-a-node-id-and-token).

## Install

```bash
curl -fsSL https://podtorrent.com/install.sh | sh       # macOS and Linux
```

```powershell
irm https://podtorrent.com/install.ps1 | iex             # Windows (PowerShell)
```

The installers pick the build for your machine, check its SHA-256, need no
root or admin, and update in place when you run them again. To choose the
build yourself, download `https://podtorrent.com/download/<build>`, for
example `podtorrent.com/download/macos-arm64`; add `.sha256` for its checksum.

## How the app serves a model

Each model is split into layers. A machine can serve all of a model's layers,
or only some of them while other machines serve the rest. A model is ready
for the network once every layer is served by a machine you can reach. The
machine that joins the network is the **head** of that route: requests come
in through it and pass through each machine's layers.

On **Pod**, choose who your machine serves with:

| Choice | What happens |
| --- | --- |
| **Public swarm** (default) | Your machine is matched with other machines that have the same model, so together they cover all its layers |
| **Private pod** | Only machines you invite. You split each model's layers between them |
| **Alone** | Your machine serves whole models by itself and links with no other machine |

A pod joins the network as **one node**, through its head machine. Only that
machine needs a node token.

## Join the network

1. Click **Start My Node**.
2. On **Models**, serve a model (or the missing layers of one). The app shows
   the download size and checks it fits this machine's memory before
   downloading.
3. On **Network**, choose **Production**, enter your **node id** and **node
   token**, and set your input and output prices in USD per million tokens
   (leave them empty to serve free).
4. Click **Join Network**.

The badge shows **Online · production** once connected. **Offered models**
lists each model clients can now use through this machine, with its route.
The **Agent log** at the bottom shows what the built-in agent is doing.

The token is saved in the PodTorrent data folder, readable by your user only.
To change it, click **Change token**. To stop serving the network, click
**Leave**; your machine keeps running its models for you.

### On a headless Linux box

`podtorrent setup` checks the machine, installs what the GPU needs, starts
PodTorrent as a background service, suggests a model and layers that fit,
downloads them, and offers to join the network. Afterwards:

| Command | What it does |
| --- | --- |
| `podtorrent join` / `podtorrent leave` | Join or leave the network |
| `podtorrent top` | Live view of what this machine serves |
| `podtorrent doctor` | Checks everything and writes one file for support, with your token removed |
| `sudo loginctl enable-linger $USER` | Keep it running after you log out, and start it at boot |

## Things to know

* **Privacy.** The head machine sees each prompt. Every machine on a route
  sees the model's intermediate state for it, which can reveal the prompt.
  Serve sensitive traffic **Alone** or in a private pod of machines you trust.
  See [Privacy](../concepts/privacy.md).
* **Payment.** Only the node's operator (whose token the head machine uses) is paid for a
  request, even when other machines serve some of its layers.
* **Staging tokens** only work on **Staging**, and production tokens only on
  **Production**.
* **Keep the machine awake** while it serves; a sleeping machine drops off
  the network.

## Fix connection problems

The **Network** page says why, in plain words, and the **Agent log** has the
details. The common cases are in the
[quickstart's table](../getting-started/node-quickstart.md#fix-connection-problems).
