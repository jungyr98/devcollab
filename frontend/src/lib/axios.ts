import axios from 'axios'
import { useUserStore } from '@/stores/user'

const instance = axios.create({
  baseURL: 'http://localhost:3000', // NestJS 백엔드 주소
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청마다 토큰이 있으면 Authorization 헤더에 자동으로 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 인증 실패 시 자동 로그아웃
      const store = useUserStore()
      store.logout()

      // 예: 로그인 페이지로 리다이렉트
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default instance
