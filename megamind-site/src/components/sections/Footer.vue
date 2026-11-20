<script setup lang="ts">
import { projectMeta } from '@/content/megamind'
import { siteConfig } from '@/config/site.config'
import { useThemeStore } from '@/stores/theme'
import { useDownloadModalStore } from '@/stores/downloadModal'

const themeStore = useThemeStore()
const downloadModal = useDownloadModalStore()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="brand-name font-display">{{ projectMeta.name }}</span>
          <p class="brand-tag">{{ projectMeta.tagline }}</p>
          <span class="prod-note font-mono">
            Native Desktop AI Agent · Continual Learning Systems Laboratory
          </span>
        </div>

        <div class="footer-nav">
          <div class="nav-col">
            <span class="col-title font-display">Architecture</span>
            <a href="#hero">Hero & 3D Brain</a>
            <a href="#interactive-console">Simulation Studio</a>
            <a href="#features">Core Breakthroughs</a>
            <a href="#layers">6 Engine Layers</a>
          </div>

          <div class="nav-col">
            <span class="col-title font-display">Benchmarks</span>
            <a href="#compare">Comparison Matrix</a>
            <a href="#developer">Developer SDK & CLI</a>
            <a href="#roadmap">Research Roadmap</a>
            <a href="#faq">FAQ & Thesis Citation</a>
          </div>

          <div class="nav-col">
            <span class="col-title font-display">Distribution</span>
            <a :href="siteConfig.repoUrl" target="_blank" rel="noopener">GitHub Repository ↗</a>
            <a href="#get" @click.prevent="downloadModal.openModal()">Instant Download Modal</a>
            <a href="#get">Download Hub</a>
            <a href="#faq">BibTeX Citation</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="bottom-left">
          <span class="copyright-note font-mono">
            © 2026 MEGAMIND Lab. Released under MIT License.
          </span>
        </div>

        <div class="bottom-right">
          <button
            class="btn btn--line font-mono theme-btn"
            aria-label="Toggle theme"
            @click="themeStore.setTheme(themeStore.resolvedTheme === 'dark' ? 'light' : 'dark')"
          >
            Theme: {{ themeStore.resolvedTheme === 'dark' ? 'Dark 🌙' : 'Light ☀️' }}
          </button>
          <button class="btn btn--line font-mono top-btn" @click="scrollToTop">
            ↑ Top
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-paper-2);
  border-top: var(--rule-hair) solid var(--color-rule);
  padding: clamp(3.5rem, 6vh, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vh, 3rem);
  margin-top: clamp(3rem, 6vh, 5rem);
  width: 100%;
  box-sizing: border-box;
}

.footer-inner {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 3rem);
}

.footer-top {
  display: grid;
  grid-template-columns: minmax(260px, 1.2fr) minmax(0, 2fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  padding-bottom: clamp(2rem, 4vh, 3rem);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  align-items: start;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.footer-brand {
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.brand-name {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2vw, 1.6rem);
  font-weight: 600;
  letter-spacing: var(--tracking-display);
  color: var(--color-ink);
}

.brand-tag {
  font-size: var(--text-sm);
  color: var(--color-muted);
  line-height: 1.55;
  overflow-wrap: break-word;
}

.prod-note {
  font-size: 11px;
  color: var(--color-muted);
  margin-top: 4px;
  line-height: 1.45;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, minmax(130px, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

@media (max-width: 600px) {
  .footer-nav {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
  }
}

.nav-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-title {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-ink);
  margin-bottom: 6px;
}

.nav-col a {
  color: var(--color-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--dur-short), transform var(--dur-short);
  display: inline-block;
}

.nav-col a:hover {
  color: var(--color-cool);
  transform: translateX(2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 0.5rem;
  box-sizing: border-box;
}

.bottom-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.copyright-note {
  font-size: var(--text-xs);
  color: var(--color-muted);
  line-height: 1.5;
}

.bottom-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-btn,
.top-btn {
  min-height: 36px;
  padding: 0 14px;
  font-size: var(--text-xs);
}
</style>
