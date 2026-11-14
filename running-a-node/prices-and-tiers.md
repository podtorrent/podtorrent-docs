# Set prices and tiers

You decide what you charge and which kinds of work you accept.

## Prices

Prices are in US dollars per million tokens, set in your manifest:

```json
"price": {
  "per_mtok_in": 0.05,
  "per_mtok_in_cached": 0.01,
  "per_mtok_out": 0.40,
  "batch": { "per_mtok_in": 0.03, "per_mtok_out": 0.25 }
}
```

* `per_mtok_in`, `per_mtok_out`: input and output tokens.
* `per_mtok_in_cached`: input tokens your engine served from its cache.
  Defaults to `per_mtok_in`.
* `batch`: separate prices for batch work. Defaults to your main prices.

To price one model differently, add a `price` object inside that model. It
replaces the node-wide price for that model.

Clients can set a maximum output price per request. If yours is higher, you
won't get that request. Clients also see the min, median and max price per
model on the network's offers list, so you can see where you stand.

A node with no price is free: its requests cost nothing.

## Tiers

| Tier | What it is | How it's routed to you |
| --- | --- | --- |
| `interactive` | Someone is waiting | Nodes with the most free slots first, for speed |
| `batch` | Background work | Nodes with the fewest free slots first, to fill batches |

By default you accept both. To accept only one, set
`"tiers": ["interactive"]` or `"tiers": ["batch"]`.

## Keeping room for interactive work

If you accept batch work but want space left for people who are waiting,
set `interactive_reserve` on the model. Batch requests never take those
slots:

```json
{ "id": "meta-llama/llama-3.3-70b", "slots": 32, "interactive_reserve": 4 }
```

The full routing order is in [Routing and queueing](../concepts/routing.md).
