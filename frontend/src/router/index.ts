import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
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
      path: '/post',
      name: 'Post',
      component: () => import('@/views/PostList.vue'),
    },
    {
      path: '/post/:id',
      name: 'PostDetail',
      component: () => import('@/views/PostDetail.vue'),
    },
    {
      path: '/post/:id/edit',
      name: 'PostEdit',
      component: () => import('@/views/PostEdit.vue'),
    },
  ],
})

export default router
