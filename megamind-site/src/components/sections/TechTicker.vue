<script setup lang="ts">
const techTags = [
  { name: 'YOLOv8n Vision Cortex', badge: '6.3 MB' },
  { name: 'Hierarchical Tree-Graph', badge: 'LTM Store' },
  { name: 'Zero Weight Overwriting', badge: '0% Forgetting' },
  { name: 'Dynamic Category Growth', badge: 'Bio-Inspired' },
  { name: 'Sub-Millisecond ONNX Runtime', badge: 'Edge Native' },
  { name: 'Reference Counting Garbage Collection', badge: 'Zero Bloat' },
  { name: '4-Stage Growth Gatekeeper', badge: 'Noise Filter' },
  { name: '100% Local-First Execution', badge: 'Zero Cloud Leak' },
]
</script>

<template>
  <div class="tech-ticker-wrap" aria-hidden="true">
    <div class="ticker-gradient-left"></div>
    <div class="ticker-gradient-right"></div>
    
    <div class="ticker-track">
      <div v-for="tag in techTags" :key="tag.name" class="ticker-item">
        <span class="ticker-dot"></span>
        <span class="ticker-name font-display">{{ tag.name }}</span>
        <span class="ticker-badge font-mono">{{ tag.badge }}</span>
      </div>
      <!-- Duplicate for seamless loop -->
      <div v-for="tag in techTags" :key="'dup-' + tag.name" class="ticker-item">
        <span class="ticker-dot"></span>
        <span class="ticker-name font-display">{{ tag.name }}</span>
        <span class="ticker-badge font-mono">{{ tag.badge }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-ticker-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 14px 0;
  border-top: var(--rule-hair) solid var(--color-rule);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-2);
  z-index: 10;
}

.ticker-gradient-left,
.ticker-gradient-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 90px;
  pointer-events: none;
  z-index: 2;
}

.ticker-gradient-left {
  left: 0;
  background: linear-gradient(to right, var(--color-paper-2) 0%, transparent 100%);
}

.ticker-gradient-right {
  right: 0;
  background: linear-gradient(to left, var(--color-paper-2) 0%, transparent 100%);
}

.ticker-track {
  display: flex;
  align-items: center;
  gap: 32px;
  width: max-content;
  animation: ticker-scroll 36s linear infinite;
}

.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.ticker-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-cool);
}

.ticker-name {
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.ticker-badge {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  color: var(--color-muted);
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
