<script setup lang="ts">
import { provide, ref } from 'vue'
defineProps<{ titles: string[] }>()
const active = ref(0)
provide('pt-tab-active', active)
</script>

<template>
  <div class="pt-tabs">
    <div class="pt-tabs-bar" role="tablist">
      <button
        v-for="(t, i) in titles" :key="t" type="button" role="tab"
        :aria-selected="active === i" :class="{ active: active === i }" @click="active = i"
      >{{ t }}</button>
    </div>
    <div class="pt-tabs-body"><slot /></div>
  </div>
</template>

<style scoped>
.pt-tabs { margin: 16px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; }
.pt-tabs-bar { display: flex; flex-wrap: wrap; gap: 4px; padding: 0 12px; background: var(--vp-c-bg-soft); border-bottom: 1px solid var(--vp-c-divider); }
.pt-tabs-bar button { padding: 10px 8px; font-size: 14px; font-weight: 500; color: var(--vp-c-text-2); border-bottom: 2px solid transparent; }
.pt-tabs-bar button:hover { color: var(--vp-c-text-1); }
.pt-tabs-bar button.active { color: var(--vp-c-brand-1); border-bottom-color: var(--vp-c-brand-1); }
.pt-tabs-body { padding: 0 16px; }
</style>
