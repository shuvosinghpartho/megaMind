<script setup lang="ts">
import type { Status } from '@/content/megamind'

interface Props {
  status: Status
}

defineProps<Props>()
</script>

<template>
  <span :class="['status-chip', `status-${status}`]">
    <span class="indicator"></span>
    <span class="label">
      {{ status === 'done' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Planned' }}
    </span>
  </span>
</template>

<style scoped>
.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 9px;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  border: 1px solid var(--border);
}

.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-done {
  background: rgba(63, 185, 80, 0.1);
  border-color: rgba(63, 185, 80, 0.3);
  color: var(--accent-growth);
}
.status-done .indicator {
  background: var(--accent-growth);
}

.status-in-progress {
  background: rgba(88, 166, 255, 0.1);
  border-color: rgba(88, 166, 255, 0.3);
  color: var(--accent-perception);
}
.status-in-progress .indicator {
  background: var(--accent-perception);
  box-shadow: 0 0 6px var(--accent-perception);
  animation: blink 1.8s infinite;
}

.status-planned {
  background: rgba(139, 152, 169, 0.08);
  border-color: rgba(139, 152, 169, 0.2);
  color: var(--muted);
}
.status-planned .indicator {
  background: var(--muted);
}

@keyframes blink {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
