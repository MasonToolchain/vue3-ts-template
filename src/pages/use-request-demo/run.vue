<template>
  <div>
    <h1>创建 Demo</h1>
    <input v-model="title" placeholder="标题" />
    <input v-model="content" placeholder="内容" />
    <button @click="handleCreate" :disabled="loading">
      {{ loading ? '创建中...' : '创建' }}
    </button>

    <div v-if="error">错误: {{ error.message }}</div>

    <div v-if="data">创建成功: {{ data.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from '@/hooks/use-request'
import { demoService } from '@/services/demo-service'
import type { Demo } from '@/services/demo-service'

const title = ref('')
const content = ref('')

const { data, loading, error, run } = useRequest(
  (payload: Partial<Demo>) => demoService.create(payload),
  {
    auto: false,
  },
)

const handleCreate = async () => {
  await run({
    title: title.value,
    content: content.value,
    author: 'test',
    status: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })
}
</script>
