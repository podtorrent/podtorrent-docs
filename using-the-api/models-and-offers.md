# Models and offers

## List models

`GET /v1/models` returns every model at least one connected node serves.

```json
{ "object": "list", "data": [
  { "id": "mock/echo-1", "object": "model", "owned_by": "podtorrent" }
] }
```

Model ids are whatever operators' engines call them, so use them exactly as
listed. A model disappears from the list when no node serving it is online.

## Network offers

`GET /v1/network/offers` shows what's available per model and tier, so you
can compare prices and capacity.

```json
{ "object": "list", "data": [
  { "model": "mock/echo-1", "tier": "batch", "nodes": 2, "slots": 8, "free_slots": 6,
    "price_per_mtok_out": { "min": 0.2, "median": 0.2, "max": 0.4 },
    "cached_prompts": ["9c1e…"] }
] }
```

| Field | Meaning |
| --- | --- |
| `nodes` | Connected nodes serving this model at this tier |
| `slots`, `free_slots` | Total and currently free request slots across those nodes |
| `price_per_mtok_out` | Output price range in USD per million tokens; `null` if no node set a price |
| `cached_prompts` | Ids of [cached prompts](cached-prompts.md) nodes advertise |

Both endpoints need an API key.
