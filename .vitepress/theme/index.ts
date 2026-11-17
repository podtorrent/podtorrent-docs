import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import PtTabs from './PtTabs.vue'
import PtTab from './PtTab.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PtTabs', PtTabs)
    app.component('PtTab', PtTab)
  },
} satisfies Theme
