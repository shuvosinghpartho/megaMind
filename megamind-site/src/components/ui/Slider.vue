<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  label: string
  unit?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 10,
  step: 1,
  unit: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', parseFloat(target.value))
}
</script>

<template>
  <div class="slider-field">
    <div class="slider-header">
      <span class="slider-label">{{ label }}</span>
      <span class="slider-val">{{ modelValue }}{{ unit }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      class="slider-input"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.slider-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.slider-label {
  color: var(--text);
  font-weight: 500;
}

.slider-val {
  color: var(--accent-growth);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 0.88rem;
}

.slider-input {
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  outline: none;
  cursor: pointer;
}

.slider-input::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-perception);
  box-shadow: 0 0 8px rgba(88, 166, 255, 0.5);
  cursor: pointer;
  transition: transform var(--dur-fast);
}

.slider-input::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
</style>
