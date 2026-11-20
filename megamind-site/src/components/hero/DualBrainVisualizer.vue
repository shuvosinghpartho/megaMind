<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const currentStage = ref(1) // 1: Newborn/Base, 2: Early Learning, 3: Synaptic Expansion, 4: Pruning & Mastery
const isAutoPlay = ref(true)
let autoPlayTimer: any = null

interface Neuron {
  id: number
  x: number
  y: number
  stage: number // which stage it appears
  color: string
}

interface Synapse {
  from: number
  to: number
  stage: number
}

// 1. Biological Brain Data (Normalized coordinates inside a brain silhouette)
// Center around (200, 150) inside a 400x300 viewBox
const brainNeurons: Neuron[] = [
  // Stage 1: Newborn (Sparse core neurons)
  { id: 1, x: 190, y: 140, stage: 1, color: '#bc8cff' }, // thalamus/core
  { id: 2, x: 140, y: 130, stage: 1, color: '#58a6ff' }, // frontal lobe early
  { id: 3, x: 230, y: 120, stage: 1, color: '#58a6ff' }, // parietal
  { id: 4, x: 250, y: 170, stage: 1, color: '#3fb950' }, // occipital
  { id: 5, x: 170, y: 190, stage: 1, color: '#3fb950' }, // temporal
  { id: 6, x: 210, y: 220, stage: 1, color: '#bc8cff' }, // brainstem/cerebellum

  // Stage 2: Early Learning (branching outward)
  { id: 7, x: 110, y: 120, stage: 2, color: '#58a6ff' },
  { id: 8, x: 130, y: 90, stage: 2, color: '#58a6ff' },
  { id: 9, x: 180, y: 80, stage: 2, color: '#bc8cff' },
  { id: 10, x: 240, y: 85, stage: 2, color: '#bc8cff' },
  { id: 11, x: 280, y: 130, stage: 2, color: '#3fb950' },
  { id: 12, x: 270, y: 190, stage: 2, color: '#3fb950' },
  { id: 13, x: 130, y: 170, stage: 2, color: '#58a6ff' },

  // Stage 3: Synaptic Explosion (dense cortex growth)
  { id: 14, x: 90, y: 140, stage: 3, color: '#58a6ff' },
  { id: 15, x: 100, y: 95, stage: 3, color: '#58a6ff' },
  { id: 16, x: 150, y: 65, stage: 3, color: '#bc8cff' },
  { id: 17, x: 210, y: 60, stage: 3, color: '#bc8cff' },
  { id: 18, x: 260, y: 65, stage: 3, color: '#bc8cff' },
  { id: 19, x: 295, y: 100, stage: 3, color: '#3fb950' },
  { id: 20, x: 300, y: 160, stage: 3, color: '#3fb950' },
  { id: 21, x: 240, y: 225, stage: 3, color: '#3fb950' },
  { id: 22, x: 180, y: 220, stage: 3, color: '#58a6ff' },
  { id: 23, x: 160, y: 120, stage: 3, color: '#bc8cff' },
  { id: 24, x: 210, y: 150, stage: 3, color: '#bc8cff' },
]

const brainSynapses: Synapse[] = [
  // Stage 1 connections
  { from: 1, to: 2, stage: 1 },
  { from: 1, to: 3, stage: 1 },
  { from: 1, to: 5, stage: 1 },
  { from: 3, to: 4, stage: 1 },
  { from: 5, to: 6, stage: 1 },

  // Stage 2 connections
  { from: 2, to: 7, stage: 2 },
  { from: 2, to: 8, stage: 2 },
  { from: 3, to: 9, stage: 2 },
  { from: 3, to: 10, stage: 2 },
  { from: 4, to: 11, stage: 2 },
  { from: 4, to: 12, stage: 2 },
  { from: 5, to: 13, stage: 2 },
  { from: 8, to: 9, stage: 2 },
  { from: 10, to: 11, stage: 2 },

  // Stage 3 connections (dense mesh)
  { from: 7, to: 14, stage: 3 },
  { from: 8, to: 15, stage: 3 },
  { from: 9, to: 16, stage: 3 },
  { from: 10, to: 17, stage: 3 },
  { from: 10, to: 18, stage: 3 },
  { from: 11, to: 19, stage: 3 },
  { from: 12, to: 20, stage: 3 },
  { from: 6, to: 21, stage: 3 },
  { from: 6, to: 22, stage: 3 },
  { from: 1, to: 23, stage: 3 },
  { from: 1, to: 24, stage: 3 },
  { from: 14, to: 15, stage: 3 },
  { from: 16, to: 17, stage: 3 },
  { from: 18, to: 19, stage: 3 },
  { from: 23, to: 8, stage: 3 },
  { from: 24, to: 11, stage: 3 },
]

