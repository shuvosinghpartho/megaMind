<script setup lang="ts">
// 2D SVG Fallback for Three.js scene when WebGL is unavailable or prefers-reduced-motion is true
</script>

<template>
  <div class="fallback-container">
    <svg viewBox="0 0 800 500" class="fallback-svg">
      <defs>
        <radialGradient id="rootGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#bc8cff" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#bc8cff" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#58a6ff" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#58a6ff" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Background Glow -->
      <circle cx="400" cy="250" r="160" fill="url(#rootGlow)" opacity="0.15" />

      <!-- Branch Connections -->
      <g class="edges" stroke="rgba(255,255,255,0.12)" stroke-width="1.5">
        <line x1="400" y1="250" x2="260" y2="160" />
        <line x1="400" y1="250" x2="400" y2="120" />
        <line x1="400" y1="250" x2="540" y2="160" />
        <line x1="400" y1="250" x2="310" y2="340" />
        <line x1="400" y1="250" x2="490" y2="340" />

        <!-- Sub-branches / Small trees -->
        <line x1="260" y1="160" x2="180" y2="110" />
        <line x1="260" y1="160" x2="220" y2="80" />
        <line x1="400" y1="120" x2="360" y2="60" />
        <line x1="400" y1="120" x2="440" y2="60" />
        <line x1="540" y1="160" x2="580" y2="90" />
        <line x1="540" y1="160" x2="620" y2="120" />
        <line x1="310" y1="340" x2="230" y2="380" />
        <line x1="490" y1="340" x2="570" y2="380" />

        <!-- Cross-connections between Small Trees -->
        <line x1="220" y1="80" x2="360" y2="60" stroke="#3fb950" stroke-opacity="0.4" stroke-dasharray="4" />
        <line x1="440" y1="60" x2="580" y2="90" stroke="#bc8cff" stroke-opacity="0.4" stroke-dasharray="4" />
      </g>

      <!-- Nodes -->
      <!-- Small Trees (Leaves) -->
      <circle cx="180" cy="110" r="5" fill="#58a6ff" />
      <circle cx="220" cy="80" r="6" fill="#58a6ff" />
      <circle cx="360" cy="60" r="5" fill="#3fb950" />
      <circle cx="440" cy="60" r="6" fill="#3fb950" />
      <circle cx="580" cy="90" r="6" fill="#58a6ff" />
      <circle cx="620" cy="120" r="5" fill="#58a6ff" />
      <circle cx="230" cy="380" r="5" fill="#f0883e" />
      <circle cx="570" cy="380" r="5" fill="#f0883e" />

      <!-- Big Trees (Compound branches) -->
      <circle cx="260" cy="160" r="9" fill="#181e29" stroke="#bc8cff" stroke-width="2.5" />
      <circle cx="400" cy="120" r="10" fill="#181e29" stroke="#bc8cff" stroke-width="2.5" />
      <circle cx="540" cy="160" r="9" fill="#181e29" stroke="#bc8cff" stroke-width="2.5" />
      <circle cx="310" cy="340" r="8" fill="#181e29" stroke="#bc8cff" stroke-width="2" />
      <circle cx="490" cy="340" r="8" fill="#181e29" stroke="#bc8cff" stroke-width="2" />

      <!-- Parent Tree (Central Root) -->
      <circle cx="400" cy="250" r="16" fill="#181e29" stroke="#bc8cff" stroke-width="3.5" />
      <circle cx="400" cy="250" r="7" fill="#bc8cff" />
    </svg>
  </div>
</template>

<style scoped>
.fallback-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
}

.fallback-svg {
  width: 100%;
  max-width: 800px;
  height: auto;
  overflow: visible;
}
</style>
