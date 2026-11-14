# Bring your own clients

{% hint style="info" %}
**Preview.** This is built and tested, and is being rolled out. Ask the
PodTorrent team before relying on it.
{% endhint %}

If you run nodes and also have your own customers, they can use the
PodTorrent API with keys tied to you. Their requests go to your nodes, and,
if you turn on network fallback for that client's key, to the rest of the
network when yours can't take them.

## How it works

* **Keys.** You make a key per client in the operator console
  (`/operator` on the dashboard), on the **Clients** tab, and can revoke it
  there. Your client
  uses the normal API at `https://api.podtorrent.com/v1`.
* **Routing.** Your own nodes come first. With the key's **network fallback** off (the
  default), that's all: when none of your nodes is online or all are busy,
  your client gets a `503` error with code `operator_no_capacity` saying so.
  With it on, the request goes elsewhere on the network if your nodes are
  full, don't serve the model or tier, or are over the client's price
  ceiling, skipping nodes priced above the key's **price cap** (USD per
  million output tokens) if you set one.
* **Billing.** You're charged for every request your clients make, at the
  serving node's price. On your own nodes that nets out to zero. On other
  operators' nodes, they're paid as usual.

Responses to these keys include an `X-PodTorrent-Own-Node` header: `true` if
your node served it, `false` if it spilled over.

Network fallback and the price cap are set per client key: choose them when
you make the key in the **Clients** tab, and change them later with **Edit**
in the key's row. Off keeps that client's requests on your nodes; on adds the
network for reliability, at up to the key's price cap. Changes apply from the
client's next request.

## Getting started

1. Ask the PodTorrent team to set you up as an operator and link your nodes.
2. In the operator console's **Clients** tab, click **+ Client key**, enter
   a name for the client, choose whether to enable network fallback (the
   price cap can be set once it's on), and click **Create key**. Each key is shown once;
   pass it on securely. Revoking a key stops it at once.
3. If your agent was already connected, restart it so the network picks up
   that the node is yours.

Client keys are separate from the keys on the client dashboard's **API
keys** tab: those are paid from your own prepaid balance and don't prefer
your nodes.
