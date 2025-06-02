<!-- src/components/LogoutButton.vue -->
<template>
  <button @click="logout">로그아웃</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const logout = () => {
  store.logout()
  window.location.href = '/login' // 로그아웃 후 리다이렉트
}
</script>
