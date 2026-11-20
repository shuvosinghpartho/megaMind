import { defineStore } from 'pinia'
import { ref } from 'vue'

export type DownloadPlatform = 'macos' | 'windows' | 'linux' | 'cli'

export const useDownloadModalStore = defineStore('downloadModal', () => {
  const isOpen = ref(false)
  const selectedPlatform = ref<DownloadPlatform>('macos')

  function openModal(platform?: DownloadPlatform) {
    if (platform) {
      selectedPlatform.value = platform
    }
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  function toggleModal() {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    selectedPlatform,
    openModal,
    closeModal,
    toggleModal,
  }
})
