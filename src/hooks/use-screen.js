import { ref, onMounted, onUnmounted } from 'vue'

export default function useScreen() {
  const screen = ref({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  })

  const updateScreen = () => {
    screen.value = {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      isDesktop: window.innerWidth >= 1024
    }
  }

  onMounted(() => {
    updateScreen()
    window.addEventListener('resize', updateScreen)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreen)
  })

  return screen
}
