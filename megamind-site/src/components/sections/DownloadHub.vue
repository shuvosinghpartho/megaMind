<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '@/config/site.config'
import { useDownloadModalStore } from '@/stores/downloadModal'
import { useToastStore } from '@/stores/toast'

const downloadModal = useDownloadModalStore()
const toastStore = useToastStore()

const currentRelease = computed(() => siteConfig.releases[0])

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text)
  toastStore.show(`Copied ${label} to clipboard!`, 'info')
}
</script>

<template>
  <section id="get" class="section-container download-hub-section">
    <!-- Callout Banner Card (Hallmark Panel) -->
    <div class="cta-banner-card">
      <div class="banner-content">
        <div class="console-badge">
          <span class="badge-dot"></span>
          <span>OFFICIAL NATIVE RELEASE · v1.0.0</span>
        </div>

        <h2 class="banner-title font-display">
          Start Automating with <span class="amber">MegaMind</span> Today
        </h2>

        <p class="banner-desc">
          Download the self-contained native client for macOS, Windows, or Linux. Complete with on-device YOLOv8n visual perception, Hierarchical Tree-Graph memory, and local-first privacy.
        </p>

        <!-- Main Action Buttons -->
        <div class="banner-actions">
          <button class="btn btn--amber font-display" @click="downloadModal.openModal()">
            <span>Download Native Client</span>
            <span class="btn-arrow">↓</span>
          </button>

          <a :href="siteConfig.repoUrl" target="_blank" rel="noopener noreferrer" class="btn btn--line font-display">
            <span>View Source on GitHub ↗</span>
          </a>
        </div>
      </div>

      <!-- Platform Cards Grid Inside Download Hub -->
      <div class="platforms-showcase-grid">
        <!-- macOS -->
        <div class="platform-hub-card">
          <div class="plat-hub-top">
            <span class="plat-hub-icon">🍎</span>
            <div>
              <h4 class="plat-hub-name font-display">macOS Universal</h4>
              <span class="plat-hub-sub">Apple Silicon (M1-M4) & Intel</span>
            </div>
          </div>
          <div class="plat-hub-meta font-mono">
            <span>{{ currentRelease?.macos?.size }}</span>
            <span>.dmg bundle</span>
          </div>
          <button class="btn btn--line plat-hub-btn font-mono" @click="downloadModal.openModal('macos')">
            Download .dmg
          </button>
        </div>

        <!-- Windows -->
        <div class="platform-hub-card">
          <div class="plat-hub-top">
            <span class="plat-hub-icon">🪟</span>
            <div>
              <h4 class="plat-hub-name font-display">Windows 64-bit</h4>
              <span class="plat-hub-sub">Windows 10 / 11 Native</span>
            </div>
          </div>
          <div class="plat-hub-meta font-mono">
            <span>{{ currentRelease?.windows?.size }}</span>
            <span>.exe installer</span>
          </div>
          <button class="btn btn--line plat-hub-btn font-mono" @click="downloadModal.openModal('windows')">
            Download .exe
          </button>
        </div>

        <!-- Linux -->
        <div class="platform-hub-card">
          <div class="plat-hub-top">
            <span class="plat-hub-icon">🐧</span>
            <div>
              <h4 class="plat-hub-name font-display">Linux Standalone</h4>
              <span class="plat-hub-sub">Ubuntu, Fedora, Arch</span>
            </div>
          </div>
          <div class="plat-hub-meta font-mono">
            <span>{{ currentRelease?.linux?.size }}</span>
            <span>.AppImage</span>
          </div>
          <button class="btn btn--line plat-hub-btn font-mono" @click="downloadModal.openModal('linux')">
            Download .AppImage
          </button>
        </div>

        <!-- CLI -->
        <div class="platform-hub-card">
          <div class="plat-hub-top">
            <span class="plat-hub-icon">⚡</span>
            <div>
              <h4 class="plat-hub-name font-display">Python & CLI</h4>
              <span class="plat-hub-sub">Cross-platform terminal</span>
            </div>
          </div>
          <div class="plat-hub-meta font-mono">
            <span>pip install</span>
            <span>PyPI package</span>
          </div>
          <button class="btn btn--line plat-hub-btn font-mono" @click="copyText('pip install megamind-agent', 'pip command')">
            Copy `pip install`
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.download-hub-section {
  position: relative;
  z-index: 2;
}

.cta-banner-card {
  position: relative;
  padding: clamp(2rem, 4vw, 3.5rem);
  border-radius: var(--radius-card);
  overflow: hidden;
  border: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-2);
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.15);
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.cta-banner-card::before {
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

.cta-banner-card:hover::before {
  opacity: 1;
}

.cta-banner-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  box-shadow: 0 12px 32px -10px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.banner-content {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-xl);
}

.banner-title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: var(--tracking-display);
  margin-block: var(--space-md);
  color: var(--color-ink);
}

.banner-desc {
  font-size: var(--text-md);
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
}

.banner-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-arrow {
  display: inline-block;
  margin-left: 6px;
  font-weight: 600;
  transition: transform var(--dur-short) var(--ease-out);
}

.btn:hover .btn-arrow {
  animation: arrow-bounce 0.8s ease-in-out infinite alternate;
}

@keyframes arrow-bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(4px);
  }
}

/* Platforms Grid */
.platforms-showcase-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}

@media (max-width: 980px) {
  .platforms-showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .platforms-showcase-grid {
    grid-template-columns: 1fr;
  }
}

.platform-hub-card {
  background: var(--color-paper-3);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-card);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.platform-hub-card:hover {
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  transform: translateY(-4px);
  box-shadow: 0 10px 24px -8px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.plat-hub-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.plat-hub-icon {
  font-size: 1.5rem;
  display: inline-block;
  transition: transform var(--dur-short) var(--ease-out);
}

.platform-hub-card:hover .plat-hub-icon {
  transform: scale(1.15) rotate(-4deg);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-cool);
  box-shadow: 0 0 8px var(--color-cool);
  animation: beacon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes beacon-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.85);
  }
}

.plat-hub-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.plat-hub-icon {
  font-size: 1.5rem;
}

.plat-hub-name {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink);
}

.plat-hub-sub {
  font-size: 11px;
  color: var(--color-muted);
}

.plat-hub-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-outlier);
  font-size: 11px;
  font-variant-numeric: tabular-nums slashed-zero;
  color: var(--color-cool);
  background: var(--color-paper-2);
  padding: 4px 8px;
  border-radius: 4px;
}

.plat-hub-btn {
  width: 100%;
  min-height: 38px;
  font-size: var(--text-xs);
  padding: 0 var(--space-sm);
}
</style>
