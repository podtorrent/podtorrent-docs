# Manifest reference

The guide is [Write your manifest](../running-a-node/manifest.md). This page
lists every field.

## Node

| Field | Required | Meaning |
| --- | --- | --- |
| `node` | yes | A name for this node, shown in your reports |
| `models` | yes | List of models, below |
| `tiers` | no | Work you accept: `["interactive", "batch"]` (default both) |
| `price` | no | Node-wide price, below |
| `power_watts` | no | Declared full-load power draw, for the [dashboard](../operators/dashboard.md) only. Next agent release. |

## Model (`models[]`)

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Model id exactly as your engine's `/v1/models` lists it |
| `slots` | yes | Most requests for this model at once |
| `quant` | no | Precision running: `bf16`, `fp8`, `q4_k_m`, … |
| `context_max` | no | Longest prompt plus output, in tokens |
| `speed.single_tps` | no | Output tokens/s for one request alone |
| `speed.batch_tps` | no | Total output tokens/s with all slots busy |
| `interactive_reserve` | no | Slots batch work may not use |
| `cached_prompts` | no | `[{ "name", "sha256", "tokens" }]`; see [Advertise cached prompts](../running-a-node/cached-prompts.md) |
| `price` | no | Replaces the node-wide price for this model |
| `power_watts` | no | As above, for this model |

## Price (`price`)

All in USD per million tokens.

| Field | Meaning |
| --- | --- |
| `per_mtok_in` | Input tokens |
| `per_mtok_out` | Output tokens |
| `per_mtok_in_cached` | Input tokens served from cache (default `per_mtok_in`) |
| `batch` | Batch-tier price with the same fields (default the main price) |
