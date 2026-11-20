<script setup lang="ts">
import { ref } from 'vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

interface SmallTreeNode {
  id: string
  name: string
  refCount: number
  x: number
  y: number
  dissolved?: boolean
}

interface BigTreeNode {
  id: string
  name: string
  context: 'Web' | 'App'
  smallTreeIds: string[]
  x: number
  y: number
}

const initialBigTrees: BigTreeNode[] = [
  { id: 'bt-1', name: 'FB Post (Web)', context: 'Web', smallTreeIds: ['st-login', 'st-type', 'st-click'], x: 160, y: 80 },
  { id: 'bt-2', name: 'Insta Post (App)', context: 'App', smallTreeIds: ['st-login', 'st-type'], x: 480, y: 80 },
]

const initialSmallTrees: SmallTreeNode[] = [
  { id: 'st-login', name: 'Login Step', refCount: 2, x: 180, y: 260 },
  { id: 'st-type', name: 'Type Text', refCount: 2, x: 340, y: 260 },
  { id: 'st-click', name: 'Click Button', refCount: 1, x: 500, y: 260 },
]

const bigTrees = ref<BigTreeNode[]>(JSON.parse(JSON.stringify(initialBigTrees)))
const smallTrees = ref<SmallTreeNode[]>(JSON.parse(JSON.stringify(initialSmallTrees)))
const edgeDecayLevel = ref(1.0)
const logMessage = ref('Initialized memory ontology with 2 Big Trees referencing 3 shared Small Trees.')

function recalculateRefCounts() {
  smallTrees.value.forEach((st) => {
    const count = bigTrees.value.filter((bt) => bt.smallTreeIds.includes(st.id)).length
    st.refCount = count
    if (count === 0) {
      st.dissolved = true
    }
  })
}

function addTask() {
  const newId = `bt-${Date.now()}`
  const newTask: BigTreeNode = {
    id: newId,
    name: 'LinkedIn Post (Web)',
    context: 'Web',
    smallTreeIds: ['st-login', 'st-type', 'st-click'],
    x: 320,
    y: 50,
  }
  bigTrees.value.push(newTask)
  recalculateRefCounts()
  logMessage.value = 'Added "LinkedIn Post (Web)" task. Shared Small Trees (Login, Type, Click) reference counts incremented.'
}

function removeTask() {
  if (bigTrees.value.length === 0) {
    logMessage.value = 'No Big Trees left to remove.'
    return
  }
  const removed = bigTrees.value.pop()
  recalculateRefCounts()
  const pruned = smallTrees.value.filter((st) => st.refCount === 0 && !st.dissolved)
  logMessage.value = `Removed "${removed?.name}". Reference counts decremented. ${
    pruned.length > 0 ? 'Orphaned nodes garbage-collected!' : ''
  }`
}

function advanceTime() {
  edgeDecayLevel.value = Math.max(0.15, edgeDecayLevel.value - 0.28)
  logMessage.value = `Advanced simulated time. Idle graph edge weights decayed to ${(
    edgeDecayLevel.value * 100
  ).toFixed(0)}%. Weakened connections will be pruned by Garbage Collector.`
}

function reset() {
  bigTrees.value = JSON.parse(JSON.stringify(initialBigTrees))
  smallTrees.value = JSON.parse(JSON.stringify(initialSmallTrees))
  edgeDecayLevel.value = 1.0
  logMessage.value = 'Reset memory playground to baseline state.'
}
</script>

