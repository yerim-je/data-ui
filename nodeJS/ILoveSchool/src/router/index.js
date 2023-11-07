import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const sessionStorage = window.sessionStorage;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/msg',
      name: 'msg',
      component: () => import('../views/CelebrationMsg.vue'),
      beforeEnter : (to, from, next) => {
        if( sessionStorage.getItem('user_id') !== null )
          return next();
        alert('로그인하시오')
      }
    }
  ]
})

export default router