// 2. MEGAMIND Architecture Nodes
interface MegaNode {
  id: string
  name: string
  type: 'root' | 'big' | 'small'
  x: number
  y: number
  stage: number
  refCount?: number
}

const megaNodes: MegaNode[] = [
  // Stage 1: Base State (Parent Root + Perception Base)
  { id: 'm-root', name: 'Parent Root', type: 'root', x: 200, y: 45, stage: 1 },
  { id: 'm-enc', name: 'YOLOv8n Encoder', type: 'small', x: 130, y: 110, stage: 1 },
  { id: 'm-stm', name: 'STM Buffer', type: 'small', x: 270, y: 110, stage: 1 },

  // Stage 2: First Demonstrated Task
  { id: 'm-t1', name: 'Task: Web Login', type: 'big', x: 130, y: 180, stage: 2 },
  { id: 'm-s1', name: 'Click Button', type: 'small', x: 80, y: 250, stage: 2, refCount: 1 },
  { id: 'm-s2', name: 'Type Text', type: 'small', x: 160, y: 250, stage: 2, refCount: 1 },

  // Stage 3: Compound Expansion & Shared Small Trees
  { id: 'm-t2', name: 'Task: Social Post', type: 'big', x: 270, y: 180, stage: 3 },
  { id: 'm-t3', name: 'Task: Export CSV', type: 'big', x: 340, y: 130, stage: 3 },
  { id: 'm-s3', name: 'Select Dropdown', type: 'small', x: 240, y: 250, stage: 3, refCount: 2 },
  { id: 'm-s4', name: 'File Attach', type: 'small', x: 320, y: 250, stage: 3, refCount: 1 },
]

interface MegaEdge {
  from: string
  to: string
  stage: number
}

const megaEdges: MegaEdge[] = [
  // Stage 1
  { from: 'm-root', to: 'm-enc', stage: 1 },
  { from: 'm-root', to: 'm-stm', stage: 1 },

  // Stage 2
  { from: 'm-stm', to: 'm-t1', stage: 2 },
  { from: 'm-t1', to: 'm-s1', stage: 2 },
  { from: 'm-t1', to: 'm-s2', stage: 2 },

  // Stage 3 (Shared cross-referencing)
  { from: 'm-stm', to: 'm-t2', stage: 3 },
  { from: 'm-stm', to: 'm-t3', stage: 3 },
  { from: 'm-t2', to: 'm-s2', stage: 3 }, // Social post reuses "Type Text"
  { from: 'm-t2', to: 'm-s1', stage: 3 }, // Social post reuses "Click Button"
  { from: 'm-t2', to: 'm-s3', stage: 3 },
  { from: 'm-t3', to: 'm-s3', stage: 3 }, // Export reuses dropdown
  { from: 'm-t3', to: 'm-s4', stage: 3 },
]

// Visible items based on current stage
const activeBrainNeurons = computed(() => {
  if (currentStage.value === 4) {
    // Stage 4: Pruned adult brain (keeps stage 1 & 2 + select stage 3)
    return brainNeurons.filter((n) => n.stage <= 2 || [14, 17, 19, 21, 24].includes(n.id))
  }
  return brainNeurons.filter((n) => n.stage <= currentStage.value)
})

