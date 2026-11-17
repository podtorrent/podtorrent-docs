<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
defineProps<{ index: number }>()
const active = inject<Ref<number>>('pt-tab-active', ref(0))
</script>

<template>
  <div v-show="active === index" role="tabpanel"><slot /></div>
</template>
