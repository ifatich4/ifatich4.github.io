import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVueNext } from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import './assets/scss/g-kit.scss'

createApp(App)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
    theme: 'colored',
    position: 'top-right'
  })
  .use(BootstrapVueNext)
  .mount('#app')