const activeBrainSynapses = computed(() => {
  if (currentStage.value === 4) {
    // Stage 4: Strongest pathways retained, weak edges pruned
    return brainSynapses.filter((s) => s.stage <= 2 || (s.stage === 3 && [14, 17, 19].includes(s.to)))
  }
  return brainSynapses.filter((s) => s.stage <= currentStage.value)
})

const activeMegaNodes = computed(() => {
  if (currentStage.value === 4) {
    // Stage 4: Streamlined, garbage collected (orphans pruned, shared trees consolidated)
    return megaNodes.map((n) => {
      if (n.id === 'm-s1') return { ...n, refCount: 2 }
      if (n.id === 'm-s2') return { ...n, refCount: 2 }
      if (n.id === 'm-s3') return { ...n, refCount: 2 }
      return n
    })
  }
  return megaNodes.filter((n) => n.stage <= currentStage.value).map((n) => {
    // Adjust dynamic ref counts
    if (currentStage.value === 2) {
      if (n.id === 'm-s1' || n.id === 'm-s2') return { ...n, refCount: 1 }
    } else if (currentStage.value >= 3) {
      if (n.id === 'm-s1') return { ...n, refCount: 2 }
      if (n.id === 'm-s2') return { ...n, refCount: 2 }
      if (n.id === 'm-s3') return { ...n, refCount: 2 }
    }
    return n
  })
})

const activeMegaEdges = computed(() => {
  if (currentStage.value === 4) {
    return megaEdges
  }
  return megaEdges.filter((e) => e.stage <= currentStage.value)
})

function getNeuronX(id: number): number {
  return brainNeurons.find((n) => n.id === id)?.x ?? 200
}

function getNeuronY(id: number): number {
  return brainNeurons.find((n) => n.id === id)?.y ?? 150
}

function getNodeX(id: string): number {
  return megaNodes.find((n) => n.id === id)?.x ?? 200
}

function getNodeY(id: string): number {
  return megaNodes.find((n) => n.id === id)?.y ?? 100
}

function setStage(stage: number) {
  currentStage.value = stage
}

function nextStage() {
  currentStage.value = (currentStage.value % 4) + 1
}

function toggleAutoPlay() {
  isAutoPlay.value = !isAutoPlay.value
  if (isAutoPlay.value) {
    startAutoPlay()
  } else {
    clearInterval(autoPlayTimer)
  }
}

function startAutoPlay() {
  clearInterval(autoPlayTimer)
  autoPlayTimer = setInterval(() => {
    nextStage()
  }, 4200)
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  clearInterval(autoPlayTimer)
})
</script>

