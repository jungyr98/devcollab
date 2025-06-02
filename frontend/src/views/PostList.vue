<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchPosts } from '@/api/post'

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  createdAt: Date
}

const posts = ref<Post[]>([])

onMounted(async () => {
  posts.value = await fetchPosts()
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">게시글 목록</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post/${post.id}`" class="text-blue-600 hover:underline">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
