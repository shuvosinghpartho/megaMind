<script setup lang="ts">
import { ref } from 'vue'
import { systemComponents } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
import StatusChip from '@/components/ui/StatusChip.vue'

const selectedComponent = ref(systemComponents[1]) // Default to image encoder (in-progress)

function selectComponent(comp: (typeof systemComponents)[0]) {
  selectedComponent.value = comp
}
</script>

<template>
  <section id="architecture" class="section-container">
    <div class="section-header">
      <Badge variant="in-progress">System Anatomy</Badge>
      <h2 class="section-title">Interactive Architecture</h2>
      <p class="section-desc">
        Click any module to inspect its role, operational contract, and implementation status.
      </p>
    </div>

    <div class="arch-layout">
      <!-- Diagram View -->
      <div class="arch-diagram">
        <div class="diagram-grid">
          <!-- Row 1: Perception & Root -->
          <div
            :class="['arch-node', { 'is-selected': selectedComponent.id === 'parent-tree' }]"
            @click="selectComponent(systemComponents[0])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[0].label }}</span>
              <StatusChip :status="systemComponents[0].status" />
            </div>
            <p class="node-brief">Root node of the Hierarchical Skill Ontology.</p>
          </div>

          <div
            :class="['arch-node accent-blue', { 'is-selected': selectedComponent.id === 'image-encoder' }]"
            @click="selectComponent(systemComponents[1])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[1].label }}</span>
              <StatusChip :status="systemComponents[1].status" />
            </div>
            <p class="node-brief">YOLOv8n detector extracting buttons & icons from screen frames.</p>
          </div>

          <!-- Row 2: STM & Growth Gate -->
          <div
            :class="['arch-node', { 'is-selected': selectedComponent.id === 'stm' }]"
            @click="selectComponent(systemComponents[2])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[2].label }}</span>
              <StatusChip :status="systemComponents[2].status" />
            </div>
            <p class="node-brief">Temporary ring buffer for unverified candidate action sequences.</p>
          </div>

          <div
            :class="['arch-node accent-green', { 'is-selected': selectedComponent.id === 'growth-gate' }]"
            @click="selectComponent(systemComponents[3])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[3].label }}</span>
              <StatusChip :status="systemComponents[3].status" />
            </div>
            <p class="node-brief">Four-parameter gate: Repetition, Cohesion, Relevance, Persistence.</p>
          </div>

          <!-- Row 3: LTM & Garbage Collector -->
          <div
            :class="['arch-node accent-purple', { 'is-selected': selectedComponent.id === 'ltm' }]"
            @click="selectComponent(systemComponents[4])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[4].label }}</span>
              <StatusChip :status="systemComponents[4].status" />
            </div>
            <p class="node-brief">Persistent Big Tree & Small Tree graph representation.</p>
          </div>

          <div
            :class="['arch-node accent-orange', { 'is-selected': selectedComponent.id === 'gc' }]"
            @click="selectComponent(systemComponents[5])"
          >
            <div class="node-header">
              <span class="node-title">{{ systemComponents[5].label }}</span>
              <StatusChip :status="systemComponents[5].status" />
            </div>
            <p class="node-brief">Prunes orphaned Small Trees (ref_count = 0) and decays idle edges.</p>
          </div>
        </div>
      </div>

      <!-- Inspector Sidebar -->
      <div class="arch-inspector">
        <div class="inspector-card">
          <div class="inspector-badge">
            <span class="inspector-sub">Module Inspector</span>
            <StatusChip :status="selectedComponent.status" />
          </div>

          <h3 class="inspector-title">{{ selectedComponent.label }}</h3>
          <p class="inspector-desc">{{ selectedComponent.description }}</p>

          <div class="contract-box">
            <span class="contract-label">Data Model Contract Sketch</span>
            <pre class="code-snippet"><code><span v-if="selectedComponent.id === 'image-encoder'">// Image Encoder Output
Detection {
  class: 'button' | 'icon'
  bbox: [x, y, w, h]
  confidence: TBD
}</span><span v-else-if="selectedComponent.id === 'stm'">// STM Buffer Item
ActionToken {
  kind: 'click' | 'type' | 'scroll'
  target: Detection
  timestamp: number
}</span><span v-else-if="selectedComponent.id === 'growth-gate'">// Gate Criteria
GrowthCheck {
  min_repetitions: N
  cohesion_threshold: float
  min_relevant_ratio: float
  time_window: seconds
}</span><span v-else-if="selectedComponent.id === 'ltm'">// LTM Schema
SmallTree {
  id: string
  steps: Action[]
  ref_count: number
  last_used: timestamp
}</span><span v-else-if="selectedComponent.id === 'parent-tree'">// Parent Ontology Root
OntologyRoot {
  domains: ['web', 'desktop_app']
  big_trees: BigTreeReference[]
}</span><span v-else>// GC Logic
PruneRule {
  if (ref_count === 0) purge()
  decay_unused_edges(decay_rate)
}</span></code></pre>
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

.arch-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-6);
}

@media (max-width: 900px) {
  .arch-layout {
    grid-template-columns: 1fr;
  }
}

.diagram-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 600px) {
  .diagram-grid {
    grid-template-columns: 1fr;
  }
}

.arch-node {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-default);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.arch-node:hover {
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.arch-node.is-selected {
  border-color: var(--accent-perception);
  background: var(--surface-2);
  box-shadow: 0 0 16px rgba(88, 166, 255, 0.25);
}

.accent-blue.is-selected {
  border-color: var(--accent-perception);
}
.accent-green.is-selected {
  border-color: var(--accent-growth);
  box-shadow: 0 0 16px rgba(63, 185, 80, 0.25);
}
.accent-purple.is-selected {
  border-color: var(--accent-memory);
  box-shadow: 0 0 16px rgba(188, 140, 255, 0.25);
}
.accent-orange.is-selected {
  border-color: var(--accent-prune);
  box-shadow: 0 0 16px rgba(240, 136, 62, 0.25);
}

.node-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.node-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.node-brief {
  font-size: 0.82rem;
  color: var(--muted);
  line-height: 1.45;
}

.arch-inspector {
  display: flex;
  flex-direction: column;
}

.inspector-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
}

.inspector-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inspector-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.inspector-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text);
}

.inspector-desc {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.6;
}

.contract-box {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-4);
  margin-top: auto;
}

.contract-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--accent-perception);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.code-snippet {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: var(--text);
  line-height: 1.5;
  white-space: pre-wrap;
  margin: 0;
}
</style>
