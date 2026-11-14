# Cached prompts

Many apps start every conversation the same way: a long system prompt, or an
agent framework's instructions. Engines can keep that opening processed so
they don't redo the work each time. PodTorrent lets you take advantage of it.

## How it works

1. You get an id for your opening from `POST /v1/prompts`.
2. You share that id with node operators, so they can keep the opening
   cached and advertise it.
3. When your request starts with that exact opening, the gateway sends it to
   a node that has it cached, ahead of other nodes.
4. Cached input tokens are billed at that node's cached price, which is
   usually lower.

You don't change your requests at all. Matching happens automatically.

## Get the id

Send the opening messages, exactly as your app sends them:

```bash
curl https://api.podtorrent.com/v1/prompts \
  -H "Authorization: Bearer $PODTORRENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "system", "content": "You are a helpful support agent for ..."}]}'
```

```json
{ "object": "prompt", "sha256": "9c1e…", "messages": 1 }
```

## Matching rules

* The opening is the first 1 to 8 messages of the conversation.
* Only `role` and `content` count, and they must match exactly. One changed
  character, such as a date in the system prompt, gives a different id.
* A match means the request goes to that node first. Whether the engine
  really reuses its cache is up to the engine; you'll see the result in
  `usage.prompt_tokens_details.cached_tokens` if the engine reports it.

To see which openings nodes advertise today, look at `cached_prompts` in
[network offers](models-and-offers.md#network-offers). The
`X-PodTorrent-Cache-Hit` response header tells you if a request matched.

Operators: see [Advertise cached prompts](../running-a-node/cached-prompts.md).
