<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useCommandPaletteStore } from '@/stores/commandPalette'
import { useDownloadModalStore } from '@/stores/downloadModal'
import { siteConfig } from '@/config/site.config'
import { useScrollSections } from '@/composables/useScrollSections'

const themeStore = useThemeStore()
const paletteStore = useCommandPaletteStore()
const downloadModal = useDownloadModalStore()

const menuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { id: 'interactive-console', label: 'Live Studio', href: '#interactive-console' },
  { id: 'features', label: 'Breakthroughs', href: '#features' },
  { id: 'layers', label: '6 Layers', href: '#layers' },
  { id: 'compare', label: 'Benchmarks', href: '#compare' },
  { id: 'developer', label: 'Developer SDK', href: '#developer' },
  { id: 'roadmap', label: 'Roadmap', href: '#roadmap' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
]

const { activeSection } = useScrollSections([
  'hero',
  'interactive-console',
  'features',
  'layers',
  'compare',
  'developer',
  'roadmap',
  'get',
  'faq',
])

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="navbar-wrapper" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar-capsule glass-capsule">
      <!-- Brand Logo Section -->
      <a href="#hero" class="brand-group" title="MegaMind Home">
        <span class="brand-name font-display">MEGAMIND</span>
      </a>

      <!-- Desktop Navigation Center Links -->
      <nav class="nav-links-deck" aria-label="Main Navigation">
        <ul class="nav-pills-list">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.href"
              class="nav-pill-link"
              :class="{ 'is-active': activeSection === link.id }"
            >
              <span>{{ link.label }}</span>
              <span v-if="activeSection === link.id" class="active-dot"></span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right Action Controls -->
      <div class="nav-actions-deck">
        <!-- Palette Command Hint Button (⌘K) -->
        <button
          class="cmd-trigger-btn font-mono"
          aria-label="Open Command Palette"
          title="Command Palette (Ctrl / Cmd + K)"
          @click="paletteStore.openPalette()"
        >
          <span class="cmd-icon">⌘</span>
          <span class="cmd-char">K</span>
        </button>

        <!-- GitHub Repository Button (Icon only) -->
        <a
          :href="siteConfig.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="github-pill"
          title="MegaMind on GitHub"
          aria-label="MegaMind on GitHub"
        >
          <svg class="github-icon" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>

        <!-- Dark / Light Theme Toggle Button with Smooth Morphing Animation -->
        <button
          class="theme-toggle-btn"
          :class="[themeStore.resolvedTheme]"
          aria-label="Toggle Theme"
          :title="`Current: ${themeStore.resolvedTheme} mode (click to toggle)`"
          @click="themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')"
        >
          <div class="theme-icon-stage" :class="{ 'rotate-sun': themeStore.resolvedTheme === 'dark', 'rotate-moon': themeStore.resolvedTheme === 'light' }">
            <!-- Sun SVG for Dark Mode -->
            <svg v-if="themeStore.resolvedTheme === 'dark'" class="theme-svg sun-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="4.5" fill="#facc15" stroke="#facc15" />
              <g class="sun-rays" stroke="#facc15" stroke-linecap="round">
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
                <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
                <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
              </g>
            </svg>
            <!-- Moon SVG for Light Mode -->
            <svg v-else class="theme-svg moon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#6366f1" stroke="#4338ca" />
              <circle cx="17.5" cy="5.5" r="1.2" fill="#f59e0b" stroke="none" class="star-twinkle" />
            </svg>
          </div>
        </button>

        <!-- Primary High-Impact CTA ("Get MEGAMIND") -->
        <button
          class="get-megamind-cta font-display"
          @click="downloadModal.openModal()"
        >
          <span class="cta-shimmer"></span>
          <span class="cta-label">Get MEGAMIND</span>
          <span class="cta-arrow">↓</span>
        </button>

        <!-- Mobile Hamburger Toggle -->
        <button
          class="mobile-toggle-btn"
          aria-label="Toggle Navigation Drawer"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="slide-down">
      <div v-if="menuOpen" class="mobile-drawer-overlay" @click="menuOpen = false">
        <div class="mobile-drawer-box glass-panel" @click.stop>
          <div class="mobile-drawer-header">
            <span class="mobile-nav-title font-display">Navigation</span>
            <button class="mobile-close-btn" @click="menuOpen = false">✕</button>
          </div>

          <div class="mobile-links-list">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="link.href"
              class="mobile-link-item font-display"
              :class="{ active: activeSection === link.id }"
              @click="menuOpen = false"
            >
              <span>{{ link.label }}</span>
              <span class="arrow-glyph">→</span>
            </a>
          </div>

          <div class="mobile-drawer-actions">
            <button
              class="mobile-cta-full font-display"
              @click="menuOpen = false; downloadModal.openModal()"
            >
              <span>Download MEGAMIND Native App</span>
              <span>↓</span>
            </button>

            <div class="mobile-sub-row">
              <a :href="siteConfig.repoUrl" target="_blank" class="mobile-sub-link font-mono">
                GitHub Repository ↗
              </a>
              <button
                class="mobile-theme-pill font-mono"
                @click="themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')"
              >
                {{ themeStore.resolvedTheme === 'dark' ? 'Light Theme ☀️' : 'Dark Theme 🌙' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Top Floating Wrapper */
.navbar-wrapper {
  position: sticky;
  top: 12px;
  z-index: 1000;
  width: 100%;
  padding: 0 var(--space-4);
  box-sizing: border-box;
  transition: transform var(--dur-normal) var(--ease-default), padding var(--dur-normal);
}

@media (max-width: 768px) {
  .navbar-wrapper {
    top: 6px;
    padding: 0 var(--space-2);
  }
}

/* Hallmark Console Capsule Navigation */
.navbar-capsule {
  max-width: 1240px;
  margin: 0 auto;
  height: 54px;
  padding: 4px 8px 4px 14px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  background: color-mix(in oklch, var(--color-paper-2) 90%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: var(--rule-hair) solid var(--color-rule);
  box-shadow: none;
  transition: border-color var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out);
}

[data-theme="light"] .navbar-capsule {
  background: color-mix(in oklch, var(--color-paper-2) 92%, transparent);
  border: var(--rule-hair) solid var(--color-rule);
}

.navbar-wrapper.is-scrolled .navbar-capsule {
  background: var(--color-paper-2);
  border-color: var(--color-rule-2);
}

[data-theme="light"] .navbar-wrapper.is-scrolled .navbar-capsule {
  background: var(--color-paper-2);
  border-color: var(--color-rule-2);
}

/* Brand Group */
.brand-group {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: var(--radius-sm);
  transition: opacity var(--dur-fast);
}

.brand-group:hover {
  opacity: 0.85;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  transition: color var(--dur-normal);
}

[data-theme="light"] .brand-name {
  color: var(--color-ink);
}

.brand-group:hover .brand-name {
  filter: drop-shadow(0 0 10px rgba(125, 249, 255, 0.45));
}

.live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
}

/* Nav Pills Center Deck */
.nav-links-deck {
  display: flex;
  align-items: center;
}

@media (max-width: 1040px) {
  .nav-links-deck {
    display: none;
  }
}

.nav-pills-list {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
}

.nav-pill-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--muted);
  text-decoration: none;
  transition: all var(--dur-fast);
  position: relative;
}