<template>
  <div class="dual-visualizer-card">
    <!-- Top Control Bar -->
    <div class="visualizer-header">
      <div class="header-left">
        <span class="live-dot"></span>
        <span class="header-title">Bio-Inspired Continual Synaptogenesis Engine</span>
      </div>

      <!-- Growth Stage Selector Pills -->
      <div class="stage-pills">
        <button
          :class="['stage-pill', { active: currentStage === 1 }]"
          @click="setStage(1)"
        >
          <span class="pill-num">01</span>
          <span class="pill-text">Newborn / Minimal Base</span>
        </button>
        <button
          :class="['stage-pill', { active: currentStage === 2 }]"
          @click="setStage(2)"
        >
          <span class="pill-num">02</span>
          <span class="pill-text">Early Demonstrations</span>
        </button>
        <button
          :class="['stage-pill', { active: currentStage === 3 }]"
          @click="setStage(3)"
        >
          <span class="pill-num">03</span>
          <span class="pill-text">Synaptic Expansion</span>
        </button>
        <button
          :class="['stage-pill', { active: currentStage === 4 }]"
          @click="setStage(4)"
        >
          <span class="pill-num">04</span>
          <span class="pill-text">Selective Pruning & Retention</span>
        </button>
      </div>

      <!-- Auto / Step Control -->
      <div class="header-actions">
        <button class="step-btn" @click="nextStage">
          + Simulate Experience
        </button>
        <button class="icon-toggle" :title="isAutoPlay ? 'Pause Auto Growth' : 'Resume Auto Growth'" @click="toggleAutoPlay">
          {{ isAutoPlay ? '⏸' : '▶' }}
        </button>
      </div>
    </div>

    <!-- Main Dual Panel Stage -->
    <div class="panels-grid">
      <!-- PANEL 1: Biological Infant Brain -->
      <div class="sub-panel panel-biology">
        <div class="panel-meta">
          <div class="meta-tag">
            <span class="emoji-tag">🧠</span>
            <div>
              <h4 class="meta-title">Biological Human Brain</h4>
              <span class="meta-sub">
                {{
                  currentStage === 1
                    ? 'Newborn State (Sparse Pathways)'
                    : currentStage === 2
                    ? '3 Months (Initial Axon Sprouting)'
                    : currentStage === 3
                    ? '24 Months (Dense Synaptogenesis)'
                    : 'Adult Synaptic Pruning (Efficient Circuit)'
                }}
              </span>
            </div>
          </div>
          <span class="synapse-count">
            Synaptic Links: <strong>{{ activeBrainSynapses.length * 32 }}</strong>
          </span>
        </div>

        <div class="canvas-wrap">
          <svg viewBox="0 0 400 300" class="canvas-svg">
            <defs>
              <radialGradient id="bioGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#58a6ff" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#58a6ff" stop-opacity="0" />
              </radialGradient>
            </defs>

            <!-- Brain Contour Silhouette (Anatomical Cortex Outline) -->
            <path
              d="M 120 180 C 80 180, 70 130, 95 100 C 115 75, 160 55, 210 55 C 270 55, 315 80, 325 120 C 335 155, 310 200, 275 220 C 255 235, 220 240, 195 240 C 180 240, 165 220, 145 210 C 130 205, 120 190, 120 180 Z"
              fill="rgba(88, 166, 255, 0.03)"
              stroke="rgba(88, 166, 255, 0.22)"
              stroke-width="1.5"
              stroke-dasharray="4 2"
              class="brain-silhouette"
            />
            <circle cx="200" cy="140" r="110" fill="url(#bioGlow)" />

            <!-- Brain Synapses (Axons) -->
            <g class="synapse-lines">
              <line
                v-for="(syn, idx) in activeBrainSynapses"
                :key="`bs-${idx}`"
                :x1="getNeuronX(syn.from)"
                :y1="getNeuronY(syn.from)"
                :x2="getNeuronX(syn.to)"
                :y2="getNeuronY(syn.to)"
                stroke="var(--accent-perception)"
                :stroke-opacity="currentStage === 4 ? 0.6 : 0.35"
                :stroke-width="currentStage === 4 ? 1.8 : 1.2"
                class="synapse-line"
              />
            </g>

            <!-- Biological Neurons -->
            <g v-for="neuron in activeBrainNeurons" :key="`bn-${neuron.id}`" class="neuron-node">
              <circle
                :cx="neuron.x"
                :cy="neuron.y"
                r="7"
                fill="none"
                :stroke="neuron.color"
                stroke-width="1.2"
                opacity="0.4"
                class="halo"
              />
              <circle
                :cx="neuron.x"
                :cy="neuron.y"
                r="3.8"
                :fill="neuron.color"
                class="nucleus"
              />
            </g>
          </svg>
        </div>

        <div class="panel-footer-note">
          <p v-if="currentStage === 1">
            🌱 <strong>Newborn baseline:</strong> Brain begins with minimal synaptic wiring, creating capacity for environmental stimuli.
          </p>
          <p v-else-if="currentStage === 2">
            ⚡ <strong>Early experience:</strong> Sensory inputs trigger rapid axon arborization and exploratory synaptic firing.
          </p>
          <p v-else-if="currentStage === 3">
            🔥 <strong>Synaptic explosion:</strong> Neural connections peak at 2–3 years of age, forming dense cross-domain wiring.
          </p>
          <p v-else>
            🎯 <strong>Synaptic pruning:</strong> Brain eliminates redundant connections while fortifying practiced cognitive circuits.
          </p>
        </div>
      </div>

      <!-- PANEL 2: MEGAMIND Continual Architecture -->
      <div class="sub-panel panel-megamind">
        <div class="panel-meta">
          <div class="meta-tag">
            <span class="emoji-tag">🤖</span>
            <div>
              <h4 class="meta-title">MEGAMIND Skill Ontology</h4>
              <span class="meta-sub">
                {{
                  currentStage === 1
                    ? 'Root & Visual Perception Base'
                    : currentStage === 2
                    ? 'First Task Demonstration Buffer'
                    : currentStage === 3
                    ? 'Compound Big Trees & Shared Small Trees'
                    : 'Garbage Collection & Lifelong Memory'
                }}
              </span>
            </div>
          </div>
          <span class="synapse-count color-growth">
            Active Skill Nodes: <strong>{{ activeMegaNodes.length }}</strong>
          </span>
        </div>

        <div class="canvas-wrap">
          <svg viewBox="0 0 400 300" class="canvas-svg">
            <defs>
              <radialGradient id="megaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#bc8cff" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#bc8cff" stop-opacity="0" />
              </radialGradient>
            </defs>

            <circle cx="200" cy="140" r="110" fill="url(#megaGlow)" />

            <!-- Tree Edges -->
            <g class="tree-edges">
              <line
                v-for="(edge, idx) in activeMegaEdges"
                :key="`me-${idx}`"
                :x1="getNodeX(edge.from)"
                :y1="getNodeY(edge.from) + 12"
                :x2="getNodeX(edge.to)"
                :y2="getNodeY(edge.to) - 12"
                stroke="var(--accent-memory)"
                :stroke-opacity="0.45"
                stroke-width="1.6"
                stroke-dasharray="3 3"
                class="tree-edge-line"
              />
            </g>

            <!-- MEGAMIND Nodes -->
            <g v-for="node in activeMegaNodes" :key="`mn-${node.id}`" class="mega-node-group">
              <!-- Node Box / Pill -->
              <rect
                :x="node.x - 48"
                :y="node.y - 12"
                width="96"
                height="24"
                :rx="node.type === 'root' ? 12 : node.type === 'big' ? 6 : 12"
                :class="['node-rect-box', `box-${node.type}`]"
              />
              <text :x="node.x" :y="node.y + 3" class="node-text" text-anchor="middle">
                {{ node.name }}
              </text>

              <!-- Reference Count Badge (for Small Trees) -->
              <g v-if="node.refCount">
                <circle :cx="node.x + 40" :cy="node.y - 8" r="8" class="ref-badge-circle" />
                <text :x="node.x + 40" :y="node.y - 5" class="ref-badge-num" text-anchor="middle">
                  {{ node.refCount }}
                </text>
              </g>
            </g>
          </svg>
        </div>

        <div class="panel-footer-note">
          <p v-if="currentStage === 1">
            🌱 <strong>Minimal base knowledge:</strong> YOLOv8n detector initialized for element perception without pre-baking rigid task rules.
          </p>
          <p v-else-if="currentStage === 2">
            ⚡ <strong>Screen recording observed:</strong> Action sequence buffered into Short-Term Memory and synthesized into first Small Trees.
          </p>
          <p v-else-if="currentStage === 3">
            🔥 <strong>Dynamic Category Growth:</strong> New workflows grow new Big Trees, referencing shared Small Trees without catastrophic forgetting!
          </p>
          <p v-else>
            🎯 <strong>Reference-counted GC:</strong> Unused ephemeral actions pruned automatically, keeping the agent lean (<15 MB) for edge devices.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom Telemetry Banner -->
    <div class="visualizer-footer-stats">
      <div class="stat-item">
        <span class="stat-lbl">Learning Mechanism</span>
        <span class="stat-val val-blue">Dynamic Category Growth (Tree-Graph)</span>
      </div>
      <div class="stat-item">
        <span class="stat-lbl">Catastrophic Forgetting</span>
        <span class="stat-val val-green">0.0% (Isolated Tree Branches)</span>
      </div>
      <div class="stat-item">
        <span class="stat-lbl">Weight Overwrites</span>
        <span class="stat-val val-purple">Zero Retraining Required</span>
      </div>
      <div class="stat-item">
        <span class="stat-lbl">Edge Hardware Execution</span>
        <span class="stat-val val-green">Sub-millisecond ONNX Engine</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dual-visualizer-card {
  width: 100%;
  max-width: 1160px;
  margin: var(--space-6) auto 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.55);
}

