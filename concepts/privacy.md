# Privacy

Short version: the node that serves your request sees it. PodTorrent's
gateway doesn't keep it.

## What the gateway stores

For each request: your key id, the node, the model, the tier, the status,
token counts, timings and cost. **Never** the prompt or the answer.

## What a node sees

The node's engine needs your prompt to answer it, so the node operator's
machine sees both the prompt and the answer. The PodTorrent agent itself logs
no content, only request ids and errors, but the operator controls their own
engine and machine.

{% hint style="warning" %}
Don't send data to PodTorrent that you wouldn't share with a third-party
inference provider. A confidential computing option, where even the operator
can't see your data, is on the roadmap but not available.
{% endhint %}

## What PodTorrent operators see about clients

Operators see token counts, speed and earnings for their nodes, never what a
request said. The one exception to anonymity is their own clients: an
operator sees usage per key for clients they [brought themselves](../operators/own-clients.md).
