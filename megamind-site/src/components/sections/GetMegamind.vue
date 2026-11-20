<script setup lang="ts">
import { ref, computed } from 'vue'
import { siteConfig } from '@/config/site.config'
import { useOS } from '@/composables/useOS'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { useToastStore } from '@/stores/toast'

const { os } = useOS()
const toastStore = useToastStore()

const currentRelease = computed(() => siteConfig.releases[0])

const primaryDownload = computed(() => {
  const rel = currentRelease.value
  if (!rel) return null

  if (os.value === 'macos') {
    return {
      platform: 'macOS (Universal / Apple Silicon)',
      ext: '.dmg',
      size: rel.macos?.size || '54.2 MB',
      url: rel.macos?.url || `${siteConfig.repoUrl}/releases`,
      icon: '🍎',
    }
  } else if (os.value === 'windows') {
    return {
      platform: 'Windows (64-bit Installer)',
      ext: '.exe',
      size: rel.windows?.size || '49.8 MB',
      url: rel.windows?.url || `${siteConfig.repoUrl}/releases`,
      icon: '🪟',
    }
  } else {
    return {
      platform: 'Linux (Universal AppImage)',
      ext: '.AppImage',
      size: rel.linux?.size || '47.5 MB',
      url: rel.linux?.url || `${siteConfig.repoUrl}/releases`,
      icon: '🐧',
    }
  }
})

function launchDeepLink() {
  toastStore.show('Launching MEGAMIND Native Desktop Client...', 'info')
  window.location.href = `${siteConfig.deepLinkScheme}launch`
}

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text)
  toastStore.show(`Copied ${label} to clipboard!`, 'info')
}

const activeTab = ref<'cli' | 'train' | 'onnx'>('cli')
</script>

<template>
  <section id="get" class="section-container">
    <div class="section-header">
      <Badge variant="done">Production Release</Badge>
      <h2 class="section-title">Download MEGAMIND Native App</h2>
      <p class="section-desc">
        Experience local-first UI automation with continual learning. Download the native desktop application for your platform or install the CLI engine.
      </p>
    </div>

    <div class="downloads-wrapper">
      <!-- Primary OS Auto-Detected Banner -->
      <div v-if="primaryDownload" class="primary-download-card">
        <div class="primary-info">
          <span class="detected-badge">Detected System: {{ primaryDownload.platform }}</span>
          <h3 class="primary-title">MEGAMIND for {{ primaryDownload.platform.split(' ')[0] }}</h3>
          <p class="primary-meta">
            Release Date: {{ currentRelease?.date }} · Package Size: {{ primaryDownload.size }} · Self-Contained Binary
          </p>
        </div>

        <div class="primary-actions">
          <Button
            :href="primaryDownload.url"
            target="_blank"
            variant="primary"
            size="lg"
            class="download-btn-hero"
          >
            <template #icon-left>
              <span class="platform-icon">{{ primaryDownload.icon }}</span>
            </template>
            Download for {{ primaryDownload.platform.split(' ')[0] }} ({{ primaryDownload.ext }})
          </Button>

          <Button
            variant="secondary"
            size="lg"
            @click="launchDeepLink"
          >
            🚀 Open Native Client
          </Button>
        </div>
      </div>

      <!-- All Platform Options Grid -->
      <div class="platforms-grid">
        <!-- macOS -->
        <div class="platform-card">
          <div class="plat-top">
            <span class="plat-emoji">🍎</span>
            <div>
              <h4 class="plat-title">macOS</h4>
              <span class="plat-desc">Apple Silicon (M1/M2/M3/M4) & Intel</span>
            </div>
          </div>
          <div class="plat-meta">
            <span>Size: {{ currentRelease?.macos?.size }}</span>
            <span>Format: .dmg</span>
          </div>
          <Button
            :href="currentRelease?.macos?.url"
            target="_blank"
            variant="secondary"
            size="sm"
          >
            Download .dmg
          </Button>
        </div>

        <!-- Windows -->
        <div class="platform-card">
          <div class="plat-top">
            <span class="plat-emoji">🪟</span>
            <div>
              <h4 class="plat-title">Windows</h4>
              <span class="plat-desc">Windows 10 / 11 (64-bit)</span>
            </div>
          </div>
          <div class="plat-meta">
            <span>Size: {{ currentRelease?.windows?.size }}</span>
            <span>Format: .exe</span>
          </div>
          <Button
            :href="currentRelease?.windows?.url"
            target="_blank"
            variant="secondary"
            size="sm"
          >
            Download .exe
          </Button>
        </div>

        <!-- Linux -->
        <div class="platform-card">
          <div class="plat-top">
            <span class="plat-emoji">🐧</span>
            <div>
              <h4 class="plat-title">Linux</h4>
              <span class="plat-desc">Ubuntu, Debian, Fedora, Arch</span>
            </div>
          </div>
          <div class="plat-meta">
            <span>Size: {{ currentRelease?.linux?.size }}</span>
            <span>Format: .AppImage</span>
          </div>
          <Button
            :href="currentRelease?.linux?.url"
            target="_blank"
            variant="secondary"
            size="sm"
          >
            Download .AppImage
          </Button>
        </div>
      </div>

      <!-- Developer Terminal Walkthrough -->
      <div class="cli-walkthrough">
        <div class="cli-header">
          <div>
            <h3 class="cli-title">Developer & Headless CLI Engine</h3>
            <p class="cli-sub">Deploy MEGAMIND directly into headless server workflows or Python pipelines.</p>
          </div>
          <div class="tab-pills">
            <button
              :class="['tab-btn', { active: activeTab === 'cli' }]"
              @click="activeTab = 'cli'"
            >
              1. Clone & CLI
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'train' }]"
              @click="activeTab = 'train'"
            >
              2. Daemon Run
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'onnx' }]"
              @click="activeTab = 'onnx'"
            >
              3. ONNX Runtime
            </button>
          </div>
        </div>

        <div class="cli-terminal">
          <!-- Tab 1: Setup -->
          <div v-if="activeTab === 'cli'" class="terminal-body">
            <div class="terminal-header">
              <span class="file-name">Terminal — Quickstart & Environment</span>
              <button
                class="copy-btn"
                @click="
                  copyToClipboard(
                    'git clone https://github.com/shuvosinghpartho/megaMind.git\ncd megaMind\npython -m venv venv\nsource venv/bin/activate\npip install ultralytics',
                    'Setup Commands'
                  )
                "
              >
                Copy commands
              </button>
            </div>
            <pre class="code-box"><code><span class="comment"># 1. Clone the production MegaMind repository</span>
