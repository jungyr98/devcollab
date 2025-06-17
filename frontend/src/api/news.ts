import axios from '@/lib/axios'
import type { NewsItem } from '@/types/news'

export async function fetchNews(params: { search?: string; tag?: string }): Promise<NewsItem[]> {
  const response = await axios.get('/news', { params })
  return response.data
}
