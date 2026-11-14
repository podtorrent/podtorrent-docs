# Glossary

**Agent.** The `podtorrent-agent` program an operator runs next to their
engine. Links the engine to the network.

**API key.** A client's secret, starting with `pt_`. Sent as a bearer token.

**Cached prompt.** A fixed conversation opening a node keeps processed. Has
an id, the SHA-256 of the opening messages.

**Engine.** The operator's OpenAI-compatible inference server, such as vLLM
or llama.cpp server.

**Gateway.** `api.podtorrent.com`. The single address clients call.

**Manifest.** A node's JSON description of its models, slots and prices.

**Matched.** A request whose node and network receipts agree. Only matched
requests are paid.

**Node.** One operator machine or cluster connected through one agent.

**Node token.** A node's secret, used to connect to the network.

**Operator.** Someone who runs one or more nodes.

**Receipt.** A signed record of one request's token counts, made by the node
and by the network.

**Slot.** Room for one request at a time on a node, for one model.

**Tier.** `interactive` (someone is waiting) or `batch` (background work).
