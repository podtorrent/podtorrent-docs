// Turn ```mermaid fences into <Mermaid> (theme/Mermaid.vue), which draws the diagram in the browser.
// The source is URI-encoded so Vue's template compiler leaves it alone.
import type MarkdownIt from 'markdown-it'

export function mermaidFence(md: MarkdownIt) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      return `<Mermaid code="${encodeURIComponent(token.content)}" />\n`
    }
    return fence(tokens, idx, options, env, self)
  }
}
