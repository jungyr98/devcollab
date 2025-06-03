import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  username: string
  email: string
}

// 사용자 관련 상태
export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref<User | null>(null)
  const isAuthenticated = ref(!!token.value)

  // 토큰 및 사용자 정보 설정
  const setUser = (newToken: string, userInfo: User) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    isAuthenticated.value = true
    user.value = userInfo
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  // 사용자 정보 로드 (앱 재시작 시 사용)
  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  // 스토어 생성 시 즉시 실행 (Pinia 새로고침 초기화 이슈 대응)
  loadUserFromStorage()

  // 로그아웃
  const logout = () => {
    token.value = ''
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, isAuthenticated, user, setUser, loadUserFromStorage, logout }
})