git clone https://github.com/shuvosinghpartho/megaMind.git
cd megaMind

<span class="comment"># 2. Setup environment and install dependencies</span>
python -m venv venv
source venv/bin/activate  <span class="comment"># Windows: venv\Scripts\activate</span>
pip install ultralytics</code></pre>
          </div>

          <!-- Tab 2: Daemon Run -->
          <div v-else-if="activeTab === 'train'" class="terminal-body">
            <div class="terminal-header">
              <span class="file-name">Terminal — Run Automation Daemon</span>
              <button
                class="copy-btn"
                @click="
                  copyToClipboard(
                    'python -m megamind.agent --watch-screen --record-ontology\nyolo detect predict model=runs/detect/train/weights/best.pt source=screen.png',
                    'Daemon Commands'
                  )
                "
              >
                Copy commands
              </button>
            </div>
            <pre class="code-box"><code><span class="comment"># 3. Launch background screen imitation engine</span>
python -m megamind.agent --watch-screen --record-ontology

<span class="comment"># 4. Trigger automated task replay</span>
python -m megamind.replay --task "FB Post (Web)"</code></pre>
          </div>

          <!-- Tab 3: ONNX -->
          <div v-else class="terminal-body">
            <div class="terminal-header">
              <span class="file-name">Terminal — Edge ONNX Runtime</span>
              <button
                class="copy-btn"
                @click="
                  copyToClipboard(
                    'yolo export model=runs/detect/train/weights/best.pt format=onnx\npython -m megamind.edge --onnx-model model.onnx',
                    'ONNX Export Command'
                  )
                "
              >
                Copy command
              </button>
            </div>
            <pre class="code-box"><code><span class="comment"># 5. Export and run on embedded edge hardware with sub-millisecond inference</span>
yolo export model=runs/detect/train/weights/best.pt format=onnx
python -m megamind.edge --onnx-model model.onnx</code></pre>
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

.primary-download-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent-perception);
  border-radius: var(--radius-card);
  padding: var(--space-7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-bottom: var(--space-6);
  box-shadow: 0 16px 40px -15px rgba(0, 0, 0, 0.4);
}

.detected-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--accent-growth);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 6px;
}

.primary-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 6px;
}

.primary-meta {
  font-size: 0.9rem;
  color: var(--muted);
}

.primary-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.platform-icon {
  font-size: 1.2rem;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.platform-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.plat-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.plat-emoji {
  font-size: 1.8rem;
}

.plat-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
}

.plat-desc {
  font-size: 0.78rem;
  color: var(--muted);
}

.plat-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--muted);
  border-top: 1px solid var(--border);
  padding-top: var(--space-2);
}

.cli-walkthrough {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.cli-header {
  padding: var(--space-5) var(--space-6);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.cli-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
}

.cli-sub {
  font-size: 0.85rem;
  color: var(--muted);
}

.tab-pills {
  display: flex;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 3px;
  gap: 2px;
}

.tab-btn {
  background: transparent;
  border: none;
  border-radius: var(--radius-pill);
  padding: 6px 14px;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all var(--dur-fast);
}

.tab-btn.active {
  background: var(--accent-perception);
  color: #0b0e13;
}

.cli-terminal {
  padding: var(--space-5);
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.file-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--muted);
}

.copy-btn {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 4px 10px;
  font-family: inherit;
  font-size: 0.76rem;
  color: var(--text);
  cursor: pointer;
}

.copy-btn:hover {
  border-color: var(--accent-perception);
  color: var(--accent-perception);
}

.code-box {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-4);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text);
  overflow-x: auto;
}

.comment {
  color: var(--muted);
  font-style: italic;
}
</style>
