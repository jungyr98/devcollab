<template>
  <div class="card">
    <h2 class="title">
      <a
        :href="news.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-lg font-bold mb-2 underline text-white"
      >
        {{ news.title }}
      </a>
    </h2>

    <p v-if="news.summary" class="text-sm mb-3">{{ news.summary }}</p>
    <p v-else-if="news.description" class="summary">{{ news.description }}</p>

    <div class="text-xs text-gray-500 flex items-center gap-1">
      <span class="source">출처: {{ news.source }}</span>
      <span class="dot">·</span>
      <span class="date">{{ formatDate(news.createdAt) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '@/types/news'

defineProps<{
  news: NewsItem
}>()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped lang="postcss">
.card {
  @apply border rounded-xl p-4 shadow-sm bg-white transition hover:shadow-md;
}

.summary {
  @apply text-sm text-gray-800 mb-3;
}
.meta {
  @apply text-xs text-gray-500 flex items-center gap-1;
}
.source {
  @apply font-medium;
}
.dot::before {
  content: '•';
}
</style>
