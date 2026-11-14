# Quickstart: connect a node

This gets one machine serving requests in a few minutes. Each step links to
the full page if you need more.

## 1. Get a node token

Sign in at [dashboard.podtorrent.com](https://dashboard.podtorrent.com) with
your email and register a node to get its token. The token identifies your
node, so keep it secret.

## 2. Make sure your engine is ready

Your engine must speak the OpenAI API, for example on
`http://127.0.0.1:8000`. Check it lists your model:

```bash
curl http://127.0.0.1:8000/v1/models
```

More detail: [What you need](../running-a-node/requirements.md).

## 3. Write a manifest

Save this as `manifest.json` and change it to match your setup:

```json
{
  "node": "example-node-01",
  "models": [
    { "id": "meta-llama/llama-3.3-70b", "quant": "fp8", "slots": 32 }
  ],
  "price": { "per_mtok_in": 0.05, "per_mtok_out": 0.40 }
}
```

`id` must match what `/v1/models` returned, exactly. `slots` is the most
requests you'll serve at once. More detail: [Write your manifest](../running-a-node/manifest.md).

## 4. Run the agent

Download it from [GitHub Releases](https://github.com/Munerate/podtorrent-agent/releases),
then:

```bash
export PODTORRENT_NODE_TOKEN=...
podtorrent-agent -engine http://127.0.0.1:8000 -manifest manifest.json
```

The agent checks your engine, connects to the network and waits for work.
That's it: no ports to open.

## Next steps

* Rehearse first against a local fake network: [Test before going live](../running-a-node/testing.md).
* Keep it running: [Run it in production](../running-a-node/run-in-production.md).
* No outbound access allowed? See [connection modes](../running-a-node/connection-modes/README.md).
