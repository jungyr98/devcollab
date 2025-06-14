import axios from '@/lib/axios'

export const fetchSkills = async () => {
  const res = await axios.get(`/skills`)
  return res
}
