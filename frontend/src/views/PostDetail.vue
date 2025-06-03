<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getPost,
  deletePostById,
  commentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} from '@/api/post'
import { useUserStore } from '@/stores/user'

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  createdAt: Date
}

interface Comment {
  id: number
  content: string
  createdAt: Date
  user: any
  post: Post
}

const route = useRoute()
const router = useRouter()
const post = ref<Post>()
const comments = ref<Comment[]>([])
const newComment = ref('')
const editingCommentId = ref<number | null>(null)
const editedCommentContent = ref('')
const userStore = useUserStore()

const loadData = async () => {
  const id = Number(route.params.id)
  post.value = await getPost(id)
  comments.value = await commentsByPostId(id)
}

const goToEdit = () => {
  router.push(`/post/${route.params.id}/edit`)
}

const deletePost = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await deletePostById(Number(route.params.id))
    router.push('/post')
  }
}

const handleCommentSubmit = async () => {
  if (!newComment.value.trim()) return
  const postId = Number(route.params.id)
  await createComment(postId, newComment.value)
  newComment.value = ''
  await loadData()
}

const startEdit = (comment: any) => {
  editingCommentId.value = comment.id
  editedCommentContent.value = comment.content
}

const cancelEdit = () => {
  editingCommentId.value = null
  editedCommentContent.value = ''
}

const submitEdit = async (commentId: number) => {
  if (confirm('수정하시겠습니까?')) {
    await updateComment(commentId, editedCommentContent.value)
    await loadData()
    cancelEdit()
  }
}

const deleteCommentById = async (commentId: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await deleteComment(commentId)
    await loadData()
  }
}

onMounted(loadData)
</script>

<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>작성자: {{ post.authorId }}</p>

    <div v-if="userStore.user?.id === Number(post.authorId)">
      <div>
        <button @click="goToEdit">수정</button>
        <button @click="deletePost">삭제</button>
      </div>
    </div>

    <!-- 댓글 목록 -->
    <ul>
      <li v-for="comment in comments" :key="comment.id" class="mb-2">
        <div v-if="editingCommentId === comment.id">
          <textarea v-model="editedCommentContent" class="w-full border p-2"></textarea>
          <div class="mt-1">
            <button @click="submitEdit(comment.id)" class="text-blue-500">저장</button>
            <button @click="cancelEdit" class="ml-2 text-gray-500">취소</button>
          </div>
        </div>
        <div v-else>
          <p>{{ comment.content }} - {{ comment.user.username }}</p>
          <div v-if="comment.user.id === userStore.user?.id" class="text-sm mt-1">
            <button @click="startEdit(comment)" class="text-blue-500">수정</button>
            <button @click="deleteCommentById(comment.id)" class="ml-2 text-red-500">삭제</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
