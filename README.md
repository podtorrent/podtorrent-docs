# Welcome

PodTorrent is a network of independent machines that run AI models. You send
an ordinary OpenAI-style request. We pick a machine that serves the model,
send it the request, and stream the answer back to you.

## Ways to take part

| | What it is | Start here |
| --- | --- | --- |
| **Use the API** | Call models from your code with any OpenAI SDK, at `https://api.podtorrent.com/v1` | [Send your first request](getting-started/quickstart.md) |
| **Run a node: agent** | A lightweight Go program that runs next to the model server you already have (vLLM, SGLang, llama.cpp server, Ollama…) | [Connect a node](getting-started/node-quickstart.md) |
| **Run a node: PodTorrent app** | Splits a model's layers across machines and serves it on the network. No model server needed | [Use the PodTorrent app](running-a-node/podtorrent-app.md) |
| **Run a node: exo cluster** | Several Macs as one node, with the agent | [Serve from several Macs with exo](running-a-node/exo-cluster.md) |

Nodes set their own price, or serve free.

## Also useful

| I want to… | Read |
| --- | --- |
| Understand the moving parts | [How PodTorrent works](getting-started/how-it-works.md) |
| Look up an endpoint or field | [API reference](reference/api.md), [Manifest reference](reference/manifest.md) |

{% hint style="info" %}
PodTorrent is young and changing quickly. Pages marked **preview** describe
features that are built but not generally available yet.
{% endhint %}
