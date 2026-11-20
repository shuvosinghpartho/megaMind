import { ref, onMounted, onUnmounted } from 'vue'

export function useReducedMotion() {
  const prefersReduced = ref(false)

  onMounted(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.value = mediaQuery.matches

    const handler = (e: MediaQueryListEvent) => {
      prefersReduced.value = e.matches
    }

    mediaQuery.addEventListener('change', handler)
    onUnmounted(() => mediaQuery.removeEventListener('change', handler))
  })

  return { prefersReduced }
}
