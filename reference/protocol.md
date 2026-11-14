# Node protocol

The agent and the network talk over a WebSocket using a small JSON protocol,
version 0. The spec is public and is the source of truth:
[spec/protocol-v0.md](https://github.com/Munerate/podtorrent-agent/blob/main/spec/protocol-v0.md).

You only need it if you're writing your own agent. Any program that follows
the spec is a valid node; `podtorrent-agent` is the reference
implementation. Check yours with [`podtorrent-conformance`](../running-a-node/testing.md#check-conformance).

## In one minute

* The node sends `hello` with its manifest; the network answers `welcome`.
* The node sends `status` with free slots, and `manifest` when it changes.
* The network sends `request`; the node answers with `response_start`, then
  `response_chunk`s, then `response_end` (or `response_error`). The network
  can send `cancel`.
* After each response, both sides exchange a signed `receipt`.

Changes to the protocol are additive only, so existing nodes keep working.
