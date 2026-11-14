# What you need

## An OpenAI-compatible engine

vLLM, TensorRT-LLM, SGLang, llama.cpp server, Ollama, or anything else that
speaks the OpenAI API. To serve from several Macs as one node, see
[Serve from several Macs with exo](exo-cluster.md). The agent needs to reach it, for example at
`http://127.0.0.1:8000`. It must support:

* `GET /v1/models`, listing the models you'll offer.
* `POST /v1/chat/completions`, with and without `"stream": true`.
* Token counts in `usage`, including in the last stream chunk when the
  request has `"stream_options": {"include_usage": true}`. The network sets
  this on every streamed request to count tokens.

If your engine reports cached tokens (`usage.prompt_tokens_details.cached_tokens`),
you can also be paid the cached-input price. See
[Advertise cached prompts](cached-prompts.md).

## A way to reach the network

Usually that's just outbound HTTPS on port 443. If that's not allowed, there
are private options. See [Choose a connection mode](connection-modes/README.md).

## A node token

The PodTorrent team gives you one per node. It's how the network knows which
node is connecting. Keep it secret, and ask for a new one if it leaks.

## What the agent does not need

No GPU access, no root, no host disk and no host networking. It never
downloads models. It only talks to your engine and to the network.
