<script setup lang="ts">
import { ref, computed } from 'vue'

// Active Studio Tab
type StudioTab = 'perception' | 'treegraph' | 'gate'
const activeTab = ref<StudioTab>('perception')

// ==================== 1. PERCEPTION SIMULATOR STATE ====================
const isShifted = ref(false)
const showBoundingBoxes = ref(true)
const selectedElement = ref<string | null>('btn-submit')

const detectedElements = computed(() => [
  {
    id: 'icon-search',
    name: 'Search Navigation Input',
    type: 'input',
    confidence: '97.2%',
    status: 'Reusable Anchor',
  },
  {
    id: 'select-range',
    name: 'Time Range Selector (Dropdown)',
    type: 'dropdown',
    confidence: '98.7%',
    status: 'Filter Affordance',
  },
  {
    id: 'card-metric-a',
    name: 'Primary Metric Affordance',
    type: 'card',
    confidence: '98.9%',
    status: 'Data Visualizer',
  },
  {
    id: 'card-metric-b',
    name: 'Continual Retention Affordance',
    type: 'card',
    confidence: '98.1%',
    status: 'Status Container',
  },
  {
    id: 'table-stream',
    name: 'Workflow Telemetry Stream',
    type: 'table',
    confidence: '99.2%',
    status: 'Data Grid Target',
  },
  {
    id: 'btn-submit',
    name: 'Primary Action Button',
    type: 'button',
    confidence: '98.4%',
    status: 'Task Target (Click)',
  },
  {
    id: 'btn-export',
    name: 'Secondary Export Button',
    type: 'button',
    confidence: '96.5%',
    status: 'Context Action',
  },
])

function toggleLayoutShift() {
  isShifted.value = !isShifted.value
}

// ==================== 2. TREE-GRAPH MEMORY SIMULATOR STATE ====================
interface SmallTree {
  id: string
  name: string
  refCount: number
  lastUsed: string
  decay: number
}

interface BigTree {
  id: string
  name: string
  context: string
  skills: string[]
}

const smallTrees = ref<SmallTree[]>([
  { id: 'st-login', name: 'OAuth Login', refCount: 2, lastUsed: 'Just now', decay: 100 },
  { id: 'st-search', name: 'Search Query', refCount: 2, lastUsed: '2s ago', decay: 95 },
  { id: 'st-form', name: 'Form Fill', refCount: 1, lastUsed: '12s ago', decay: 80 },
  { id: 'st-export', name: 'CSV Export', refCount: 1, lastUsed: '45s ago', decay: 65 },
  { id: 'st-orphan', name: 'Legacy Report', refCount: 0, lastUsed: '5m ago', decay: 10 },
])

const bigTrees = ref<BigTree[]>([
  { id: 'bt-1', name: 'Export Monthly Data (Web)', context: 'Chrome', skills: ['st-login', 'st-search', 'st-export'] },
  { id: 'bt-2', name: 'Sync User Profile (App)', context: 'Electron', skills: ['st-login', 'st-search', 'st-form'] },
])

const gcTriggered = ref(false)

function runGarbageCollector() {
  gcTriggered.value = true
  setTimeout(() => {
    smallTrees.value = smallTrees.value.filter((st) => st.refCount > 0)
    gcTriggered.value = false
  }, 600)
}

function removeBigTree(id: string) {
  const tree = bigTrees.value.find((b) => b.id === id)
  if (!tree) return
  tree.skills.forEach((skillId) => {
    const st = smallTrees.value.find((s) => s.id === skillId)
    if (st && st.refCount > 0) st.refCount--
  })
  bigTrees.value = bigTrees.value.filter((b) => b.id !== id)
}

function resetMemoryPlayground() {
  smallTrees.value = [
    { id: 'st-login', name: 'OAuth Login', refCount: 2, lastUsed: 'Just now', decay: 100 },
    { id: 'st-search', name: 'Search Query', refCount: 2, lastUsed: '2s ago', decay: 95 },
    { id: 'st-form', name: 'Form Fill', refCount: 1, lastUsed: '12s ago', decay: 80 },
    { id: 'st-export', name: 'CSV Export', refCount: 1, lastUsed: '45s ago', decay: 65 },
    { id: 'st-orphan', name: 'Legacy Report', refCount: 0, lastUsed: '5m ago', decay: 10 },
  ]
  bigTrees.value = [
    { id: 'bt-1', name: 'Export Monthly Data (Web)', context: 'Chrome', skills: ['st-login', 'st-search', 'st-export'] },
    { id: 'bt-2', name: 'Sync User Profile (App)', context: 'Electron', skills: ['st-login', 'st-search', 'st-form'] },
  ]
}

