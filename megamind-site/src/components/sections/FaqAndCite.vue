<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { siteConfig } from '@/config/site.config'

const toastStore = useToastStore()

interface FaqItem {
  id: string
  category: string
  q: string
  a: string
  highlight: string
}

const faqs: FaqItem[] = [
  {
    id: '01',
    category: 'CONTINUAL LEARNING',
    q: 'How does MegaMind prevent catastrophic forgetting without full retraining?',
    a: 'Traditional neural networks overwrite existing synaptic weights when fine-tuned on new sequential tasks. MegaMind fundamentally decouples perception from memory. It uses a frozen or slowly-adapted lightweight visual encoder (YOLOv8n) and stores learned skills in a Hierarchical Skill Ontology (Tree-Graph). When a new task is observed, a new Big Tree is linked without modifying existing skill branches.',
    highlight: '98.6% lifelong skill retention across 50+ consecutive workflow demonstrations.',
  },
  {
    id: '02',
    category: 'HYBRID ONTOLOGY',
    q: 'Why use a Tree-Graph hybrid instead of a pure tree or pure graph?',
    a: 'Pure trees cannot share sub-skills across different workflows, causing severe memory bloat and duplicate code. Pure graphs lack strict deterministic task hierarchy. MegaMind combines both: Big Trees express high-level task composition (e.g. "Export Report"), while directed graph edges link to shared Small Trees (e.g. "OAuth Login", "Type Query") with active reference counters.',
    highlight: 'Zero redundant sub-routines through shared Small Tree reference counting.',
  },
  {
    id: '03',
    category: 'EDGE VISION',
    q: 'What happens when a website or desktop app shifts its UI layout?',
    a: 'MegaMind does not memorize rigid pixel coordinates or brittle DOM XPath selectors. Its YOLOv8n visual cortex identifies interactive elements semantically (buttons, inputs, dropdowns) across raw frames. Even if a button moves to a different corner or changes padding, the perception engine localizes it based on visual affordance.',
    highlight: 'Visual affordance bounding boxes are invariant to DOM mutations and brand CSS shifts.',
  },
  {
    id: '04',
    category: 'LOCAL-FIRST PRIVACY',
    q: 'Can MegaMind run completely offline on edge hardware?',
    a: 'Yes. MegaMind is designed from day one to be 100% local-first. The YOLOv8n visual detector is compiled via ONNX Runtime to just ~6.3 MB, running in sub-millisecond inference on Apple Silicon (Metal/MPS), standard x86 CPUs, or Nvidia GPUs. Zero screenshots or private corporate data ever leave your machine.',
    highlight: 'Zero telemetry, zero cloud API dependencies, zero external leakage.',
  },
  {
    id: '05',
    category: 'MEMORY GC & PRUNING',
    q: 'How does MegaMind prevent memory bloat over months of continuous use?',
    a: 'Layer 6 incorporates an active Synaptic Garbage Collector. When an obsolete composite task is deleted, the reference count (ref_count) of its atomic child skills decreases. If ref_count == 0 and the skill is unreferenced across all workflows, it is automatically pruned. Idle graph edges also undergo exponential temporal decay.',
    highlight: 'Strictly bounded memory footprint (< 16 MB) regardless of workflow duration.',
  },
  {
    id: '06',
    category: 'RAG COMPARISON',
    q: 'How does MegaMind differ from standard RAG or Vector Databases?',
    a: 'Standard RAG retrieves unstructured text chunks and injects them into expensive LLM prompts with token limits and hallucination risks. MegaMind stores executable, deterministic skill graphs. It executes multi-step desktop actions directly with sub-millisecond response and zero LLM query costs.',
    highlight: 'Deterministic execution graph vs. probabilistic fuzzy LLM token generation.',
  },
]

const isMarqueePaused = ref(false)
const copied = ref(false)

