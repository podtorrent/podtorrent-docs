// Reads SUMMARY.md (the table of contents, same format GitBook used) so it stays
// the one place that orders pages. `## Heading` starts a sidebar group, `* [Title](path.md)`
// adds a page, and indenting by two spaces nests a page under the one above.
import { readFileSync } from 'node:fs'
import type { DefaultTheme } from 'vitepress'

export interface Page { title: string; file: string; link: string; depth: number }

export function mdToLink(file: string): string {
  if (file === 'README.md') return '/'
  if (file.endsWith('/README.md')) return '/' + file.slice(0, -'README.md'.length)
  return '/' + file.replace(/\.md$/, '')
}

export function readSummary(path: string) {
  const groups: { text: string; pages: Page[] }[] = [{ text: '', pages: [] }]
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const heading = line.match(/^##\s+(.+)/)
    if (heading) { groups.push({ text: heading[1].trim(), pages: [] }); continue }
    const item = line.match(/^(\s*)[*-]\s+\[(.+?)\]\((.+?)\)/)
    if (item) {
      groups[groups.length - 1].pages.push({
        title: item[2], file: item[3], link: mdToLink(item[3]), depth: Math.floor(item[1].length / 2),
      })
    }
  }
  return groups.filter((g) => g.pages.length)
}

export function sidebarFrom(groups: ReturnType<typeof readSummary>): DefaultTheme.SidebarItem[] {
  return groups.map((g) => {
    const root: DefaultTheme.SidebarItem[] = []
    const stack: DefaultTheme.SidebarItem[] = []
    for (const p of g.pages) {
      const entry: DefaultTheme.SidebarItem = { text: p.title, link: p.link }
      stack.length = p.depth
      const parent = stack[p.depth - 1]
      if (parent) { (parent.items ??= []).push(entry); parent.collapsed ??= true } else root.push(entry)
      stack[p.depth] = entry
    }
    return g.text ? { text: g.text, items: root } : { items: root }
  })
}
