<script setup lang="ts">
import { ref } from 'vue'

const activeHover = ref<number | null>(null)
</script>

<template>
  <section id="features" class="section-container bento-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge font-mono">
        <span class="badge-dot"></span>
        <span>02 · ARCHITECTURAL BREAKTHROUGHS</span>
      </div>
      <h2 class="section-title">
        Engineered for Continual Learning. <br />
        <span class="amber">Zero Retraining. Zero Memory Bloat.</span>
      </h2>
      <p class="section-desc">
        Explore how MegaMind replaces monolithic weight re-training with biologically inspired synaptogenesis, structured ontologies, and intelligent forgetting.
      </p>
    </div>

    <!-- 6-Card Bento Grid -->
    <div class="bento-grid">
      <!-- Card 1: Synaptic Growth (Large Featured) -->
      <div
        class="bento-card bento-span-featured"
        :class="{ hovered: activeHover === 1 }"
        @mouseenter="activeHover = 1"
        @mouseleave="activeHover = null"
      >
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>01 · DYNAMIC ONTOLOGY</span>
          </div>

          <h3 class="bento-card-title font-display">
            Synaptic Skill Growth <br />
            <span class="cool">Instead of Full Re-Training</span>
          </h3>

          <p class="bento-card-desc">
            When a human learns a new task, existing memories aren't overwritten. MegaMind watches your screen recording and instantiates a new Big Tree in its Hierarchical Skill Ontology, linking reusable atomic sub-skills with zero weight adjustment overhead.
          </p>

          <!-- Interactive Visual Simulation: Animated Synaptic Graph -->
          <div class="visual-synaptic-diagram">
            <svg viewBox="0 0 540 220" class="synaptic-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="syn-root-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ec4899" />
                  <stop offset="100%" stop-color="#a855f7" />
                </linearGradient>
                <linearGradient id="syn-web-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#38bdf8" />
                  <stop offset="100%" stop-color="#0284c7" />
                </linearGradient>
                <linearGradient id="syn-app-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#fb923c" />
                  <stop offset="100%" stop-color="#ea580c" />
                </linearGradient>
                <linearGradient id="syn-shared-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#34d399" />
                  <stop offset="100%" stop-color="#059669" />
                </linearGradient>
                <filter id="syn-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Connection Curves (Root -> Big Trees) -->
              <path class="synaptic-curve curve-root-web" d="M 270 36 C 270 68, 130 68, 130 92" fill="none" stroke="var(--color-cool)" stroke-width="2" />
              <path class="synaptic-curve curve-root-app" d="M 270 36 C 270 68, 410 68, 410 92" fill="none" stroke="var(--color-accent)" stroke-width="2" />

              <!-- Connection Curves (Big Trees -> Small Trees) -->
              <!-- Dual convergence into the Shared Node in the middle! -->
              <path class="synaptic-curve curve-web-shared" d="M 130 124 C 130 148, 225 148, 225 168" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3" />
              <path class="synaptic-curve curve-app-shared" d="M 410 124 C 410 148, 315 148, 315 168" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4 3" />
              <!-- App branching to local form node -->
              <path class="synaptic-curve curve-app-form" d="M 450 124 C 450 148, 465 148, 465 168" fill="none" stroke="var(--color-accent)" stroke-width="1.8" />

              <!-- Animated Action Potential Synaptic Impulses (Particles) -->
              <circle class="action-potential ap-web" r="4" fill="#38bdf8" filter="url(#syn-glow)" />
              <circle class="action-potential ap-app" r="4" fill="#fb923c" filter="url(#syn-glow)" />
              <circle class="action-potential ap-shared-1" r="3.5" fill="#34d399" filter="url(#syn-glow)" />
              <circle class="action-potential ap-shared-2" r="3.5" fill="#34d399" filter="url(#syn-glow)" />

              <!-- Level 0: Root Ontology Pill -->
              <g class="syn-node-group syn-root" transform="translate(195, 12)">
                <rect width="150" height="30" rx="15" fill="var(--color-paper-2)" stroke="url(#syn-root-grad)" stroke-width="1.8" />
                <circle cx="20" cy="15" r="4" fill="#ec4899" class="pulse-beacon" />
                <circle cx="20" cy="15" r="8" fill="none" stroke="#ec4899" stroke-width="1" class="beacon-wave" />
                <text x="34" y="19" font-family="var(--font-outlier)" font-size="11" font-weight="700" fill="var(--color-ink)">ROOT ONTOLOGY</text>
              </g>

              <!-- Level 1: Big Trees -->
              <g class="syn-node-group syn-branch-web" transform="translate(45, 92)">
                <rect width="170" height="32" rx="6" fill="var(--color-paper-2)" stroke="var(--color-cool)" stroke-width="1.6" />
                <rect x="0" y="0" width="4" height="32" rx="2" fill="var(--color-cool)" />
                <text x="14" y="20" font-family="var(--font-display)" font-size="11.5" font-weight="600" fill="var(--color-ink)">Big Tree: Web Workflow</text>
              </g>

              <g class="syn-node-group syn-branch-app" transform="translate(325, 92)">
                <rect width="170" height="32" rx="6" fill="var(--color-paper-2)" stroke="var(--color-accent)" stroke-width="1.6" />
                <rect x="0" y="0" width="4" height="32" rx="2" fill="var(--color-accent)" />
                <text x="14" y="20" font-family="var(--font-display)" font-size="11.5" font-weight="600" fill="var(--color-ink)">Big Tree: Native Sync</text>
              </g>

              <!-- Level 2: Small Trees -->
              <!-- Shared Small Tree: OAuth Login in the Center -->
              <g class="syn-node-group syn-leaf-shared" transform="translate(170, 168)">
                <rect width="200" height="34" rx="6" fill="var(--color-ok-soft)" stroke="#10b981" stroke-width="1.8" />
                <rect x="0" y="0" width="4" height="34" rx="2" fill="#10b981" />
                <circle cx="16" cy="17" r="3.5" fill="#10b981" class="shared-dot-pulse" />
                <text x="26" y="21" font-family="var(--font-display)" font-size="11.5" font-weight="600" fill="var(--color-ink)">OAuth Login</text>
                <rect x="114" y="8" width="78" height="18" rx="4" fill="var(--color-paper-2)" stroke="#10b981" stroke-width="1" />
                <text x="153" y="21" font-family="var(--font-outlier)" font-size="10" font-weight="700" fill="#10b981" text-anchor="middle">Ref: 2 (Shared)</text>
              </g>

              <!-- Local Small Tree: Parse Form UI on the Right -->
              <g class="syn-node-group syn-leaf-form" transform="translate(395, 168)">
                <rect width="135" height="34" rx="6" fill="var(--color-paper-2)" stroke="var(--color-rule)" stroke-width="1.4" />
                <rect x="0" y="0" width="4" height="34" rx="2" fill="var(--color-accent)" />
                <text x="14" y="21" font-family="var(--font-display)" font-size="11.5" font-weight="500" fill="var(--color-ink-2)">Parse Form UI</text>
              </g>
            </svg>

            <!-- Bottom Live Telemetry Strip -->
            <div class="synaptic-footer-strip font-mono">
              <div class="strip-left">
                <span class="live-synapse-beacon"></span>
                <span class="synapse-status-text">Dynamic Synaptogenesis · Deduplication</span>
              </div>
              <span class="synapse-badge font-mono">0% Weight Overwrite</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 2: Zero Catastrophic Forgetting (Featured Chart) -->
      <div
        class="bento-card bento-span-featured"
        :class="{ hovered: activeHover === 2 }"
        @mouseenter="activeHover = 2"
        @mouseleave="activeHover = null"
      >
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>02 · RETENTION METRICS</span>
          </div>

          <h3 class="bento-card-title font-display">
            98.6% Lifelong Retention <br />
            <span class="cool">Overcoming Neural Catastrophic Forgetting</span>
          </h3>

          <p class="bento-card-desc">
            Standard neural models suffer severe skill degradation as sequential tasks increase. MegaMind isolates skills into separate graph branches, maintaining 98.6% recall over 50+ consecutive workflow demonstrations.
          </p>

          <!-- SVG Retention Curve with Live Telemetry Scanner -->
          <div class="retention-chart-box">
            <svg viewBox="0 0 570 190" class="retention-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <!-- Area gradient for MegaMind -->
                <linearGradient id="megamind-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--color-cool)" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="var(--color-cool)" stop-opacity="0.0" />
                </linearGradient>
                <!-- Area gradient for collapse -->
                <linearGradient id="collapse-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--color-bad)" stop-opacity="0.12" />
                  <stop offset="100%" stop-color="var(--color-bad)" stop-opacity="0.0" />
                </linearGradient>
                <filter id="retention-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <!-- Grid Horizontal Reference Lines -->
              <line x1="30" y1="35" x2="420" y2="35" stroke="var(--color-rule)" stroke-dasharray="4" />
              <text x="8" y="38" fill="var(--color-muted)" font-size="9" font-family="var(--font-outlier)">100%</text>

              <line x1="30" y1="85" x2="420" y2="85" stroke="var(--color-rule)" stroke-dasharray="4" />
              <text x="14" y="88" fill="var(--color-muted)" font-size="9" font-family="var(--font-outlier)">60%</text>

              <line x1="30" y1="135" x2="420" y2="135" stroke="var(--color-rule)" stroke-dasharray="4" />
              <text x="14" y="138" fill="var(--color-muted)" font-size="9" font-family="var(--font-outlier)">20%</text>

              <!-- Filled Area Under MegaMind Curve -->
              <path
                d="M 40 38 C 150 39, 260 40, 340 40 S 390 41, 420 41 L 420 155 L 40 155 Z"
                fill="url(#megamind-area)"
              />

              <!-- Filled Area Under Collapse Curve -->
              <path
                d="M 40 38 C 130 55, 190 90, 270 120 S 370 138, 420 142 L 420 155 L 40 155 Z"
                fill="url(#collapse-area)"
              />

              <!-- Standard Baseline Collapse Line -->
              <path
                class="collapse-curve"
                d="M 40 38 C 130 55, 190 90, 270 120 S 370 138, 420 142"
                fill="none"
                stroke="var(--color-bad)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-dasharray="5 3"
              />

              <!-- MegaMind Stable Line -->
              <path
                class="megamind-curve"
                d="M 40 38 C 150 39, 260 40, 340 40 S 390 41, 420 41"
                fill="none"
                stroke="var(--color-cool)"
                stroke-width="3"
                stroke-linecap="round"
              />

              <!-- Animated Laser Scanner Line sweeping horizontally -->
              <line class="retention-scanner" x1="0" y1="20" x2="0" y2="155" stroke="var(--color-cool)" stroke-width="1.6" stroke-dasharray="3 3" opacity="0.75" />

              <!-- Pulse Comet moving along MegaMind Line -->
              <circle class="retention-comet" r="3.5" fill="#ffffff" filter="url(#retention-glow)" />

              <!-- End Beacons -->
              <!-- MegaMind Beacon -->
              <circle cx="420" cy="41" r="4.5" fill="var(--color-cool)" />
              <circle cx="420" cy="41" r="7" fill="none" stroke="var(--color-cool)" stroke-width="1.5" class="pulse-ring" />
              <circle cx="420" cy="41" r="12" fill="none" stroke="var(--color-cool)" stroke-width="1" class="pulse-ring-outer" />

              <!-- Standard Collapse Dot -->
              <circle cx="420" cy="142" r="4" fill="var(--color-bad)" />

              <!-- Task Milestones on X Axis -->
              <g class="task-milestones" fill="var(--color-muted)" font-size="9.5" font-family="var(--font-outlier)">
                <text x="40" y="172" text-anchor="middle">Task 1 (Demo)</text>
                <text x="165" y="172" text-anchor="middle">Task 15</text>
                <text x="290" y="172" text-anchor="middle">Task 35</text>
                <text x="420" y="172" text-anchor="middle">Task 50+ (Lifelong)</text>
              </g>

              <!-- Labels cleanly padded on the right -->
              <g transform="translate(432, 0)">
                <rect x="0" y="28" width="130" height="26" rx="4" fill="var(--color-cool-soft)" stroke="var(--color-cool)" stroke-width="1" />
                <circle cx="10" cy="41" r="3" fill="var(--color-cool)" />
                <text x="18" y="45" fill="var(--color-cool)" font-size="11" font-weight="700" font-family="var(--font-outlier)">MegaMind: 98.6%</text>

                <rect x="0" y="129" width="130" height="26" rx="4" fill="var(--color-bad-soft)" stroke="var(--color-bad)" stroke-width="1" />
                <circle cx="10" cy="142" r="3" fill="var(--color-bad)" />
                <text x="18" y="146" fill="var(--color-bad)" font-size="11" font-weight="700" font-family="var(--font-outlier)">Standard: 22.4%</text>
              </g>
            </svg>

            <!-- Bottom Live Telemetry Strip -->
            <div class="retention-footer-strip font-mono">
              <div class="strip-left">
                <span class="live-synapse-beacon"></span>
                <span class="synapse-status-text">Continuous Stream · 50 Sequential Tasks</span>
              </div>
              <span class="retention-pill font-mono">Overwriting: 0.0%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Card 3: Task-Relevant Perception -->
      <div class="bento-card bento-span-compact">
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>03 · ON-DEVICE VISION</span>
          </div>

          <h3 class="bento-card-title sm font-display">
            YOLOv8n Vision Cortex
          </h3>

          <p class="bento-card-desc sm">
            Trained specifically on UI functional affordances (buttons, search bars, navigation icons). Ignores raw pixel shifts, brand color changes, and DOM mutations.
          </p>

          <div class="bento-stat-chips font-mono">
            <span class="chip-item">Model: 6.3 MB</span>
            <span class="chip-item">mAP@0.5: 95.4%</span>
          </div>
        </div>
      </div>

      <!-- Card 4: Staged STM Buffer -->
      <div class="bento-card bento-span-compact">
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>04 · NOISE IMMUNITY</span>
          </div>

          <h3 class="bento-card-title sm font-display">
            Short-Term Memory Buffer
          </h3>

          <p class="bento-card-desc sm">
            Candidate demonstrations are staged in a transient sliding-window buffer. Accidental misclicks, mouse twitches, and one-off actions expire without polluting the core memory graph.
          </p>

          <div class="bento-stat-chips font-mono">
            <span class="chip-item">Window: 5 min</span>
            <span class="chip-item">0 False Clones</span>
          </div>
        </div>
      </div>

      <!-- Card 5: Garbage Collection & Pruning -->
      <div class="bento-card bento-span-compact">
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>05 · BOUNDED FOOTPRINT</span>
          </div>

          <h3 class="bento-card-title sm font-display">
            Strategic Self-Pruning
          </h3>

          <p class="bento-card-desc sm">
            Atomic Small Trees maintain active reference counters (`ref_count`). When obsolete compound workflows are deleted, unreferenced sub-skills are automatically garbage collected.
          </p>

          <div class="bento-stat-chips font-mono">
            <span class="chip-item">Auto GC</span>
            <span class="chip-item">Ref Pruning</span>
          </div>
        </div>
      </div>

      <!-- Card 6: 100% Local-First Edge Privacy -->
      <div class="bento-card bento-span-compact">
        <div class="card-content">
          <div class="bento-tag-pill font-mono">
            <span>06 · ENTERPRISE SECURITY</span>
          </div>

          <h3 class="bento-card-title sm font-display">
            100% Edge Native Execution
          </h3>

          <p class="bento-card-desc sm">
            Runs completely offline on local CPU, Apple Neural Engine, or Nvidia TensorRT. Screen recordings and corporate data never leave your secure workstation.
          </p>

          <div class="bento-stat-chips font-mono">
            <span class="chip-item">Zero Telemetry</span>
            <span class="chip-item">&lt; 1ms Latency</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bento-section {
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

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-md);
}

