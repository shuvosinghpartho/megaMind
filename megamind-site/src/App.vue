<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/shell/AppHeader.vue'
import SplashScreen from '@/components/shell/SplashScreen.vue'
import CommandPalette from '@/components/shell/CommandPalette.vue'
import Toast from '@/components/shell/Toast.vue'
import RouteProgress from '@/components/shell/RouteProgress.vue'
import MobileDock from '@/components/shell/MobileDock.vue'
import AtmosphereBackground from '@/components/shell/AtmosphereBackground.vue'
import DownloadModal from '@/components/shell/DownloadModal.vue'
import { useSplashStore } from '@/stores/splash'

const splashStore = useSplashStore()
</script>

<template>
  <SplashScreen v-if="!splashStore.shown" />
  <div v-else class="app-shell">
    <AtmosphereBackground />
    <AppHeader />
    <RouteProgress />
    <main>
      <RouterView />
    </main>
    <MobileDock />
    <CommandPalette />
    <DownloadModal />
    <Toast />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

main {
  flex: 1;
}
</style>
