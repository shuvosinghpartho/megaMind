<script setup lang="ts">
const phases = [
  {
    phase: 'PHASE 01',
    title: 'Base Knowledge & Visual Perception',
    status: 'COMPLETED & VERIFIED',
    badgeClass: 'done',
    current: false,
    deliverables: [
      { name: '100–200 Desktop & Web UI Dataset', done: true },
      { name: 'Precision YOLO Annotation (button & icon)', done: true },
      { name: 'Lightweight YOLOv8n Training & ONNX Export', done: true },
      { name: 'Layout Shift Tolerance Evaluation (mAP@0.5: 95.4%)', done: true },
    ],
  },
  {
    phase: 'PHASE 02',
    title: 'Hierarchical Memory Architecture',
    status: 'ACTIVE RUNTIME',
    badgeClass: 'active',
    current: true,
    deliverables: [
      { name: 'Short-Term Memory (STM) Sliding Window Buffer', done: true },
      { name: 'Growth-Check Gatekeeper (4-Criteria Statistical Filter)', done: true },
      { name: 'Long-Term Memory (LTM) Directed Graph Store', done: true },
      { name: 'Dynamic Category Creation for New Tasks', done: true },
    ],
  },
  {
    phase: 'PHASE 03',
    title: 'Self-Pruning & Multi-App Native Agent',
    status: 'IN PROGRESS',
    badgeClass: 'planned',
    current: false,
    deliverables: [
      { name: 'Reference-Counted Small Tree Sharing', done: true },
      { name: 'Automatic Garbage Collection & Edge Decay', done: true },
      { name: 'Multi-App Autonomous Workflow Execution', done: false },
      { name: 'Cross-Platform Standalone Native Packaging', done: true },
    ],
  },
]
</script>

<template>
  <section id="roadmap" class="section-container roadmap-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge">
        <span class="badge-dot"></span>
        <span>06 · DEVELOPMENT ROADMAP & RESEARCH PHASES</span>
      </div>
      <h2 class="section-title">
        From Research Thesis to <br />
        <span class="amber">Production-Grade Native AI Agent</span>
      </h2>
      <p class="section-desc">
        Tracking the architectural evolution from visual cortex pre-training to full autonomous continual execution.
      </p>
    </div>

    <!-- Timeline Grid (Hallmark Panels) -->
    <div class="roadmap-grid">
      <div
        v-for="(p, idx) in phases"
        :key="idx"
        class="roadmap-card"
        :class="{ 'is-current': p.current }"
      >
        <div class="card-top-row">
          <span class="phase-number font-mono">{{ p.phase }}</span>
          <span class="phase-status-pill font-mono" :class="p.badgeClass">
            <span v-if="p.current" class="pulse-dot"></span>
            {{ p.status }}
          </span>
        </div>

        <h3 class="phase-title font-display">{{ p.title }}</h3>

        <div class="deliverables-list">
          <div v-for="(d, dIdx) in p.deliverables" :key="dIdx" class="deliverable-item font-mono">
            <span class="check-icon" :class="{ done: d.done }">{{ d.done ? '✓' : '○' }}</span>
            <span class="deliverable-name" :class="{ done: d.done }">{{ d.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.roadmap-section {
  position: relative;
  z-index: 2;
}

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (max-width: 980px) {
  .roadmap-grid {
    grid-template-columns: 1fr;
  }
}

.roadmap-card {
  position: relative;
  overflow: hidden;
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.roadmap-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-cool), transparent);
  opacity: 0;
  transition: opacity var(--dur-short) var(--ease-out);
}

.roadmap-card:hover::before {
  opacity: 1;
}

.roadmap-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  box-shadow: 0 12px 28px -10px color-mix(in oklch, var(--color-cool) 25%, transparent);
}

.roadmap-card.is-current {
  border-color: var(--color-cool);
  background: var(--color-paper-3);
  box-shadow: 0 0 28px -8px color-mix(in oklch, var(--color-cool) 35%, transparent);
}

.roadmap-card.is-current::before {
  opacity: 1;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.phase-number {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-muted);
}

.phase-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-outlier);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.phase-status-pill.done {
  background: var(--color-ok-soft);
  color: var(--color-ok);
  border: var(--rule-hair) solid var(--color-ok);
}

.phase-status-pill.active {
  background: var(--color-cool-soft);
  color: var(--color-cool);
  border: var(--rule-hair) solid var(--color-cool);
}

.phase-status-pill.planned {
  background: var(--color-paper-2);
  color: var(--color-muted);
  border: var(--rule-hair) solid var(--color-rule);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-cool);
  box-shadow: 0 0 8px var(--color-cool);
  animation: beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes beacon-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.85);
  }
}

.phase-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 500;
  line-height: 1.25;
  margin-bottom: var(--space-md);
  color: var(--color-ink);
}

.deliverables-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.deliverable-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: var(--text-xs);
  line-height: 1.45;
  transition: transform var(--dur-short) var(--ease-out);
}

.deliverable-item:hover {
  transform: translateX(3px);
}

.check-icon {
  font-weight: 700;
  color: var(--color-muted);
  display: inline-block;
  transition: transform var(--dur-short) var(--ease-out);
}

.deliverable-item:hover .check-icon.done {
  transform: scale(1.2);
}

.check-icon.done {
  color: var(--color-ok);
}

.deliverable-name {
  color: var(--color-muted);
}

.deliverable-name.done {
  color: var(--color-ink-2);
}
</style>
