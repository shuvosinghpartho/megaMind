<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: string
  title: string
  content?: string
}

interface Props {
  items: Item[]
  defaultOpenId?: string
}

const props = defineProps<Props>()
const openId = ref<string | null>(props.defaultOpenId || null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="accordion-list">
    <div
      v-for="item in items"
      :key="item.id"
      :class="['accordion-item', { 'is-open': openId === item.id }]"
    >
      <button
        class="accordion-trigger"
        :aria-expanded="openId === item.id"
        @click="toggle(item.id)"
      >
        <span class="accordion-title">{{ item.title }}</span>
        <span class="chevron" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div v-show="openId === item.id" class="accordion-panel">
        <div class="accordion-content">
          <slot :name="item.id" :item="item">
            <p>{{ item.content }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.accordion-item {
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: var(--surface);
  transition: border-color var(--dur-fast);
  overflow: hidden;
}

.accordion-item.is-open {
  border-color: rgba(88, 166, 255, 0.4);
}

.accordion-trigger {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  background: transparent;
  border: none;
  color: var(--text);
  font-family: inherit;
  font-size: 0.98rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.accordion-trigger:hover {
  color: var(--accent-perception);
}

.chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: transform var(--dur-fast) var(--ease-default);
}

.accordion-item.is-open .chevron {
  transform: rotate(180deg);
  color: var(--accent-perception);
}

.accordion-panel {
  border-top: 1px solid var(--border);
  background: var(--surface-2);
}

.accordion-content {
  padding: var(--space-4) var(--space-5);
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.6;
}
</style>
