# Operator dashboard (preview)

{% hint style="info" %}
**Preview.** The dashboard is built but not live yet. This page describes
what it will show.
{% endhint %}

The operator console is a private web page for operators, at `/operator` on
the dashboard. You sign in with your email, and you only ever see your own
data. It shows counts, timings and money, never prompts or answers.

It's kept apart from the client dashboard (`/`), where you can also spend
prepaid credits like any client. Switch between the two with **Operator
console** and **Client dashboard** at the top of the page.

## What's on it

| Section | Shows |
| --- | --- |
| **Nodes** | Each node live: connected or not, agent version, tiers, and per model the precision, slots and free slots |
| **Speed** | Per node and model: time to first token (median and 95th percentile), tokens per second per request, peak tokens per second, and peak tokens per second per watt |
| **Tokens and earnings** | Per day, node and model: requests, tokens, earnings from matched requests, and the value of unmatched ones |
| **Your clients** | [Your clients' keys](own-clients.md): make and revoke them; per key, requests, tokens, billed amount and how much ran on your own nodes |

You can look back up to 90 days.

## Tokens per watt

To see tokens per watt, declare your power draw at full load in the
manifest, node-wide or per model:

```json
{ "node": "example-node-01", "power_watts": 1400, "models": [ ... ] }
```

It's only used for this figure. Support for `power_watts` arrives in the
next agent release.
