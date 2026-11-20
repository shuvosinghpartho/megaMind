<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :class="['btn-root', `btn-${variant}`, `btn-${size}`, { 'btn-disabled': disabled }]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="['btn-root', `btn-${variant}`, `btn-${size}`, { 'btn-disabled': disabled }]"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<style scoped>
.btn-root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--radius-pill);
  transition: all var(--dur-fast) var(--ease-default);
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  white-space: nowrap;
}

.btn-sm {
  padding: 6px 14px;
  font-size: 0.82rem;
}

.btn-md {
  padding: 9px 20px;
  font-size: 0.92rem;
}

.btn-lg {
  padding: 12px 28px;
  font-size: 1.02rem;
}

.btn-primary {
  background: var(--accent-perception);
  color: #0b0e13;
  border-color: var(--accent-perception);
  box-shadow: 0 2px 14px rgba(88, 166, 255, 0.25);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(88, 166, 255, 0.4);
  filter: brightness(1.08);
}

.btn-secondary {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--surface);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--text);
  border-color: var(--border);
}

.btn-outline:hover:not(:disabled) {
  border-color: var(--accent-perception);
  color: var(--accent-perception);
  background: rgba(88, 166, 255, 0.05);
}

.btn-ghost {
  background: transparent;
  color: var(--muted);
  border-color: transparent;
}

.btn-ghost:hover:not(:disabled) {
  color: var(--text);
  background: var(--surface-2);
}

.btn-disabled,
.btn-root:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}
</style>
