import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommandPaletteStore = defineStore('commandPalette', () => {
  const open = ref(false)

  function toggle() { open.value = !open.value }
  function openPalette() { open.value = true }
  function close() { open.value = false }

  return { open, toggle, openPalette, close }
})
