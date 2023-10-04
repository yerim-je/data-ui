import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/Info',
      name: 'Info',
      component: () => import('../views/Info.vue')
    },
    {
      path:'/RecHistory',
      name:'RecHistory',
      component: () => import('../views/RecHistory.vue')
    },
    {
      path:'/Mark',
      name:'Mark',
      component: () => import('../views/Mark.vue')
    },
    {
      path:'/Like',
      name:'Like',
      component: () => import('../views/Like.vue')
    },
    {
      path:'/Rwrite',
      name:'Rwrite',
      component: () => import('../views/Rwrite.vue')
    },
    {
      path:'/ReviewBoard',
      name:'ReviewBoard',
      component: () => import('../views/ReviewBoard.vue')
    },
    {
      path:'/Rread',
      name:'Rread',
      component: () => import('../views/Rread.vue')
    },
    {
      path:'/MyReview',
      name:'MyReview',
      component: () => import('../views/MyReview.vue')
    },
    {
      path:'/Siren',
      name:'Siren',
      component: () => import('../views/SirenPop.vue')
    }
  ]
})

export default router