.bento-span-featured {
  grid-column: span 6;
}

.bento-span-compact {
  grid-column: span 3;
}

@media (max-width: 1080px) {
  .bento-span-compact {
    grid-column: span 6;
  }
}

@media (max-width: 768px) {
  .bento-span-featured,
  .bento-span-compact {
    grid-column: span 12;
  }
}

.bento-card {
  position: relative;
  border-radius: var(--radius-card);
  padding: var(--space-xl);
  overflow: hidden;
  border: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-2);
  box-shadow: none;
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.bento-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-cool), transparent);
  opacity: 0;
  transition: opacity var(--dur-short) var(--ease-out);
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  box-shadow: 0 12px 28px -10px color-mix(in oklch, var(--color-cool) 28%, transparent);
}

.card-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.bento-tag-pill {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  margin-bottom: var(--space-xs);
}

.bento-card-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: var(--tracking-display);
  color: var(--color-ink);
  margin-bottom: var(--space-sm);
  overflow-wrap: break-word;
}

.bento-card-title.sm {
  font-size: var(--text-lg);
}

.bento-card-desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.55;
  margin-bottom: var(--space-md);
  flex: 1;
  overflow-wrap: break-word;
}

.bento-card-desc.sm {
  font-size: var(--text-sm);
  margin-bottom: var(--space-sm);
}

