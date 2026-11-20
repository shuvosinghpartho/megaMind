<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const progress = ref(0)
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

router.beforeEach(() => {
  visible.value = true
  progress.value = 0
  timer = setTimeout(() => { progress.value = 70 }, 50)
})

router.afterEach(() => {
  if (timer) clearTimeout(timer)
  progress.value = 100
  setTimeout(() => { visible.value = false; progress.value = 0 }, 300)
})
</script>

<template>
  <div v-if="visible" class="route-progress">
    <div class="bar" :style="{ width: `${progress}%` }" />
  </div>
</template>

<style scoped>
.route-progress {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 200;
}

.bar {
  height: 100%;
  background: var(--accent-perception);
  transition: width var(--dur-normal) var(--ease-default);
}
</style>
