<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/post'
import { useLoadingStore } from '@/stores/loading'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import { uploadImage } from '@/api/upload'
import SearchSkillBar from '@/components/SearchSkillBar.vue'
import { Github, Link, Pencil } from 'lucide-vue-next'
import BaseInput from '@/components/BaseInput.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import BaseInputWithIcon from '@/components/BaseInputWithIcon.vue'

type Skill = { id: number; name: string }

const title = ref('')
const content = ref('')
const router = useRouter()
const loading = useLoadingStore()
const toast = useToast()
const imageUrl = ref('')
const gitHubLink = ref('')
const serviceLink = ref('')
const selectedSkills = ref<Skill[]>([])
const selectedSkillIds = computed(() => selectedSkills.value.map((skill) => skill.id))

const submit = async () => {
  if (confirm('등록하시겠습니까?')) {
    loading.start()
    try {
      await createPost({
        title: title.value,
        content: content.value,
        gitHubLink: gitHubLink.value,
        serviceLink: serviceLink.value,
      })
      toast.success('등록되었습니다.')
      router.push('/post')
    } catch (err: any) {
      toast.error('오류가 발생했습니다.')
      console.error(err.response?.data?.message)
    } finally {
      loading.stop()
    }
  }
}

const onList = () => {
  if (confirm('입력한 정보는 저장되지 않습니다.')) {
    router.push('/post')
  }
}

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    try {
      console.log('file', file)
      const url = await uploadImage(file)
      imageUrl.value = url
    } catch (err) {
      console.error('이미지 업로드 실패', err)
    }
  }
}
</script>

<template>
  <div>
    <BaseCard>
      <h2 class="flex items-center text-2xl font-bold mb-4">
        나의 사이드 프로젝트 정보 <Pencil class="ml-3" />
      </h2>
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
      <!-- <input type="file" @change="onFileChange" /> -->
      <!-- Button -->
      <div class="flex justify-between py-2 mt-5">
        <div></div>
        <div class="flex justify-between w-62">
          <BaseButton label="저장" type="submit" @click="submit" :loading="loading.isLoading" />
          <BaseButton label="목록" type="submit" @click="onList" :loading="loading.isLoading" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>
