# Operator dashboard

The operator console is a private web page for operators, at
[dashboard.podtorrent.com/operator](https://dashboard.podtorrent.com/operator). You sign in with your email, and you only ever see your own
data. It shows counts, timings and money, never prompts or answers.

It's kept apart from the client dashboard (`/`), where you can also spend
prepaid credits like any client. Switch between the two with **Operator
console** and **Client dashboard** at the top of the page.

## First sign-in

If you sign in with an email that has no node yet, the console shows **Set up
your node**: pick a node id, click **Create node and get token**, and copy the
token (shown once). The same token view, with steps for the PodTorrent app or
the agent, appears after **Add node** and **New token**. See
[Get a node id and token](../getting-started/node-quickstart.md#first-get-a-node-id-and-token).

## What's on it

| Section | Shows |
| --- | --- |
| **Nodes** | Each node live: connected or not, agent version, tiers, and per model the precision, slots and free slots. Get or replace a node's token, and **Add node** to link another machine (self-serve operators: up to 5 nodes) |
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
