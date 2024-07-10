import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const toast = (
  options = { autoClose: 3000, theme: 'colored', position: 'top-right' }
) => {
  return {
    install: (app) => {
      app.use(Vue3Toastify, options)
    },
    options: options
  }
}
