# Quickstart: connect a node

A **node** is a machine that serves models to the PodTorrent network. Clients
send requests, the network routes some of them to your node, and you're paid
for the tokens you serve (or you serve them free, if you set your price to 0).

Get a node id and token, then connect with one of these:

| | **Agent** | **PodTorrent app** |
| --- | --- | --- |
| What it is | Lightweight Go program next to the model server you already run | Splits a model's layers across machines and serves it |
| Use it if | You run vLLM, SGLang, llama.cpp server, Ollama or similar | You don't run a model server, or a model is too big for one machine |
| Models | Whatever your server serves | Picked in the app, downloaded from Hugging Face |
| Setup | A short manifest and one command | Click through, or `podtorrent setup` over SSH |
| Runs on | Linux, macOS, Windows, container | macOS (Apple silicon), Windows and Linux (NVIDIA), Linux (AMD Ryzen AI Max) |

Several Macs as one node? See [exo](../running-a-node/exo-cluster.md).

## First, get a node id and token

Every node needs an id (like `example-node-01`) and a secret token. Both
paths use them.

**First node?**

1. Fill in the short form at
   [podtorrent.com/register-node](https://podtorrent.com/register-node). Use
   the email you'll sign in with.
2. We review it and email you your **node id** and a link to the operator
   dashboard.
3. Sign in at [dashboard.podtorrent.com/operator](https://dashboard.podtorrent.com/operator)
   with that email (a one-time code, no password). On the **Nodes** tab, click
   **Get node token** next to your node.

**Already an operator?** On the **Nodes** tab, type a new id under **Add a
node** and click **Add node**. You get its token right away; no new
registration.

{% hint style="warning" %}
The token is shown **once**. Copy it somewhere safe before you click **I've
saved it**. It proves the node is yours, so never share or commit it. If you
lose it or it leaks, click **New token** on the same tab; the old one stops
working.
{% endhint %}

## Then connect: the agent

**1. Check your engine.** It must speak the OpenAI API, for example on
`http://127.0.0.1:8000`, and list your model:

```bash
curl http://127.0.0.1:8000/v1/models
```

More detail: [What you need](../running-a-node/requirements.md).

**2. Write a manifest.** Save this as `manifest.json` and change it to match
your setup:

```json
{
  "node": "example-node-01",
  "models": [
    { "id": "meta-llama/llama-3.3-70b", "quant": "fp8", "slots": 32 }
  ],
  "price": { "per_mtok_in": 0.05, "per_mtok_out": 0.40 }
}
```

* `node` is your node id from the first step.
* `id` must match what `/v1/models` returned, exactly.
* `slots` is the most requests you'll serve at once.
* `price` is USD per million tokens. Set both to 0 (or leave `price` out) to
  serve free.

More detail: [Write your manifest](../running-a-node/manifest.md).

**3. Run the agent.** Download it for your platform from
[GitHub Releases](https://github.com/podtorrent/podtorrent-agent/releases)
(or use the container: [Install the agent](../running-a-node/install.md)),
then:

```bash
export PODTORRENT_NODE_TOKEN=...
podtorrent-agent -engine http://127.0.0.1:8000 -manifest manifest.json
```

The agent checks your engine, connects to the network and waits for work. The
log shows `connected`. No ports to open: the agent only makes an outbound
HTTPS connection.

## Then connect: the PodTorrent app

**1. Install the app.**

{% tabs %}
{% tab title="macOS and Linux" %}
```bash
curl -fsSL https://podtorrent.com/install.sh | sh
```

The installer picks the right build for your machine, checks its SHA-256 and
needs no root. Run it again any time to update; your models and settings stay.
{% endtab %}

{% tab title="Windows" %}
In PowerShell:

```powershell
irm https://podtorrent.com/install.ps1 | iex
```

It installs for your user only (no admin) and adds PodTorrent to the Start
menu.
{% endtab %}

{% tab title="Download it yourself" %}
| Machine | Download |
| --- | --- |
| macOS, Apple silicon | [podtorrent.com/download/macos-arm64](https://podtorrent.com/download/macos-arm64) |
| Windows, NVIDIA | [podtorrent.com/download/windows-x64-cuda](https://podtorrent.com/download/windows-x64-cuda) |
| Linux desktop, NVIDIA | [podtorrent.com/download/linux-x64-cuda](https://podtorrent.com/download/linux-x64-cuda) |
| Linux desktop, AMD Ryzen AI Max | [podtorrent.com/download/linux-x64-rocm](https://podtorrent.com/download/linux-x64-rocm) |
| Linux over SSH, AMD Ryzen AI Max | [podtorrent.com/download/linux-x64-rocm-headless](https://podtorrent.com/download/linux-x64-rocm-headless) |

Add `.sha256` to any of these links to get its checksum.
{% endtab %}
{% endtabs %}

**2. Start your node.** Open PodTorrent and click **Start My Node**.

**3. Serve a model.** On **Models**, pick a model and serve its layers. The
app shows the download size and checks it fits this machine's memory first.
To serve whole models on this machine alone, choose **Pod → Alone**.

**4. Join the network.** Open **Network** and fill in:

| Field | What to enter |
| --- | --- |
| Network | **Production** |
| Node id | Your node id from the first step, exactly as approved (lower case) |
| Node token | The token from the first step |
| Input / output price | USD per million tokens. Leave both empty (0) to serve free |

Click **Join Network**. Within a few seconds the badge shows
**Online · production**, and **Offered models** lists what clients can now
use through your machine. The token is saved on this machine, so you don't
paste it again.

{% hint style="info" %}
**Headless Linux box?** `podtorrent setup` walks you through everything above
over SSH and asks for your node id and token at the end. Already set up? Run
`podtorrent join`.
{% endhint %}

More detail: [Use the PodTorrent app](../running-a-node/podtorrent-app.md).

## Check it's working

* On the operator dashboard's **Nodes** tab, your node shows as connected,
  with its models and free slots.
* Send it a request yourself: follow
  [Quickstart: send your first request](quickstart.md) with one of your
  node's models.
* Requests, tokens and earnings show on the dashboard as traffic arrives.

## Fix connection problems

| You see | What it means | Fix |
| --- | --- | --- |
| `401`, or "doesn't accept this node token" | The token is wrong, revoked, or from staging | Get a new token on the **Nodes** tab and paste it in again |
| `403`, or "hasn't approved node …" | The node id doesn't match the token | Use the id exactly as shown on the **Nodes** tab |
| "Can't reach the network" | No outbound HTTPS from this machine | Check the internet connection or firewall, or see [connection modes](../running-a-node/connection-modes/README.md) |
| App: "No model is fully covered" | Nothing serves every layer of a model yet | Serve the missing layers on **Models**, or choose **Pod → Alone** and serve a model that fits |
| Agent: engine or model errors | The agent can't reach your engine, or a model id doesn't match | Check `curl …/v1/models` and the ids in your manifest |

More: [Troubleshooting](../running-a-node/troubleshooting.md).

## Next steps

* Keep it running after reboots: [Run it in production](../running-a-node/run-in-production.md).
* Choose what to charge: [Set prices and tiers](../running-a-node/prices-and-tiers.md).
* Rehearse the agent against a local fake network first: [Test before going live](../running-a-node/testing.md).
* Serve one model from several Macs with exo: [Serve from several Macs with exo](../running-a-node/exo-cluster.md).
