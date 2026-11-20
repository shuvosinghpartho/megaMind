<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDownloadModalStore } from '@/stores/downloadModal'
import { siteConfig } from '@/config/site.config'
import { useOS } from '@/composables/useOS'
import { useToastStore } from '@/stores/toast'

const modalStore = useDownloadModalStore()
const toastStore = useToastStore()
const { os } = useOS()

const activeTab = ref<'macos' | 'windows' | 'linux' | 'cli'>(
  os.value === 'windows' ? 'windows' : os.value === 'linux' ? 'linux' : 'macos'
)

// Sync with store selectedPlatform if set
if (modalStore.selectedPlatform) {
  activeTab.value = modalStore.selectedPlatform
}

const currentRelease = computed(() => siteConfig.releases[0])

const autoDetectedPlatform = computed(() => {
  if (os.value === 'macos') {
    return {
      name: 'macOS (Universal / Apple Silicon & Intel)',
      icon: '🍎',
      ext: '.dmg',
      size: currentRelease.value?.macos?.size || '54.2 MB',
      url: currentRelease.value?.macos?.url || `${siteConfig.repoUrl}/releases`,
      checksum: currentRelease.value?.macos?.checksum || 'sha256:8b4e72c81a9f023...',
      tab: 'macos' as const,
    }
  } else if (os.value === 'windows') {
    return {
      name: 'Windows 10 / 11 (64-bit Installer)',
      icon: '🪟',
      ext: '.exe',
      size: currentRelease.value?.windows?.size || '49.8 MB',
      url: currentRelease.value?.windows?.url || `${siteConfig.repoUrl}/releases`,
      checksum: currentRelease.value?.windows?.checksum || 'sha256:f12a93d04b8e719...',
      tab: 'windows' as const,
    }
  } else {
    return {
      name: 'Linux (Universal AppImage)',
      icon: '🐧',
      ext: '.AppImage',
      size: currentRelease.value?.linux?.size || '47.5 MB',
      url: currentRelease.value?.linux?.url || `${siteConfig.repoUrl}/releases`,
      checksum: currentRelease.value?.linux?.checksum || 'sha256:d891b2c7e03498a...',
      tab: 'linux' as const,
    }
  }
})

function copyText(text: string, label: string) {
  navigator.clipboard.writeText(text)
  toastStore.show(`Copied ${label} to clipboard!`, 'info')
}

