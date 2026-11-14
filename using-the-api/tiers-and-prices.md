# Choosing a tier and a price

Every request has a **tier**, and can have a **price ceiling**. Both are
optional.

## Tiers

| Tier | Use it when | Waits for a slot |
| --- | --- | --- |
| `interactive` (default) | Someone is waiting for the answer | up to 10 seconds |
| `batch` | Background jobs, evals, bulk processing | up to 2 minutes |

Batch work goes to nodes that are already busy, so their batches fill up.
That's cheaper to run, and operators can set a lower batch price. Why this
works is explained in [Routing and queueing](../concepts/routing.md).

## Price ceiling

`max_price_per_mtok_out` is the most you'll pay, in US dollars per million
output tokens, at the tier you chose. Nodes that charge more never get the
request.

Use [network offers](models-and-offers.md#network-offers) to see current
prices before you pick a ceiling.

## How to set them

Put them in a `podtorrent` object in the body:

```python
client.chat.completions.create(
    model="<model id>",
    messages=[...],
    extra_body={"podtorrent": {"tier": "batch", "max_price_per_mtok_out": 0.3}},
)
```

Or send headers, if changing the body is awkward:

```http
X-PodTorrent-Tier: batch
X-PodTorrent-Max-Price-Per-Mtok-Out: 0.3
```

If both are set, the body wins.

An unknown tier, or a ceiling that isn't a number of 0 or more, gets a `400`.
If no node serves the model within your ceiling, you get a `503`
`capacity_error`.
