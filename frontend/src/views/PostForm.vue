<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/api/post'
import { useLoadingStore } from '@/stores/loading'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import { uploadImage } from '@/api/upload'

const title = ref('')
const content = ref('')
const router = useRouter()
const loading = useLoadingStore()
const toast = useToast()
const imageUrl = ref('')

const submit = async () => {
  if (confirm('등록하시겠습니까?')) {
    loading.start()
    try {
      await createPost({ title: title.value, content: content.value })
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
      <h2>게시글 작성</h2>
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요"
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        v-model="content"
        placeholder="내용을 입력하세요"
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>
      <input type="file" @change="onFileChange" />
      <BaseButton label="등록" type="submit" @click="submit" :loading="loading.isLoading" />
    </BaseCard>
  </div>
</template>