function launchApp() {
  toastStore.show('Launching MEGAMIND Native Client...', 'info')
  window.location.href = `${siteConfig.deepLinkScheme}launch`
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && modalStore.isOpen) {
    modalStore.closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modalStore.isOpen" class="modal-backdrop" @click="modalStore.closeModal()">
        <div class="modal-dialog glass-panel" @click.stop>
          <!-- Header -->
          <div class="modal-header">
            <div class="header-badge">
              <span class="pulse-dot"></span>
              {{ currentRelease?.version }} Production Ready
            </div>
            <button class="close-btn" aria-label="Close dialog" @click="modalStore.closeModal()">
              ✕
            </button>
          </div>

          <!-- Title -->
          <div class="modal-intro">
            <h3 class="modal-title font-display">
              Get <span class="text-gradient-cyan">MEGAMIND</span> Native App
            </h3>
            <p class="modal-desc">
              Experience local-first UI automation with bio-inspired continual learning. Zero data leaves your machine.
            </p>
          </div>

          <!-- Recommended Download Banner -->
          <div class="recommended-card">
            <div class="recommended-meta">
              <span class="detected-pill">✨ Auto-Detected for your device</span>
              <div class="rec-title-row">
                <span class="rec-icon">{{ autoDetectedPlatform.icon }}</span>
                <div>
                  <h4 class="rec-title">{{ autoDetectedPlatform.name }}</h4>
                  <span class="rec-sub">{{ currentRelease?.version }} · {{ autoDetectedPlatform.size }} · Standalone Bundle</span>
                </div>
              </div>
            </div>

            <div class="rec-actions">
              <a
                :href="autoDetectedPlatform.url"
                target="_blank"
                class="btn-primary-glow"
                @click="toastStore.show('Starting download...', 'info')"
              >
                <span>Download {{ autoDetectedPlatform.ext }}</span>
                <span class="btn-arrow">↓</span>
              </a>
              <button class="btn-secondary-glass" @click="launchApp">
                🚀 Open Client
              </button>
            </div>
          </div>

          <!-- Platform Selector Tabs -->
          <div class="platform-tabs">
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'macos' }"
              @click="activeTab = 'macos'"
            >
              🍎 macOS
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'windows' }"
              @click="activeTab = 'windows'"
            >
              🪟 Windows
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'linux' }"
              @click="activeTab = 'linux'"
            >
              🐧 Linux
            </button>
            <button
              class="tab-btn"
              :class="{ active: activeTab === 'cli' }"
              @click="activeTab = 'cli'"
            >
              ⚡ CLI / Python
            </button>
          </div>

          <!-- Tab Content -->
          <div class="tab-pane">
            <!-- macOS Tab -->
            <div v-if="activeTab === 'macos'" class="tab-content">
              <div class="dl-options-grid">
                <a :href="currentRelease?.macos?.url" target="_blank" class="dl-option-card">
                  <div class="option-icon">🍎</div>
                  <div class="option-info">
                    <strong>Apple Silicon & Intel DMG</strong>
                    <span>macOS 12.0+ · {{ currentRelease?.macos?.size }}</span>
                  </div>
                  <span class="dl-tag">Download .dmg</span>
                </a>
              </div>

              <div class="cli-command-box">
                <div class="cli-label">
                  <span>Homebrew One-Liner</span>
                  <button class="copy-small" @click="copyText('brew install shuvosinghpartho/tap/megamind', 'Homebrew command')">
                    Copy
                  </button>
                </div>
                <code>brew install shuvosinghpartho/tap/megamind</code>
              </div>
            </div>

            <!-- Windows Tab -->
            <div v-if="activeTab === 'windows'" class="tab-content">
              <div class="dl-options-grid">
                <a :href="currentRelease?.windows?.url" target="_blank" class="dl-option-card">
                  <div class="option-icon">🪟</div>
                  <div class="option-info">
                    <strong>Windows 64-bit Installer</strong>
                    <span>Windows 10/11 · {{ currentRelease?.windows?.size }}</span>
                  </div>
                  <span class="dl-tag">Download .exe</span>
                </a>
              </div>

              <div class="cli-command-box">
                <div class="cli-label">
                  <span>Winget Package Manager</span>
                  <button class="copy-small" @click="copyText('winget install MegaMind.Agent', 'Winget command')">
                    Copy
                  </button>
                </div>
                <code>winget install MegaMind.Agent</code>
              </div>
            </div>

            <!-- Linux Tab -->
            <div v-if="activeTab === 'linux'" class="tab-content">
              <div class="dl-options-grid">
                <a :href="currentRelease?.linux?.url" target="_blank" class="dl-option-card">
                  <div class="option-icon">🐧</div>
                  <div class="option-info">
                    <strong>Universal Linux AppImage</strong>
                    <span>Ubuntu, Fedora, Arch · {{ currentRelease?.linux?.size }}</span>
                  </div>
                  <span class="dl-tag">Download .AppImage</span>
                </a>
              </div>

              <div class="cli-command-box">
                <div class="cli-label">
                  <span>Quick Terminal Install</span>
                  <button class="copy-small" @click="copyText('curl -fsSL https://megamind.ai/install.sh | bash', 'Curl command')">
                    Copy
                  </button>
                </div>
                <code>curl -fsSL https://megamind.ai/install.sh | bash</code>
              </div>
            </div>

            <!-- CLI / Python Tab -->
            <div v-if="activeTab === 'cli'" class="tab-content">
              <div class="cli-command-box">
                <div class="cli-label">
                  <span>Python SDK & CLI Tool</span>
                  <button class="copy-small" @click="copyText('pip install megamind-agent', 'pip command')">
                    Copy
                  </button>
                </div>
                <code>pip install megamind-agent</code>
              </div>

              <div class="cli-command-box">
                <div class="cli-label">
                  <span>Clone & Run Development Suite</span>
                  <button class="copy-small" @click="copyText('git clone https://github.com/shuvosinghpartho/megaMind.git && cd megaMind', 'git clone command')">
                    Copy
                  </button>
                </div>
                <code>git clone https://github.com/shuvosinghpartho/megaMind.git</code>
              </div>
            </div>
          </div>

          <!-- Footer Info -->
          <div class="modal-footer">
            <span class="footer-note">
              🔒 Open source under {{ siteConfig.license }} · Zero telemetry · Safe for offline enterprise workstations
            </span>
            <a :href="siteConfig.repoUrl" target="_blank" class="github-link">
              GitHub Repository ↗
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(4, 7, 13, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.modal-dialog {
  width: 100%;
  max-width: 680px;
  background: var(--surface);
  border: 1px solid var(--border-glow);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), var(--glow-cyan);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
}

