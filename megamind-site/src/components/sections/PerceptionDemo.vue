<script setup lang="ts">
import { ref } from 'vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const isAlteredLayout = ref(false)

function toggleLayout() {
  isAlteredLayout.value = !isAlteredLayout.value
}
</script>

<template>
  <section id="perception-demo" class="section-container">
    <div class="section-header">
      <Badge variant="simulated">Perception Simulation</Badge>
      <h2 class="section-title">Task-Relevant Perception & Layout Robustness</h2>
      <p class="section-desc">
        Instead of hard-coding raw pixel coordinates, MEGAMIND's YOLOv8n detector targets semantic element types (<code class="code-inline">button</code>, <code class="code-inline">icon</code>).
      </p>
    </div>

    <div class="demo-card">
      <div class="demo-toolbar">
        <div class="toolbar-info">
          <span class="toolbar-title">Live Desktop UI Perception Frame</span>
          <span class="toolbar-sub">Labels: [0: button (0.97), 1: icon (0.95)] · ONNX Runtime</span>
        </div>
        <Button variant="primary" size="sm" @click="toggleLayout">
          {{ isAlteredLayout ? '↺ Restore Default Layout' : '🔀 Shift UI Layout' }}
        </Button>
      </div>

      <!-- Mock App Window -->
      <div class="mock-window">
        <div class="window-bar">
          <div class="window-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="window-url">app://megamind-automation-target/dashboard</span>
        </div>

        <div :class="['mock-content', { 'layout-altered': isAlteredLayout }]">
          <!-- Sidebar -->
          <div class="mock-sidebar">
            <div class="icon-wrapper">
              <div class="mock-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <div class="yolo-box box-icon">
                <span class="yolo-tag">icon 0.96</span>
              </div>
            </div>

            <div class="icon-wrapper">
              <div class="mock-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <div class="yolo-box box-icon">
                <span class="yolo-tag">icon 0.94</span>
              </div>
            </div>
          </div>

          <!-- Main Panel -->
          <div class="mock-main">
            <div class="mock-card-content">
              <span class="mock-headline">User Settings Panel</span>

              <div class="mock-form">
                <div class="mock-field">
                  <span class="field-label">Display Name</span>
                  <div class="mock-input"></div>
                </div>

                <div class="mock-field">
                  <span class="field-label">API Key</span>
                  <div class="mock-input"></div>
                </div>

                <!-- Detected Button -->
                <div class="btn-wrapper">
                  <button class="mock-btn-action">
                    Save Changes
                  </button>
                  <div class="yolo-box box-button">
                    <span class="yolo-tag tag-btn">button 0.97</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="demo-footer">
        <span class="footer-note">
          * Semantic element grounding: Bounding boxes track interactive regions across dynamic layout shifts to ensure skill execution resilience.
        </span>
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

.code-inline {
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
  color: var(--accent-perception);
}

.demo-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.demo-toolbar {
  padding: var(--space-4) var(--space-6);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.toolbar-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
  display: block;
}

.toolbar-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--muted);
}

.mock-window {
  padding: var(--space-5);
  background: rgba(0, 0, 0, 0.2);
}

.window-bar {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.window-url {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.74rem;
  color: var(--muted);
}

.mock-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0 0 8px 8px;
  min-height: 280px;
  display: flex;
  transition: all 0.4s var(--ease-default);
}

.mock-sidebar {
  width: 60px;
  border-right: 1px solid var(--border);
  padding: var(--space-4) var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
  transition: all 0.4s var(--ease-default);
}

.mock-main {
  flex: 1;
  padding: var(--space-6);
  transition: all 0.4s var(--ease-default);
}

.icon-wrapper,
.btn-wrapper {
  position: relative;
  display: inline-block;
}

.mock-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text);
}

.mock-headline {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  display: block;
  margin-bottom: var(--space-4);
}

.mock-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 380px;
  transition: all 0.4s var(--ease-default);
}

.mock-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.8rem;
  color: var(--muted);
}

.mock-input {
  height: 32px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.mock-btn-action {
  background: var(--accent-perception);
  color: #0b0e13;
  border: none;
  font-weight: 700;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.88rem;
}

/* YOLO Style Bounding Box Overlays */
.yolo-box {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--accent-perception);
  border-radius: 4px;
  pointer-events: none;
  transition: all 0.4s var(--ease-default);
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
}

.box-icon {
  border-color: var(--accent-growth);
  box-shadow: 0 0 10px rgba(63, 185, 80, 0.3);
}

.yolo-tag {
  position: absolute;
  top: -14px;
  left: -2px;
  background: var(--accent-growth);
  color: #0b0e13;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 2px;
  text-transform: uppercase;
}

.tag-btn {
  background: var(--accent-perception);
}

/* Altered Layout State */
.mock-content.layout-altered {
  flex-direction: row-reverse;
}

.mock-content.layout-altered .mock-sidebar {
  border-right: none;
  border-left: 1px solid var(--border);
}

.mock-content.layout-altered .mock-form {
  margin-left: auto;
  align-items: flex-end;
}

.demo-footer {
  padding: var(--space-3) var(--space-6);
  background: var(--surface-2);
  border-top: 1px solid var(--border);
}

.footer-note {
  font-size: 0.78rem;
  color: var(--muted);
  font-style: italic;
}
</style>
