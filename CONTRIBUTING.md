# Editing the public docs

This repo is the source of `docs.podtorrent.com`: a [VitePress](https://vitepress.dev)
site served by a Cloudflare Worker (static assets). `SUMMARY.md` is the
sidebar; add every new page there.

```bash
npm ci
npm run dev      # live preview at http://localhost:5173
npm run build    # what CI and deploys run; fails on dead links
npm run preview  # build, then serve it through the Worker locally
```

Merging to `main` does not publish. A maintainer deploys with `npm run deploy`.

- Public audience: API clients and node operators. Internal operations
  (deploys, secrets, Cloudflare setup) stay in the internal docs.
- Document only what's deployed; mark built-but-not-live features **Preview**.
- One concept, one page; link instead of repeating.
- When the API, manifest or agent flags change, update `reference/` and the
  guide page that explains it.
- Callouts and tabs use GitBook's syntax, converted at build time
  (`.vitepress/gitbook.ts`): `{% hint style="info|warning" %}…{% endhint %}`
  and `{% tabs %}{% tab title="…" %}…{% endtab %}{% endtabs %}`.
  VitePress's own `::: info` blocks work too.
