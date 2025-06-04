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
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import { useToast } from 'vue-toastification'
import { useLoadingStore } from '@/stores/loading'

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
const loading = useLoadingStore()
const toast = useToast()

const loadData = async () => {
  const id = Number(route.params.id)
  post.value = await getPost(id)
  comments.value = await commentsByPostId(id)
}

// 게시글 수정 화면 이동
const goToEdit = () => {
  router.push(`/post/${route.params.id}/edit`)
}

// 게시글 삭제 처리
const deletePost = async () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    loading.start()
    try {
      await deletePostById(Number(route.params.id))
      toast.success('삭제되었습니다.')
      router.push('/post')
    } catch (err: any) {
      toast.error('오류가 발생했습니다.')
      console.error(err.response?.data?.message)
    } finally {
      loading.stop()
    }
  }
}

// 댓글 등록 처리
const handleCommentSubmit = async () => {
  if (!newComment.value.trim()) {
    toast.error('내용을 입력해주세요.')
    return
  }

  loading.start()
  const postId = Number(route.params.id)
  try {
    await createComment(postId, newComment.value)
    newComment.value = ''
    await loadData()
  } catch (err: any) {
    toast.error('오류가 발생했습니다.')
    console.error(err.response?.data?.message)
  } finally {
    loading.stop()
  }
}

// 댓글 수정 버튼
const startEdit = (comment: any) => {
  editingCommentId.value = comment.id
  editedCommentContent.value = comment.content
}

// 댓글 수정 취소
const cancelEdit = () => {
  editingCommentId.value = null
  editedCommentContent.value = ''
}

// 댓글 수정 처리
const submitEdit = async (commentId: number) => {
  if (confirm('수정하시겠습니까?')) {
    await updateComment(commentId, editedCommentContent.value)
    await loadData()
    cancelEdit()
  }
}

// 댓글 삭제 처리
const deleteCommentById = async (commentId: number) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    await deleteComment(commentId)
    await loadData()
  }
}

onMounted(async () => {
  loadData()
})
</script>

<template>
  <div v-if="post">
    <BaseCard>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <p>작성자: {{ post.authorId }}</p>

      <div v-if="userStore.user?.id === Number(post.authorId)">
        <div>
          <BaseButton label="수정" @click="goToEdit" />
          <BaseButton label="삭제" @click="deletePost" />
        </div>
      </div>
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
      <div class="mt-4">
        <textarea v-model="newComment" rows="3" class="w-full p-2 border rounded"></textarea>
        <BaseButton label="댓글 작성" @click="handleCommentSubmit" />
      </div>
    </BaseCard>
  </div>
</template>
