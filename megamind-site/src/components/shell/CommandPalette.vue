<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useCommandPaletteStore } from '@/stores/commandPalette'
import { useThemeStore } from '@/stores/theme'
import { useDownloadModalStore } from '@/stores/downloadModal'
import { siteConfig } from '@/config/site.config'

const store = useCommandPaletteStore()
const themeStore = useThemeStore()
const downloadModal = useDownloadModalStore()
const query = ref('')

interface Command {
  id: string
  label: string
  category: 'Section' | 'Action'
  action: () => void
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.hash = `#${id}`
  }
  store.close()
}

const commands: Command[] = [
  // Actions
  {
    id: 'download',
    label: 'Download MEGAMIND Native App (macOS, Windows, Linux, CLI)',
    category: 'Action',
    action: () => {
      store.close()
      downloadModal.openModal()
    },
  },
  {
    id: 'theme',
    label: 'Toggle Theme (Dark / Light)',
    category: 'Action',
    action: () => {
      themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')
      store.close()
    },
  },
  {
    id: 'repo',
    label: 'Open GitHub Repository (shuvosinghpartho/megaMind)',
    category: 'Action',
    action: () => {
      window.open(siteConfig.repoUrl, '_blank')
      store.close()
    },
  },
  // Sections
  { id: 'sec-hero', label: 'Jump to: Hero & 3D Brain Visualizer', category: 'Section', action: () => scrollToSection('hero') },
  { id: 'sec-console', label: 'Jump to: Interactive Simulation Studio', category: 'Section', action: () => scrollToSection('interactive-console') },
  { id: 'sec-features', label: 'Jump to: Core Breakthroughs Bento Grid', category: 'Section', action: () => scrollToSection('features') },
  { id: 'sec-layers', label: 'Jump to: 6 Bio-Inspired Engine Layers', category: 'Section', action: () => scrollToSection('layers') },
  { id: 'sec-compare', label: 'Jump to: Measured Benchmark Comparison', category: 'Section', action: () => scrollToSection('compare') },
  { id: 'sec-dev', label: 'Jump to: Developer SDK & Terminal', category: 'Section', action: () => scrollToSection('developer') },
  { id: 'sec-roadmap', label: 'Jump to: Development Roadmap', category: 'Section', action: () => scrollToSection('roadmap') },
  { id: 'sec-get', label: 'Jump to: Download Hub (Get MegaMind)', category: 'Section', action: () => scrollToSection('get') },
  { id: 'sec-faq', label: 'Jump to: FAQ & BibTeX Academic Citation', category: 'Section', action: () => scrollToSection('faq') },
]

const filtered = ref(commands)

watch(query, (q) => {
  const lq = q.toLowerCase()
  filtered.value = commands.filter((c) => c.label.toLowerCase().includes(lq))
})

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    store.toggle()
  }
  if (e.key === 'Escape') store.close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div v-if="store.open" class="palette-overlay" @click.self="store.close()">
      <div class="palette-dialog" role="dialog" aria-modal="true" aria-label="Command palette">
        <div class="input-wrap">
          <span class="search-icon">🔍</span>
          <input
            v-model="query"
            class="palette-input"
            placeholder="Search sections or actions... (Esc to exit)"
            autofocus
          />
        </div>

        <ul class="palette-list">
          <li
            v-for="cmd in filtered"
            :key="cmd.id"
            class="palette-item"
            @click="cmd.action()"
          >
            <span class="cmd-label">{{ cmd.label }}</span>
            <span class="cmd-cat">{{ cmd.category }}</span>
          </li>
          <li v-if="filtered.length === 0" class="palette-empty">No matching commands found</li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
}

.palette-dialog {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  width: min(580px, 92vw);
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6);
}

.input-wrap {
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}

.search-icon {
  font-size: 0.95rem;
  opacity: 0.6;
}

.palette-input {
  width: 100%;
  background: none;
  border: none;
  padding: var(--space-4) var(--space-3);
  font-size: 1rem;
  color: var(--text);
  outline: none;
  font-family: inherit;
}

.palette-list {
  list-style: none;
  padding: var(--space-2) 0;
  max-height: 380px;
  overflow-y: auto;
}

.palette-item {
  padding: 10px var(--space-5);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  font-size: 0.92rem;
  transition: background var(--dur-fast);
}

.palette-item:hover {
  background: var(--surface-2);
  color: var(--accent-perception);
}

.cmd-cat {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: var(--muted);
  background: var(--surface);
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.palette-empty {
  padding: var(--space-6);
  color: var(--muted);
  text-align: center;
  font-size: 0.9rem;
}
</style>
