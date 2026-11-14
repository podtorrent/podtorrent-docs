# Receipts and billing

Every request is metered, and both sides sign what they saw. Money only
moves for requests where both sides agree.

## What a request costs

The serving node's price, for the request's tier:

```
cost = (input tokens − cached tokens) × input price
     + cached tokens × cached input price
     + output tokens × output price
```

Prices are per million tokens, in US dollars. Token counts come from the
engine's `usage`.

## Signed receipts

After each request:

1. The node sends a **receipt**: request id, model, status and token counts,
   signed with a key it made at start.
2. The network compares it with its own reading of the same response.
3. The network replies with its own signed receipt, adding the tier and the
   cost.

If both receipts agree, the request is **matched** and the operator is paid
for it. If they differ, or the node sent none, it's recorded but not paid.

Receipts hold counts only, never prompts or answers.

The network's public signing key is published at
`GET https://api.podtorrent.com/v0/network/keys`, so operators can check the
network's receipts themselves.

## What receipts prove, and what they don't

They prove both sides saw the same token counts. They don't prove the counts
are right, or that the node ran the model it claims. Checks for that, using
test requests, are planned but not built yet.

## Agent versions

Receipts need agent v0.2.0 or newer. Older agents still serve requests, but
their work is never matched, so it isn't paid.

{% hint style="info" %}
Automatic payouts to operators aren't built yet. Matched requests are
recorded so earnings can be settled.
{% endhint %}