// ==================== 3. GROWTH GATE SIMULATOR STATE ====================
const minReps = ref(3)
const cohesionThreshold = ref(85)
const minRelevance = ref(80)

const sampleClusters = computed(() => [
  {
    name: 'Export CSV Workflow (Chrome)',
    reps: 4,
    cohesion: 92,
    relevance: 95,
    status: 4 >= minReps.value && 92 >= cohesionThreshold.value && 95 >= minRelevance.value,
  },
  {
    name: 'Accidental Mouse Twitch / Misclick',
    reps: 1,
    cohesion: 34,
    relevance: 20,
    status: 1 >= minReps.value && 34 >= cohesionThreshold.value && 20 >= minRelevance.value,
  },
  {
    name: 'Profile Form Input Sequence',
    reps: 3,
    cohesion: 88,
    relevance: 82,
    status: 3 >= minReps.value && 88 >= cohesionThreshold.value && 82 >= minRelevance.value,
  },
])
</script>

<template>
  <section id="interactive-console" class="section-container console-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge font-mono">
        <span class="badge-dot"></span>
        <span>01 · INTERACTIVE SIMULATION STUDIO</span>
      </div>
      <h2 class="section-title">
        Experience MegaMind in Real-Time Simulation <br />
        <span class="amber">Perception Cortex & Dynamic Memory</span>
      </h2>
      <p class="section-desc">
        Watch how on-device perception tracks buttons despite layout shifts, how shared skills avoid duplicate weights, and how the Growth Gate rejects noisy actions.
      </p>
    </div>

    <!-- Main Studio Box -->
    <div class="console-box">
      <!-- Studio Navigation Bar -->
      <div class="console-nav">
        <div class="console-tabs">
          <button
            class="tab-btn font-display"
            :class="{ active: activeTab === 'perception' }"
            @click="activeTab = 'perception'"
          >
            <span class="tab-label">1. Perception Cortex</span>
            <span class="tab-indicator font-mono">YOLOv8n</span>
          </button>

          <button
            class="tab-btn font-display"
            :class="{ active: activeTab === 'treegraph' }"
            @click="activeTab = 'treegraph'"
          >
            <span class="tab-label">2. Tree-Graph Memory</span>
            <span class="tab-indicator font-mono">Shared LTM</span>
          </button>

          <button
            class="tab-btn font-display"
            :class="{ active: activeTab === 'gate' }"
            @click="activeTab = 'gate'"
          >
            <span class="tab-label">3. Growth Gatekeeper</span>
            <span class="tab-indicator font-mono">Statistical Filter</span>
          </button>
        </div>

        <div class="console-status-pill font-mono">
          <span class="status-dot"></span>
          <span>Engine: LIVE RUNTIME</span>
        </div>
      </div>

      <!-- Studio Body Content -->
      <div class="console-content">
        <!-- ==================== TAB 1: PERCEPTION CORTEX ==================== -->
        <div v-if="activeTab === 'perception'" class="tab-view perception-view">
          <div class="view-header">
            <div class="view-header-text">
              <h3 class="view-title font-display">Task-Relevant Object Localization (YOLOv8n)</h3>
              <p class="view-desc">
                Unlike DOM xpath or pixel coordinates that break when developers update an interface, MegaMind's vision encoder identifies functional elements semantically.
              </p>
            </div>
            <div class="view-controls">
              <button class="action-btn font-display" @click="toggleLayoutShift">
                {{ isShifted ? 'Restore Baseline Layout' : 'Shift UI Layout (A/B Test)' }}
              </button>
              <button class="action-btn-ghost font-display" @click="showBoundingBoxes = !showBoundingBoxes">
                {{ showBoundingBoxes ? 'Hide BBoxes' : 'Show BBoxes' }}
              </button>
            </div>
          </div>

          <div class="perception-canvas-split">
            <!-- Simulated Application Screen with Embedded Bounding Boxes (Zero Drift / Zero Overlap) -->
            <div class="screen-mockup">
              <div class="screen-top-bar">
                <div class="window-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="mock-url-bar font-mono">https://internal.dashboard/analytics</div>
                <div class="screen-badge font-mono">Layout: {{ isShifted ? 'A/B Shifted' : 'Standard Baseline' }}</div>
              </div>

              <div class="screen-viewport" :class="{ 'is-layout-shifted': isShifted }">
                <!-- Nav Row: Brand + Search + Time Range Filter Dropdown -->
                <div class="mock-row nav-row" :class="{ 'shifted-order': isShifted }">
                  <div class="mock-brand">
                    <span class="brand-square"></span>
                    <span class="brand-line"></span>
                  </div>

                  <div class="nav-controls-group">
                    <!-- Element: Search Input -->
                    <div
                      class="target-anchor search-anchor"
                      :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'icon-search' }"
                      @click="selectedElement = 'icon-search'"
                    >
                      <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                        <span>input</span>
                        <span class="conf">97.2%</span>
                      </div>
                      <span class="search-glyph">🔍</span>
                      <span class="search-placeholder">Search records...</span>
                    </div>

                    <!-- Element: Time Range Filter Dropdown -->
                    <div
                      class="target-anchor filter-dropdown-anchor"
                      :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'select-range' }"
                      @click="selectedElement = 'select-range'"
                    >
                      <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                        <span>dropdown</span>
                        <span class="conf">98.7%</span>
                      </div>
                      <span class="filter-icon font-mono">📅</span>
                      <span class="filter-val font-mono">Last 30 Days ▾</span>
                    </div>
                  </div>
                </div>

                <!-- Cards Row -->
                <div class="mock-row cards-row" :class="{ 'shifted-cards': isShifted }">
                  <!-- Element: Metric Card A -->
                  <div
                    class="target-anchor metric-card-anchor"
                    :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'card-metric-a' }"
                    @click="selectedElement = 'card-metric-a'"
                  >
                    <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                      <span>card</span>
                      <span class="conf">98.9%</span>
                    </div>
                    <span class="metric-label">Active Deployments</span>
                    <span class="metric-number font-mono">1,482</span>
                  </div>

                  <!-- Element: Metric Card B -->
                  <div
                    class="target-anchor metric-card-anchor"
                    :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'card-metric-b' }"
                    @click="selectedElement = 'card-metric-b'"
                  >
                    <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                      <span>card</span>
                      <span class="conf">98.1%</span>
                    </div>
                    <span class="metric-label">Continual Retention</span>
                    <span class="metric-number font-mono ok-val">98.6%</span>
                  </div>
                </div>

                <!-- Data Table Row: Real-time Workflow Stream -->
                <div
                  class="target-anchor table-stream-anchor"
                  :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'table-stream' }"
                  @click="selectedElement = 'table-stream'"
                >
                  <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                    <span>table</span>
                    <span class="conf">99.2%</span>
                  </div>

                  <div class="mock-table-head font-mono">
                    <span>WORKFLOW ACTION</span>
                    <span>TARGET AFFORDANCE</span>
                    <span>LATENCY</span>
                    <span>STATUS</span>
                  </div>

                  <div class="mock-table-body font-mono">
                    <div class="mock-table-row">
                      <span class="row-title">OAuth Authenticate</span>
                      <span class="row-target">#login-btn</span>
                      <span class="row-lat text-cool">0.42ms</span>
                      <span class="row-badge badge-green">✓ Verified</span>
                    </div>
                    <div class="mock-table-row">
                      <span class="row-title">Sync Profile Form</span>
                      <span class="row-target">#form-input</span>
                      <span class="row-lat text-cool">0.78ms</span>
                      <span class="row-badge badge-blue">● Active</span>
                    </div>
                    <div class="mock-table-row">
                      <span class="row-title">Export Monthly CSV</span>
                      <span class="row-target">#btn-export</span>
                      <span class="row-lat text-cool">0.55ms</span>
                      <span class="row-badge badge-green">✓ Verified</span>
                    </div>
                    <div class="mock-table-row">
                      <span class="row-title">Auto-Prune LTM Skill</span>
                      <span class="row-target">#gc-daemon</span>
                      <span class="row-lat text-cool">0.28ms</span>
                      <span class="row-badge badge-green">✓ Pruned</span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons & Status Footer Row -->
                <div class="mock-row actions-row" :class="{ 'shifted-actions': isShifted }">
                  <div class="action-btns-left">
                    <!-- Element: Primary Action -->
                    <div
                      class="target-anchor btn-anchor primary-btn-anchor"
                      :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'btn-submit' }"
                      @click="selectedElement = 'btn-submit'"
                    >
                      <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                        <span>button</span>
                        <span class="conf">98.4%</span>
                      </div>
                      <span>Execute Action</span>
                    </div>

                    <!-- Element: Secondary Export -->
                    <div
                      class="target-anchor btn-anchor secondary-btn-anchor"
                      :class="{ 'bbox-active': showBoundingBoxes, selected: selectedElement === 'btn-export' }"
                      @click="selectedElement = 'btn-export'"
                    >
                      <div v-if="showBoundingBoxes" class="bbox-tag font-mono">
                        <span>button</span>
                        <span class="conf">96.5%</span>
                      </div>
                      <span>Export CSV</span>
                    </div>
                  </div>

                  <div class="mock-status-chip font-mono">
                    <span class="pulse-indicator"></span>
                    <span>Stream: 60 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inspector Telemetry Sidebar -->
            <div class="perception-sidebar">
              <div class="sidebar-header">
                <span class="sidebar-tag font-display">YOLOv8n Inference Feed</span>
                <span class="inference-time font-mono">⚡ 0.82ms (Edge ONNX)</span>
              </div>

              <div class="detected-list">
                <div
                  v-for="el in detectedElements"
                  :key="el.id"
                  class="element-chip"
                  :class="{ selected: selectedElement === el.id }"
                  @click="selectedElement = el.id"
                >
                  <div class="chip-top">
                    <span class="element-name font-display">{{ el.name }}</span>
                    <span class="element-conf font-mono">{{ el.confidence }}</span>
                  </div>
                  <div class="chip-bottom">
                    <span class="badge-type font-mono">{{ el.type }}</span>
                    <span class="badge-role">{{ el.status }}</span>
                  </div>
                </div>
              </div>

              <div class="inference-summary-card">
                <div class="sum-title font-display">Resilience Guarantee</div>
                <p class="sum-desc">
                  When button coordinates change due to screen resizing or A/B testing, the YOLOv8n bounding box tracker maintains element identity without requiring a retrained model.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== TAB 2: TREE-GRAPH MEMORY ==================== -->
        <div v-else-if="activeTab === 'treegraph'" class="tab-view memory-view">
          <div class="view-header">
            <div class="view-header-text">
              <h3 class="view-title font-display">Hierarchical Skill Ontology & Self-Pruning</h3>
              <p class="view-desc">
                Compound Big Trees reference shared atomic Small Trees. When compound tasks are deleted, reference counting automatically identifies orphaned skills for garbage collection.
              </p>
            </div>
            <div class="view-controls">
              <button
                class="action-btn-danger font-display"
                :disabled="gcTriggered"
                @click="runGarbageCollector"
              >
                {{ gcTriggered ? 'Pruning Memory...' : 'Trigger Garbage Collector' }}
              </button>
              <button class="action-btn-ghost font-display" @click="resetMemoryPlayground">
                Reset Graph
              </button>
            </div>
          </div>

          <div class="memory-grid-split">
            <!-- Left: Big Trees (Compound Tasks) -->
            <div class="memory-column">
              <div class="col-head font-display">
                <span>Big Trees (Active Tasks)</span>
                <span class="col-count font-mono">{{ bigTrees.length }}</span>
              </div>

              <div class="big-tree-list">
                <div v-for="bt in bigTrees" :key="bt.id" class="big-tree-card">
                  <div class="bt-header">
                    <div>
                      <h4 class="bt-title font-display">{{ bt.name }}</h4>
                      <span class="bt-context font-mono">App Context: {{ bt.context }}</span>
                    </div>
                    <button class="bt-delete-btn" title="Remove this task" @click="removeBigTree(bt.id)">
                      ✕
                    </button>
                  </div>

                  <div class="bt-skills-pills">
                    <span v-for="s in bt.skills" :key="s" class="skill-ref-pill font-mono">
                      → {{ smallTrees.find((x) => x.id === s)?.name || s }}
                    </span>
                  </div>
                </div>

                <div v-if="bigTrees.length === 0" class="empty-state font-mono">
                  All compound tasks removed. Notice how shared skills now have ref_count = 0.
                </div>
              </div>
            </div>

            <!-- Right: Small Trees (Shared Atomic Skills) -->
            <div class="memory-column">
              <div class="col-head font-display">
                <span>Shared Small Trees (Atomic Skills)</span>
                <span class="col-count font-mono">{{ smallTrees.length }}</span>
              </div>

              <div class="small-tree-list">
                <div
                  v-for="st in smallTrees"
                  :key="st.id"
                  class="small-tree-card"
                  :class="{ orphan: st.refCount === 0 }"
                >
                  <div class="st-top">
                    <h4 class="st-title font-display">{{ st.name }}</h4>
                    <span
                      class="st-ref-badge font-mono"
                      :class="st.refCount > 0 ? 'active-ref' : 'orphan-ref'"
                    >
                      ref_count: {{ st.refCount }}
                    </span>
                  </div>

                  <div class="st-meta font-mono">
                    <span>Last Invoked: {{ st.lastUsed }}</span>
                    <span>Edge Decay: {{ st.decay }}%</span>
                  </div>

                  <div v-if="st.refCount === 0" class="orphan-alert font-mono">
                    ⚠️ ORPHANED SKILL — Scheduled for Garbage Collection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== TAB 3: GROWTH GATEKEEPER ==================== -->
        <div v-else class="tab-view gate-view">
          <div class="view-header">
            <div class="view-header-text">
              <h3 class="view-title font-display">Growth-Check Gatekeeper (STM → LTM)</h3>
              <p class="view-desc">
                The firewall preventing memory pollution. Adjust hyperparameters below to see how candidate action clusters from screen recordings are filtered before promotion.
              </p>
            </div>
          </div>

          <div class="gate-grid-split">
            <!-- Parameter Controls -->
            <div class="gate-controls-card">
              <div class="card-head font-display">Hyperparameter Calibration</div>

              <div class="slider-group">
                <div class="slider-label">
                  <span>min_repetitions (N)</span>
                  <span class="slider-val font-mono">{{ minReps }} times</span>
                </div>
                <input v-model.number="minReps" type="range" min="1" max="5" class="slider-input" />
                <span class="slider-hint">Minimum required occurrences of the action cluster.</span>
              </div>

              <div class="slider-group">
                <div class="slider-label">
                  <span>cohesion_threshold</span>
                  <span class="slider-val font-mono">{{ cohesionThreshold }}%</span>
                </div>
                <input v-model.number="cohesionThreshold" type="range" min="50" max="95" class="slider-input" />
                <span class="slider-hint">Order & timing consistency across observations.</span>
              </div>

              <div class="slider-group">
                <div class="slider-label">
                  <span>min_relevant_ratio</span>
                  <span class="slider-val font-mono">{{ minRelevance }}%</span>
                </div>
                <input v-model.number="minRelevance" type="range" min="50" max="95" class="slider-input" />
                <span class="slider-hint">Fraction of actions touching detected task elements.</span>
              </div>
            </div>

            <!-- Candidate Cluster Results -->
            <div class="clusters-feed">
              <div class="card-head font-display">Candidate Action Clusters in STM Buffer</div>

              <div class="cluster-cards-stack">
                <div
                  v-for="(c, idx) in sampleClusters"
                  :key="idx"
                  class="cluster-card"
                  :class="c.status ? 'cluster-promoted' : 'cluster-held'"
                >
                  <div class="cluster-top">
                    <h4 class="cluster-name font-display">{{ c.name }}</h4>
                    <span
                      class="decision-badge font-mono"
                      :class="c.status ? 'pass' : 'fail'"
                    >
                      {{ c.status ? '✓ PROMOTED TO LTM' : '✕ HELD / DISCARDED' }}
                    </span>
                  </div>

                  <div class="cluster-metrics-row font-mono">
                    <div class="metric-pill">
                      <span>Reps:</span>
                      <strong>{{ c.reps }} (req ≥ {{ minReps }})</strong>
                    </div>
                    <div class="metric-pill">
                      <span>Cohesion:</span>
                      <strong>{{ c.cohesion }}% (req ≥ {{ cohesionThreshold }}%)</strong>
                    </div>
                    <div class="metric-pill">
                      <span>Relevance:</span>
                      <strong>{{ c.relevance }}% (req ≥ {{ minRelevance }}%)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.console-section {
  position: relative;
  z-index: 2;
}

