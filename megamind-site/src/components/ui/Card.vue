<script setup lang="ts">
interface Props {
  hoverEffect?: boolean
  accent?: 'perception' | 'memory' | 'growth' | 'prune' | 'none'
}

withDefaults(defineProps<Props>(), {
  hoverEffect: true,
  accent: 'none',
})
</script>

<template>
  <div :class="['card-root', `accent-${accent}`, { 'card-hover': hoverEffect }]">
    <slot />
  </div>
</template>

<style scoped>
.card-root {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  position: relative;
  transition: all var(--dur-normal) var(--ease-default);
  overflow: hidden;
}

.card-hover:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.45);
}

[data-theme="light"] .card-hover:hover {
  border-color: rgba(15, 23, 42, 0.2);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.08);
}

.accent-perception {
  border-top: 2px solid var(--accent-perception);
}

.accent-memory {
  border-top: 2px solid var(--accent-memory);
}

.accent-growth {
  border-top: 2px solid var(--accent-growth);
}

.accent-prune {
  border-top: 2px solid var(--accent-prune);
}
</style>
