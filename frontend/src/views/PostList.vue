<script setup lang="ts">
import { onMounted, ref, watchEffect, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import Pagination from '@/components/Pagination.vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'
import { fetchPosts } from '@/api/post'
import MenuDescription from '@/components/MenuDescription.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTag from '@/components/BaseTag.vue'
import { Github, Link } from 'lucide-vue-next'

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  gitHubLink: string
  serviceLink: string
  createdAt: Date
  userInfo: any
}

const route = useRoute()
const router = useRouter()
const toast = useToast()
const posts = ref<Post[]>([])
const total = ref(0)
const limit = 10

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
    <div class="flex justify-end">
      <SearchBar v-model="keyword" @submit="onList" />
    </div>
    <!-- 목록 -->
    <div class="">
      <table class="w-full text-white text-md text-center lh">
        <thead>
          <tr class="hidden">
            <th>No.</th>
            <th>카테고리</th>
            <th>스킬 태그</th>
            <th>프로젝트명</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="cursor-pointer">
            <td colspan="6" @click="router.push(`/post/${post.id}`)">
              <div class="flex p-5 rounded-xl mb-3 shadow hover:shadow-md vue-background-mid">
                <!-- Title / Tag-->
                <div class="flex flex-4/5 flex-col items-baseline">
                  <p class="text-lg">
                    {{ post.title }}
                  </p>
                  <!-- Title -->
                  <div class="py-1">
                    <!-- Tag -->
                    <BaseTag content="Java" />
                    <BaseTag content="Spring Boot" />
                    <BaseTag content="React" />
                  </div>
                </div>
                <!-- GitHub / Link 포함 여부 -->
                <div class="flex w-14 justify-between">
                  <Github :class="[post.gitHubLink === null && 'text-gray-600']" />
                  <Link :class="[post.serviceLink === null && 'text-gray-600']" />
                </div>
                <!-- Author Name -->
                <div class="flex flex-1/10 flex-col items-end pr-3">
                  <p class="text-lg">{{ post.userInfo.username }}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <Pagination v-model="page" :total="total" :limit="limit" />
  </div>
</template>