/* Header Centering */
.section-header.text-center {
  text-align: center;
  margin-inline: auto;
  margin-bottom: clamp(2rem, 4vh, 3.5rem);
  max-width: 72ch;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header.text-center .section-desc {
  margin-inline: auto;
}

/* Main Console Container */
.console-box {
  border-radius: var(--radius-card);
  overflow: hidden;
  border: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-2);
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.15);
  transition: border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.console-box:hover {
  border-color: var(--color-rule-2);
}

/* Console Nav */
.console-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: var(--color-paper-3);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  flex-wrap: wrap;
  gap: 12px;
}

.console-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  color: var(--color-ink-2);
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--dur-short) var(--ease-out);
}

.tab-btn:hover {
  background: color-mix(in oklch, var(--color-paper-2) 80%, white);
  color: var(--color-ink);
}

.tab-btn.active {
  background: var(--color-paper-2);
  border-color: var(--color-cool);
  color: var(--color-cool);
}

.tab-indicator {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-paper-3);
  color: var(--color-muted);
}

.tab-btn.active .tab-indicator {
  background: var(--color-cool-soft);
  color: var(--color-cool);
}

.console-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--color-cool);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  padding: 6px 12px;
  border-radius: var(--radius-pill);
}

.status-dot {
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

/* Content Area */
.console-content {
  padding: var(--space-xl);
}

@media (max-width: 640px) {
  .console-content {
    padding: var(--space-md);
  }
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.view-header-text {
  flex: 1;
  min-width: 260px;
}

.view-title {
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--color-ink);
  margin-bottom: 4px;
}

.view-desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.5;
  max-width: 640px;
}

