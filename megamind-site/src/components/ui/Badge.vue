<script setup lang="ts">
interface Props {
  variant?: 'default' | 'conceptual' | 'simulated' | 'planned' | 'in-progress' | 'done' | 'target'
  pulse?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  pulse: false,
})
</script>

<template>
  <span :class="['badge', `badge-${variant}`, { 'badge-pulse': pulse }]">
    <span v-if="pulse" class="pulse-dot"></span>
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  white-space: nowrap;
}

.badge-conceptual {
  background: rgba(240, 136, 62, 0.12);
  border-color: rgba(240, 136, 62, 0.4);
  color: var(--accent-prune);
}

.badge-simulated {
  background: rgba(188, 140, 255, 0.12);
  border-color: rgba(188, 140, 255, 0.4);
  color: var(--accent-memory);
}

.badge-target {
  background: rgba(240, 136, 62, 0.12);
  border-color: rgba(240, 136, 62, 0.35);
  color: var(--accent-prune);
}

.badge-planned {
  background: rgba(139, 152, 169, 0.12);
  border-color: rgba(139, 152, 169, 0.3);
  color: var(--muted);
}

.badge-in-progress {
  background: rgba(88, 166, 255, 0.12);
  border-color: rgba(88, 166, 255, 0.4);
  color: var(--accent-perception);
}

.badge-done {
  background: rgba(63, 185, 80, 0.12);
  border-color: rgba(63, 185, 80, 0.4);
  color: var(--accent-growth);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 1.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); }
}
</style>
