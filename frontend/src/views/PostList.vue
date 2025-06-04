<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import Pagination from '@/components/Pagination.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import { fetchPosts } from '@/api/post'
import MenuDescription from '@/components/MenuDescription.vue'
import BaseButton from '@/components/BaseButton.vue'

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  createdAt: Date
}

const route = useRoute()
const router = useRouter()
const toast = useToast()
const posts = ref<Post[]>([])
const total = ref(0)
const limit = 3

const page = ref(Number(route.query.page) || 1)
const keyword = ref((route.query.keyword as string) || '')

const goToInsert = () => {
  router.push('/post/insert')
}

const onList = async () => {
  try {
    const res = await fetchPosts({
      page: page.value,
      limit,
      keyword: keyword.value,
    })
    posts.value = res.data.items
    total.value = res.data.totalCount
  } catch (err: any) {
    toast.error('게시글을 불러오지 못했습니다.')
    console.error(err.response?.data.message)
  }
}

watch([page], () => {
  onList()
})

// 페이지 변경 감지 → URL 동기화
watchEffect(() => {
  router.push({
    query: {
      ...route.query,
      page: page.value,
      keyword: keyword.value,
    },
  })
})

onMounted(async () => {
  await onList()
})
</script>

<template>
  <div class="space-y-6">
    <!-- 메뉴 상단 소개 -->
    <MenuDescription
      title="Share Your Side Projects, Grow Together."
      content="지금 당신의 열정이 담긴 프로젝트를 소개해보세요."
      ><BaseButton label="새로운 프로젝트 등록하기" type="button" @click="goToInsert"
    /></MenuDescription>
    <!-- 검색창 -->
    <SearchBar v-model="keyword" @submit="onList" />
    <div class="grid gap-4">
      <ul>
        <li
          v-for="post in posts"
          :key="post.id"
          class="p-2 border-b shadow cursor-pointer"
          @click="$router.push(`/post/${post.id}`)"
        >
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p class="text-sm text-gray-600">작성자: {{ post.authorId }}</p>
        </li>
      </ul>
    </div>
    <!-- 페이지네이션 -->
    <Pagination v-model="page" :total="total" :limit="limit" />
  </div>
</template>
