<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Badge from '@/components/ui/Badge.vue'
import Slider from '@/components/ui/Slider.vue'
import Button from '@/components/ui/Button.vue'

// Gate Parameters
const minRepetitions = ref(3)
const cohesionThreshold = ref(0.6)
const minRelevantRatio = ref(0.5)
const timeWindow = ref(5)

// Simulation Stats
const stats = ref({
  promoted: 14,
  held: 6,
  discarded: 22,
})

interface ActionToken {
  id: number
  label: string
  reps: number
  cohesion: number
  relevance: number
  status: 'buffered' | 'promoted' | 'discarded'
}

const tokens = ref<ActionToken[]>([
  { id: 1, label: "Click 'Login'", reps: 4, cohesion: 0.85, relevance: 0.9, status: 'promoted' },
  { id: 2, label: "Type in 'Search'", reps: 3, cohesion: 0.72, relevance: 0.8, status: 'promoted' },
  { id: 3, label: "Accidental Drag", reps: 1, cohesion: 0.2, relevance: 0.1, status: 'discarded' },
  { id: 4, label: "Click 'Settings'", reps: 2, cohesion: 0.65, relevance: 0.7, status: 'buffered' },
])

let tokenInterval: any = null
let nextId = 5

const possibleLabels = [
  "Click 'Submit'",
  "Type 'Password'",
  "Click 'Filter'",
  "Scroll Down",
  "Missed Click (Noise)",
  "Navigate Back",
  "Click 'Export CSV'",
]

function runGateEvaluation() {
  const label = possibleLabels[Math.floor(Math.random() * possibleLabels.length)]
  const isNoise = label.includes('Noise') || label.includes('Missed')

  const reps = isNoise ? 1 : Math.floor(Math.random() * 5) + 1
  const cohesion = isNoise ? 0.2 + Math.random() * 0.2 : 0.4 + Math.random() * 0.6
  const relevance = isNoise ? 0.1 + Math.random() * 0.2 : 0.4 + Math.random() * 0.6

  let status: 'buffered' | 'promoted' | 'discarded' = 'buffered'

  if (reps >= minRepetitions.value && cohesion >= cohesionThreshold.value && relevance >= minRelevantRatio.value) {
    status = 'promoted'
    stats.value.promoted++
  } else if (reps < 2 || isNoise) {
    status = 'discarded'
    stats.value.discarded++
  } else {
    status = 'buffered'
    stats.value.held++
  }

  tokens.value.unshift({
    id: nextId++,
    label,
    reps,
    cohesion: parseFloat(cohesion.toFixed(2)),
    relevance: parseFloat(relevance.toFixed(2)),
    status,
  })

  if (tokens.value.length > 7) {
    tokens.value.pop()
  }
}

function resetStats() {
  stats.value = { promoted: 0, held: 0, discarded: 0 }
  tokens.value = []
}

onMounted(() => {
  tokenInterval = setInterval(runGateEvaluation, 2200)
})

onUnmounted(() => {
  if (tokenInterval) clearInterval(tokenInterval)
})
</script>

