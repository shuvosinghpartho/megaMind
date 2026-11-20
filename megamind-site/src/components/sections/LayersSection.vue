<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface LayerTelemetry {
  type: string
  metrics: { label: string; value: string; pass?: boolean }[]
  indicatorText: string
}

interface Layer {
  index: number
  id: string
  title: string
  subtitle: string
  status: 'Production' | 'Active Engine' | 'Validated'
  role: string
  mechanism: string
  codeSnippet: string
  telemetry: LayerTelemetry
}

const activeIndex = ref(1) // Layer 02 default as requested
const isAutoPlaying = ref(true)
let autoPlayTimer: number | null = null

const layers: Layer[] = [
  {
    index: 1,
    id: 'perception',
    title: 'Visual Perception Cortex',
    subtitle: 'Task-Relevant Bounding Box & Element Detection',
    status: 'Production',
    role: 'Identifies clickable buttons and functional icons directly from raw video frames, ignoring pixel-level noise.',
    mechanism: 'Lightweight YOLOv8n detector (~6.3 MB) pre-trained on diverse UI datasets. Outperforms brittle DOM xpath selectors.',
    codeSnippet: `# Layer 1: Visual Element Extractor
elements = perception_cortex.detect(frame, conf_threshold=0.6)
# Detected: [Button(bbox=[120,45,210,85], label='Submit', conf=0.98), 
#            Input(bbox=[340,12,470,44], label='Username', conf=0.96)]`,
    telemetry: {
      type: 'YOLOv8n Optical HUD',
      metrics: [
        { label: 'Element Detect', value: '#submit-btn (98.4%)', pass: true },
        { label: 'Inference Latency', value: '0.82 ms (Apple Metal)', pass: true },
        { label: 'Pixel Noise Rejected', value: '100% Invariant', pass: true },
      ],
      indicatorText: 'LIVE RADAR SCAN ACTIVE',
    },
  },
  {
    index: 2,
    id: 'imitation',
    title: 'Screen Recording Ingestion',
    subtitle: 'Continuous Human Demonstration Stream',
    status: 'Active Engine',
    role: 'Captures screen recordings of users accomplishing workflows across both native desktop and web apps.',
    mechanism: 'Translates user clicks, key strokes, and mouse trajectories into semantic action tokens tied to visual element anchors.',
    codeSnippet: `# Layer 2: Demonstration Ingestion
action_stream = recorder.parse_workflow("export_report.mp4")
# Tokens: [Click(target=Button_12), Type(target=Input_3, text="Q4.csv")]`,
    telemetry: {
      type: 'Demonstration Ingestion Stream',
      metrics: [
        { label: 'Active Stream', value: 'export_report.mp4', pass: true },
        { label: 'Token Extractor', value: 'Semantic UI Anchors', pass: true },
        { label: 'Action Cohesion', value: 'High Alignment (94%)', pass: true },
      ],
      indicatorText: 'STREAMING DISCRETE TOKENS',
    },
  },
  {
    index: 3,
    id: 'stm',
    title: 'Short-Term Memory (STM)',
    subtitle: 'Temporal Action Buffer & Noise Isolation',
    status: 'Active Engine',
    role: 'Temporarily buffers newly observed action sequences to prevent accidental or one-off noise from polluting permanent memory.',
    mechanism: 'Fixed-duration sliding window queue. Actions that do not repeat or lack cohesion expire and are safely discarded.',
    codeSnippet: `# Layer 3: STM Temporary Queue
stm_buffer.push(action_sequence, timestamp=time.now())
# State: 3 unverified action clusters in evaluation window (5m window)`,
    telemetry: {
      type: 'Sliding Window Ring Buffer',
      metrics: [
        { label: 'Sliding Window', value: '5.0 minutes', pass: true },
        { label: 'Staged Clusters', value: '2 Candidates', pass: true },
        { label: 'Transient Noise', value: 'Auto-Discarded', pass: true },
      ],
      indicatorText: 'ISOLATING CANDIDATE DEMOS',
    },
  },
  {
    index: 4,
    id: 'gate',
    title: 'Growth-Check Gate',
    subtitle: 'Multi-Criteria Statistical Promotion Filter',
    status: 'Validated',
    role: 'The gatekeeper defending against memory corruption. Promotes only statistically verified clusters into permanent storage.',
    mechanism: 'Evaluates clusters across 4 rigorous criteria: min_repetitions (N), cohesion_threshold, min_relevant_ratio, and persistence.',
    codeSnippet: `# Layer 4: Gate Evaluation
if gate.verify(cluster, min_reps=3, cohesion=0.85):
    ltm.promote_cluster(cluster) # Promoted to permanent skill
else:
    stm.hold_or_discard(cluster)`,
    telemetry: {
      type: 'Multi-Criteria Promotion Validator',
      metrics: [
        { label: 'Min Repetitions', value: '3 / 3 Required (PASS)', pass: true },
        { label: 'Cluster Cohesion', value: '0.92 > 0.85 (PASS)', pass: true },
        { label: 'Gate Decision', value: 'PROMOTED TO PERMANENT', pass: true },
      ],
      indicatorText: 'STATISTICAL INTEGRITY CONFIRMED',
    },
  },
  {
    index: 5,
    id: 'ltm',
    title: 'Hierarchical Skill Ontology (LTM)',
    subtitle: 'Tree-Graph Hybrid Skill Store',
    status: 'Production',
    role: 'Stores permanent skills as compound Big Trees and reusable atomic Small Trees connected by directed graph edges.',
    mechanism: 'Atomic skills (e.g. "Login", "Fill Form") are stored ONCE and shared across multiple tasks via reference counters (ref_count).',
    codeSnippet: `# Layer 5: Skill Reusability
small_tree = ltm.get_or_create_skill("oauth_login")
small_tree.ref_count += 1
big_tree = ltm.link_task("generate_invoice", sequence=[small_tree, export_step])`,
    telemetry: {
      type: 'Tree-Graph Ontology Matrix',
      metrics: [
        { label: 'Big Trees (Tasks)', value: '18 Composed Workflows', pass: true },
        { label: 'Small Trees (Skills)', value: '42 Atomic Reusable', pass: true },
        { label: 'Synaptic Overwrite', value: '0.00% (No Degradation)', pass: true },
      ],
      indicatorText: 'DYNAMIC GRAPH EXPANSION',
    },
  },
  {
    index: 6,
    id: 'prune',
    title: 'Selective Forgetting & GC',
    subtitle: 'Reference Counting & Time Decay Pruning',
    status: 'Production',
    role: 'Prevents catastrophic memory bloat on edge workstations by selectively shedding obsolete skills.',
    mechanism: 'Garbage collector automatically deletes orphaned Small Trees when ref_count = 0, and decays idle graph transition edges.',
    codeSnippet: `# Layer 6: Memory Cleanup & Garbage Collection
for skill in ltm.all_small_trees():
    if skill.ref_count <= 0 or skill.decay < threshold:
        ltm.prune_skill(skill.id) # Zero bloat`,
    telemetry: {
      type: 'Synaptic Garbage Collector',
      metrics: [
        { label: 'Orphaned Sub-skills', value: '0 Retained', pass: true },
        { label: 'Decayed Edges', value: 'Pruned Cleanly', pass: true },
        { label: 'Memory Footprint', value: 'Bounded < 16 MB', pass: true },
      ],
      indicatorText: 'GRAPH BOUNDARY CONTROL',
    },
  },
]

