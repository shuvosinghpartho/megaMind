<script setup lang="ts">
import { contributingSteps, bibtexCitation, acknowledgements } from '@/content/megamind'
import { siteConfig } from '@/config/site.config'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

function copyCitation() {
  navigator.clipboard.writeText(bibtexCitation)
  toastStore.show('BibTeX citation copied to clipboard!', 'info')
}
</script>

<template>
  <section id="contribute" class="section-container">
    <div class="section-header">
      <Badge variant="in-progress">Community & Citation</Badge>
      <h2 class="section-title">Contribute & Cite</h2>
      <p class="section-desc">
        MEGAMIND is developed in the open. Contributions, issues, and academic discussions are welcome.
      </p>
    </div>

    <div class="contribute-grid">
      <!-- Steps -->
      <div class="steps-card">
        <h3 class="card-heading">Contribution Workflow</h3>
        <div class="steps-list">
          <div v-for="(step, idx) in contributingSteps" :key="step" class="step-item">
            <span class="step-badge">0{{ idx + 1 }}</span>
            <span class="step-text">{{ step }}</span>
          </div>
        </div>

        <div class="github-action">
          <Button :href="siteConfig.repoUrl" target="_blank" variant="secondary" size="md">
            Open Repository on GitHub
          </Button>
        </div>
      </div>

      <!-- BibTeX Citation -->
      <div class="citation-card">
        <div class="citation-top">
          <h3 class="card-heading">Cite MEGAMIND</h3>
          <button class="copy-citation-btn" @click="copyCitation">
            Copy BibTeX
          </button>
        </div>
        <pre class="citation-box"><code>{{ bibtexCitation }}</code></pre>

        <!-- Acknowledgements -->
        <div class="ack-box">
          <span class="ack-title">Acknowledgements:</span>
          <div class="ack-tags">
            <span v-for="ack in acknowledgements" :key="ack" class="ack-pill">
              {{ ack }}
            </span>
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

.contribute-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-6);
}

@media (max-width: 850px) {
  .contribute-grid {
    grid-template-columns: 1fr;
  }
}

.steps-card,
.citation-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.card-heading {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.step-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-perception);
  flex-shrink: 0;
}

.step-text {
  font-size: 0.92rem;
  color: var(--muted);
}

.github-action {
  margin-top: auto;
  padding-top: var(--space-3);
}

.citation-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy-citation-btn {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 4px 12px;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
}

.copy-citation-btn:hover {
  border-color: var(--accent-perception);
  color: var(--accent-perception);
}

.citation-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-4);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  color: var(--text);
  line-height: 1.5;
  overflow-x: auto;
}

.ack-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
}

.ack-title {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  font-weight: 700;
}

.ack-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.ack-pill {
  font-size: 0.82rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  color: var(--text);
}
</style>
