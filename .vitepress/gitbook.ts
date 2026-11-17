// The pages still use GitBook's block syntax. Rewrite it before markdown parsing:
//   {% hint style="info|warning|danger|success" %} … {% endhint %}  -> ::: info … :::
//   {% tabs %}{% tab title="X" %} … {% endtab %}{% endtabs %}       -> <PtTabs>/<PtTab> (theme/PtTabs.vue)
import type MarkdownIt from 'markdown-it'

const HINT: Record<string, string> = { info: 'info', success: 'tip', warning: 'warning', danger: 'danger' }

export function convertGitbook(src: string): string {
  src = src
    .replace(/\{%\s*hint\s+style="(\w+)"\s*%\}/g, (_, s) => `::: ${HINT[s] ?? 'info'}`)
    .replace(/\{%\s*endhint\s*%\}/g, ':::')

  return src.replace(/\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g, (_, body: string) => {
    const tabs = [...body.matchAll(/\{%\s*tab\s+title="([^"]*)"\s*%\}([\s\S]*?)\{%\s*endtab\s*%\}/g)]
    const titles = JSON.stringify(tabs.map((t) => t[1])).replace(/'/g, '&#39;')
    const panes = tabs.map((t, i) => `<PtTab :index="${i}">\n\n${t[2].trim()}\n\n</PtTab>`).join('\n')
    return `<PtTabs :titles='${titles}'>\n${panes}\n</PtTabs>`
  })
}

export function gitbookSyntax(md: MarkdownIt) {
  md.core.ruler.before('normalize', 'gitbook-syntax', (state) => {
    state.src = convertGitbook(state.src)
  })
}
