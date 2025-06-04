import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 토스트 설정 (https://vue-toastification.maronato.dev)
app.use(Toast, {
  position: 'top-center',
  timeout: 2000,
  hideProgressBar: true,
  transition: 'Vue-Toastification__fade',
})

app.mount('#app')
