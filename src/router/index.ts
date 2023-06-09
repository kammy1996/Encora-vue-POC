import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ManageQuiz from '@/components/ManageQuiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/manage',
      name: 'ManageQuiz',
      component: ManageQuiz
    },
    {
      path: '/manage/:id',
      name: 'EditQuiz',
      component: ManageQuiz
    },
  ]
})

export default router
