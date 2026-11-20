import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeOption = 'dark' | 'light' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeOption>('system')

  const resolvedTheme = computed(() => {
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return theme.value
  })

  function setTheme(t: ThemeOption) {
    theme.value = t
    localStorage.setItem('megamind-theme', t)
    const resolved = t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : t
    document.documentElement.setAttribute('data-theme', resolved)
  }

  function init() {
    const stored = localStorage.getItem('megamind-theme') as ThemeOption | null
    setTheme(stored ?? 'system')
  }

  return { theme, resolvedTheme, setTheme, init }
})
