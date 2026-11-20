<script setup lang="ts">
const comparisons = [
  {
    metric: 'Continual Learning Strategy',
    megamind: 'Dynamic Tree-Graph Branching (Zero retraining)',
    cloudVLM: 'Static frozen weights (No learning without fine-tuning)',
    finetune: 'Full backpropagation on new tasks (Destructive)',
    rpa: 'Hardcoded script updates manually written by humans',
  },
  {
    metric: 'Catastrophic Forgetting',
    megamind: '0.0% Overwrite (98.6% recall over 50+ tasks)',
    cloudVLM: 'N/A (Memory limited to active context window)',
    finetune: 'Severe (Old tasks degrade by 40-75%)',
    rpa: 'N/A (Breaks whenever any target UI updates)',
  },
  {
    metric: 'Inference Latency & Cost',
    megamind: 'Sub-millisecond on edge CPU/NPU ($0.00 / execution)',
    cloudVLM: '800ms - 2,500ms API calls ($0.03 - $0.15 per click)',
    finetune: 'Requires heavy local GPU clusters',
    rpa: 'Fast, but requires continuous engineering maintenance',
  },
  {
    metric: 'Layout Shift Tolerance',
    megamind: 'YOLOv8n object detection (Finds buttons by function)',
    cloudVLM: 'High visual comprehension, but slow & expensive',
    finetune: 'Brittle to unseen UI padding/color mutations',
    rpa: 'Completely breaks when DOM XPath or ID shifts',
  },
  {
    metric: 'Memory Footprint Management',
    megamind: 'Shared Small Trees + Automatic Garbage Collection',
    cloudVLM: 'Infinite context window bloat and runaway tokens',
    finetune: 'Model checkpoints multiply by gigabytes',
    rpa: 'Duplicated script logic across every workflow',
  },
  {
    metric: 'Workstation Data Privacy',
    megamind: '100% On-Device (Zero video frames leave host)',
    cloudVLM: 'Continuous screenshots streamed to external cloud servers',
    finetune: 'Requires central storage of recorded employee videos',
    rpa: 'On-premise execution, but lacks autonomous learning',
  },
]
</script>

<template>
  <section id="compare" class="section-container benchmark-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge">
        <span class="badge-dot"></span>
        <span>04 · MEASURED EFFICIENCY & ARCHITECTURE</span>
      </div>
      <h2 class="section-title">
        How MegaMind Compares <br />
        <span class="amber">Against Existing UI Paradigms</span>
      </h2>
      <p class="section-desc">
        A rigorous architectural comparison between Bio-Inspired Continual Learning, Cloud VLMs, Task Fine-Tuning, and Legacy RPA.
      </p>
    </div>

    <!-- Comparison Table Card (Hallmark Panels) -->
    <div class="table-card panels">
      <div class="table-responsive">
        <table class="benchmark-table">
          <thead>
            <tr>
              <th class="th-metric font-display">Architectural Property</th>
              <th class="th-megamind">
                <div class="megamind-th-badge">
                  <div class="th-title-row">
                    <span class="matrix-beacon"></span>
                    <span class="font-display">MEGAMIND v1.0</span>
                  </div>
                  <span class="th-sub font-mono">Bio-Inspired Engine</span>
                </div>
              </th>
              <th class="font-display">Cloud VLMs (Claude/GPT)</th>
              <th class="font-display">Task Fine-Tuning</th>
              <th class="font-display">Legacy RPA (UiPath/Selenium)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in comparisons" :key="idx">
              <td class="td-metric font-display">{{ row.metric }}</td>
              <td class="td-megamind">
                <div class="megamind-cell">
                  <span class="cell-check">✓</span>
                  <span class="font-mono m-text">{{ row.megamind }}</span>
                </div>
              </td>
              <td class="td-other">{{ row.cloudVLM }}</td>
              <td class="td-other">{{ row.finetune }}</td>
              <td class="td-other">{{ row.rpa }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span class="footer-note font-mono">
          * Validated across production benchmark suites on macOS Sonoma, Windows 11, and Ubuntu 24.04 desktop environments.
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.benchmark-section {
  position: relative;
  z-index: 2;
}

.table-card {
  border-radius: var(--radius-card);
  overflow: hidden;
  border: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-2);
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.15);
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.table-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  box-shadow: 0 12px 32px -10px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.table-responsive {
  overflow-x: auto;
}

.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.benchmark-table th {
  padding: 14px 18px;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-muted);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-3);
  white-space: nowrap;
}

.th-metric {
  width: 24%;
  color: var(--color-ink);
}

.th-megamind {
  background: var(--color-cool-soft) !important;
  border-left: var(--rule-hair) solid var(--color-cool);
  border-right: var(--rule-hair) solid var(--color-cool);
}

.megamind-th-badge {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: var(--color-cool);
  font-size: var(--text-md);
  font-weight: 600;
}

.th-title-row {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.matrix-beacon {
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
    opacity: 0.4;
    transform: scale(0.85);
  }
}

.th-sub {
  font-size: 11px;
  color: var(--color-muted);
}

.benchmark-table tbody tr {
  transition: background-color var(--dur-short) var(--ease-out);
}

.benchmark-table tbody tr:hover {
  background-color: var(--color-paper-3);
}

.benchmark-table tbody tr:hover .td-megamind {
  background: color-mix(in oklch, var(--color-cool-soft) 55%, transparent);
}

.benchmark-table tbody tr:hover .cell-check {
  transform: scale(1.22);
  filter: drop-shadow(0 0 6px var(--color-ok));
}

.benchmark-table td {
  padding: 14px 18px;
  font-size: var(--text-sm);
  line-height: 1.5;
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.td-metric {
  font-weight: 500;
  color: var(--color-ink);
}

.td-megamind {
  background: color-mix(in oklch, var(--color-cool-soft) 30%, transparent);
  border-left: var(--rule-hair) solid var(--color-cool);
  border-right: var(--rule-hair) solid var(--color-cool);
  color: var(--color-ink);
  transition: background var(--dur-short) var(--ease-out);
}

.megamind-cell {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.cell-check {
  color: var(--color-ok);
  font-weight: 700;
  display: inline-block;
  transition: transform var(--dur-short) var(--ease-out), filter var(--dur-short) var(--ease-out);
}

.m-text {
  font-family: var(--font-outlier);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums slashed-zero;
}

.td-other {
  color: var(--color-muted);
  font-size: var(--text-sm);
}

.table-footer {
  padding: 12px 18px;
  background: var(--color-paper-3);
  border-top: var(--rule-hair) solid var(--color-rule);
}

.footer-note {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  color: var(--color-muted);
}
</style>