function selectLayer(idx: number, manual: boolean = false) {
  activeIndex.value = idx
  if (manual) {
    startAutoPlay()
  }
}

function toggleAutoPlay() {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
}

function startAutoPlay() {
  stopAutoPlay()
  if (!isAutoPlaying.value) return
  autoPlayTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % layers.length
  }, 4800)
}

function stopAutoPlay() {
  if (autoPlayTimer !== null) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section id="layers" class="section-container layers-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge font-mono">
        <span class="badge-dot"></span>
        <span>03 · ENGINE ARCHITECTURE</span>
      </div>
      <h2 class="section-title">
        Designed Around the <br />
        <span class="amber">6 Layers of Bio-Inspired Continual Learning</span>
      </h2>
      <p class="section-desc">
        Unlike monolithic models that retrain from scratch or brittle hardcoded scripts, MEGAMIND isolates perception, staged memory, growth validation, and pruning into dedicated deterministic layers.
      </p>
    </div>

    <!-- Pipeline Rail Container (Hallmark Panel with Minimal Animations) -->
    <div class="pipeline-rail-container">
      <div class="pipeline-header-bar">
        <!-- Cognitive Flow Status Bar with Minimal Pulse Animation -->
        <div class="pipeline-status font-mono">
          <div class="pulse-orbit-wrapper">
            <span class="pulse-orbit"></span>
            <span class="pulse-wave"></span>
          </div>
          <span class="status-label">
            COGNITIVE FLOW: <strong class="cool layer-label-animated">LAYER 0{{ layers[activeIndex].index }} · {{ layers[activeIndex].title }}</strong>
          </span>
          <span class="live-activity-chip">
            <span class="mini-signal-bar bar-1"></span>
            <span class="mini-signal-bar bar-2"></span>
            <span class="mini-signal-bar bar-3"></span>
          </span>
        </div>

        <button
          class="sim-control-btn font-mono"
          :class="{ active: isAutoPlaying }"
          @click="toggleAutoPlay"
          :title="isAutoPlaying ? 'Pause Auto-Cycle' : 'Resume Auto-Cycle'"
        >
          <span class="ctrl-icon">{{ isAutoPlaying ? '⏸' : '▶' }}</span>
          <span>{{ isAutoPlaying ? 'Live Flow Active' : 'Flow Paused' }}</span>
        </button>
      </div>

      <!-- Connecting 6-Step Rail with Data Packet Pulse -->
      <div class="pipeline-rail">
        <div
          v-for="(layer, idx) in layers"
          :key="layer.id"
          class="rail-step"
          :class="{ active: activeIndex === idx, past: activeIndex > idx }"
          @click="selectLayer(idx, true)"
        >
          <div class="step-badge">
            <span class="step-num font-mono">0{{ layer.index }}</span>
            <span v-if="activeIndex === idx" class="step-ring-pulse"></span>
          </div>
          <span class="step-title font-mono">{{ layer.id.toUpperCase() }}</span>

          <!-- Connecting Flow Track with Animated Data Token -->
          <div v-if="idx < layers.length - 1" class="rail-connector">
            <div class="connector-track"></div>
            <div
              class="connector-fill"
              :class="{ filled: activeIndex > idx, running: activeIndex === idx }"
            ></div>
            <span
              v-if="activeIndex === idx && isAutoPlaying"
              class="flowing-packet"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Layer Grid (Symmetrical Balanced Layout, No Overlap) -->
    <div class="layers-layout">
      <!-- Left: Layer Selector Stack with Minimal Auto-Cycle Progress -->
      <div class="layers-nav-stack">
        <button
          v-for="(layer, idx) in layers"
          :key="layer.id"
          class="layer-item-card"
          :class="{ active: activeIndex === idx }"
          @click="selectLayer(idx, true)"
        >
          <!-- Active Auto-Cycle Bottom Indicator Bar -->
          <div
            v-if="activeIndex === idx && isAutoPlaying"
            class="card-progress-bar"
          ></div>

          <div class="layer-num-col font-mono">
            <span class="layer-num">0{{ layer.index }}</span>
          </div>

          <div class="layer-info-col">
            <div class="layer-header-row">
              <h3 class="layer-nav-title font-display">{{ layer.title }}</h3>
              <span class="layer-status-tag font-mono">
                {{ layer.status }}
              </span>
            </div>
            <p class="layer-nav-sub">{{ layer.subtitle }}</p>
          </div>
        </button>
      </div>

      <!-- Right: Detailed Layer Inspector (Equal Balanced Height) -->
      <div class="inspector-col">
        <div class="layer-inspector">
          <!-- Animated Scanning HUD Top Line -->
          <div class="hud-scanning-line"></div>

          <div class="inspector-header">
            <div class="inspector-badge-row font-mono">
              <span class="layer-pill">
                Layer 0{{ layers[activeIndex].index }} of 06
              </span>
              <span class="status-indicator">
                <span class="live-dot-pulse"></span>
                {{ layers[activeIndex].status }}
              </span>
            </div>

            <Transition name="layer-fade" mode="out-in">
              <div :key="activeIndex">
                <h3 class="inspector-title font-display">
                  {{ layers[activeIndex].title }}
                </h3>
                <p class="inspector-subtitle">
                  {{ layers[activeIndex].subtitle }}
                </p>
              </div>
            </Transition>
          </div>

          <!-- Radar Telemetry HUD with Sweep Line -->
          <div class="inspector-hud-box">
            <div class="hud-radar-sweep"></div>
            <div class="hud-top font-mono">
              <span class="hud-radar-dot"></span>
              <span class="hud-title">{{ layers[activeIndex].telemetry.type }}</span>
              <span class="hud-badge">{{ layers[activeIndex].telemetry.indicatorText }}</span>
            </div>
            <div class="hud-metrics-grid">
              <div
                v-for="(m, mIdx) in layers[activeIndex].telemetry.metrics"
                :key="mIdx"
                class="hud-metric-cell"
              >
                <span class="hud-label font-mono">{{ m.label }}</span>
                <span class="hud-val font-mono">{{ m.value }}</span>
              </div>
            </div>
          </div>

          <!-- Role & Mechanism -->
          <div class="inspector-body">
            <div class="info-block">
              <div class="block-label font-mono">Primary Role</div>
              <p class="block-text">{{ layers[activeIndex].role }}</p>
            </div>

            <div class="info-block">
              <div class="block-label font-mono">Biological & Engineering Mechanism</div>
              <p class="block-text">{{ layers[activeIndex].mechanism }}</p>
            </div>

            <!-- Code Block Demonstration -->
            <div class="code-block-wrapper">
              <div class="code-header font-mono">
                <span>megamind/core/layer_{{ layers[activeIndex].index }}_{{ layers[activeIndex].id }}.py</span>
              </div>
              <pre class="code-pre font-mono"><code>{{ layers[activeIndex].codeSnippet }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layers-section {
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

/* Pipeline Rail */
.pipeline-rail-container {
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-card);
  margin-bottom: var(--space-lg);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
}

.pipeline-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.pipeline-status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

/* Minimal Pulse Beacon Animation */
.pulse-orbit-wrapper {
  position: relative;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-orbit {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-cool);
  z-index: 2;
}

.pulse-wave {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid var(--color-cool);
  animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes radar-ping {
  0% { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(2.2); opacity: 0; }
}

.status-label {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-muted);
}

.layer-label-animated {
  transition: color var(--dur-short);
}

/* Mini Signal Waves */
.live-activity-chip {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
  margin-left: 4px;
}

.mini-signal-bar {
  width: 2px;
  background: var(--color-cool);
  border-radius: 1px;
}

.mini-signal-bar.bar-1 { height: 4px; animation: signal-bounce 1.2s ease-in-out infinite 0.1s; }
.mini-signal-bar.bar-2 { height: 9px; animation: signal-bounce 1.2s ease-in-out infinite 0.3s; }
.mini-signal-bar.bar-3 { height: 6px; animation: signal-bounce 1.2s ease-in-out infinite 0.5s; }

@keyframes signal-bounce {
  0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 1; }
}

.sim-control-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-ink-2);
  cursor: pointer;
  transition: all var(--dur-short);
}

