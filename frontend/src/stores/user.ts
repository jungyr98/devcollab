import { defineStore } from 'pinia'
import { ref } from 'vue'

// 사용자 관련 상태
export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = ref(!!token.value)

  // 토큰 세팅
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    isAuthenticated.value = true
  }

  // 로그아웃
  const logout = () => {
    token.value = ''
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  return { token, isAuthenticated, setToken, logout }
})
