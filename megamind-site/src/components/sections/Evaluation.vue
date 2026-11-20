<script setup lang="ts">
import { evaluationMetrics, detectorResults } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
</script>

<template>
  <section id="evaluation" class="section-container">
    <div class="section-header">
      <Badge variant="done">Production Benchmarks</Badge>
      <h2 class="section-title">Performance & Evaluation Metrics</h2>
      <p class="section-desc">
        Empirical evaluation results across perception, continual skill retention, memory efficiency, and cross-application replay accuracy.
      </p>
    </div>

    <!-- Detector Stat Cards -->
    <div class="detector-stats-row">
      <div class="stat-card">
        <span class="stat-name">mAP@0.5</span>
        <span class="stat-val">{{ detectorResults.mAP05 }}</span>
        <span class="stat-target">Held-out application benchmark</span>
      </div>

      <div class="stat-card">
        <span class="stat-name">Precision</span>
        <span class="stat-val">{{ detectorResults.precision }}</span>
        <span class="stat-target">UI Interactive Element Precision</span>
      </div>

      <div class="stat-card">
        <span class="stat-name">Recall</span>
        <span class="stat-val">{{ detectorResults.recall }}</span>
        <span class="stat-target">Ground-truth detection recall</span>
      </div>

      <div class="stat-card">
        <span class="stat-name">Model Size</span>
        <span class="stat-val">{{ detectorResults.modelSize }}</span>
        <span class="stat-target">Edge ONNX Runtime footprint</span>
      </div>
    </div>

    <!-- Comprehensive Metrics Table -->
    <div class="metrics-table-card">
      <div class="card-header">
        <h3 class="table-heading">Continual Learning & Agent System Metrics</h3>
        <Badge variant="done">v1.0 Production Benchmarks</Badge>
      </div>

      <div class="table-wrap">
        <table class="metrics-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Evaluation Metric</th>
              <th>Operational Definition</th>
              <th class="th-result">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in evaluationMetrics" :key="m.metric">
              <td class="td-phase">
                <span class="phase-tag">{{ m.category }}</span>
              </td>
              <td class="td-metric">
                <strong>{{ m.metric }}</strong>
              </td>
              <td class="td-desc">{{ m.description }}</td>
              <td class="td-result">
                <span class="score-pill">{{ m.result }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card-footer">
        <p class="eval-note">
          * Tested across cross-domain desktop suites (web browsers, native productivity apps, terminal sessions) with varying display resolutions and themes.
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

.detector-stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent-perception);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}

.stat-name {
  font-size: 0.85rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.stat-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text);
  margin: 4px 0;
}

.stat-target {
  font-size: 0.74rem;
  color: var(--muted);
}

.metrics-table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.card-header {
  padding: var(--space-5) var(--space-6);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.table-heading {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
}

.table-wrap {
  overflow-x: auto;
}

.metrics-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border);
  font-size: 0.88rem;
  text-align: left;
}

th {
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.td-phase {
  width: 15%;
}

.phase-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--muted);
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.td-metric {
  color: var(--text);
  width: 25%;
}

.td-desc {
  color: var(--muted);
  line-height: 1.5;
}

.th-result,
.td-result {
  text-align: right;
  width: 15%;
}

.score-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--accent-growth);
  background: rgba(63, 185, 80, 0.12);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(63, 185, 80, 0.35);
}

.card-footer {
  padding: var(--space-4) var(--space-6);
  background: var(--surface-2);
}

.eval-note {
  font-size: 0.8rem;
  color: var(--muted);
  font-style: italic;
}
</style>
