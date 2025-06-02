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
  await axios.patch(`/post/${id}`, data, {})
}

export const deletePostById = async (id: number) => {
  await axios.delete(`/post/${id}`, {})
}
