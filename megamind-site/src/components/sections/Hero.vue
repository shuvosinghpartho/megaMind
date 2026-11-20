<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from '@/config/site.config'
import { useDownloadModalStore } from '@/stores/downloadModal'
import { useToastStore } from '@/stores/toast'
import RealisticHumanBrainScene from '@/components/three/RealisticHumanBrainScene.vue'

const downloadModal = useDownloadModalStore()
const toastStore = useToastStore()

// Stage State
const currentStage = ref(2)
const isAutoPlay = ref(true)

function setStage(stage: number) {
  currentStage.value = stage
}

function toggleAutoPlay() {
  isAutoPlay.value = !isAutoPlay.value
}

function handleStageUpdate(newStage: number) {
  currentStage.value = newStage
}

function copyTerminalCmd() {
  navigator.clipboard.writeText('pip install megamind-agent')
  toastStore.show('Copied command: pip install megamind-agent', 'info')
}

const stageInsights: Record<number, { tag: string; label: string; brief: string }> = {
  1: {
    tag: 'STAGE 01 · BASE VISION CORTEX',
    label: 'Sparse Biological Wiring',
    brief: 'YOLOv8n edge visual encoder initialized locally with zero server dependency.',
  },
  2: {
    tag: 'STAGE 02 · WATCHING DEMONSTRATION',
    label: 'Screen Ingestion & Tokenizing',
    brief: 'Synthesizes human desktop actions into reusable Hierarchical Skill Trees.',
  },
  3: {
    tag: 'STAGE 03 · SYNAPTIC GROWTH',
    label: 'Cross-Workflow Reuse (refCount: 2)',
    brief: 'Atomic sub-skills automatically shared with zero catastrophic forgetting.',
  },
  4: {
    tag: 'STAGE 04 · LIFELONG MASTERY',
    label: 'Selective Pruning & 98.6% Retention',
    brief: 'Consolidated master circuits executing with sub-millisecond edge ONNX runtime.',
  },
}
</script>

