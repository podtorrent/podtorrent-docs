# Write your manifest

The manifest is a JSON file that tells the network what your node offers:
which models, how many requests at once, and at what price.

## A minimal manifest

```json
{
  "node": "example-node-01",
  "models": [
    { "id": "meta-llama/llama-3.3-70b", "slots": 32 }
  ]
}
```

That's enough to start. Only three things are required:

* `node`: a name for this node, shown in your reports.
* `models[].id`: the model id **exactly** as your engine's `/v1/models` lists
  it. Clients ask for the model by this id.
* `models[].slots`: the most requests for this model you'll serve at once.
  The network never sends more.

## A fuller example

```json
{
  "node": "example-node-01",
  "models": [
    {
      "id": "meta-llama/llama-3.3-70b",
      "quant": "fp8",
      "context_max": 32768,
      "slots": 32,
      "interactive_reserve": 4,
      "speed": { "single_tps": 20, "batch_tps": 250 }
    }
  ],
  "tiers": ["interactive", "batch"],
  "price": {
    "per_mtok_in": 0.05,
    "per_mtok_out": 0.40,
    "batch": { "per_mtok_in": 0.03, "per_mtok_out": 0.25 }
  }
}
```

Every field is described in the [manifest reference](../reference/manifest.md).

## Choosing `slots`

Set `slots` to the number of requests your engine handles well at the same
time, not the most it accepts. Too high and every request gets slow; too low
and you leave money on the table. A quick way to find it: run a load test
against your engine and watch time to first token as concurrency goes up.

## Be honest

Everything in the manifest is a claim. The network checks it against what
your node actually does, so describe the model and precision you really run.

## Changing it later

Edit the file while the agent runs. It notices within 5 seconds (or right
away on `SIGHUP`), checks your engine serves every listed model, and sends
the new manifest. Requests already running carry on. If the new file is
invalid, the agent logs it and keeps the old one.