.sim-control-btn.active {
  color: var(--color-cool);
  border-color: var(--color-cool);
}

.pipeline-rail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  overflow-x: auto;
  padding: 8px 0;
  scrollbar-width: none;
}

.pipeline-rail::-webkit-scrollbar {
  display: none;
}

.rail-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 80px;
  cursor: pointer;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule-2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all var(--dur-short);
}

.rail-step:hover .step-badge {
  border-color: var(--color-cool);
}

.rail-step.active .step-badge {
  background: var(--color-cool);
  border-color: var(--color-cool);
}

.step-ring-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--color-cool);
  animation: pulse-ring 2s infinite ease-out;
}

@keyframes pulse-ring {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.step-num {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  font-weight: 600;
  color: var(--color-muted);
}

.rail-step.active .step-num {
  color: var(--color-paper);
}

.step-title {
  margin-top: 6px;
  font-family: var(--font-outlier);
  font-size: 11px;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}

.rail-step.active .step-title {
  color: var(--color-ink);
  font-weight: 600;
}

.rail-connector {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 100%;
  height: 1px;
  z-index: 1;
  pointer-events: none;
}

.connector-track {
  width: 100%;
  height: 100%;
  background: var(--color-rule);
}

.connector-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background: var(--color-cool);
}

.connector-fill.filled {
  width: 100%;
}

