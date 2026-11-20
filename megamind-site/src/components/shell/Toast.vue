<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in store.toasts"
          :key="toast.id"
          class="toast"
          :class="toast.type"
          @click="store.remove(toast.id)"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.toast {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: .9rem;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0,0,0,.3);
  max-width: 320px;
}

.toast.success { border-color: var(--accent-growth); }
.toast.error   { border-color: var(--accent-prune); }

.toast-enter-active, .toast-leave-active { transition: all var(--dur-normal) var(--ease-default); }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to   { opacity: 0; transform: translateX(100%); }
</style>
