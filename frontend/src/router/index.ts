import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import PostList from '@/views/PostList.vue'
import PostForm from '@/views/PostForm.vue'
import PostDetail from '@/views/PostDetail.vue'
import PostEdit from '@/views/PostEdit.vue'
import LoginView from '@/views/LoginView.vue'
import NewsList from '@/views/NewsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: 'home',
          component: HomeView,
        },
        {
          path: 'post',
          component: PostList,
        },
        {
          path: 'post/insert',
          component: PostForm,
        },
        {
          path: 'post/:id',
          component: PostDetail,
        },
        {
          path: 'post/:id/edit',
          component: PostEdit,
        },
        {
          path: 'news',
          component: NewsList,
        },
      ],
    },
  ],
})

export default router
