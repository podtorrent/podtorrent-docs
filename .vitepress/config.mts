import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { gitbookSyntax } from './gitbook'
import { mermaidFence } from './mermaid'
import { readSummary, sidebarFrom } from './summary'

const root = resolve(__dirname, '..')
const SITE = 'https://docs.podtorrent.com'
const summary = readSummary(join(root, 'SUMMARY.md'))

export default defineConfig({
  title: 'PodTorrent Docs',
  description: 'Use the PodTorrent API, or run a node on the network.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: SITE },
  // README.md is a folder's landing page, like GitBook did it.
  rewrites: { 'README.md': 'index.md', ':path(.*)/README.md': ':path/index.md' },
  srcExclude: ['SUMMARY.md', 'CONTRIBUTING.md', 'node_modules/**'],
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  markdown: {
    config: (md) => {
      gitbookSyntax(md)
      // GitBook-style links to a folder's README.md: the page is served at the folder URL.
      const open = md.renderer.rules.link_open
      md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
        const href = tokens[idx].attrGet('href')
        if (href && !/^[a-z]+:/i.test(href)) tokens[idx].attrSet('href', href.replace(/(^|\/)README\.md(?=$|#)/, '$1'))
        return open ? open(tokens, idx, opts, env, self) : self.renderToken(tokens, idx, opts)
      }
      mermaidFence(md)
    },
    container: { infoLabel: 'Note', tipLabel: 'Tip', warningLabel: 'Warning', dangerLabel: 'Danger' },
  },
  themeConfig: {
    nav: [
      { text: 'API', link: '/getting-started/quickstart' },
      { text: 'Run a node', link: '/getting-started/node-quickstart' },
      { text: 'Playground', link: 'https://playground.podtorrent.com' },
      { text: 'Dashboard', link: 'https://dashboard.podtorrent.com' },
      { text: 'podtorrent.com', link: 'https://podtorrent.com' },
    ],
    sidebar: sidebarFrom(summary),
    search: { provider: 'local' },
    outline: { level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/podtorrent' }],
    editLink: { pattern: 'https://github.com/podtorrent/podtorrent-docs/edit/main/:path', text: 'Edit this page on GitHub' },
  },
  // Also publish each page's raw Markdown (/page.md) and an llms.txt index, for tools and LLMs.
  buildEnd(site) {
    const out = site.outDir
    const lines = ['# PodTorrent Docs', '', '> Use the PodTorrent API, or run a node on the network.', '']
    for (const g of summary) {
      if (g.text) lines.push(`## ${g.text}`, '')
      for (const p of g.pages) {
        const dest = join(out, p.file)
        mkdirSync(dirname(dest), { recursive: true })
        copyFileSync(join(root, p.file), dest)
        lines.push(`${'  '.repeat(p.depth)}- [${p.title}](${SITE}/${p.file})`)
      }
      lines.push('')
    }
    writeFileSync(join(out, 'llms.txt'), lines.join('\n'))
  },
})
