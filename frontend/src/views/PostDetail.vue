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
import { Github, Link } from 'lucide-vue-next'
import BaseTag from '@/components/BaseTag.vue'
import BaseLabel from '@/components/BaseLabel.vue'

type Skill = { id: number; name: string }

interface Post {
  id: number
  title: string
  content: string
  authorId: string
  gitHubLink: string
  serviceLink: string
  skills: Skill[]
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

// 목록 이동
const onList = () => {
  router.push('/post')
}

onMounted(async () => {
  loadData()
})
</script>

<template>
  <div v-if="post">
    <BaseCard>
      <h2 class="flex items-center text-2xl font-bold mb-4">
        {{ post.title }}
      </h2>
      <BaseLabel title="프로젝트 설명" />
      <div class="min-h-48 p-2 mb-4 leading-8 whitespace-pre">{{ post.content }}</div>
      <BaseLabel title="관련 링크" />
      <div class="flex justify-between min-h-10">
        <p v-if="post.gitHubLink === null && post.serviceLink === null">-</p>
        <div v-if="post.gitHubLink !== null" class="flex mt-2 mb-4 w-49/100">
          <Github class="mr-2" /> {{ post.gitHubLink ?? '-' }}
        </div>
        <div v-if="post.serviceLink !== null" class="flex mt-2 mb-4 w-49/100">
          <Link class="mr-2" /> {{ post.serviceLink ?? '-' }}
        </div>
      </div>
      <BaseLabel title="스킬 태그" />
      <div class="py-1">
        <!-- Tag -->
        <BaseTag v-for="skill in post.skills" :content="skill.name" />
      </div>
      <p>작성자: {{ post.authorId }}</p>

      <div
        v-if="userStore.user?.id === Number(post.authorId)"
        class="flex justify-between py-2 mt-5"
      >
        <div></div>
        <div class="flex justify-between w-93">
          <BaseButton label="수정" @click="goToEdit" />
          <BaseButton label="삭제" @click="deletePost" />
          <BaseButton label="목록" @click="onList" />
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
        <div class="flex justify-between py-2 mt-5">
          <div></div>
          <div class="flex justify-between">
            <BaseButton label="댓글 작성" @click="handleCommentSubmit" />
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