<template>
  <section id="memory-playground" class="section-container">
    <div class="section-header">
      <Badge variant="simulated">Signature Simulation</Badge>
      <h2 class="section-title">Memory Playground</h2>
      <p class="section-desc">
        Interact with the Hierarchical Skill Ontology. Experience shared sub-skill referencing, reference counting, and automatic garbage collection.
      </p>
    </div>

    <div class="playground-card">
      <!-- Toolbar Controls -->
      <div class="toolbar">
        <div class="btn-group">
          <Button variant="secondary" size="sm" @click="addTask">
            + Add Task (Big Tree)
          </Button>
          <Button variant="secondary" size="sm" :disabled="bigTrees.length === 0" @click="removeTask">
            - Remove Task
          </Button>
          <Button variant="secondary" size="sm" @click="advanceTime">
            ⏳ Advance Time (Decay Edges)
          </Button>
          <Button variant="ghost" size="sm" @click="reset">
            ↺ Reset
          </Button>
        </div>

        <div class="decay-indicator">
          <span>Edge Retention:</span>
          <strong>{{ (edgeDecayLevel * 100).toFixed(0) }}%</strong>
        </div>
      </div>

      <!-- Graph Stage -->
      <div class="graph-canvas-box">
        <svg viewBox="0 0 700 380" class="graph-svg">
          <!-- Edges connecting Big Trees to Small Trees -->
          <g v-for="bt in bigTrees" :key="bt.id">
            <template v-for="stId in bt.smallTreeIds" :key="stId">
              <line
                v-if="smallTrees.find((s) => s.id === stId && !s.dissolved)"
                :x1="bt.x"
                :y1="bt.y + 25"
                :x2="smallTrees.find((s) => s.id === stId)!.x"
                :y2="smallTrees.find((s) => s.id === stId)!.y - 25"
                class="graph-edge"
                :style="{ opacity: edgeDecayLevel, strokeWidth: edgeDecayLevel > 0.4 ? 2 : 1 }"
              />
            </template>
          </g>

          <!-- Big Tree Nodes (Compound Tasks) -->
          <g v-for="bt in bigTrees" :key="bt.id" class="node-group">
            <rect
              :x="bt.x - 90"
              :y="bt.y - 22"
              width="180"
              height="44"
              rx="10"
              class="node-rect node-big"
            />
            <text :x="bt.x" :y="bt.y + 4" class="node-text-title" text-anchor="middle">
              {{ bt.name }}
            </text>
          </g>

          <!-- Small Tree Nodes (Atomic Skills) -->
          <g v-for="st in smallTrees" :key="st.id" :class="['node-group', { 'is-dissolved': st.dissolved }]">
            <rect
              :x="st.x - 70"
              :y="st.y - 22"
              width="140"
              height="44"
              rx="22"
              class="node-rect node-small"
            />
            <text :x="st.x - 12" :y="st.y + 4" class="node-text-title" text-anchor="middle">
              {{ st.name }}
            </text>
            <!-- Reference Count Pill -->
            <circle :cx="st.x + 48" :cy="st.y" r="11" class="ref-badge-bg" />
            <text :x="st.x + 48" :y="st.y + 4" class="ref-badge-text" text-anchor="middle">
              {{ st.refCount }}
            </text>
          </g>

          <!-- Zero ref GC Notice overlay if any dissolved -->
          <text
            v-if="smallTrees.some((s) => s.dissolved)"
            x="350"
            y="350"
            class="gc-alert"
            text-anchor="middle"
          >
            ♻️ Garbage Collector removed orphaned Small Trees with ref_count = 0
          </text>
        </svg>
      </div>

      <!-- Live Explanation Log -->
      <div class="feedback-box">
        <span class="feedback-icon">ℹ️</span>
        <span class="feedback-msg">{{ logMessage }}</span>
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

.playground-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.toolbar {
  padding: var(--space-4) var(--space-6);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.btn-group {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.decay-indicator {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 0.85rem;
  color: var(--muted);
}

.decay-indicator strong {
  color: var(--accent-growth);
  font-family: 'JetBrains Mono', monospace;
}

.graph-canvas-box {
  padding: var(--space-6);
  background: radial-gradient(circle at 50% 50%, rgba(188, 140, 255, 0.03), transparent 70%);
}

.graph-svg {
  width: 100%;
  height: auto;
  min-height: 340px;
}

.graph-edge {
  stroke: var(--accent-perception);
  stroke-dasharray: 4;
  transition: opacity 0.3s ease;
}

.node-rect {
  transition: all 0.3s var(--ease-default);
}

.node-big {
  fill: var(--surface-2);
  stroke: var(--accent-memory);
  stroke-width: 2;
}

.node-small {
  fill: var(--surface-2);
  stroke: var(--accent-perception);
  stroke-width: 2;
}

.node-text-title {
  fill: var(--text);
  font-size: 12px;
  font-weight: 700;
  font-family: inherit;
  pointer-events: none;
}

.ref-badge-bg {
  fill: var(--accent-perception);
}

.ref-badge-text {
  fill: #0b0e13;
  font-size: 10px;
  font-weight: 800;
  font-family: 'JetBrains Mono', monospace;
}

.is-dissolved {
  opacity: 0.15;
  filter: grayscale(1);
  transition: opacity 0.5s ease;
}

.gc-alert {
  fill: var(--accent-prune);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.feedback-box {
  padding: var(--space-3) var(--space-6);
  background: var(--surface-2);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.feedback-icon {
  font-size: 1.1rem;
}

.feedback-msg {
  font-size: 0.88rem;
  color: var(--text);
}
</style>
