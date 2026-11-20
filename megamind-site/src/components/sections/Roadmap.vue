<script setup lang="ts">
import { roadmapPhases } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
import StatusChip from '@/components/ui/StatusChip.vue'
</script>

<template>
  <section id="roadmap" class="section-container">
    <div class="section-header">
      <Badge variant="done">Production Status</Badge>
      <h2 class="section-title">Milestones Delivered</h2>
      <p class="section-desc">
        A complete architectural evolution from visual perception pre-training to an autonomous continual learning agent.
      </p>
    </div>

    <!-- Progress Ring Summary -->
    <div class="roadmap-summary">
      <div class="summary-card">
        <div class="ring-box">
          <svg viewBox="0 0 100 100" class="ring-svg">
            <circle cx="50" cy="50" r="40" class="ring-bg" />
            <circle
              cx="50"
              cy="50"
              r="40"
              class="ring-progress"
              :stroke-dasharray="251.2"
              :stroke-dashoffset="0"
            />
          </svg>
          <div class="ring-text">
            <span class="ring-num">100%</span>
            <span class="ring-label">Complete</span>
          </div>
        </div>

        <div class="summary-details">
          <h3 class="summary-title">Production Release Live</h3>
          <p class="summary-desc">
            All 8 core architecture & engine milestones completed. Ready for cross-platform deployment and edge execution.
          </p>
        </div>
      </div>
    </div>

    <!-- Roadmap Phases Timeline -->
    <div class="timeline-container">
      <div
        v-for="phase in roadmapPhases"
        :key="phase.id"
        class="phase-block"
      >
        <div class="phase-header">
          <span class="phase-badge">{{ phase.name.split('—')[0].trim() }}</span>
          <h3 class="phase-title">{{ phase.name.split('—')[1]?.trim() || phase.name }}</h3>
        </div>

        <div class="steps-flow">
          <div
            v-for="step in phase.steps"
            :key="step.index"
            :class="['step-row', { 'is-current': (step as any).current }]"
          >
            <div class="step-num-col">
              <span class="step-circle">{{ step.index }}</span>
              <span v-if="(step as any).current" class="pulse-ring"></span>
            </div>

            <div class="step-content-card">
              <div class="step-top">
                <span class="step-name">{{ step.name }}</span>
                <div class="step-status-wrap">
                  <span v-if="(step as any).current" class="we-are-here-tag">📍 We are here</span>
                  <StatusChip :status="step.status" />
                </div>
              </div>
              <p class="step-detail">{{ step.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-9) var(--space-5);
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
}

.section-desc {
  font-size: 1.1rem;
  color: var(--muted);
  line-height: 1.6;
}

.roadmap-summary {
  margin-bottom: var(--space-8);
}

.summary-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  max-width: 600px;
  margin: 0 auto;
}

.ring-box {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: var(--surface-2);
  stroke-width: 8;
}

.ring-progress {
  fill: none;
  stroke: var(--accent-growth);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s ease-out;
}

.ring-text {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ring-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text);
}

.ring-label {
  font-size: 0.65rem;
  color: var(--muted);
  text-transform: uppercase;
}

.summary-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}

.summary-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.5;
}

.timeline-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.phase-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.phase-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border);
}

.phase-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-perception);
  background: var(--surface-2);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.phase-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
}

.steps-flow {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-left: var(--space-4);
}

.step-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.step-num-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
}

.is-current .step-circle {
  background: var(--accent-perception);
  color: #0b0e13;
  border-color: var(--accent-perception);
}

.pulse-ring {
  position: absolute;
  top: 8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--accent-perception);
  animation: pulseOut 1.8s infinite;
}

@keyframes pulseOut {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 0; }
}

.step-content-card {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.is-current .step-content-card {
  border-color: rgba(88, 166, 255, 0.4);
  box-shadow: 0 0 14px rgba(88, 166, 255, 0.12);
}

.step-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.step-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.step-status-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.we-are-here-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-perception);
  background: rgba(88, 166, 255, 0.12);
  padding: 1px 6px;
  border-radius: 4px;
}

.step-detail {
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