/* Synaptic Diagram (Card 1) */
.visual-synaptic-diagram {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  box-shadow: 0 4px 16px -6px rgba(0, 0, 0, 0.15);
  transition: border-color var(--dur-short), box-shadow var(--dur-short);
}

.visual-synaptic-diagram:hover {
  border-color: color-mix(in oklch, var(--color-cool) 50%, var(--color-rule-2));
  box-shadow: 0 8px 24px -8px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.synaptic-svg {
  width: 100%;
  height: auto;
  display: block;
  padding: 12px 14px 4px;
  overflow: visible;
}

.syn-node-group {
  cursor: pointer;
  transition: transform var(--dur-short) var(--ease-out), filter var(--dur-short) var(--ease-out);
}

.syn-node-group:hover {
  transform: translateY(-2px);
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
}

.beacon-wave {
  animation: beacon-wave-expand 2.2s ease-out infinite;
  transform-origin: 20px 15px;
}

@keyframes beacon-wave-expand {
  0% {
    r: 4;
    opacity: 0.9;
  }
  100% {
    r: 16;
    opacity: 0;
  }
}

.shared-dot-pulse {
  animation: shared-pulse 2s ease-in-out infinite;
  transform-origin: 16px 17px;
}

@keyframes shared-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.55;
  }
}

