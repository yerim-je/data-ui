import { createRouter, createWebHistory, useRouter } from 'vue-router'
import list from '../views/ReviewBoard.vue';
import  now  from '../data/mNow.json'
import  coming  from '../data/coming.json'
import  topTenList  from '../data/topTenList.json'
import  set  from '../data/set.json'
import audienceNum from '../data/audienceNum.json'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homeView',
      component: () => import('../views/homeView.vue'),
      beforeEnter: async (to, from, next) => {
        if (localStorage.getItem('aud') == null || localStorage.getItem('aud') == "[]") {
          localStorage.setItem('aud', JSON.stringify(audienceNum));
        }
        if (localStorage.getItem('now') == null || localStorage.getItem('now') == "[]") {
          localStorage.setItem('now', JSON.stringify(now));
        }
        if (localStorage.getItem('topTenList') == null || localStorage.getItem('topTenList') == "[]") {
          localStorage.setItem('topTenList', JSON.stringify(topTenList));
        }
        if (localStorage.getItem('coming') == null || localStorage.getItem('coming') == "[]") {
          localStorage.setItem('coming', JSON.stringify(coming));
        }
        if (localStorage.getItem('set') == null || localStorage.getItem('set') == "[]") {
          localStorage.setItem('set', JSON.stringify(set));
        }
        try {
          if (localStorage.getItem('set') == null || localStorage.getItem('set') === "[]") {
            localStorage.setItem('set', JSON.stringify(set));
          }
          next();
        } catch (error) {
          console.error('데이터 저장 중 오류 발생:', error);
        }
      }
    },
    {
      path: '/MovieMain',
      name: 'MovieMain',
      component: () => import('../views/MovieMain.vue'),
      beforeEnter: () => {
        if (localStorage.getItem('now') == null) {
          localStorage.setItem('now', JSON.stringify(now));
        }
        if (localStorage.getItem('topTenList') == null) {
          localStorage.setItem('topTenList', JSON.stringify(topTenList));
        }
      }
    },
    {
      path: '/Mnow',
      name: 'Mnow',
      component: () => import('../views/Mnow.vue'),
      beforeEnter: () => {
        if (localStorage.getItem('now') == null) {
          localStorage.setItem('now', JSON.stringify(now));
        }
      }
    },
    {
      path: '/Mcoming',
      name: 'Mcoming',
      component: () => import('../views/Mcoming.vue'),
      beforeEnter: async () => {
        if (localStorage.getItem('coming') == null) {
          localStorage.setItem('coming', JSON.stringify(coming));
        }
      }
    },
    {
      path: '/Search',
      name: 'MovieSearch',
      component: () => import('../views/MovieSearch.vue')
    },
    {
      path: '/MovieTitle',
      name: 'MovieTitle',
      component: () => import('../views/MovieTitle.vue')
    },
    {
      path: '/ComingMovieTitle',
      name: 'ComingMovieTitle',
      component: () => import('../views/ComingMovieTitle.vue')
    },
    {
      path: '/Info',
      name: 'Info',
      component: () => import('../views/Info.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: '/RecHistory',
      name: 'RecHistory',
      component: () => import('../views/RecHistory.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: '/Mark',
      name: 'Mark',
      component: () => import('../views/Mark.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: '/Like',
      name: 'Like',
      component: () => import('../views/Like.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: '/Rwrite',
      name: 'Rwrite',
      component: () => import('../views/Rwrite.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: '/ReviewBoard',
      name: 'ReviewBoard',
      redirect: '/ReviewBoard/:1',
      component: () => import('../views/ReviewBoard.vue')
    },
    {
      path: '/ReviewBoard/:page',
      name: 'ReviewBoard',
      component: list,
    },
    {
      path: '/Rread',
      name: 'Rread',
      component: () => import('../views/Rread.vue')
    },
    {
      path: '/MyReview',
      name: 'MyReview',
      component: () => import('../views/MyReview.vue')
    },
    {
      path: '/Siren',
      name: 'Siren',
      component: () => import('../views/SirenPop.vue')
    },
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/login.vue')
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import('@/views/SignUp.vue')
    },
    {
      path: "/Aread",
      name: "aread",
      component: () => import('@/views/Aread.vue')
    },
    {
      path: "/Anotice",
      name: "anotice",
      component: () => import('@/views/Anotice.vue')
    },
    {
      path: "/InfoEdit",
      name: "InfoEdit",
      component: () => import('@/views/InfoEdit.vue')
    },
    {
      path: "/If_Eck",
      name: "If_Eck",
      component: () => import('@/views/If_Eck.vue'),
      beforeEnter: (to, from, next) => {
        const sessionStorage = window.sessionStorage;
        if (sessionStorage.getItem('login') === 'false') {
          alert('로그인이 필요합니다.');
          useRouter().push('/login')
        }
        else return next();
      }
    },
    {
      path: "/FindP",
      name: "findp",
      component: () => import('@/views/FindP.vue')
    },
    {
      path: "/FindE",
      name: "finde",
      component: () => import('@/views/FindE.vue')
    },
    {
      path: "/notice",
      name: "notice",
      component: () => import('@/views/notice.vue')
    },
    {
      path: "/NoticeList",
      name: "noticelist",
      component: () => import('@/views/NoticeList.vue')
    },
    {
      path: "/AskMe",
      name: "askme",
      component: () => import('@/views/AskMe.vue')
    },
    {
      path: "/AdSign",
      name: "AdSign",
      component: () => import('@/views/AdSign.vue')
    },
    {
      path: "/AdSiren",
      name: "AdSiren",
      component: () => import('@/views/AdSiren.vue')
    },
    {
      path: "/Adnotice",
      name: "Adnotice",
      component: () => import('@/views/Adnotice.vue')
    },
    {
      path: "/ArWrite",
      name: "ArWrite",
      component: () => import('@/views/ArWrite.vue')
    },
    {
      path: "/AreadTest",
      name: "AreadTest",
      component: () => import('@/views/AreadTest.vue')
    },
    {
      path: "/AdSirenPop",
      name: "AdSirenPop",
      component: () => import('@/views/AdSirenPop.vue')
    },
    {
      path: '/NoticeChoice/:selectedIndex',
      name: 'NoticeChoice',
      component:  () => import('@/views/NoticeChoice.vue')
    },
   

  ]
})

export default router;
