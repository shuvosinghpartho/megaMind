<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSplashStore } from '@/stores/splash'
import { useReducedMotion } from '@/composables/useReducedMotion'

const splashStore = useSplashStore()
const { prefersReduced } = useReducedMotion()

const progress = ref(15)
const stages = [
  'Initializing perception (YOLOv8n)...',
  'Allocating Short-Term Memory buffer...',
  'Warming Growth-Check Gate...',
  'Indexing Hierarchical Skill Ontology...',
  'System Ready.',
]
const currentStageIndex = ref(0)
const isExiting = ref(false)

let stageTimer: any = null
let progressTimer: any = null
let autoExitTimer: any = null

function complete() {
  if (isExiting.value) return
  isExiting.value = true
  progress.value = 100
  setTimeout(() => {
    splashStore.markShown()
  }, 420)
}

onMounted(() => {
  if (prefersReduced.value) {
    splashStore.markShown()
    return
  }

  // Cycle progress
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.floor(Math.random() * 12) + 5
      if (progress.value > 90) progress.value = 90
    }
  }, 220)

  // Cycle stages
  stageTimer = setInterval(() => {
    if (currentStageIndex.value < stages.length - 1) {
      currentStageIndex.value++
    }
  }, 480)

  // Finish after ~2.2s
  autoExitTimer = setTimeout(() => {
    complete()
  }, 2300)
})

onUnmounted(() => {
  clearInterval(stageTimer)
  clearInterval(progressTimer)
  clearTimeout(autoExitTimer)
})
</script>

<template>
  <div :class="['splash-backdrop', { 'is-exiting': isExiting }]" @click="complete">
    <div class="splash-card">
      <!-- Animated Tree Graph SVG -->
      <div class="graph-mark">
        <svg viewBox="0 0 120 120" class="tree-svg">
          <!-- Central root node -->
          <circle cx="60" cy="85" r="9" class="node node-root" />

          <!-- Trunk and branches -->
          <path d="M60 76 L60 50" class="branch branch-trunk" />
          <path d="M60 50 L30 25" class="branch branch-left" />
          <path d="M60 50 L60 20" class="branch branch-mid" />
          <path d="M60 50 L90 25" class="branch branch-right" />

          <!-- Leaf nodes / small trees -->
          <circle cx="30" cy="25" r="6" class="node node-leaf leaf-1" />
          <circle cx="60" cy="20" r="6" class="node node-leaf leaf-2" />
          <circle cx="90" cy="25" r="6" class="node node-leaf leaf-3" />

          <!-- Inter-node cross edge -->
          <path d="M36 25 Q60 35 84 25" class="branch branch-cross" />
        </svg>
      </div>

      <div class="brand-text">
        <span class="brand-name">MEGAMIND</span>
        <span class="brand-sub">BIO-INSPIRED UI CONTINUAL LEARNING</span>
      </div>

      <div class="status-box">
        <span class="status-msg">{{ stages[currentStageIndex] }}</span>
      </div>

      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splash-backdrop {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.45s var(--ease-default), transform 0.45s var(--ease-default);
}

.splash-backdrop.is-exiting {
  opacity: 0;
  transform: scale(1.03);
  pointer-events: none;
}

.splash-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 420px;
  width: 90%;
  padding: var(--space-6);
  text-align: center;
}

.graph-mark {
  width: 100px;
  height: 100px;
  margin-bottom: var(--space-4);
}

.tree-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.branch {
  fill: none;
  stroke: var(--border);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: drawBranch 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.branch-trunk { stroke: var(--accent-memory); animation-delay: 0.1s; }
.branch-left { stroke: var(--accent-perception); animation-delay: 0.4s; }
.branch-mid { stroke: var(--accent-growth); animation-delay: 0.5s; }
.branch-right { stroke: var(--accent-prune); animation-delay: 0.6s; }
.branch-cross { stroke: rgba(255, 255, 255, 0.2); stroke-dasharray: 60; animation-delay: 0.8s; }

.node {
  transform-origin: center;
  animation: popNode 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

.node-root {
  fill: var(--accent-memory);
  animation-delay: 0.05s;
}

.leaf-1 {
  fill: var(--accent-perception);
  animation-delay: 0.7s;
}

.leaf-2 {
  fill: var(--accent-growth);
  animation-delay: 0.85s;
}

.leaf-3 {
  fill: var(--accent-prune);
  animation-delay: 1s;
}

@keyframes drawBranch {
  to { stroke-dashoffset: 0; }
}

@keyframes popNode {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}

.brand-name {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: linear-gradient(135deg, var(--text) 30%, var(--accent-perception) 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.brand-sub {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--muted);
  margin-top: 6px;
}

.status-box {
  margin-top: var(--space-5);
  height: 24px;
}

.status-msg {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--accent-perception);
  animation: fadeIn 0.3s ease;
}

.progress-track {
  width: 220px;
  height: 3px;
  background: var(--surface-2);
  border-radius: 999px;
  overflow: hidden;
  margin-top: var(--space-4);
  border: 1px solid var(--border);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-perception), var(--accent-growth));
  transition: width 0.25s ease-out;
}

.skip-hint {
  margin-top: var(--space-5);
  font-size: 0.72rem;
  color: var(--muted);
  opacity: 0.7;
}

kbd {
  display: inline-block;
  padding: 1px 5px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
