import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchNews } from '@/api/news'
import type { NewsItem } from '@/types/news'

export const useNewsStore = defineStore('news', () => {
  const newsList = ref<NewsItem[]>([])
  const search = ref('')
  const selectedTag = ref<string | null>(null)

  async function loadNews() {
    newsList.value = await fetchNews({
      search: search.value,
      tag: selectedTag.value || undefined,
    })
  }

  return {
    newsList,
    search,
    selectedTag,
    loadNews,
  }
})
