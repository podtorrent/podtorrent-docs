# Serve from several Macs with exo

{% hint style="info" %}
**Preview.** exo support is built but not yet in an agent release. Until it
is, build the agent from source (see [Install the agent](install.md)).
{% endhint %}

[exo](https://github.com/exo-explore/exo) is free, open-source software that
links several Macs on your network into one cluster. Together they can run
models that are too big for any one Mac. With the PodTorrent agent, the
whole cluster joins the network as **one node**. It uses one node token and
one manifest, and its earnings go to one place.

```
client ─► PodTorrent ◄══ outbound TLS ══ agent ─► exo ─► Mac A ⇄ Mac B ⇄ Mac C
```

You run exo as it comes. The agent runs on one of the Macs and needs no open
ports.

## What you need

* Apple-silicon Macs on the same network, all running the **same exo
  version**. One Mac is enough to try it.
* A node token. See [Quickstart: connect a node](../getting-started/node-quickstart.md).
* An administrator password on each Mac, for step 2.

## Four steps

**1. Load your models in exo.** In exo's dashboard (`http://localhost:52415`),
launch the models you want to serve and wait until they're ready.

**2. Close exo's port to the rest of your network.** exo's port has no
password. Without this step, anyone on your network could use your cluster
or read the prompts it is serving. On every Mac, run the guard script from
the agent's repository and name the **other** Macs' addresses:

```bash
sudo scripts/exo-port-guard.sh install 192.168.1.21 192.168.1.22
```

Give the Macs fixed addresses in your router first. The rule survives
restarts and changes nothing else. `status` shows it and `remove` takes it
out.

**3. Write your manifest** with exo's model ids, for example
`mlx-community/Llama-3.2-1B-Instruct-4bit`. Keep `slots` at 8 or less.
See [Write your manifest](manifest.md).

**4. Start the agent** on one Mac, ideally one that stays on:

```bash
PODTORRENT_NODE_TOKEN=... podtorrent-agent -engine-kind exo \
  -engine http://127.0.0.1:52415 -manifest manifest.json
```

The log shows `connected`, then `engine models ready` with your loaded
models.

## What exo mode does for you

* **Offers only loaded models.** exo lists every model it knows, loaded or
  not. The agent checks every few seconds which models are actually ready,
  and the network sends you requests only for those. Load and unload models
  in exo whenever you like.
* **Blocks requests that would reach into your network.** exo downloads
  image links in requests by itself. The agent refuses any request with an
  image link that isn't sent inline, so no client can make your Mac open
  addresses on your network.
* **Hands stuck requests back fast.** If a model is still loading and exo
  sends nothing for a minute (`-first-event`), the agent fails the request
  so the network can send it to another node.

## Good to know

* **Keep the Macs awake** while they serve (System Settings › Energy). A
  sleeping Mac drops out of the cluster.
* **Update every Mac at the same time.** exo updates itself, and Macs on
  different versions don't join each other.
* **Only accept exo's Thunderbolt setup if you use Thunderbolt cables.** It
  installs a system service that switches your Mac to its own network
  location.
* **Privacy:** as on any node, you can see the prompts your node serves, and
  so can every Mac in your cluster. See [Privacy](../concepts/privacy.md).

Full guide and troubleshooting:
[Serve from an exo cluster](https://github.com/Munerate/podtorrent-agent/blob/main/docs/exo.md).
