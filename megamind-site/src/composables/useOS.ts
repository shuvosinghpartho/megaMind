import { ref, onMounted } from 'vue'

export type OSType = 'macos' | 'windows' | 'linux' | 'unknown'

export function useOS() {
  const os = ref<OSType>('unknown')

  onMounted(() => {
    if (typeof window === 'undefined') return
    const userAgent = window.navigator.userAgent.toLowerCase()

    if (userAgent.includes('mac') || userAgent.includes('darwin')) {
      os.value = 'macos'
    } else if (userAgent.includes('win')) {
      os.value = 'windows'
    } else if (userAgent.includes('linux') || userAgent.includes('x11')) {
      os.value = 'linux'
    } else {
      os.value = 'unknown'
    }
  })

  return { os }
}