<template>
  <section id="hero" class="futuristic-hero-section">
    <!-- Ambient Cybernetic Glow Grids -->
    <div class="cyber-grid" aria-hidden="true"></div>
    <div class="ambient-glow-left" aria-hidden="true"></div>

    <div class="hero-max-wrapper">
      <div class="hero-split-grid">
        <!-- LEFT COLUMN: Minimal, Spacious, Bold Typography & Direct Actions -->
        <div class="hero-left-column">
          <!-- Sleek Combined Status Pill -->
          <div class="hero-status-pill">
            <span class="live-dot"></span>
            <span class="pill-text font-mono">Production Release</span>
            <span class="pill-sep">•</span>
            <span class="pill-sub">Bio-Inspired Continual AI</span>
          </div>

          <h1 class="hero-headline font-display">
            The Self-Evolving UI Agent <br />
            <span class="text-gradient-cyan">That Never Forgets.</span>
          </h1>

          <p class="hero-subhead">
            Inspired by synaptic growth: MEGAMIND learns multi-step desktop & web workflows directly from screen recordings — synthesizing an on-device Hierarchical Tree-Graph memory that shares sub-tasks with zero weight overwriting.
          </p>

          <!-- Primary Hero Actions -->
          <div class="hero-actions-row">
            <button class="hero-btn-primary font-display" @click="downloadModal.openModal()">
              <span>Get MEGAMIND</span>
              <svg class="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <a href="#interactive-console" class="hero-btn-secondary font-display">
              Launch Live Studio ↓
            </a>
          </div>

          <!-- Quick Terminal Snippet Box -->
          <div class="hero-cli-row">
            <div class="hero-cmd-snippet" @click="copyTerminalCmd" title="Click to copy install command">
              <span class="cmd-dollar">$</span>
              <span class="cmd-text font-mono">pip install megamind-agent</span>
              <span class="cmd-copy-pill font-mono">Copy</span>
            </div>
            <a :href="siteConfig.repoUrl" target="_blank" rel="noopener noreferrer" class="hero-github-pill font-mono">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          <!-- Minimal Live Telemetry Row -->
          <div class="hero-telemetry-row">
            <div class="tele-item">
              <span class="tele-dot green"></span>
              <span class="tele-num">0.0%</span>
              <span class="tele-label">Weight Overwrites</span>
            </div>
            <span class="tele-sep">/</span>
            <div class="tele-item">
              <span class="tele-dot blue"></span>
              <span class="tele-num">6.3 MB</span>
              <span class="tele-label">Edge YOLOv8n</span>
            </div>
            <span class="tele-sep">/</span>
            <div class="tele-item">
              <span class="tele-dot purple"></span>
              <span class="tele-num">98.6%</span>
              <span class="tele-label">Lifelong Retention</span>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Seamlessly Blended Visual Stage + Integrated HUD Deck -->
        <div class="hero-right-column">
          <!-- Multi-Spectrum Atmospheric Holographic Field -->
          <div class="stage-ambient-aura" aria-hidden="true"></div>

          <div class="stage-display-unit">
            <RealisticHumanBrainScene
              :stage="currentStage"
              :auto-play="isAutoPlay"
              @update:stage="handleStageUpdate"
            />

            <!-- Finite Automata Machine (FSM / DFA) Interactive Diagram Deck -->
            <div class="stage-hud-deck fsm-automata-deck">
              <div class="fsm-header-bar">
                <div class="fsm-meta-left">
                  <span class="fsm-badge font-mono">FINITE AUTOMATON: M = ⟨Q, Σ, δ, q₀, F⟩</span>
                  <span class="fsm-equation font-mono">
                    δ(q{{ currentStage - 1 }}, action) → <strong class="text-cyan">q{{ currentStage === 4 ? 3 : currentStage }}</strong>
                  </span>
                </div>

                <button
                  class="hud-play-toggle font-mono"
                  :title="isAutoPlay ? 'Pause Auto-Simulation' : 'Resume Auto-Simulation'"
                  @click="toggleAutoPlay"
                >
                  <span class="play-icon">{{ isAutoPlay ? '⏸' : '▶' }}</span>
                  <span class="play-text">{{ isAutoPlay ? 'Pause' : 'Auto' }}</span>
                </button>
              </div>

              <!-- Animated Vector Finite Automata State Machine Diagram (Image Reference) -->
              <div class="fsm-diagram-container">
                <svg viewBox="0 0 720 148" class="fsm-svg" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" />
                    </marker>
                    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7df9ff" />
                    </marker>
                  </defs>

                  <!-- 1. Start Indicator ">>" -->
                  <g class="fsm-start-indicator">
                    <path d="M 36 67 L 48 75 L 36 83" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M 48 67 L 60 75 L 48 83" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    <line x1="60" y1="75" x2="68" y2="75" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </g>

                  <!-- 2. Self-Loops (Like Figure b in Image) -->
                  <!-- Loop on q0: b, c -->
                  <path d="M 82 51 C 65 18, 125 18, 108 51" class="fsm-loop-arc" marker-end="url(#arrow)" />
                  <text x="95" y="22" class="fsm-edge-label font-mono">b,c</text>

                  <!-- Loop on q1: a -->
                  <path d="M 252 51 C 235 18, 295 18, 278 51" class="fsm-loop-arc" marker-end="url(#arrow)" />
                  <text x="265" y="22" class="fsm-edge-label font-mono">a</text>

                  <!-- Loop on accept state q3: a, b, c -->
                  <path d="M 612 51 C 595 16, 655 16, 638 51" class="fsm-loop-arc" marker-end="url(#arrow)" />
                  <text x="625" y="20" class="fsm-edge-label font-mono">a,b,c</text>

                  <!-- 3. Forward Transitions (Direct State Edges) -->
                  <!-- q0 -> q1: a -->
                  <line x1="121" y1="75" x2="237" y2="75" class="fsm-edge-line" :class="{ 'active-flow': currentStage === 2 }" marker-end="url(#arrow)" />
                  <text x="179" y="66" class="fsm-edge-label font-mono" :class="{ 'active-label': currentStage === 2 }">a</text>

                  <!-- q1 -> q2: b -->
                  <line x1="291" y1="75" x2="417" y2="75" class="fsm-edge-line" :class="{ 'active-flow': currentStage === 3 }" marker-end="url(#arrow)" />
                  <text x="354" y="66" class="fsm-edge-label font-mono" :class="{ 'active-label': currentStage === 3 }">b</text>

                  <!-- q2 -> q3: c -->
                  <line x1="471" y1="75" x2="597" y2="75" class="fsm-edge-line" :class="{ 'active-flow': currentStage === 4 }" marker-end="url(#arrow)" />
                  <text x="534" y="66" class="fsm-edge-label font-mono" :class="{ 'active-label': currentStage === 4 }">c</text>

                  <!-- 4. Backward Feedback Transitions (Like Figure b in Image) -->
                  <!-- q1 -> q0 (underneath): c -->
                  <path d="M 250 95 Q 180 126 110 95" class="fsm-back-arc" marker-end="url(#arrow)" />
                  <text x="180" y="126" class="fsm-edge-label font-mono">c</text>

                  <!-- q2 -> q1 (over top): b,c -->
                  <path d="M 430 52 Q 355 18 280 52" class="fsm-back-arc" marker-end="url(#arrow)" />
                  <text x="355" y="20" class="fsm-edge-label font-mono">b,c</text>

                  <!-- q3 -> q2 (over top): b -->
                  <path d="M 610 52 Q 535 22 460 52" class="fsm-back-arc" marker-end="url(#arrow)" />
                  <text x="535" y="24" class="fsm-edge-label font-mono">b</text>

                  <!-- q3 -> q1 (underneath long sweeping arc): a -->
                  <path d="M 610 95 Q 445 138 280 95" class="fsm-back-arc long-arc" marker-end="url(#arrow)" />
                  <text x="445" y="136" class="fsm-edge-label font-mono">a</text>

                  <!-- 5. State Nodes (q0, q1, q2, q3) -->
                  <!-- State q0: Newborn Base -->
                  <g class="fsm-state-node" :class="{ active: currentStage === 1 }" @click="setStage(1)">
                    <circle cx="95" cy="75" r="26" class="state-circle-bg" />
                    <circle cx="95" cy="75" r="26" class="state-circle-border" />
                    <text x="95" y="80" class="state-q-text font-serif">q₀</text>
                    <text x="95" y="112" class="state-name-text font-mono">01 Newborn Base</text>
                  </g>

                  <!-- State q1: Watching UI -->
                  <g class="fsm-state-node" :class="{ active: currentStage === 2 }" @click="setStage(2)">
                    <circle cx="265" cy="75" r="26" class="state-circle-bg" />
                    <circle cx="265" cy="75" r="26" class="state-circle-border" />
                    <text x="265" y="80" class="state-q-text font-serif">q₁</text>
                    <text x="265" y="112" class="state-name-text font-mono">02 Watching UI</text>
                  </g>

                  <!-- State q2: Synaptic Growth -->
                  <g class="fsm-state-node" :class="{ active: currentStage === 3 }" @click="setStage(3)">
                    <circle cx="445" cy="75" r="26" class="state-circle-bg" />
                    <circle cx="445" cy="75" r="26" class="state-circle-border" />
                    <text x="445" y="80" class="state-q-text font-serif">q₂</text>
                    <text x="445" y="112" class="state-name-text font-mono">03 Synaptic Growth</text>
                  </g>

                  <!-- State q3: Lifelong Mastery (Double Concentric Circle Accept State!) -->
                  <g class="fsm-state-node accept-state" :class="{ active: currentStage === 4 }" @click="setStage(4)">
                    <circle cx="625" cy="75" r="26" class="state-circle-bg" />
                    <circle cx="625" cy="75" r="26" class="state-circle-border" />
                    <circle cx="625" cy="75" r="21" class="state-circle-inner-accept" />
                    <text x="625" y="80" class="state-q-text font-serif">q₃</text>
                    <text x="625" y="112" class="state-name-text font-mono">04 Lifelong Mastery</text>
                  </g>
                </svg>
              </div>

              <!-- Dynamic 1-line Telemetry Caption -->
              <div class="hud-narrative-bar">
                <span class="hud-stage-badge">{{ stageInsights[currentStage].tag }}</span>
                <span class="hud-narrative-text">
                  <strong>{{ stageInsights[currentStage].label }}</strong>: {{ stageInsights[currentStage].brief }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.futuristic-hero-section {
  position: relative;
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: clamp(0.2rem, 0.5vh, 0.6rem) clamp(1rem, 3vw, 2.5rem) clamp(0.6rem, 1.2vh, 1rem);
  background: var(--bg);
  box-sizing: border-box;
}

/* Ambient Cybernetic Lights */
.cyber-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: 
    radial-gradient(circle at 50% 20%, rgba(88, 166, 255, 0.08) 0%, transparent 60%),
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 100%, 48px 48px, 48px 48px;
  background-position: center center;
  opacity: 0.75;
}

