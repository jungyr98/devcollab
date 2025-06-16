<template>
  <BaseCard>
    <h2 class="flex items-center text-2xl font-bold mb-4">
      나의 사이드 프로젝트 정보 <Pencil class="ml-3" />
    </h2>
    <form @submit.prevent="submit">
      <BaseLabel title="프로젝트명" />
      <BaseInput v-model="title" placeholder="프로젝트명" type="text" />
      <BaseLabel title="프로젝트 설명" />
      <BaseTextArea v-model="content" placeholder="프로젝트 설명" />
      <BaseLabel title="관련 링크" />
      <div class="flex justify-between">
        <BaseInputWithIcon v-model="gitHubLink" placeholder="GitHub URL">
          <template #icon>
            <Github class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </template>
        </BaseInputWithIcon>
        <BaseInputWithIcon v-model="serviceLink" placeholder="서비스 URL">
          <template #icon>
            <Link class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </template>
        </BaseInputWithIcon>
      </div>
      <BaseLabel title="스킬 태그" class="mb-2" />
      <SearchSkillBar v-model="selectedSkills" />
      <!-- Button -->
      <div class="flex justify-between py-2 mt-5">
        <div></div>
        <div class="flex justify-between w-62">
          <BaseButton label="저장" type="submit" @click="submit" />
          <BaseButton label="취소" type="submit" @click="onDetail" />
        </div>
      </div>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPost, updatePostById } from '@/api/post'
import SearchSkillBar from '@/components/SearchSkillBar.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import BaseInputWithIcon from '@/components/BaseInputWithIcon.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Github, Link, Pencil } from 'lucide-vue-next'
import BaseCard from '@/components/BaseCard.vue'

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
  selectedSkills.value = post.skills
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

// 수정 취소
const onDetail = () => {
  if (confirm('수정을 취소하시겠습니까?')) {
    router.push(`/post/${route.params.id}`)
  }
}
</script>