.visualizer-header {
  padding: var(--space-4) var(--space-5);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-growth);
  box-shadow: 0 0 8px var(--accent-growth);
  animation: pulseDot 1.5s infinite;
}

@keyframes pulseDot {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.header-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.stage-pills {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 3px;
  gap: 3px;
  flex-wrap: wrap;
}

.stage-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  border: none;
  background: transparent;
  color: var(--muted);
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.stage-pill:hover {
  color: var(--text);
}

.stage-pill.active {
  background: var(--accent-perception);
  color: #0b0e13;
}

.pill-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 800;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-btn {
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.step-btn:hover {
  border-color: var(--accent-perception);
  color: var(--accent-perception);
}

.icon-toggle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}

.panels-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border);
}

@media (max-width: 860px) {
  .panels-grid {
    grid-template-columns: 1fr;
  }
}

.sub-panel {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  position: relative;
}

.panel-biology {
  border-right: 1px solid var(--border);
  background: radial-gradient(circle at 50% 50%, rgba(88, 166, 255, 0.04), transparent 70%);
}

.panel-megamind {
  background: radial-gradient(circle at 50% 50%, rgba(188, 140, 255, 0.04), transparent 70%);
}

.panel-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.meta-tag {
  display: flex;
  align-items: center;
  gap: 10px;
}

