<script setup lang="ts">
import { comparisonRows } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
</script>

<template>
  <section id="compare" class="section-container">
    <div class="section-header">
      <Badge variant="done">Production Comparison</Badge>
      <h2 class="section-title">Why MEGAMIND vs Alternatives</h2>
      <p class="section-desc">
        A technical assessment of UI automation paradigms evaluated against architectural scalability and continual learning.
      </p>
    </div>

    <div class="compare-card">
      <div class="table-responsive">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="th-aspect">Architectural Aspect</th>
              <th>Fine-Tuning per Task</th>
              <th>Record & Replay (RPA)</th>
              <th>Cloud VLMs</th>
              <th class="th-megamind">
                <div class="megamind-th-content">
                  <span>MEGAMIND</span>
                  <Badge variant="done">v1.0 Core</Badge>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparisonRows" :key="row.aspect">
              <td class="td-aspect">{{ row.aspect }}</td>
              <td class="td-other">{{ row.fineTuning }}</td>
              <td class="td-other">{{ row.rpa }}</td>
              <td class="td-other">{{ row.cloudVLM }}</td>
              <td class="td-megamind">
                <strong>{{ row.megamind }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="compare-footer">
        <p class="disclaimer">
          * Validated across production automation suites on desktop and web user interfaces.
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

.compare-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.table-responsive {
  overflow-x: auto;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
}

th {
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.th-aspect {
  width: 22%;
}

.th-megamind {
  background: rgba(88, 166, 255, 0.08);
  border-left: 1px solid rgba(88, 166, 255, 0.2);
  border-right: 1px solid rgba(88, 166, 255, 0.2);
}

.megamind-th-content {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-perception);
}

.td-aspect {
  font-weight: 700;
  color: var(--text);
  background: var(--surface-2);
}

.td-other {
  color: var(--muted);
  line-height: 1.5;
}

.td-megamind {
  background: rgba(88, 166, 255, 0.04);
  border-left: 1px solid rgba(88, 166, 255, 0.15);
  border-right: 1px solid rgba(88, 166, 255, 0.15);
  color: var(--text);
  line-height: 1.5;
}

.compare-footer {
  padding: var(--space-4) var(--space-6);
  background: var(--surface-2);
}

.disclaimer {
  font-size: 0.8rem;
  color: var(--muted);
  font-style: italic;
}
</style>
