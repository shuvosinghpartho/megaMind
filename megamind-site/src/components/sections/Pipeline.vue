<script setup lang="ts">
import { ref } from 'vue'
import { pipelineSteps } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'

const activeStepIndex = ref(0)
const currentStep = () => pipelineSteps[activeStepIndex.value]

function setStep(idx: number) {
  activeStepIndex.value = idx
}

function nextStep() {
  activeStepIndex.value = (activeStepIndex.value + 1) % pipelineSteps.length
}

function prevStep() {
  activeStepIndex.value = (activeStepIndex.value - 1 + pipelineSteps.length) % pipelineSteps.length
}
</script>

<template>
  <section id="pipeline" class="section-container">
    <div class="section-header">
      <Badge variant="in-progress">Architecture Flow</Badge>
      <h2 class="section-title">The 8-Stage Learning Pipeline</h2>
      <p class="section-desc">
        From a raw screen recording to an edge-executable skill tree. Explore each transition in the agent lifecycle.
      </p>
    </div>

    <div class="pipeline-card">
      <!-- Steps Progress Bar -->
      <div class="step-nav">
        <button
          v-for="(s, idx) in pipelineSteps"
          :key="s.id"
          :class="['step-btn', { 'is-active': activeStepIndex === idx }]"
          @click="setStep(idx)"
        >
          <span class="step-num">0{{ s.index }}</span>
          <span class="step-name">{{ s.name }}</span>
        </button>
      </div>

      <!-- Main Step Detail View -->
      <div class="step-body">
        <div class="step-info">
          <div class="step-badge">
            <span class="stage-tag">STAGE 0{{ currentStep().index }} OF 08</span>
            <h3 class="active-title">{{ currentStep().name }}</h3>
          </div>
          <p class="active-caption">{{ currentStep().caption }}</p>

          <div class="step-subdetail">
            <div v-if="activeStepIndex === 0" class="detail-box">
              <span class="detail-label">Input</span>
              <p>Raw video stream / MP4 recording of human interaction with desktop or browser interfaces.</p>
            </div>
            <div v-else-if="activeStepIndex === 1" class="detail-box">
              <span class="detail-label">Visual Processing</span>
              <p>Lightweight YOLOv8n detector identifies bounding boxes for <code>button</code> and <code>icon</code> tokens per frame.</p>
            </div>
            <div v-else-if="activeStepIndex === 2" class="detail-box">
              <span class="detail-label">Transient Buffering</span>
              <p>Extracted action sequence (kind, coordinates, timestamp) enters Short-Term Memory for clustering.</p>
            </div>
            <div v-else-if="activeStepIndex === 3" class="detail-box">
              <span class="detail-label">Quality Gate</span>
              <p>Tests repetition count, temporal cohesion, relevance ratio, and time window before allowing storage.</p>
            </div>
            <div v-else-if="activeStepIndex === 4" class="detail-box">
              <span class="detail-label">Tree Graph Structuring</span>
              <p>Atomic sub-skills saved as Small Trees; overall workflow saved as a Big Tree referencing them.</p>
            </div>
            <div v-else-if="activeStepIndex === 5" class="detail-box">
              <span class="detail-label">Ontology Sharing</span>
              <p>Duplicate sub-skills (e.g. login, typing) increment reference counters rather than duplicating nodes.</p>
            </div>
            <div v-else-if="activeStepIndex === 6" class="detail-box">
              <span class="detail-label">Bounded Footprint</span>
              <p>Reference-counted garbage collection and exponential edge decay prune obsolete skills for edge devices.</p>
            </div>
            <div v-else-if="activeStepIndex === 7" class="detail-box">
              <span class="detail-label">Native Automation Replay</span>
              <p>Agent navigates target applications dynamically, adapting to shifting buttons and responsive layouts.</p>
            </div>
          </div>

          <!-- Navigation Controls -->
          <div class="step-controls">
            <button class="nav-arrow" :disabled="activeStepIndex === 0" @click="prevStep">
              ← Previous
            </button>
            <button class="nav-arrow" :disabled="activeStepIndex === pipelineSteps.length - 1" @click="nextStep">
              Next Stage →
            </button>
          </div>
        </div>

        <!-- Animated Visual Diagram -->
        <div class="step-visual">
          <div class="diagram-canvas">
            <div
              v-for="(s, idx) in pipelineSteps"
              :key="s.id"
              :class="['node-pill', { 'is-active': activeStepIndex === idx, 'is-passed': activeStepIndex > idx }]"
              @click="setStep(idx)"
            >
              <div class="node-icon">
                <span class="node-idx">{{ s.index }}</span>
              </div>
              <div class="node-meta">
                <span class="node-label">{{ s.name }}</span>
              </div>
              <div v-if="idx < pipelineSteps.length - 1" class="node-connector"></div>
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

.pipeline-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.step-nav {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}

.step-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: var(--space-3) var(--space-5);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--dur-fast);
}

.step-btn:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.02);
}

.step-btn.is-active {
  color: var(--accent-perception);
  border-bottom-color: var(--accent-perception);
  background: var(--surface);
}

.step-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  opacity: 0.7;
}

.step-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  padding: var(--space-7);
}

@media (max-width: 860px) {
  .step-body {
    grid-template-columns: 1fr;
  }
}

.step-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.stage-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-perception);
  letter-spacing: 0.1em;
}

.active-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text);
  margin-top: 4px;
}

.active-caption {
  font-size: 1.1rem;
  color: var(--text);
  line-height: 1.6;
}

.step-subdetail {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-4);
}

.detail-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-growth);
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.detail-box p {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.5;
}

.detail-box code {
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--accent-perception);
}

.step-controls {
  display: flex;
  gap: var(--space-3);
  margin-top: auto;
}

.nav-arrow {
  padding: 8px 18px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--text);
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.nav-arrow:hover:not(:disabled) {
  background: var(--surface);
  border-color: var(--accent-perception);
}

.nav-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.step-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-5);
}

.diagram-canvas {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 320px;
}

.node-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.node-pill:hover {
  border-color: rgba(88, 166, 255, 0.4);
}

.node-pill.is-active {
  border-color: var(--accent-perception);
  background: rgba(88, 166, 255, 0.08);
  box-shadow: 0 0 16px rgba(88, 166, 255, 0.2);
  transform: scale(1.02);
}

.node-pill.is-passed {
  border-color: rgba(63, 185, 80, 0.3);
}

.node-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text);
}

.node-pill.is-active .node-icon {
  background: var(--accent-perception);
  color: #0b0e13;
}

.node-label {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
}
</style>