.view-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.action-btn {
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border: var(--rule-hair) solid var(--color-accent);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--text-xs);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--dur-short);
}

.action-btn:hover {
  background: color-mix(in oklch, var(--color-accent) 88%, white);
}

.action-btn-danger {
  background: var(--color-bad-soft);
  border: var(--rule-hair) solid var(--color-bad);
  color: var(--color-bad);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--text-xs);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--dur-short);
}

.action-btn-danger:hover:not(:disabled) {
  background: color-mix(in oklch, var(--color-bad-soft) 80%, white);
}

.action-btn-ghost {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--dur-short);
}

.action-btn-ghost:hover {
  border-color: var(--color-cool);
  color: var(--color-cool);
}

/* Perception View Layout */
.perception-canvas-split {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: var(--space-md);
  align-items: stretch;
}

@media (max-width: 960px) {
  .perception-canvas-split {
    grid-template-columns: 1fr;
  }
}

.screen-mockup {
  position: relative;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out);
}

.screen-mockup:hover {
  transform: translateY(-2px);
  border-color: var(--color-rule-2);
  box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.2), 0 0 16px -4px var(--color-cool-soft);
}

.screen-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: var(--color-paper-2);
  border-bottom: var(--rule-hair) solid var(--color-rule);
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.red { background: var(--color-bad); }
.dot.yellow { background: var(--color-accent); }
.dot.green { background: var(--color-ok); }

