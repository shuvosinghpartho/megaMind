<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from '@/config/site.config'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const name = ref('')
const email = ref('')
const company = ref('')
const message = ref('')
const isSubmitting = ref(false)

function handleSubmit() {
  if (!email.value || !name.value) {
    toastStore.show('Please fill in your name and email.', 'error')
    return
  }

  isSubmitting.value = true

  // If endpoint is not set, open mailto fallback
  if (!siteConfig.waitlistEndpoint) {
    const subject = encodeURIComponent(`MEGAMIND Pilot Request from ${name.value} (${company.value || 'Independent'})`)
    const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nCompany: ${company.value}\n\nMessage:\n${message.value}`)
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
    toastStore.show('Opening your email client...', 'info')
    isSubmitting.value = false
    return
  }

  // Simulated endpoint submit
  setTimeout(() => {
    isSubmitting.value = false
    toastStore.show('Thank you! Your pilot request has been received.', 'info')
    name.value = ''
    email.value = ''
    company.value = ''
    message.value = ''
  }, 600)
}
</script>

<template>
  <section id="integration" class="section-container">
    <div class="section-header">
      <Badge variant="done">Enterprise Integration</Badge>
      <h2 class="section-title">For Teams, Systems & Integration</h2>
      <p class="section-desc">
        Designed for local-first enterprise environments, sovereign infrastructure, and air-gapped workstations.
      </p>
    </div>

    <!-- 4 Integration Paths -->
    <div class="paths-grid">
      <div class="path-card">
        <div class="path-icon">🔒</div>
        <h3 class="path-title">Local-First Execution</h3>
        <p class="path-desc">
          Screen recordings and skill graph weights never leave your physical device. Zero external cloud dependencies.
        </p>
        <span class="path-status status-active">Core Architecture</span>
      </div>

      <div class="path-card">
        <div class="path-icon">⚡</div>
        <h3 class="path-title">ONNX Edge Acceleration</h3>
        <p class="path-desc">
          Perception models run directly via ONNX format on CoreML, TensorRT, or direct CPU with sub-millisecond inference.
        </p>
        <span class="path-status status-active">Built-in Engine</span>
      </div>

      <div class="path-card">
        <div class="path-icon">🌳</div>
        <h3 class="path-title">Skill Tree Serialization</h3>
        <p class="path-desc">
          Export learned skills as JSON/GraphML ontologies. Commit automation trees directly to your team's Git repo.
        </p>
        <span class="path-status status-active">Export / Import Ready</span>
      </div>

      <div class="path-card">
        <div class="path-icon">💻</div>
        <h3 class="path-title">Headless CLI & Daemon</h3>
        <p class="path-desc">
          Trigger task execution via terminal arguments or local UNIX domain socket for headless CI/CD automation pipelines.
        </p>
        <span class="path-status status-active">CLI Automation Daemon</span>
      </div>
    </div>

    <!-- Workflow Flowchart -->
    <div class="workflow-box">
      <h3 class="wf-title">Standard Deployment Workflow</h3>
      <div class="wf-steps">
        <div class="wf-step">
          <span class="wf-num">1</span>
          <span class="wf-name">Demonstrate</span>
          <span class="wf-sub">Record workflow once</span>
        </div>
        <span class="wf-arrow">→</span>
        <div class="wf-step">
          <span class="wf-num">2</span>
          <span class="wf-name">Synthesize</span>
          <span class="wf-sub">MEGAMIND extracts tree</span>
        </div>
        <span class="wf-arrow">→</span>
        <div class="wf-step">
          <span class="wf-num">3</span>
          <span class="wf-name">Inspect</span>
          <span class="wf-sub">Review gate & verify nodes</span>
        </div>
        <span class="wf-arrow">→</span>
        <div class="wf-step">
          <span class="wf-num">4</span>
          <span class="wf-name">Deploy</span>
          <span class="wf-sub">Automate across machines</span>
        </div>
      </div>
    </div>

    <!-- Pilot Request Form -->
    <div class="pilot-form-card">
      <div class="form-header">
        <h3 class="form-title">Talk with the Author / Request Research Collaboration</h3>
        <p class="form-desc">
          Interested in early evaluation, enterprise testing, or academic collaboration on continual learning agents?
        </p>
      </div>

      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Your Name *</label>
            <input id="name" v-model="name" type="text" required placeholder="Dr. Jane Doe" class="form-input" />
          </div>
          <div class="form-group">
            <label for="email">Work Email *</label>
            <input id="email" v-model="email" type="email" required placeholder="jane@company.com" class="form-input" />
          </div>
        </div>

        <div class="form-group">
          <label for="company">Organization / University</label>
          <input id="company" v-model="company" type="text" placeholder="Lab or Organization name" class="form-input" />
        </div>

        <div class="form-group">
          <label for="message">Use Case or Question</label>
          <textarea
            id="message"
            v-model="message"
            rows="3"
            placeholder="Tell us about the UI automation scenario or research collaboration you have in mind..."
            class="form-input"
          ></textarea>
        </div>

        <div class="form-actions">
          <Button variant="primary" size="md" type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Inquiry' }}
          </Button>
          <span class="privacy-note">
            🛡️ Privacy Guarantee: No telemetry. Your information is only used to reply to your inquiry.
          </span>
        </div>
      </form>
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

.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.path-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.path-icon {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.path-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
}

.path-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.5;
}

.path-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--muted);
  margin-top: auto;
  padding-top: var(--space-2);
}

.status-active {
  color: var(--accent-growth);
}

.workflow-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  margin-bottom: var(--space-7);
}

.wf-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: var(--space-5);
  text-align: center;
}

.wf-steps {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.wf-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
}

.wf-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent-perception);
}

.wf-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}

.wf-sub {
  font-size: 0.78rem;
  color: var(--muted);
}

.wf-arrow {
  color: var(--muted);
  font-size: 1.2rem;
}

@media (max-width: 650px) {
  .wf-arrow {
    display: none;
  }
}

.pilot-form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-7);
}

.form-header {
  margin-bottom: var(--space-6);
}

.form-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 4px;
}

.form-desc {
  font-size: 0.92rem;
  color: var(--muted);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text);
}

.form-input {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text);
  outline: none;
  transition: border-color var(--dur-fast);
}

.form-input:focus {
  border-color: var(--accent-perception);
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.privacy-note {
  font-size: 0.78rem;
  color: var(--muted);
}
</style>
