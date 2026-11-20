import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSplashStore = defineStore('splash', () => {
  const shown = ref(false)

  function markShown() {
    shown.value = true
  }

  return { shown, markShown }
})
