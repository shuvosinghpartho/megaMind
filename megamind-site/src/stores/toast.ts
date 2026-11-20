import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ToastMessage {
  id: string
  message: string
  type: 'info' | 'success' | 'error'
  duration?: number
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([])

  function add(msg: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, ...msg })
    setTimeout(() => remove(id), msg.duration ?? 3500)
  }

  function show(message: string, type: 'info' | 'success' | 'error' = 'info', duration = 3500) {
    add({ message, type, duration })
  }

  function remove(id: string) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  return { toasts, add, show, remove }
})
