<template>
  <form @submit.prevent="submit">
    <input v-model="title" placeholder="제목" />
    <input v-model="gitHubLink" placeholder="GitHub Link" />
    <input v-model="serviceLink" placeholder="Service Link" />
    <textarea v-model="content" placeholder="내용"></textarea>
    <SearchSkillBar v-model="selectedSkills" />
    <button type="submit">수정 완료</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPost, updatePostById } from '@/api/post'
import SearchSkillBar from '@/components/SearchSkillBar.vue'

type Skill = { id: number; name: string }

const route = useRoute()
const router = useRouter()
const title = ref('')
const content = ref('')
const gitHubLink = ref('')
const serviceLink = ref('')
const selectedSkills = ref<Skill[]>([])
const selectedSkillIds = computed(() => selectedSkills.value.map((skill) => skill.id))

onMounted(async () => {
  const post = await getPost(Number(route.params.id))
  title.value = post.title
  content.value = post.content
  gitHubLink.value = post.gitHubLink
  serviceLink.value = post.serviceLink
})

const submit = async () => {
  console.log('skillArray:', selectedSkillIds.value)
  if (!confirm('수정하시겠습니까?')) return false

  const res = await updatePostById(Number(route.params.id), {
    title: title.value,
    content: content.value,
    gitHubLink: gitHubLink.value,
    serviceLink: serviceLink.value,
    tagGroup: selectedSkillIds.value,
  })

  alert('수정되었습니다.')
  router.push(`/post/${route.params.id}`)
}
</script>