<template>
  <section id="growth-gate" class="section-container">
    <div class="section-header">
      <Badge variant="simulated">Gate Simulation</Badge>
      <h2 class="section-title">Growth-Check Gate Simulator</h2>
      <p class="section-desc">
        Not all observed user clicks are worth memorizing. The gate filters noise and one-off mistakes before promoting skills into Long-Term Memory.
      </p>
    </div>

    <div class="gate-grid">
      <!-- Parameter Sliders -->
      <div class="gate-controls">
        <h3 class="controls-heading">Gate Hyperparameters</h3>
        <p class="controls-sub">Adjust thresholds to see how promotion criteria filter incoming actions.</p>

        <div class="sliders-list">
          <Slider
            v-model="minRepetitions"
            :min="1"
            :max="6"
            :step="1"
            label="min_repetitions (N)"
            unit=" demonstrations"
          />
          <Slider
            v-model="cohesionThreshold"
            :min="0.2"
            :max="0.9"
            :step="0.05"
            label="cohesion_threshold (Cluster Density)"
          />
          <Slider
            v-model="minRelevantRatio"
            :min="0.2"
            :max="0.9"
            :step="0.05"
            label="min_relevant_ratio (Signal-to-Noise)"
          />
          <Slider
            v-model="timeWindow"
            :min="2"
            :max="12"
            :step="1"
            label="time_window (Persistence Window)"
            unit="s"
          />
        </div>

        <!-- Metrics Counters -->
        <div class="counter-row">
          <div class="counter-card counter-promoted">
            <span class="counter-num">{{ stats.promoted }}</span>
            <span class="counter-label">Promoted to LTM</span>
          </div>
          <div class="counter-card counter-held">
            <span class="counter-num">{{ stats.held }}</span>
            <span class="counter-label">Held in STM</span>
          </div>
          <div class="counter-card counter-discarded">
            <span class="counter-num">{{ stats.discarded }}</span>
            <span class="counter-label">Discarded Noise</span>
          </div>
        </div>

        <div class="controls-footer">
          <Button variant="ghost" size="sm" @click="resetStats">
            ↺ Reset Counter
          </Button>
          <span class="gate-note">* Calibrated hyperparameters for real-time action filtering</span>
        </div>
      </div>

      <!-- Live Action Stream Visualizer -->
      <div class="gate-stream-box">
        <div class="stream-header">
          <div class="stream-title">
            <span class="pulse-indicator"></span>
            <span>Live STM Ingestion Buffer</span>
          </div>
          <span class="stream-rate">Evaluating every 2.2s</span>
        </div>

        <div class="tokens-list">
          <div
            v-for="tok in tokens"
            :key="tok.id"
            :class="['token-item', `status-${tok.status}`]"
          >
            <div class="token-main">
              <span class="token-action">{{ tok.label }}</span>
              <div class="token-tags">
                <span class="tag-pill">Reps: {{ tok.reps }}</span>
                <span class="tag-pill">Cohesion: {{ tok.cohesion }}</span>
                <span class="tag-pill">Rel: {{ tok.relevance }}</span>
              </div>
            </div>

            <div class="token-verdict">
              <span v-if="tok.status === 'promoted'" class="verdict-promoted">✓ Promoted to LTM</span>
              <span v-else-if="tok.status === 'buffered'" class="verdict-held">⏳ Held in STM</span>
              <span v-else class="verdict-discarded">✕ Discarded</span>
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

.gate-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-6);
}

@media (max-width: 900px) {
  .gate-grid {
    grid-template-columns: 1fr;
  }
}

.gate-controls {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.controls-heading {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
}

.controls-sub {
  font-size: 0.88rem;
  color: var(--muted);
}

.sliders-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin: var(--space-2) 0;
}

.counter-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.counter-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-3);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.counter-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 800;
}

.counter-label {
  font-size: 0.72rem;
  color: var(--muted);
}

.counter-promoted .counter-num { color: var(--accent-growth); }
.counter-held .counter-num { color: var(--accent-memory); }
.counter-discarded .counter-num { color: var(--accent-prune); }

.controls-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: var(--space-2);
}

.gate-note {
  font-size: 0.74rem;
  color: var(--muted);
  font-style: italic;
}

.gate-stream-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.stream-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-3);
}

.stream-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-perception);
  box-shadow: 0 0 8px var(--accent-perception);
  animation: pulseDot 1.5s infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.stream-rate {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--muted);
}

.tokens-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.token-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.token-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.token-action {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

.token-tags {
  display: flex;
  gap: 6px;
}

.tag-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--muted);
  background: var(--surface);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.token-verdict {
  font-size: 0.8rem;
  font-weight: 700;
}

.verdict-promoted { color: var(--accent-growth); }
.verdict-held { color: var(--accent-memory); }
.verdict-discarded { color: var(--accent-prune); }
</style>
