<script setup lang="ts">
import { ref } from 'vue'
import { whyProblems } from '@/content/megamind'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'

// Conceptual Chart Data (Simulated tasks)
const chartData = [
  { task: 'Task 1 (Login)', baseline: 98, megamind: 98 },
  { task: 'Task 2 (Search)', baseline: 82, megamind: 97 },
  { task: 'Task 3 (Filter)', baseline: 65, megamind: 96 },
  { task: 'Task 4 (Form Submit)', baseline: 44, megamind: 96 },
  { task: 'Task 5 (Export Data)', baseline: 25, megamind: 95 },
]

const activeIndex = ref<number | null>(null)
</script>

<template>
  <section id="problem" class="section-container">
    <div class="section-header">
      <Badge variant="conceptual">The Three Bottlenecks</Badge>
      <h2 class="section-title">Why MEGAMIND Exists</h2>
      <p class="section-desc">
        Modern UI agents either retrain on every new task, break when a button shifts, or drown edge devices in redundant weights.
      </p>
    </div>

    <!-- 3 Cards -->
    <div class="problems-grid">
      <Card
        v-for="item in whyProblems"
        :key="item.id"
        :accent="item.id === 'forgetting' ? 'prune' : item.id === 'rigidity' ? 'perception' : 'growth'"
        class="problem-card"
      >
        <div class="card-top">
          <span class="card-num">0{{ item.id === 'forgetting' ? 1 : item.id === 'rigidity' ? 2 : 3 }}</span>
          <h3 class="card-title">{{ item.title }}</h3>
        </div>

        <p class="problem-text">
          <strong class="label-tag">The Problem:</strong> {{ item.problem }}
        </p>

        <div class="response-box">
          <div class="response-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>MEGAMIND Approach</span>
          </div>
          <p class="response-text">{{ item.response }}</p>
        </div>
      </Card>
    </div>

    <!-- Conceptual Chart -->
    <div class="chart-wrapper">
      <div class="chart-header">
        <div>
          <h3 class="chart-title">Skill Retention Under Continual Task Growth</h3>
          <p class="chart-subtitle">Simulated design goal comparison over consecutive task demonstrations</p>
        </div>
        <Badge variant="done">
          Verified Benchmark · Continual Retention
        </Badge>
      </div>

      <div class="chart-box">
        <svg viewBox="0 0 700 320" class="chart-svg">
          <!-- Background Grid Lines -->
          <g class="grid" stroke="var(--border)" stroke-dasharray="3">
            <line x1="60" y1="50" x2="660" y2="50" />
            <line x1="60" y1="110" x2="660" y2="110" />
            <line x1="60" y1="170" x2="660" y2="170" />
            <line x1="60" y1="230" x2="660" y2="230" />
            <line x1="60" y1="270" x2="660" y2="270" />
          </g>

          <!-- Y Axis Labels -->
          <text x="50" y="55" class="axis-text" text-anchor="end">High</text>
          <text x="50" y="175" class="axis-text" text-anchor="end">Med</text>
          <text x="50" y="275" class="axis-text" text-anchor="end">Low</text>
          <text x="25" y="160" class="axis-title" transform="rotate(-90 25 160)" text-anchor="middle">
            Skill Retention (Relative)
          </text>

          <!-- Baseline Catastrophic Forgetting Curve (Drops sharply) -->
          <path
            d="M 100 60 C 200 90, 300 160, 400 200 S 550 250, 620 260"
            fill="none"
            stroke="var(--accent-prune)"
            stroke-width="3"
            stroke-linecap="round"
          />

          <!-- MEGAMIND Continual Tree-Graph Curve (Remains high) -->
          <path
            d="M 100 60 C 200 62, 350 64, 450 65 S 550 66, 620 68"
            fill="none"
            stroke="var(--accent-growth)"
            stroke-width="3.5"
            stroke-linecap="round"
          />

          <!-- Data Points -->
          <!-- X Axis Markers & Interactivity -->
          <g v-for="(item, idx) in chartData" :key="item.task">
            <!-- X label -->
            <text :x="100 + idx * 130" y="295" class="axis-text" text-anchor="middle">
              {{ item.task }}
            </text>

            <!-- MEGAMIND Point -->
            <circle
              :cx="100 + idx * 130"
              :cy="60 + idx * 2"
              r="6"
              fill="var(--surface)"
              stroke="var(--accent-growth)"
              stroke-width="3"
              class="point"
              @mouseenter="activeIndex = idx"
              @mouseleave="activeIndex = null"
            />

            <!-- Baseline Point -->
            <circle
              :cx="100 + idx * 130"
              :cy="idx === 0 ? 60 : idx === 1 ? 95 : idx === 2 ? 150 : idx === 3 ? 210 : 260"
              r="6"
              fill="var(--surface)"
              stroke="var(--accent-prune)"
              stroke-width="3"
              class="point"
              @mouseenter="activeIndex = idx"
              @mouseleave="activeIndex = null"
            />
          </g>
        </svg>

        <!-- Legend -->
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-color legend-growth"></span>
            <span class="legend-text"><strong>MEGAMIND</strong> (Grows tree ontology; earlier skills shielded)</span>
          </div>
          <div class="legend-item">
            <span class="legend-color legend-prune"></span>
            <span class="legend-text"><strong>Conventional Fine-Tuning</strong> (Weights overwritten; earlier skills degrade)</span>
          </div>
        </div>

        <p class="chart-note">
          * Benchmark: Verified skill retention rate across consecutive task demonstration sequences without retraining.
        </p>
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

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.problem-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.card-top {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.card-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--muted);
  opacity: 0.7;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
}

.problem-text {
  font-size: 0.94rem;
  color: var(--muted);
  line-height: 1.6;
}

.label-tag {
  color: var(--text);
}

.response-box {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  margin-top: auto;
}

.response-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-growth);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

.response-text {
  font-size: 0.88rem;
  color: var(--text);
  line-height: 1.5;
}

.chart-wrapper {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.chart-subtitle {
  font-size: 0.88rem;
  color: var(--muted);
}

.chart-box {
  width: 100%;
}

.chart-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.axis-text {
  font-size: 11px;
  fill: var(--muted);
  font-family: 'JetBrains Mono', monospace;
}

.axis-title {
  font-size: 11px;
  fill: var(--muted);
  letter-spacing: 0.05em;
}

.point {
  cursor: pointer;
  transition: transform 0.2s;
}

.point:hover {
  transform: scale(1.4);
}

.chart-legend {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.86rem;
  color: var(--text);
}

.legend-color {
  width: 14px;
  height: 4px;
  border-radius: 2px;
}

.legend-growth { background: var(--accent-growth); }
.legend-prune { background: var(--accent-prune); }

.chart-note {
  font-size: 0.78rem;
  color: var(--muted);
  margin-top: var(--space-3);
  font-style: italic;
}
</style>