[data-theme="light"] .cyber-grid {
  background-image: 
    radial-gradient(circle at 50% 20%, rgba(9, 105, 218, 0.05) 0%, transparent 60%),
    linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
}

.ambient-glow-left {
  position: absolute;
  top: 15%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(88, 166, 255, 0.12) 0%, rgba(88, 166, 255, 0) 70%);
  pointer-events: none;
  filter: blur(60px);
}

.hero-max-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1360px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  padding-top: 0;
}

/* Two-Column Split Grid */
.hero-split-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  align-items: center;
  gap: clamp(1.5rem, 3.5vw, 3.5rem);
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 1080px) {
  .hero-split-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}

/* Left Column */
.hero-left-column {
  display: flex;
  flex-direction: column;
  gap: clamp(0.45rem, 1.1vh, 0.9rem);
  width: 100%;
  max-width: 560px;
  min-width: 0;
  box-sizing: border-box;
}

@media (max-width: 1080px) {
  .hero-left-column {
    max-width: 100%;
    text-align: center;
    align-items: center;
  }
}

/* Sleek Minimal Status Pill */
.hero-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-muted);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}

@media (max-width: 1080px) {
  .hero-status-pill {
    align-self: center;
  }
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-ok);
}

.pill-sep {
  color: var(--color-rule-2);
  opacity: 0.6;
}