/* Action Potential Synaptic Impulses */
.action-potential {
  pointer-events: none;
}

.ap-web {
  offset-path: path("M 270 36 C 270 68, 130 68, 130 92");
  animation: travel-web 2.8s linear infinite;
}

@keyframes travel-web {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

.ap-app {
  offset-path: path("M 270 36 C 270 68, 410 68, 410 92");
  animation: travel-app 2.8s linear 1.4s infinite;
}

@keyframes travel-app {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

.ap-shared-1 {
  offset-path: path("M 130 124 C 130 148, 225 148, 225 168");
  animation: travel-shared1 2.2s linear 0.7s infinite;
}

@keyframes travel-shared1 {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

.ap-shared-2 {
  offset-path: path("M 410 124 C 410 148, 315 148, 315 168");
  animation: travel-shared2 2.2s linear 1.8s infinite;
}

@keyframes travel-shared2 {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

/* Retention Chart (Card 2) */
.retention-chart-box {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  box-shadow: 0 4px 16px -6px rgba(0, 0, 0, 0.15);
  transition: border-color var(--dur-short), box-shadow var(--dur-short);
}

.retention-chart-box:hover {
  border-color: color-mix(in oklch, var(--color-cool) 50%, var(--color-rule-2));
  box-shadow: 0 8px 24px -8px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.retention-svg {
  width: 100%;
  height: auto;
  display: block;
  padding: 10px 14px 4px;
  overflow: visible;
}

/* Horizontal Laser Scanner Sweep */
.retention-scanner {
  animation: laser-sweep 4.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes laser-sweep {
  0% {
    transform: translateX(35px);
    opacity: 0;
  }
  10% {
    opacity: 0.75;
  }
  90% {
    opacity: 0.75;
  }
  100% {
    transform: translateX(420px);
    opacity: 0;
  }
}

/* Traveling Comet on MegaMind Curve */
.retention-comet {
  offset-path: path("M 40 38 C 150 39, 260 40, 340 40 S 390 41, 420 41");
  animation: comet-travel 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes comet-travel {
  0% { offset-distance: 0%; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

/* Multi-Ring Radar Ping */
.pulse-ring {
  animation: radar-ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
  transform-origin: 420px 41px;
}

.pulse-ring-outer {
  animation: radar-ping 2.4s cubic-bezier(0, 0, 0.2, 1) 0.6s infinite;
  transform-origin: 420px 41px;
}

@keyframes radar-ping {
  0% {
    r: 4.5;
    opacity: 1;
  }
  100% {
    r: 18;
    opacity: 0;
  }
}

/* Live Telemetry Strips */
.synaptic-footer-strip,
.retention-footer-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background: var(--color-paper-2);
  border-top: var(--rule-hair) solid var(--color-rule);
  font-size: 11px;
  color: var(--color-muted);
  flex-wrap: wrap;
}

.strip-left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.live-synapse-beacon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ok);
  box-shadow: 0 0 8px var(--color-ok);
  animation: beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.synapse-badge,
.retention-pill {
  color: var(--color-cool);
  background: var(--color-cool-soft);
  border: var(--rule-hair) solid var(--color-cool);
  padding: 2px 7px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 10.5px;
}

/* Stat Chips Row */
.bento-stat-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: auto;
  padding-top: var(--space-sm);
}

.chip-item {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-pill);
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums slashed-zero;
  font-weight: 500;
  color: var(--color-cool);
  white-space: nowrap;
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), background var(--dur-short) var(--ease-out);
}

.chip-item:hover {
  transform: translateY(-1px);
  border-color: var(--color-cool);
  background: var(--color-cool-soft);
}
</style>
