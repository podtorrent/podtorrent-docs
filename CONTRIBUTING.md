# Editing the public docs

This folder is the source of `docs.podtorrent.com`, a GitBook space synced
from this folder (`.gitbook.yaml`; `SUMMARY.md` is the sidebar).

- Public audience: API clients and node operators. Internal operations
  (deploys, secrets, Cloudflare setup) stay in `../docs/`.
- Document only what's deployed; mark built-but-not-live features **Preview**.
- One concept, one page; link instead of repeating.
- When the API, manifest or agent flags change, update `reference/` and the
  guide page that explains it.
