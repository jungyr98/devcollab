import axios from 'axios'

// 백엔드 API URL
const API_URL = axios.create({ baseURL: 'http://localhost:3000' })

/* 회원가입 */
export async function register(username: string, email: string, password: string) {
  const response = await API_URL.post('/users/register', {
    username,
    email,
    password,
  })
  return response.data
}

/* 로그인 */
export const login = (data: { email: string; password: string }) =>
  API_URL.post('/auth/login', data)

export const getProfile = () =>
  API_URL.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
