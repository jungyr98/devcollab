<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPost, deletePostById } from '@/api/post'
import { useUserStore } from '@/stores/user'

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  createdAt: Date
}

const route = useRoute()
const router = useRouter()
const post = ref<Post>()
const userStore = useUserStore()

onMounted(async () => {
  const id = Number(route.params.id)
  post.value = await getPost(id)
})

const goToEdit = () => {
  router.push(`/post/${route.params.id}/edit`)
}

const deletePost = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await deletePostById(Number(route.params.id))
    router.push('/post')
  }
}

console.log('userStore', userStore.user?.username)
</script>

<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>작성자: {{ post.authorId }}</p>

    <div v-if="userStore.user?.id === Number(post.authorId)">
      <div>
        <button @click="goToEdit">수정</button>
        <button @click="deletePost">삭제</button>
      </div>
    </div>
  </div>
</template>