.mock-url-bar {
  font-family: var(--font-outlier);
  font-size: 11px;
  color: var(--color-muted);
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  padding: 2px 10px;
  border-radius: 4px;
}

.screen-badge {
  font-family: var(--font-outlier);
  font-size: 11px;
  color: var(--color-cool);
  font-weight: 500;
}

/* Screen Viewport with Embedded Anchors (No Unwanted Overlap) */
.screen-viewport {
  position: relative;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  background: var(--color-paper-3);
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
}

.screen-viewport::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-cool), transparent);
  opacity: 0.65;
  box-shadow: 0 0 12px var(--color-cool);
  animation: radar-sweep 4s ease-in-out infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes radar-sweep {
  0% {
    top: 0%;
    opacity: 0;
  }
  15% {
    opacity: 0.8;
  }
  85% {
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.mock-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: all var(--dur-normal) var(--ease-out);
}

.mock-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-square {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: var(--color-cool);
}

.brand-line {
  width: 60px;
  height: 8px;
  border-radius: 4px;
  background: var(--color-rule-2);
}

/* Bounding Box Anchors */
.target-anchor {
  position: relative;
  transition: all var(--dur-short) var(--ease-out);
  cursor: pointer;
  border: var(--rule-hair) solid transparent;
  border-radius: 6px;
}

.target-anchor:hover {
  transform: translateY(-2px);
}

.target-anchor.bbox-active {
  border-color: var(--color-cool);
  background: var(--color-cool-soft);
  animation: bbox-pulse 2.8s ease-in-out infinite;
}

.target-anchor.bbox-active.selected {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
  animation: none;
  box-shadow: 0 0 14px var(--color-accent-soft);
}

@keyframes bbox-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in oklch, var(--color-cool) 35%, transparent);
  }
  50% {
    box-shadow: 0 0 0 5px color-mix(in oklch, var(--color-cool) 35%, transparent), 0 0 14px -2px var(--color-cool);
  }
}

