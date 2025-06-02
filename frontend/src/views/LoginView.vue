<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="아이디" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const submit = async () => {
  const { data } = await login({ email: email.value, password: password.value })
  localStorage.setItem('token', data.access_token)
  alert('로그인 성공!')
  console.log('data', data)
  router.push('/post')
}
</script>