.pill-sub {
  color: var(--color-muted);
}

.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.15rem, 3.6vw, 3.75rem);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: var(--tracking-display);
  color: var(--color-ink);
  word-break: break-word;
}

.gradient-text {
  color: var(--color-cool);
}

.hero-subhead {
  font-family: var(--font-display);
  font-size: clamp(0.88rem, 1.05vw, 1.05rem);
  color: var(--color-muted);
  line-height: 1.5;
}

/* Actions Row */
.hero-actions-row {
  display: flex;
  gap: 18px;
  align-items: center;
  flex-wrap: wrap;
  padding-top: var(--space-1);
}

@media (max-width: 1080px) {
  .hero-actions-row {
    justify-content: center;
  }
}

.hero-btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: 12px 26px;
  border-radius: var(--radius-pill);
  border: var(--rule-hair) solid var(--color-accent);
  cursor: pointer;
  box-shadow: 0 4px 16px -3px color-mix(in oklch, var(--color-accent) 50%, transparent);
  animation: cta-hop-bounce 2.6s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  transition: background-color var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

@keyframes cta-hop-bounce {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    box-shadow: 0 4px 14px -3px color-mix(in oklch, var(--color-accent) 45%, transparent);
  }
  6% {
    /* Crouch / wind up */
    transform: translate(-1px, 2px) rotate(-1deg) scale(1.02, 0.97);
  }
  14% {
    /* Hop 1: High leap towards top-left */
    transform: translate(-6px, -10px) rotate(-3.5deg) scale(1.04, 1.02);
    box-shadow: -4px 16px 28px -4px color-mix(in oklch, var(--color-accent) 65%, transparent);
  }
  24% {
    /* Land & rebound towards right */
    transform: translate(2px, 1px) rotate(1.5deg) scale(0.98, 1.01);
    box-shadow: 2px 4px 10px -2px color-mix(in oklch, var(--color-accent) 42%, transparent);
  }
  32% {
    /* Hop 2: Energetic jump towards top-right */
    transform: translate(6px, -8px) rotate(3deg) scale(1.03, 1.01);
    box-shadow: 4px 14px 24px -4px color-mix(in oklch, var(--color-accent) 60%, transparent);
  }
  40% {
    /* Land & bounce back left */
    transform: translate(-3px, -2px) rotate(-1.5deg) scale(1.01);
    box-shadow: -2px 6px 14px -3px color-mix(in oklch, var(--color-accent) 50%, transparent);
  }
  48% {
    /* Playful wiggle center */
    transform: translate(2px, 0px) rotate(1deg) scale(1);
    box-shadow: 0 4px 14px -3px color-mix(in oklch, var(--color-accent) 45%, transparent);
  }
  54% {
    /* Settle */
    transform: translate(0, 0) rotate(0deg) scale(1);
    box-shadow: 0 4px 14px -3px color-mix(in oklch, var(--color-accent) 45%, transparent);
  }
  /* Natural rest pause between 54% and 100% */
}