.bbox-tag {
  position: absolute;
  top: -18px;
  left: -1px;
  display: flex;
  gap: 4px;
  font-family: var(--font-outlier);
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 2px;
  background: var(--color-cool);
  color: var(--color-paper-3);
  pointer-events: none;
  z-index: 5;
}

.target-anchor.bbox-active.selected .bbox-tag {
  background: var(--color-accent);
  color: var(--color-accent-ink);
}

.nav-controls-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Search Anchor */
.search-anchor {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-paper-2);
  min-width: 140px;
}

.search-glyph {
  font-size: 12px;
}

.search-placeholder {
  font-size: 11px;
  color: var(--color-muted);
}

/* Filter Dropdown Anchor */
.filter-dropdown-anchor {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: var(--color-paper-2);
  font-family: var(--font-outlier);
  font-size: 11px;
  color: var(--color-muted);
}

.filter-icon {
  font-size: 11px;
}

.filter-val {
  color: var(--color-ink);
  font-weight: 500;
}

.nav-row.shifted-order {
  flex-direction: row-reverse;
}

/* Cards Row */
.cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.shifted-cards {
  grid-template-columns: 1fr 1.4fr;
}

.metric-card-anchor {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  background: var(--color-paper-2);
  border-radius: var(--radius-card);
}