.connector-fill.running {
  animation: fill-line 4.8s infinite linear;
}

@keyframes fill-line {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Animated Data Flowing Packet */
.flowing-packet {
  position: absolute;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-cool);
  box-shadow: 0 0 8px var(--color-cool);
  animation: packet-travel 4.8s infinite ease-in-out;
}

@keyframes packet-travel {
  0% { left: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

/* Layer Grid Layout */
.layers-layout {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: var(--space-md);
  align-items: stretch;
}

@media (max-width: 980px) {
  .layers-layout {
    grid-template-columns: 1fr;
  }
}

.inspector-col {
  display: flex;
  flex-direction: column;
}

.layers-nav-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.layer-item-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: 14px var(--space-md);
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all var(--dur-short);
}

.layer-item-card:hover {
  border-color: var(--color-rule-2);
  background: var(--color-paper-3);
}

.layer-item-card.active {
  border-color: var(--color-cool);
  background: var(--color-paper-3);
}

/* Auto-Cycle Progress Line */
.card-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--color-cool);
  animation: card-progress-run 4.8s infinite linear;
}

@keyframes card-progress-run {
  0% { width: 0%; }
  100% { width: 100%; }
}

.layer-num-col {
  font-family: var(--font-outlier);
  font-size: var(--text-md);
  font-variant-numeric: tabular-nums slashed-zero;
  font-weight: 600;
  color: var(--color-muted);
}