.emoji-tag {
  font-size: 1.5rem;
}

.meta-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
}

.meta-sub {
  font-size: 0.78rem;
  color: var(--muted);
}

.synapse-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.76rem;
  color: var(--accent-perception);
}

.color-growth {
  color: var(--accent-growth);
}

.canvas-wrap {
  position: relative;
  width: 100%;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.synapse-line {
  transition: all 0.4s ease;
}

.nucleus {
  animation: pulseNode 2s infinite ease-in-out;
}

@keyframes pulseNode {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.25); }
}

.node-rect-box {
  transition: all 0.3s ease;
}

.box-root {
  fill: var(--surface-2);
  stroke: var(--accent-memory);
  stroke-width: 2;
}

.box-big {
  fill: var(--surface-2);
  stroke: var(--accent-growth);
  stroke-width: 1.8;
}

.box-small {
  fill: var(--surface-2);
  stroke: var(--accent-perception);
  stroke-width: 1.4;
}

.node-text {
  fill: var(--text);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  pointer-events: none;
}

.ref-badge-circle {
  fill: var(--accent-perception);
}

.ref-badge-num {
  fill: #0b0e13;
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  font-weight: 800;
}

.panel-footer-note {
  margin-top: var(--space-3);
  padding: var(--space-3);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.45;
  min-height: 48px;
  display: flex;
  align-items: center;
}

.panel-footer-note strong {
  color: var(--text);
}

.visualizer-footer-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: var(--space-4) var(--space-5);
  background: var(--surface-2);
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .visualizer-footer-stats {
    grid-template-columns: 1fr 1fr;
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-lbl {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  font-weight: 600;
}

.stat-val {
  font-size: 0.85rem;
  font-weight: 700;
}

.val-blue { color: var(--accent-perception); }
.val-green { color: var(--accent-growth); }
.val-purple { color: var(--accent-memory); }
</style>