.metric-label {
  font-size: 10.5px;
  color: var(--color-muted);
}

.metric-number {
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-ink);
  font-variant-numeric: tabular-nums slashed-zero;
}

.metric-number.ok-val {
  color: var(--color-cool);
}

/* Table Stream Anchor */
.table-stream-anchor {
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.mock-table-head {
  display: grid;
  grid-template-columns: 1.8fr 1.3fr 0.9fr 1.1fr;
  font-size: 9.5px;
  font-weight: 600;
  color: var(--color-muted);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  padding-bottom: 6px;
  letter-spacing: 0.04em;
}

.mock-table-body {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  gap: 4px;
}

.mock-table-row {
  display: grid;
  grid-template-columns: 1.8fr 1.3fr 0.9fr 1.1fr;
  align-items: center;
  font-size: 10.5px;
  padding: 4px 0;
  border-bottom: var(--rule-hair) solid color-mix(in oklch, var(--color-rule) 40%, transparent);
}

.mock-table-row:last-child {
  border-bottom: none;
}

.row-title {
  color: var(--color-ink);
  font-weight: 500;
}

.row-target {
  color: var(--color-muted);
  font-size: 10px;
}

.row-lat {
  font-variant-numeric: tabular-nums;
  color: var(--color-cool);
  font-size: 10.5px;
}

.row-badge {
  display: inline-flex;
  align-items: center;
  font-size: 9.5px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 3px;
  width: fit-content;
}

.badge-green {
  background: var(--color-ok-soft);
  color: var(--color-ok);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-ok) 35%, transparent);
}

.badge-blue {
  background: var(--color-cool-soft);
  color: var(--color-cool);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-cool) 35%, transparent);
}

/* Actions Row */
.actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
}

.shifted-actions {
  flex-direction: row-reverse;
}

.action-btns-left {
  display: flex;
  gap: 10px;
  align-items: center;
}

.mock-status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--color-muted);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
}

.pulse-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ok);
  box-shadow: 0 0 6px var(--color-ok);
  animation: beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.btn-anchor {
  padding: 7px 16px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  text-align: center;
}

.primary-btn-anchor {
  background: var(--color-accent);
  color: var(--color-accent-ink);
}

.secondary-btn-anchor {
  background: var(--color-paper-2);
  color: var(--color-ink);
  border: var(--rule-hair) solid var(--color-rule-2);
}

/* Perception Sidebar */
.perception-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  padding-bottom: 8px;
}

.sidebar-tag {
  color: var(--color-ink);
  font-weight: 500;
}

.inference-time {
  color: var(--color-cool);
  font-variant-numeric: tabular-nums slashed-zero;
}

.detected-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.element-chip {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.element-chip:hover {
  transform: translateY(-2px);
  border-color: var(--color-cool);
  box-shadow: 0 4px 14px -4px var(--color-cool-soft);
}

.element-chip.selected {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
  box-shadow: 0 4px 16px -4px var(--color-accent-soft);
}

.chip-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.element-name {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-ink);
}

.element-conf {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-cool);
  font-variant-numeric: tabular-nums slashed-zero;
}