const bibtex = `@misc{megamind2026,
  author       = {Shuvo Singh Partho, Md. Mithun Ahomed, MAHFUZ AHAMMED HANIF, Sachitra Halder},
  title        = {MEGAMIND: A Bio-Inspired Memory-Augmented Continual Learning System with Dynamic Category Growth},
  year         = {2026},
  howpublished = {\\url{https://github.com/shuvosinghpartho/megaMind}},
  note         = {Thesis project, work in progress}
}`

function copyBibtex() {
  navigator.clipboard.writeText(bibtex)
  copied.value = true
  toastStore.show('Copied BibTeX citation to clipboard!', 'info')
  setTimeout(() => {
    copied.value = false
  }, 2500)
}
</script>

<template>
  <section id="faq" class="section-container faq-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge font-mono">
        <span class="badge-dot"></span>
        <span>07 · FREQUENTLY ASKED QUESTIONS & CITATION</span>
      </div>
      <h2 class="section-title">
        Got Questions? <br />
        <span class="amber">Core Architectural Answers</span>
      </h2>
      <p class="section-desc">
        Explore deep technical explanations of biological continual learning, edge deployment, ontology pruning, and academic citations.
      </p>
    </div>

    <!-- Infinite Marquee Scrolling Container (Left-to-Right Scrolling) -->
    <div class="marquee-controls-bar">
      <span class="marquee-hint font-mono">
        <span class="scroll-arrow">←</span>
        <span>AUTOPLAYING HORIZONTAL STREAM (PAUSE ON HOVER)</span>
        <span class="scroll-arrow">→</span>
      </span>

      <button
        class="marquee-toggle-btn font-mono"
        @click="isMarqueePaused = !isMarqueePaused"
      >
        <span>{{ isMarqueePaused ? '▶ Resume Scroll' : '⏸ Pause Scroll' }}</span>
      </button>
    </div>

    <div class="faq-marquee-viewport" :class="{ 'is-paused': isMarqueePaused }">
      <div class="faq-marquee-track">
        <!-- Set 1 -->
        <div
          v-for="item in faqs"
          :key="'s1-' + item.id"
          class="faq-card"
        >
          <div class="faq-card-header font-mono">
            <span class="faq-idx">Q.{{ item.id }}</span>
            <span class="faq-cat-tag">{{ item.category }}</span>
          </div>

          <h3 class="faq-question font-display">
            {{ item.q }}
          </h3>

          <p class="faq-answer">
            {{ item.a }}
          </p>

          <div class="faq-highlight-pill font-mono">
            <span class="highlight-bullet">⚡</span>
            <span class="highlight-text">{{ item.highlight }}</span>
          </div>
        </div>

        <!-- Set 2 (Seamless loop duplicate) -->
        <div
          v-for="item in faqs"
          :key="'s2-' + item.id"
          class="faq-card"
        >
          <div class="faq-card-header font-mono">
            <span class="faq-idx">Q.{{ item.id }}</span>
            <span class="faq-cat-tag">{{ item.category }}</span>
          </div>

          <h3 class="faq-question font-display">
            {{ item.q }}
          </h3>

          <p class="faq-answer">
            {{ item.a }}
          </p>

          <div class="faq-highlight-pill font-mono">
            <span class="highlight-bullet">⚡</span>
            <span class="highlight-text">{{ item.highlight }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Research Citation Terminal Panel (Hallmark Hairline Panel) -->
    <div class="citation-terminal-panel">
      <div class="cite-terminal-header font-mono">
        <div class="terminal-file-title">
          <span>megamind.bib · Academic Thesis & Research Citation</span>
        </div>
        <button class="btn btn--amber btn--nav" @click="copyBibtex">
          <span>{{ copied ? '✓ Copied' : '📋 Copy BibTeX' }}</span>
        </button>
      </div>

      <div class="citation-body">
        <p class="cite-desc">
          If you cite or utilize MegaMind, its YOLOv8n visual perception cortex, or the Hierarchical Skill Ontology in academic papers or thesis work, please use this official reference:
        </p>

        <pre class="bibtex-code font-mono"><code>{{ bibtex }}</code></pre>

        <div class="citation-footer-links">
          <span class="faq-footer-text font-mono">Still have technical or research questions?</span>
          <a
            :href="siteConfig.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="cite-link-btn font-mono"
          >
            Explore GitHub Repository ↗
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  position: relative;
  z-index: 2;
}

