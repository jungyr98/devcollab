<template>
  <form @submit.prevent="handleRegister">
    <input v-model="username" placeholder="Username" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { register } from '@/api/auth'

const username = ref('')
const email = ref('')
const password = ref('')

const userStore = useUserStore()

const handleRegister = async () => {
  try {
    const { user, access_token } = await register(username.value, email.value, password.value)
    userStore.setUser(user, access_token)
    // 예: router.push('/') 또는 알림 표시
    alert('가입 완료! 로그인 해주세요.')
    router.push('/auth/login')
  } catch (error) {
    console.error('회원가입 실패:', error)
  }
}
</script>
