<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="제목" />
    <textarea v-model="content" placeholder="내용"></textarea>
    <button type="submit">수정 완료</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPost, updatePostById } from '@/api/post'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const title = ref('')
const content = ref('')
const userStore = useUserStore()

onMounted(async () => {
  const post = await getPost(Number(route.params.id))
  title.value = post.title
  content.value = post.content
})

const submit = async () => {
  await updatePostById(
    Number(route.params.id),
    {
      title: title.value,
      content: content.value,
    },
    userStore.token,
  )

  router.push(`/post/${route.params.id}`)
}
</script>
