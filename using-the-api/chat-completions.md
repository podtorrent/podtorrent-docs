# Chat completions

`POST /v1/chat/completions` is the standard OpenAI chat endpoint. Send the
same body you'd send to OpenAI.

```bash
curl https://api.podtorrent.com/v1/chat/completions \
  -H "Authorization: Bearer $PODTORRENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<model id>", "messages": [{"role": "user", "content": "Hi"}]}'
```

## What the gateway changes

Almost nothing. Your body goes to the node's engine as is, with two
exceptions:

* **The `podtorrent` object is removed.** It holds PodTorrent options (tier
  and price ceiling) and is only read by the gateway. See
  [Choosing a tier and a price](tiers-and-prices.md).
* **Streams always include usage.** For `"stream": true` the gateway sets
  `stream_options.include_usage = true`. The last chunk before `data: [DONE]`
  has a `usage` object and an empty `choices` list. Make sure your code
  skips chunks with no choices.

Which other parameters work (temperature, tools, JSON mode and so on)
depends on the engine the node runs. Errors from the engine come back with
the engine's own status and body.

## Response headers

| Header | Meaning |
| --- | --- |
| `X-PodTorrent-Node` | Id of the node that served the request |
| `X-PodTorrent-Tier` | `interactive` or `batch` |
| `X-PodTorrent-Cache-Hit` | `true` if it went to a node with your prompt's opening cached |
| `X-PodTorrent-Own-Node` | Only for [operators' own clients](../operators/own-clients.md): `true` if the operator's own node served it |

## If a node fails

If a node fails before sending anything back, the gateway retries once on
another node. You don't need to do anything. Once the answer has started
streaming, a failure ends the stream.
