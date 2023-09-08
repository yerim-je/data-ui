import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: 'AIzaSyD7NLVylDHAQNgmAlQJzLueD1NRl_8iQNY',
  authDomain: 'iloveschool-8077f.firebaseapp.com',
  projectId: 'iloveschool-8077f',
  storageBucket: 'iloveschool-8077f.appspot.com',
  messagingSenderId: '923159868124',
  appId: '1:923159868124:web:b66a3857766ca4ca82ba19',
  measurementId: 'G-6WBVK1NQC9'
}

firebase.initializeApp(firebaseConfig)

const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
