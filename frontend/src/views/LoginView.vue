<template>
  <div class="w-full flex flex-wrap-reverse justify-center lg:p-40 p-8">
    <!-- Left box -->
    <div class="lg:w-3/5 flex flex-col p-5 w-6/7">
      <!-- Title Box -->
      <div class="">
        <HelloWorld msg="Dev Collaboration." />
        <nav>
          <RouterLink to="/">Join</RouterLink>
          <RouterLink to="https://github.com/jungyr98/devcollab">GitHub</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
      <!-- Login Box -->
      <div class="lg:w-3/5 h-64 justify-center">
        <h1 class="text-2xl font-bold lg:text-left text-center mt-5">Log in</h1>
        <!-- Login Form Box -->
        <form @submit.prevent="submit" class="mt-5">
          <div class="relative mb-2">
            <UserRound class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="email"
              placeholder="Email"
              class="w-full pl-10 pr-4 py-2 border rounded-lg placeholder:text-shadow-white"
            />
          </div>
          <div class="relative mb-2">
            <LockKeyhole class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full pl-10 pr-4 py-2 border rounded-lg placeholder:text-shadow-white"
            />
          </div>
          <div class="flex flex-col items-center">
            <LoginButton label="Log in" type="submit" :loading="loading.isLoading" />
            <SignInGoogleButton />
          </div>
        </form>
      </div>
    </div>
    <!-- Right Box -->
    <div class="w-2/5 lg:flex flex-col justify-center hidden">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/development-main_640.png"
        width="400"
        height="400"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { useLoadingStore } from '@/stores/loading'
import HelloWorld from '@/components/HelloWorld.vue'
import LoginButton from '@/components/LoginButton.vue'
import SignInGoogleButton from '@/components/SignInGoogleButton.vue'
import { UserRound, LockKeyhole } from 'lucide-vue-next'

const toast = useToast()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const router = useRouter()
const loading = useLoadingStore()

const submit = async () => {
  try {
    loading.start()
    const { data } = await login({ email: email.value, password: password.value })
    // 토큰 및 사용자 정보 설정
    userStore.setUser(data.access_token, {
      id: data.userInfo.id,
      email: data.userInfo.email,
      username: data.userInfo.username,
    })
    toast.success('로그인되었습니다.')
    router.push('/post')
  } catch (err: any) {
    toast.error(err.response?.data?.message)
    console.error(err)
  } finally {
    loading.stop()
  }
}
</script>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
