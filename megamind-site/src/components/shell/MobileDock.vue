<script setup lang="ts">
import { useCommandPaletteStore } from '@/stores/commandPalette'
import { useDownloadModalStore } from '@/stores/downloadModal'

const paletteStore = useCommandPaletteStore()
const downloadModal = useDownloadModalStore()

const links = [
  { label: 'Overview', href: '#hero', icon: '⌂' },
  { label: 'Studio', href: '#interactive-console', icon: '⚡' },
  { label: 'Features', href: '#features', icon: '❖' },
  { label: 'Layers', href: '#layers', icon: '🌳' },
]
</script>

<template>
  <nav class="mobile-dock" aria-label="Mobile navigation">
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      class="dock-item"
    >
      <span class="dock-icon">{{ link.icon }}</span>
      <span class="dock-label">{{ link.label }}</span>
    </a>

    <!-- Get App Direct Trigger -->
    <button class="dock-item dock-btn get-app-dock" aria-label="Get MEGAMIND App" @click="downloadModal.openModal()">
      <span class="dock-icon cyan-icon">↓</span>
      <span class="dock-label cyan-label">Get App</span>
    </button>

    <button class="dock-item dock-btn" aria-label="Search and commands" @click="paletteStore.openPalette()">
      <span class="dock-icon">⌘</span>
      <span class="dock-label">Menu</span>
    </button>
  </nav>
</template>

<style scoped>
.mobile-dock {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 990;
  padding: 6px 0;
  padding-bottom: max(6px, env(safe-area-inset-bottom));
  justify-content: space-around;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.4);
}

@media (max-width: 860px) {
  .mobile-dock { display: flex; }
}

.dock-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--muted);
  flex: 1;
  padding: 4px 0;
  transition: color var(--dur-fast);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.dock-item:hover,
.dock-item:active {
  color: var(--accent-perception);
}

.dock-icon {
  font-size: 1.15rem;
}

.dock-label {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.cyan-icon {
  color: var(--cyan);
}

.cyan-label {
  color: var(--cyan);
  font-weight: 700;
}
</style>
