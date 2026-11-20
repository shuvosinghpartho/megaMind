<script setup lang="ts">
import { faqItems } from '@/content/megamind'
import Badge from '@/components/ui/Badge.vue'
import Accordion from '@/components/ui/Accordion.vue'

const accordionItems = faqItems.map((item, idx) => ({
  id: `faq-${idx}`,
  title: item.question,
  content: item.answer,
}))
</script>

<template>
  <section id="faq" class="section-container">
    <div class="section-header">
      <Badge variant="default">Knowledge Base</Badge>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <p class="section-desc">
        Core technical distinctions, ontology mechanics, and timeline expectations.
      </p>
    </div>

    <div class="faq-card">
      <Accordion :items="accordionItems" default-open-id="faq-0" />
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

.faq-card {
  width: 100%;
}
</style>
