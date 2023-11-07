import './assets/styleGuide.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {VueSession} from 'vue-session/index'

import App from './App.vue'
import router from './router'

import axios from 'axios'; // Axios를 가져옵니다.


const app = createApp(App)
var sessionOptions = {
    persist:true,
}

app.use(createPinia())
app.use(router)
app.use(VueSession, sessionOptions)

app.config.globalProperties.axios = axios;

app.mount('#app')
