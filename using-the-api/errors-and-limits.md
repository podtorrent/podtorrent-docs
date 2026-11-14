# Errors and limits

Errors look like OpenAI's:

```json
{ "error": { "message": "invalid API key", "type": "authentication_error" } }
```

## Error codes

| Status | `type` | What happened | What to do |
| --- | --- | --- | --- |
| 400 | `invalid_request_error` | Body isn't JSON, `model` is missing, or a PodTorrent option is invalid | Fix the request |
| 401 | `authentication_error` | Key is missing, unknown or disabled | Check the key |
| 404 | `invalid_request_error` | Unknown path | Check the URL |
| 429 | `rate_limit_error` | Your key hit a quota | Slow down, or wait for the reset |
| 503 | `capacity_error` | No node serves the model at that tier and price, none had a free slot in time, or the nodes tried failed | Check `/v1/models`, raise your price ceiling, use `batch`, or retry later |

Errors from the engine itself, for example a `400` for a parameter it doesn't
support, are passed through with the engine's status and body.

## Quotas

A key can have two limits. Ask the PodTorrent team if you need them changed.

* **Requests per minute**, over the last 60 seconds.
* **Tokens per day**, input plus output, reset at 00:00 UTC.

Quotas count requests once they finish. A burst of requests sent at the same
moment can go a little over the limit before the `429`s start.

## Retrying

* `503` after waiting: the network is full for that model. Back off and try
  again, or switch to the `batch` tier, which waits longer.
* `429`: wait. The message says which limit you hit.