.hero-btn-primary:hover {
  animation-play-state: paused;
  background: color-mix(in oklch, var(--color-accent) 92%, white);
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 14px 30px -4px color-mix(in oklch, var(--color-accent) 65%, transparent), 0 0 18px -2px var(--color-accent);
}

.hero-btn-primary:active {
  transform: translateY(1px) scale(0.97);
}

[data-theme="light"] .hero-btn-primary {
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border-color: var(--color-accent);
}

.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--dur-fast);
  animation: arrow-hop 2.6s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
}

@keyframes arrow-hop {
  0%, 54%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  14% {
    transform: translate(-2px, -1px) rotate(-8deg);
  }
  24% {
    transform: translate(1px, 0) rotate(4deg);
  }
  32% {
    transform: translate(3px, -1px) rotate(10deg);
  }
  40% {
    transform: translate(-1px, 0) rotate(-4deg);
  }
  48% {
    transform: translate(1px, 0) rotate(2deg);
  }
}

.hero-btn-primary:hover .btn-arrow {
  animation-play-state: paused;
  transform: translateX(4px);
}

.hero-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 500;
  padding: 12px 22px;
  border-radius: var(--radius-pill);
  text-decoration: none;
  transition: background-color var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out);
}

.hero-btn-secondary:hover {
  background: var(--color-paper-3);
  border-color: var(--color-cool);
}

/* CLI Row */
.hero-cli-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 4px;
}

@media (max-width: 1080px) {
  .hero-cli-row {
    justify-content: center;
  }
}

.hero-cmd-snippet {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-pill);
  padding: 8px 14px;
  font-family: var(--font-outlier);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums slashed-zero;
  cursor: pointer;
  transition: border-color var(--dur-short) var(--ease-out);
}

[data-theme="light"] .hero-cmd-snippet {
  background: var(--color-paper-3);
}

.hero-cmd-snippet:hover {
  border-color: var(--color-rule-2);
}

.cmd-dollar {
  color: var(--color-accent);
  font-weight: 500;
}

.cmd-text {
  color: var(--color-ink);
}

.cmd-copy-pill {
  font-size: var(--text-xs);
  color: var(--color-muted);
  background: var(--color-paper-2);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  border: var(--rule-hair) solid var(--color-rule);
}

.hero-github-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-pill);
  padding: 8px 14px;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--dur-fast), border-color var(--dur-fast);
}

.hero-github-pill:hover {
  color: var(--color-ink);
  border-color: var(--color-rule-2);
}

/* Minimal Live Telemetry Row */
.hero-telemetry-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 8px 16px;
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  width: fit-content;
}