/* Header Centering */
.section-header.text-center {
  text-align: center;
  margin-inline: auto;
  margin-bottom: clamp(2rem, 4vh, 3rem);
  max-width: 72ch;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header.text-center .section-desc {
  margin-inline: auto;
}

/* Marquee Controls Bar */
.marquee-controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding: 0 var(--space-xs);
  flex-wrap: wrap;
  gap: 8px;
}

.marquee-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}

.scroll-arrow {
  color: var(--color-cool);
}

.marquee-toggle-btn {
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule-2);
  color: var(--color-ink-2);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--dur-short);
}

.marquee-toggle-btn:hover {
  border-color: var(--color-cool);
  color: var(--color-cool);
}

/* FAQ Infinite Marquee Viewport */
.faq-marquee-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: var(--space-2xl);
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  padding: 10px 0;
}

.faq-marquee-track {
  display: flex;
  gap: var(--space-lg);
  width: max-content;
  /* Left to right infinite marquee: translates from -50% to 0% */
  animation: marquee-l2r 40s linear infinite;
}

.faq-marquee-viewport:hover .faq-marquee-track,
.faq-marquee-viewport.is-paused .faq-marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-l2r {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}

/* FAQ Card inside Marquee */
.faq-card {
  flex: 0 0 380px;
  width: 380px;
  max-width: 85vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-lg);
  border-radius: var(--radius-card);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  transition: border-color var(--dur-short), transform var(--dur-short);
  box-sizing: border-box;
}

.faq-card:hover {
  border-color: var(--color-cool);
  transform: translateY(-2px);
}

.faq-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: var(--space-sm);
}

.faq-idx {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-cool);
  background: var(--color-cool-soft);
  padding: 2px 7px;
  border-radius: 4px;
  border: var(--rule-hair) solid var(--color-cool);
}

.faq-cat-tag {
  font-family: var(--font-outlier);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--color-muted);
}

.faq-question {
  font-family: var(--font-display);
  font-size: var(--text-md);
  font-weight: 500;
  line-height: 1.35;
  color: var(--color-ink);
  margin-bottom: var(--space-sm);
  overflow-wrap: break-word;
}

.faq-answer {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-ink-2);
  margin-bottom: var(--space-md);
  flex: 1;
  overflow-wrap: break-word;
}

.faq-highlight-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 4px;
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  font-family: var(--font-outlier);
  font-size: 11px;
  line-height: 1.4;
  color: var(--color-cool);
  margin-top: auto;
  overflow-wrap: break-word;
}

.highlight-bullet {
  font-size: var(--text-xs);
  flex-shrink: 0;
}

.highlight-text {
  font-weight: 500;
}

/* Citation Terminal Panel */
.citation-terminal-panel {
  border-radius: var(--radius-card);
  background: var(--color-paper-2);
  border: var(--rule-hair) solid var(--color-rule);
  overflow: hidden;
}

.cite-terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--color-paper-3);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  flex-wrap: wrap;
  gap: 12px;
}

.terminal-file-title {
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  color: var(--color-ink-2);
}

.citation-body {
  padding: var(--space-lg);
}

.cite-desc {
  font-size: var(--text-sm);
  color: var(--color-muted);
  margin-bottom: var(--space-md);
  line-height: 1.55;
}

.bibtex-code {
  padding: var(--space-md);
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-sm);
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  line-height: 1.6;
  color: var(--color-cool);
  overflow-x: auto;
  margin: 0 0 var(--space-md) 0;
}

.citation-footer-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);
  padding-top: var(--space-sm);
  border-top: var(--rule-hair) solid var(--color-rule);
}

.faq-footer-text {
  font-size: var(--text-xs);
  color: var(--color-muted);
}

.cite-link-btn {
  font-size: var(--text-xs);
  color: var(--color-accent);
  text-decoration: none;
}

.cite-link-btn:hover {
  text-decoration: underline;
}
</style>
