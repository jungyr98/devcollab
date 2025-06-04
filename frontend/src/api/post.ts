import axios from '@/lib/axios'

export const fetchPosts = async (data: { page: number; limit: number; keyword: string }) => {
  const res = await axios.get(`/post?page=${data.page}&limit=${data.limit}&keyword=${data.keyword}`)
  return res
}

export const createPost = async (data: { title: string; content: string }) => {
  const res = await axios.post('/post', data)
  return res
}

export const getPost = async (id: number) => {
  const res = await axios.get(`/post/${id}`)
  return res.data
}

export const updatePostById = async (id: number, data: any) => {
  const res = await axios.patch(`/post/${id}`, data, {})
  return res
}

export const deletePostById = async (id: number) => {
  const res = await axios.delete(`/post/${id}`, {})
  return res
}

export const commentsByPostId = async (postId: number) => {
  const res = await axios.get(`/posts/${postId}/comments`)
  return res.data
}

export const createComment = async (postId: number, content: string) => {
  const response = await axios.post(`/posts/${postId}/comments`, { content: content })
  return response.data
}

export const updateComment = async (commentId: number, content: string) => {
  const res = await axios.patch(`/comment/${commentId}`, { content })
  return res.data
}

export const deleteComment = async (commentId: number) => {
  const res = await axios.delete(`/comment/${commentId}`)
  return res.data
}
