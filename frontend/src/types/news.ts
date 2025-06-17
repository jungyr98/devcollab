export interface NewsItem {
  id: number
  externalId: string
  title: string
  url: string
  description?: string | null
  summary?: string | null
  source: string
  createdAt: string // 또는 Date, 하지만 axios에서 문자열로 받으면 string으로
}
