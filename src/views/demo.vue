<template>
  <div class="demo">
    <h2>Pinia 测试</h2>
    <h3>计数器: {{ counter }}</h3>
    <button @click="demoStore.increment()">点击+1</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDemoStore } from '@/stores/modules/demo'

const demoStore = useDemoStore()

const { counter } = storeToRefs(demoStore)
</script>
