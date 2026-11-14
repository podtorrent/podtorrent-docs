# Quickstart: send your first request

You need a PodTorrent API key. Keys start with `pt_` and are issued by the
PodTorrent team. Self-service sign-up isn't available yet.

## 1. See which models are available

```bash
curl https://api.podtorrent.com/v1/models \
  -H "Authorization: Bearer $PODTORRENT_API_KEY"
```

The list only contains models that a connected node serves right now, so it
can change from minute to minute.

## 2. Send a chat request

Any OpenAI SDK works. Change the base URL and the key, nothing else.

{% tabs %}
{% tab title="Python" %}
```python
from openai import OpenAI

client = OpenAI(base_url="https://api.podtorrent.com/v1", api_key="pt_...")

stream = client.chat.completions.create(
    model="<a model id from step 1>",
    messages=[{"role": "user", "content": "Write a haiku about GPUs."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices:
        print(chunk.choices[0].delta.content or "", end="")
```
{% endtab %}

{% tab title="curl" %}
```bash
curl -N https://api.podtorrent.com/v1/chat/completions \
  -H "Authorization: Bearer $PODTORRENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "<a model id from step 1>", "stream": true,
       "messages": [{"role": "user", "content": "Write a haiku about GPUs."}]}'
```
{% endtab %}
{% endtabs %}

The `if chunk.choices` check matters: PodTorrent always ends a stream with a
usage chunk whose `choices` list is empty.

## 3. Check who served it

Every response carries an `X-PodTorrent-Node` header with the id of the node
that answered. Handy when you're debugging speed or quality.

## Next steps

* Save money on background jobs with the [batch tier](../using-the-api/tiers-and-prices.md).
* Reuse a long system prompt cheaply with [cached prompts](../using-the-api/cached-prompts.md).
* Know what can go wrong: [Errors and limits](../using-the-api/errors-and-limits.md).
