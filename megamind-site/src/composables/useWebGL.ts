import { ref, onMounted } from 'vue'

export function useWebGL() {
  const isSupported = ref(true)

  onMounted(() => {
    if (typeof window === 'undefined') return
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      isSupported.value = Boolean(gl)
    } catch {
      isSupported.value = false
    }
  })

  return { isSupported }
}
