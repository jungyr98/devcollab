<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const useStore = useUserStore()
const router = useRouter()

const onLogout = () => {
  if (confirm('로그아웃하시겠습니까?')) {
    useStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <header class="p-4 shadow-md bg-custom">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
      <h1 class="green text-xl font-bold">DevCollab</h1>
      <div>
        <nav class="flex gap-7">
          <RouterLink to="/home" class="text-white"><House />홈</RouterLink>
          <RouterLink to="/post" class="text-white"><ClipboardPenLine />프로젝트</RouterLink>
          <RouterLink to="/" class="text-white"><UserRound />트러블슈팅</RouterLink>
          <RouterLink to="/" class="text-white"><UserRound />News</RouterLink>
          <RouterLink to="/" class="text-white"><UserRound />내 정보</RouterLink>
        </nav>
      </div>
      <div>
        <button @click="onLogout" class="px-3 py-1 rounded hover:bg-gray-100 text-sm">
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>