.layer-item-card.active .layer-num {
  color: var(--color-cool);
}

.layer-info-col {
  flex: 1;
  min-width: 0;
}

.layer-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.layer-nav-title {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  color: var(--color-ink);
  overflow-wrap: break-word;
}

.layer-status-tag {
  font-family: var(--font-outlier);
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  border: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-muted);
  background: var(--color-paper-2);
  white-space: nowrap;
  flex-shrink: 0;
}

.layer-item-card.active .layer-status-tag {
  color: var(--color-cool);
  border-color: var(--color-cool);
  background: var(--color-cool-soft);
}

.layer-nav-sub {
  font-size: var(--text-xs);
  color: var(--color-muted);
  overflow-wrap: break-word;
}

/* Inspector Box */
.layer-inspector {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* Subtle Scanning Ambient Line */
.hud-scanning-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-cool), transparent);
  animation: scan-ambient 4s ease-in-out infinite alternate;
}

@keyframes scan-ambient {
  0% { transform: translateX(-60%); opacity: 0.2; }
  100% { transform: translateX(60%); opacity: 0.8; }
}

.inspector-header {
  margin-bottom: var(--space-md);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  padding-bottom: var(--space-md);
}

.inspector-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.layer-pill {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  border: var(--rule-hair) solid var(--color-cool);
  color: var(--color-cool);
  background: var(--color-cool-soft);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-muted);
}

.live-dot-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-cool);
  box-shadow: 0 0 6px var(--color-cool);
  animation: pulse-dot 1.8s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.6; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); }
}

.inspector-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 500;
  line-height: 1.15;
  color: var(--color-ink);
  margin-bottom: 4px;
}

.inspector-subtitle {
  font-size: var(--text-sm);
  color: var(--color-muted);
}

/* Radar Telemetry HUD */
.inspector-hud-box {
  position: relative;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-md);
  overflow: hidden;
}

.hud-radar-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-cool), transparent);
  animation: radar-sweep 2.8s linear infinite;
}

@keyframes radar-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

.hud-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: var(--text-xs);
}

.hud-radar-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-cool);
}

.hud-title {
  font-weight: 600;
  color: var(--color-ink);
}

.hud-badge {
  margin-left: auto;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-paper-2);
  color: var(--color-muted);
}

.hud-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

@media (max-width: 640px) {
  .hud-metrics-grid {
    grid-template-columns: 1fr;
  }
}

.hud-metric-cell {
  background: var(--color-paper-2);
  padding: 6px 10px;
  border-radius: 4px;
  border: var(--rule-hair) solid var(--color-rule);
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  overflow: hidden;
}

.hud-label {
  font-family: var(--font-outlier);
  font-size: 10px;
  color: var(--color-muted);
}

.hud-val {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  font-weight: 600;
  color: var(--color-cool);
  overflow-wrap: break-word;
}

/* Body & Info Blocks */
.inspector-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.info-block {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: var(--space-sm) var(--space-md);
}

.block-label {
  font-family: var(--font-outlier);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 3px;
}

.block-text {
  font-size: var(--text-sm);
  color: var(--color-ink-2);
  line-height: 1.5;
}

/* Code demonstration */
.code-block-wrapper {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.code-header {
  padding: 6px var(--space-md);
  background: var(--color-paper-2);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  font-family: var(--font-outlier);
  font-size: 11px;
  color: var(--color-muted);
}

.code-pre {
  padding: var(--space-sm) var(--space-md);
  margin: 0;
  font-family: var(--font-outlier);
  font-size: 12px;
  line-height: 1.55;
  color: var(--color-cool);
  overflow-x: auto;
}

/* Smooth Transition */
.layer-fade-enter-active,
.layer-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.layer-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.layer-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
