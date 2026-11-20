<script setup lang="ts">
import { openQuestions } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
import Accordion from '@/components/ui/Accordion.vue'

const accordionItems = openQuestions.map((q) => ({
  id: q.id,
  title: q.question,
  content: q.detail,
}))
</script>

<template>
  <section id="research" class="section-container">
    <div class="section-header">
      <Badge variant="planned">Open Inquiry</Badge>
      <h2 class="section-title">Open Research Questions</h2>
      <p class="section-desc">
        We treat open technical challenges as opportunities for rigorous exploration and collaboration, not as hidden flaws.
      </p>
    </div>

    <div class="research-card">
      <Accordion :items="accordionItems" default-open-id="growth-criteria" />
    </div>
  </section>
</template>

<style scoped>
.section-container {
  max-width: 900px;
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

.research-card {
  width: 100%;
}
</style>
