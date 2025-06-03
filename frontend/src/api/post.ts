// src/api/post.ts
import axios from '@/lib/axios'

export const fetchPosts = async () => {
  const res = await axios.get('/post')
  return res.data
}

export const createPost = async (data: { title: string; content: string }) => {
  const res = await axios.post('/post', data)
  return res.data
}

export const getPost = async (id: number) => {
  const res = await axios.get(`/post/${id}`)
  return res.data
}

export const updatePostById = async (id: number, data: any) => {
  const res = axios.patch(`/post/${id}`, data, {})
  return res
}

export const deletePostById = async (id: number) => {
  const res = axios.delete(`/post/${id}`, {})
  return res
}
