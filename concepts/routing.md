# Routing and queueing

For each request the gateway picks one node. Here's how.

## Which nodes qualify

A node can take the request only if all of these hold:

* It serves the requested model.
* It accepts the request's tier.
* Its output price for that tier is within the client's ceiling, if one was
  set.
* It has been heard from in the last 90 seconds.
* It has a free slot. Batch requests can't use a model's
  `interactive_reserve` slots.

## How the winner is chosen

Among the nodes that qualify, in this order:

1. **The client's operator's own nodes** (only for [operators' own clients](../operators/own-clients.md); unless the operator turned on network fallback for the client's key, only those nodes qualify).
2. **A node with the request's opening cached** (see [cached prompts](../using-the-api/cached-prompts.md)).
3. **Free slots.**
   * Interactive: the node with the **most** free slots. Less busy means
     faster answers.
   * Batch: the node with the **fewest** free slots that still has one. This
     fills up batches that are already running, which is cheaper per token
     on GPU hardware.
4. **The lower price.**

## Counting slots

The gateway counts the requests it has sent to each node, and also listens to
what the node reports. A node that says it's busier than the gateway thinks
(maybe it's doing other work) is treated as busier. The network never sends
a node more requests than its slots.

## When everything is full

If some node qualifies but none has a free slot, the request waits:

| Tier | Waits up to |
| --- | --- |
| interactive | 10 seconds |
| batch | 2 minutes |

If a slot frees up, the request goes there. If not, the client gets a `503`
`capacity_error`. If no node serves the model at all, the `503` comes right
away.

## When a node fails

If the chosen node fails before sending any data, the gateway tries one
other node. If that fails too, the client gets a `503` `capacity_error`.
