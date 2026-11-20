<script setup lang="ts">
import { useCases } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
import Card from '@/components/ui/Card.vue'
</script>

<template>
  <section id="use-cases" class="section-container">
    <div class="section-header">
      <Badge variant="target">Real-World Application</Badge>
      <h2 class="section-title">Target Scenarios & Use Cases</h2>
      <p class="section-desc">
        Honest, concrete scenarios where imitation-learning UI automation can solve repetitive, API-less, and layout-sensitive problems.
      </p>
    </div>

    <div class="usecases-grid">
      <Card
        v-for="uc in useCases"
        :key="uc.id"
        class="usecase-card"
      >
        <div class="uc-header">
          <Badge variant="target">{{ uc.badge }}</Badge>
          <h3 class="uc-title">{{ uc.title }}</h3>
        </div>

        <div class="uc-body">
          <div class="uc-block">
            <span class="block-label">Pain Point</span>
            <p class="block-text">{{ uc.problem }}</p>
          </div>

          <div class="uc-block uc-solution">
            <span class="block-label label-approach">MEGAMIND Approach</span>
            <p class="block-text text-approach">{{ uc.approach }}</p>
          </div>
        </div>
      </Card>
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

.usecases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: var(--space-5);
}

.usecase-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
}

.uc-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
}

.uc-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-top: 4px;
}

.uc-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: auto;
}

.uc-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.block-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.05em;
}

.block-text {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.55;
}

.uc-solution {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
}

.label-approach {
  color: var(--accent-growth);
}

.text-approach {
  color: var(--text);
  font-size: 0.9rem;
}
</style>
