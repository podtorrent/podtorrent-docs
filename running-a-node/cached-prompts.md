# Advertise cached prompts

If clients send the same long opening every time, you can keep it processed
in your engine's prefix cache and tell the network. Requests that start with
it then come to you first, and you do less work per request.

## 1. Get the prompt id

The id is the SHA-256 of the opening messages. Clients get it from
`POST /v1/prompts` and share it with you, or the PodTorrent team can give it
to you. You can also compute it yourself; the formula is in the
[protocol spec](https://github.com/podtorrent/podtorrent-agent/blob/main/spec/protocol-v0.md#cached-prompts).

## 2. Add it to your manifest

```json
{
  "id": "meta-llama/llama-3.3-70b",
  "slots": 32,
  "cached_prompts": [
    { "name": "support-bot-v3", "sha256": "9c1e…", "tokens": 1800 }
  ]
}
```

`name` is just a label for you. `tokens` is optional.

## 3. Warm your cache

Make sure your engine has prefix caching turned on, and send it the opening
once so it's ready. How to do that depends on your engine.

## Billing

Cached input tokens are billed at your `per_mtok_in_cached` price. The count
comes from your engine's `usage.prompt_tokens_details.cached_tokens`; if your
engine doesn't report it, all input tokens are billed at the normal price.
