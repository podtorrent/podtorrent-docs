# Welcome

PodTorrent is a network of independent machines that run AI models. You send
an ordinary OpenAI-style request. We pick a machine that serves the model,
send it the request, and stream the answer back to you.

There are two ways to take part:

* **Use the API.** You have an app that needs a language model. Point any
  OpenAI SDK at `https://api.podtorrent.com/v1` and use a PodTorrent API key.
* **Run a node.** You have GPUs and an inference engine (vLLM, SGLang,
  llama.cpp server, Ollama and so on). Run the small PodTorrent agent next to
  it, set your price, and the network sends you work.

## Where to start

| I want to… | Read |
| --- | --- |
| Understand the moving parts | [How PodTorrent works](getting-started/how-it-works.md) |
| Call a model from my code | [Quickstart: send your first request](getting-started/quickstart.md) |
| Connect my hardware | [Quickstart: connect a node](getting-started/node-quickstart.md) |
| Look up an endpoint or field | [API reference](reference/api.md), [Manifest reference](reference/manifest.md) |

{% hint style="info" %}
PodTorrent is young and changing quickly. Pages marked **preview** describe
features that are built but not generally available yet.
{% endhint %}