.nav-pill-link:hover {
  color: var(--text-heading);
  background: rgba(255, 255, 255, 0.06);
}

[data-theme="light"] .nav-pill-link:hover {
  background: rgba(15, 23, 42, 0.05);
}

.nav-pill-link.is-active {
  color: var(--cyan);
  background: rgba(125, 249, 255, 0.1);
  font-weight: 600;
}

[data-theme="light"] .nav-pill-link.is-active {
  color: var(--cyan);
  background: rgba(2, 132, 199, 0.09);
}

.active-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--cyan);
  box-shadow: 0 0 6px var(--cyan);
}

/* Actions Deck */
.nav-actions-deck {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Cmd+K trigger */
.cmd-trigger-btn {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  border-radius: 7px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--dur-fast);
}

.cmd-trigger-btn:hover {
  color: var(--text-heading);
  border-color: var(--border-hover);
  background: var(--surface-3);
}

@media (max-width: 680px) {
  .cmd-trigger-btn {
    display: none;
  }
}

/* GitHub Pill (Icon only) */
.github-pill {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  text-decoration: none;
  transition: all var(--dur-fast);
}

.github-icon {
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.github-pill:hover {
  border-color: var(--border-hover);
  background: var(--surface-3);
  color: var(--cyan);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .github-pill {
    display: none;
  }
}

/* Theme Toggle with Morphing Animation */
.theme-toggle-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all var(--dur-normal) var(--ease-default);
}