.chip-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
}

.badge-type {
  background: var(--color-paper-2);
  padding: 1px 6px;
  border-radius: 3px;
  color: var(--color-muted);
  border: var(--rule-hair) solid var(--color-rule);
}

.badge-role {
  color: var(--color-muted);
}

.inference-summary-card {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 6px;
  padding: 12px 14px;
}

.sum-title {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-cool);
  margin-bottom: 4px;
}

.sum-desc {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-muted);
  line-height: 1.45;
}

/* Tree-Graph Memory Layout */
.memory-grid-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

@media (max-width: 860px) {
  .memory-grid-split {
    grid-template-columns: 1fr;
  }
}

.memory-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.col-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  padding-bottom: 8px;
}

.col-count {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  color: var(--color-muted);
  padding: 2px 8px;
  border-radius: 4px;
}

.big-tree-list, .small-tree-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.big-tree-card {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 6px;
  padding: 14px;
}

.bt-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.bt-title {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-ink);
}

.bt-context {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-muted);
}

.bt-delete-btn {
  background: var(--color-bad-soft);
  border: var(--rule-hair) solid var(--color-bad);
  color: var(--color-bad);
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 11px;
}

.bt-delete-btn:hover {
  background: color-mix(in oklch, var(--color-bad-soft) 80%, white);
}

.bt-skills-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-ref-pill {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  background: var(--color-paper-2);
  color: var(--color-cool);
  border: var(--rule-hair) solid var(--color-rule);
  padding: 2px 8px;
  border-radius: 4px;
}

.small-tree-card {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 6px;
  padding: 14px;
  transition: border-color var(--dur-short) var(--ease-out);
}

.small-tree-card.orphan {
  border-color: var(--color-bad);
  background: var(--color-bad-soft);
}

.st-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.st-title {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-ink);
}

.st-ref-badge {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  padding: 2px 8px;
  border-radius: 4px;
}

.st-ref-badge.active-ref {
  background: var(--color-ok-soft);
  color: var(--color-ok);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-ok) 35%, transparent);
}

.st-ref-badge.orphan-ref {
  background: var(--color-bad-soft);
  color: var(--color-bad);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-bad) 35%, transparent);
}

.st-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-muted);
  font-variant-numeric: tabular-nums slashed-zero;
}

.orphan-alert {
  margin-top: 8px;
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-bad);
  font-weight: 500;
}

.empty-state {
  padding: 20px;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-muted);
  border: var(--rule-hair) dashed var(--color-rule);
  border-radius: 6px;
}

/* Gatekeeper View Layout */
.gate-grid-split {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: var(--space-md);
}

@media (max-width: 860px) {
  .gate-grid-split {
    grid-template-columns: 1fr;
  }
}

.gate-controls-card, .clusters-feed {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: var(--space-md);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-ink);
  margin-bottom: var(--space-md);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  padding-bottom: 8px;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: var(--space-md);
}

.slider-label {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-ink);
  font-weight: 500;
}

.slider-val {
  font-family: var(--font-outlier);
  color: var(--color-accent);
  font-variant-numeric: tabular-nums slashed-zero;
}

.slider-input {
  width: 100%;
  accent-color: var(--color-accent);
}

.slider-hint {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--color-muted);
}

.cluster-cards-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cluster-card {
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: 6px;
  padding: 12px 14px;
}

.cluster-card.cluster-promoted {
  border-color: color-mix(in oklch, var(--color-ok) 40%, transparent);
  background: var(--color-ok-soft);
}

.cluster-card.cluster-held {
  border-color: color-mix(in oklch, var(--color-bad) 40%, transparent);
  background: var(--color-bad-soft);
}

.cluster-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.cluster-name {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-ink);
}

.decision-badge {
  font-family: var(--font-outlier);
  font-size: 11px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 3px;
}

.decision-badge.pass {
  background: var(--color-ok-soft);
  color: var(--color-ok);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-ok) 35%, transparent);
}

.decision-badge.fail {
  background: var(--color-bad-soft);
  color: var(--color-bad);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-bad) 35%, transparent);
}

.cluster-metrics-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.metric-pill {
  font-family: var(--font-outlier);
  font-size: 11px;
  font-variant-numeric: tabular-nums slashed-zero;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  color: var(--color-muted);
  padding: 2px 7px;
  border-radius: 3px;
  display: flex;
  gap: 4px;
}

.metric-pill strong {
  color: var(--color-ink);
}
</style>
