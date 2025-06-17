<template>
  <div class="p-4 space-y-4">
    <input
      v-model="search"
      @input="loadNews"
      placeholder="검색어 입력"
      class="border p-2 w-full rounded"
    />

    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in availableSources"
        :key="tag"
        @click="setTag(tag)"
        :class="[
          'px-3 py-1 rounded transition',
          selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700',
        ]"
      >
        {{ tag }}
      </button>
    </div>

    <div v-if="newsList.length === 0" class="text-gray-500">뉴스가 없습니다.</div>
    <NewsCard v-for="news in newsList" :key="news.id" :news="news" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '@/stores/newsStore'
import { storeToRefs } from 'pinia'
import NewsCard from '@/components/NewsCard.vue'

// 핀리아 store
const newsStore = useNewsStore()
const { selectedTag, newsList, search } = storeToRefs(newsStore)
const { loadNews } = newsStore

// source(출처) 기반 필터링용 버튼 리스트
const availableSources = ['dev.to', 'medium', 'velog', 'zenn'] // 실제 수집 소스 기준으로 업데이트 가능

onMounted(() => {
  loadNews()
})

function setTag(tag: string) {
  selectedTag.value = selectedTag.value === tag ? null : tag
  console.log('tag', tag)
  console.log('selectedTag', selectedTag)
  loadNews()
}
</script>