[data-theme="light"] .modal-dialog {
  background: #ffffff;
  border-color: rgba(2, 132, 199, 0.25);
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.15), var(--glow-cyan);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--cyan);
  background: rgba(125, 249, 255, 0.1);
  border: 1px solid rgba(125, 249, 255, 0.25);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 10px var(--cyan);
  animation: pulse-subtle 2s infinite ease-in-out;
}

.close-btn {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--muted);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--dur-fast);
  font-size: 0.9rem;
}

.close-btn:hover {
  color: var(--text-heading);
  border-color: var(--border-hover);
  background: var(--surface-3);
  transform: scale(1.05);
}

.modal-intro {
  margin-bottom: var(--space-5);
}

.modal-title {
  font-size: 1.85rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.modal-desc {
  font-size: 0.95rem;
  color: var(--muted);
}

/* Recommended Banner Card */
.recommended-card {
  background: linear-gradient(135deg, rgba(125, 249, 255, 0.08) 0%, rgba(99, 102, 241, 0.06) 100%);
  border: 1px solid rgba(125, 249, 255, 0.3);
  border-radius: var(--radius-card);
  padding: var(--space-4) var(--space-5);
  margin-bottom: var(--space-5);
}

[data-theme="light"] .recommended-card {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.06) 0%, rgba(67, 56, 202, 0.04) 100%);
  border-color: rgba(2, 132, 199, 0.25);
}

.detected-pill {
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--cyan);
  margin-bottom: 8px;
  display: block;
}

.rec-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: var(--space-4);
}

.rec-icon {
  font-size: 1.8rem;
}

.rec-title {
  font-size: 1.15rem;
  font-weight: 700;
}

.rec-sub {
  font-size: 0.8rem;
  color: var(--muted);
}

.rec-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary-glow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #7df9ff 0%, #00d2ff 100%);
  color: #07090e;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  box-shadow: 0 0 20px rgba(125, 249, 255, 0.4);
  transition: all var(--dur-normal) var(--ease-default);
}

.btn-primary-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(125, 249, 255, 0.6);
}

[data-theme="light"] .btn-primary-glow {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.3);
}

.btn-secondary-glass {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.btn-secondary-glass:hover {
  border-color: var(--border-hover);
  background: var(--surface-3);
}

/* Platform Tabs */
.platform-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: var(--space-4);
  overflow-x: auto;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: all var(--dur-fast);
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text-heading);
}

.tab-btn.active {
  color: var(--cyan);
  background: rgba(125, 249, 255, 0.1);
  border: 1px solid rgba(125, 249, 255, 0.25);
}

/* Options Grid */
.dl-options-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: var(--space-4);
}

.dl-option-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  text-decoration: none;
  color: inherit;
  transition: all var(--dur-fast);
}

.dl-option-card:hover {
  border-color: var(--cyan);
  background: var(--surface-3);
  transform: translateX(3px);
}

.option-icon {
  font-size: 1.5rem;
}

.option-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.option-info strong {
  font-size: 0.95rem;
}

.option-info span {
  font-size: 0.78rem;
  color: var(--muted);
}

.dl-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cyan);
  background: rgba(125, 249, 255, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
}

/* CLI Box */
.cli-command-box {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  margin-bottom: 10px;
}

[data-theme="light"] .cli-command-box {
  background: #f1f5f9;
}

.cli-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--muted);
  margin-bottom: 4px;
}

.copy-small {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--cyan);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.copy-small:hover {
  background: rgba(125, 249, 255, 0.15);
}

.cli-command-box code {
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--cyan);
  word-break: break-all;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
  font-size: 0.78rem;
  color: var(--muted);
}

.github-link {
  color: var(--cyan);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.github-link:hover {
  text-decoration: underline;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