.theme-toggle-btn:hover {
  border-color: var(--cyan);
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(125, 249, 255, 0.25);
}

[data-theme="light"] .theme-toggle-btn:hover {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
}

.theme-icon-stage {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.rotate-sun {
  animation: spin-sun 0.6s ease-out;
}

.rotate-moon {
  animation: pop-moon 0.6s ease-out;
}

@keyframes spin-sun {
  0% { transform: rotate(-90deg) scale(0.6); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
}

@keyframes pop-moon {
  0% { transform: rotate(90deg) scale(0.6); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
}

.sun-svg, .moon-svg {
  width: 100%;
  height: 100%;
}

.sun-rays {
  transform-origin: center;
  animation: ray-pulse 3s infinite ease-in-out;
}

@keyframes ray-pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.5; }
}

.star-twinkle {
  animation: star-pulse 2s infinite ease-in-out;
}

@keyframes star-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.4; }
}

/* Primary CTA Button (Hallmark Console Amber Action) */
.get-megamind-cta {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--color-accent);
  color: var(--color-accent-ink);
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  border: var(--rule-hair) solid var(--color-accent);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: none;
  transition: background-color var(--dur-short) var(--ease-out), transform var(--dur-short) var(--ease-out);
  white-space: nowrap;
}

.get-megamind-cta:hover {
  background: color-mix(in oklch, var(--color-accent) 92%, white);
  transform: translateY(-1px);
  box-shadow: none;
}

[data-theme="light"] .get-megamind-cta {
  background: var(--color-accent);
  color: var(--color-accent-ink);
  border-color: var(--color-accent);
  box-shadow: none;
}

.cta-arrow {
  font-size: 0.95rem;
  font-weight: 800;
  transition: transform var(--dur-fast);
}

.get-megamind-cta:hover .cta-arrow {
  transform: translateY(2px);
}

.cta-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: cta-shine 4s infinite;
}

@keyframes cta-shine {
  0%, 70% { left: -100%; }
  100% { left: 200%; }
}

/* Mobile Toggle Button */
.mobile-toggle-btn {
  display: none;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 4px;
}

@media (max-width: 1040px) {
  .mobile-toggle-btn {
    display: block;
  }
}

/* Mobile Drawer Overlay */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 7, 13, 0.75);
  backdrop-filter: blur(12px);
  z-index: 999;
  display: flex;
  justify-content: center;
  padding: 16px;
  top: 70px;
}

.mobile-drawer-box {
  width: 100%;
  max-width: 440px;
  background: var(--surface);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-card);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 80vh;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

[data-theme="light"] .mobile-drawer-box {
  background: #ffffff;
}

.mobile-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border);
}

.mobile-nav-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.mobile-close-btn {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1.2rem;
  cursor: pointer;
}

.mobile-links-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.mobile-link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  color: var(--text);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  background: var(--surface-2);
  transition: all var(--dur-fast);
}

.mobile-link-item:hover, .mobile-link-item.active {
  background: rgba(125, 249, 255, 0.1);
  color: var(--cyan);
}

.arrow-glyph {
  color: var(--muted);
  font-size: 0.85rem;
}

.mobile-drawer-actions {
  margin-top: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-cta-full {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, #7df9ff 0%, #00d2ff 100%);
  color: #07090e;
  font-weight: 700;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
}

.mobile-sub-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.78rem;
}

.mobile-sub-link {
  color: var(--cyan);
  text-decoration: none;
}

.mobile-theme-pill {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  cursor: pointer;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
