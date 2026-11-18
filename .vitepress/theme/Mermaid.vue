<script setup lang="ts">
// Renders a ```mermaid block (see mermaidFence in ../mermaid.ts) in the browser.
// mermaid is loaded lazily, only on pages that have a diagram, and redraws on theme change.
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const svg = ref('')
const failed = ref(false)
let seq = 0

async function render() {
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: isDark.value ? 'dark' : 'default' })
  try {
    const id = `mermaid-${Math.random().toString(36).slice(2)}-${seq++}`
    svg.value = (await mermaid.render(id, decodeURIComponent(props.code))).svg
    failed.value = false
  } catch (e) {
    console.error('mermaid render failed', e)
    failed.value = true
  }
}

onMounted(render)
watch(isDark, render)
</script>

<template>
  <div v-if="svg && !failed" class="pt-mermaid" v-html="svg" />
  <pre v-else class="pt-mermaid-src"><code>{{ decodeURIComponent(code) }}</code></pre>
</template>

<style scoped>
.pt-mermaid {
  margin: 16px 0;
  overflow-x: auto;
  text-align: center;
}
.pt-mermaid :deep(svg) {
  max-width: 100%;
  height: auto;
}
.pt-mermaid-src {
  white-space: pre-wrap;
  font-size: 13px;
}
</style>
