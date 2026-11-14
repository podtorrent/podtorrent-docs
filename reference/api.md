# API reference

Base URL: `https://api.podtorrent.com`. All `/v1/` endpoints need
`Authorization: Bearer <API key>`.

| Method | Path | Auth | Purpose | Guide |
| --- | --- | --- | --- | --- |
| `POST` | `/v1/chat/completions` | key | Chat completion, streaming or not | [Chat completions](../using-the-api/chat-completions.md) |
| `GET` | `/v1/models` | key | Models a connected node serves | [Models and offers](../using-the-api/models-and-offers.md) |
| `GET` | `/v1/network/offers` | key | Capacity and prices per model and tier | [Models and offers](../using-the-api/models-and-offers.md#network-offers) |
| `POST` | `/v1/prompts` | key | Id of a conversation opening, for caching | [Cached prompts](../using-the-api/cached-prompts.md) |
| `GET` | `/v0/network/keys` | none | Network's public receipt-signing key | [Receipts and billing](../concepts/receipts-and-billing.md) |
| `GET` | `/healthz` | none | Returns `ok` | — |

## PodTorrent request options

For `POST /v1/chat/completions`, in a `podtorrent` body object or as headers:

| Body field | Header | Default | Values |
| --- | --- | --- | --- |
| `podtorrent.tier` | `X-PodTorrent-Tier` | `interactive` | `interactive` or `batch` |
| `podtorrent.max_price_per_mtok_out` | `X-PodTorrent-Max-Price-Per-Mtok-Out` | none | Number ≥ 0, USD per million output tokens |

## Response headers

| Header | Values |
| --- | --- |
| `X-PodTorrent-Node` | Node id |
| `X-PodTorrent-Tier` | `interactive` or `batch` |
| `X-PodTorrent-Cache-Hit` | `true` or `false` |
| `X-PodTorrent-Own-Node` | `true` or `false`; operators' own client keys only |

## `POST /v1/prompts`

Request: `{ "messages": [ ... ] }`, a non-empty array.
Response: `{ "object": "prompt", "sha256": "<hex>", "messages": <count> }`.

## `GET /v0/network/keys`

```json
{ "receipt_keys": [ { "alg": "Ed25519", "key": "<base64 public key>" } ] }
```

Errors are listed in [Errors and limits](../using-the-api/errors-and-limits.md).
