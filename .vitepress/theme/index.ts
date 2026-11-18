import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PtTabs from './PtTabs.vue'
import PtTab from './PtTab.vue'
import Mermaid from './Mermaid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PtTabs', PtTabs)
    app.component('PtTab', PtTab)
    app.component('Mermaid', Mermaid)
  },
} satisfies Theme