@media (max-width: 1080px) {
  .hero-telemetry-row {
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.tele-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tele-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.tele-dot.green { background: var(--color-ok); }
.tele-dot.blue { background: var(--color-cool); }
.tele-dot.purple { background: var(--color-accent); }

.tele-num {
  font-family: var(--font-outlier);
  font-size: var(--text-sm);
  font-weight: 500;
  font-variant-numeric: tabular-nums slashed-zero;
  color: var(--color-ink);
}

.tele-label {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-muted);
}

.tele-sep {
  color: var(--color-rule);
}

/* Right Column: Seamlessly Blended Visual Stage */
.hero-right-column {
  position: relative;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.stage-display-unit {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Hallmark Console Hairline HUD Panel */
.stage-hud-deck {
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: none;
  box-sizing: border-box;
}

[data-theme="light"] .stage-hud-deck {
  background: var(--color-paper-2);
  border-color: var(--color-rule);
  box-shadow: none;
}

/* Finite Automata Machine (FSM / DFA) Diagram Deck */
.fsm-automata-deck {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fsm-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.fsm-meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.fsm-badge {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-weight: 500;
  font-variant-numeric: tabular-nums slashed-zero;
  color: var(--color-cool);
  background: var(--color-cool-soft);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-cool) 35%, transparent);
  padding: 2px 8px;
  border-radius: 4px;
}

[data-theme="light"] .fsm-badge {
  color: var(--color-cool);
  background: var(--color-cool-soft);
  border-color: color-mix(in oklch, var(--color-cool) 35%, transparent);
}

.fsm-equation {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-muted);
  font-variant-numeric: tabular-nums slashed-zero;
}

.text-cyan {
  color: var(--color-cool);
  font-weight: 600;
}

[data-theme="light"] .text-cyan {
  color: var(--color-cool);
}

[data-theme="light"] .text-cyan {
  color: #0284c7;
}

/* FSM Vector SVG */
.fsm-diagram-container {
  width: 100%;
  overflow-x: auto;
  padding: 4px 0 2px;
  display: flex;
  justify-content: center;
}

.fsm-svg {
  width: 100%;
  max-width: 720px;
  height: auto;
  overflow: visible;
  color: var(--muted);
}

.fsm-start-indicator {
  color: var(--cyan);
}

[data-theme="light"] .fsm-start-indicator {
  color: #0284c7;
}

/* Lines and Arcs */
.fsm-edge-line {
  stroke: var(--border);
  stroke-width: 1.8;
  color: var(--border);
  transition: all 0.3s ease;
}

.fsm-loop-arc,
.fsm-back-arc {
  fill: none;
  stroke: var(--border);
  stroke-width: 1.4;
  color: var(--border);
  transition: all 0.3s ease;
}

.fsm-edge-line.active-flow {
  stroke: var(--cyan);
  color: var(--cyan);
  stroke-width: 2.2;
  stroke-dasharray: 6 3;
  animation: flow-dash 1.2s infinite linear;
}

[data-theme="light"] .fsm-edge-line.active-flow {
  stroke: #0284c7;
  color: #0284c7;
}

@keyframes flow-dash {
  to { stroke-dashoffset: -18; }
}

.fsm-edge-label {
  font-size: 11px;
  font-weight: 700;
  fill: var(--muted);
  text-anchor: middle;
  user-select: none;
}

.fsm-edge-label.active-label {
  fill: var(--cyan);
  font-weight: 800;
}

[data-theme="light"] .fsm-edge-label.active-label {
  fill: #0284c7;
}

/* State Nodes (Circles) */
.fsm-state-node {
  cursor: pointer;
  transition: transform var(--dur-short) var(--ease-out);
}

.fsm-state-node:hover {
  transform: translateY(-2px);
}

.state-circle-bg {
  fill: var(--color-paper-3);
  transition: fill var(--dur-short) var(--ease-out);
}

.state-circle-border {
  fill: none;
  stroke: var(--color-rule);
  stroke-width: 1.5;
  transition: stroke var(--dur-short) var(--ease-out);
}

.state-circle-inner-accept {
  fill: none;
  stroke: var(--color-rule);
  stroke-width: 1.5;
  transition: stroke var(--dur-short) var(--ease-out);
}

.state-q-text {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  fill: var(--color-ink);
  text-anchor: middle;
  dominant-baseline: middle;
  user-select: none;
}

.state-name-text {
  font-family: var(--font-outlier);
  font-size: 10px;
  font-weight: 500;
  font-variant-numeric: tabular-nums slashed-zero;
  fill: var(--color-muted);
  text-anchor: middle;
  user-select: none;
}

/* Active State Highlighting */
.fsm-state-node.active .state-circle-bg {
  fill: var(--color-cool-soft);
}

.fsm-state-node.active .state-circle-border {
  stroke: var(--color-cool);
  stroke-width: 2.2;
}

.fsm-state-node.active .state-circle-inner-accept {
  stroke: var(--color-ok);
  stroke-width: 2;
}

.fsm-state-node.active .state-q-text {
  fill: var(--color-cool);
  font-weight: 600;
}

.fsm-state-node.active .state-name-text {
  fill: var(--color-ink);
  font-weight: 500;
}

.hud-play-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-muted);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: border-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
}

.hud-play-toggle:hover {
  color: var(--color-ink);
  border-color: var(--color-rule-2);
}

.hud-narrative-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--color-paper-3);
  border-radius: 6px;
  border: var(--rule-hair) solid var(--color-rule);
  font-size: var(--text-xs);
  line-height: 1.45;
}

.hud-stage-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--color-accent-soft);
  border: var(--rule-hair) solid color-mix(in oklch, var(--color-accent) 35%, transparent);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent);
  white-space: nowrap;
  flex-shrink: 0;
}

.hud-narrative-text {
  color: var(--color-muted);
  font-size: var(--text-xs);
  line-height: 1.4;
  word-break: break-word;
}

.hud-narrative-text strong {
  color: var(--color-ink);
}
</style>
