// import axios from 'axios'
import axios from '@/lib/axios'

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const res = await axios.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data.imageUrl
}
