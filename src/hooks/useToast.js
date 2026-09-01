import { toast } from 'vue3-toastify'

export default () => {
  const show = (options) => {
    toast(options.message, {
      autoClose: options.interval || 4000,
      type: options.type || 'success',
      dangerouslyHTMLString: true,
      position: options.position || 'top-right'
    })
  }

  return { show }
}
