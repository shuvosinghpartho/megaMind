<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId = 0

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  alpha: number
}

const particles: Particle[] = []

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Subtle lab telemetry points
  const count = Math.min(45, Math.floor(window.innerWidth / 35))
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.25 + 0.08,
    })
  }

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
    // In Console: cool blue for instrument points
    const rgb = isDark ? '125, 200, 255' : '40, 110, 190'

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 90) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          const lineAlpha = (1 - dist / 90) * (isDark ? 0.04 : 0.02)
          ctx.strokeStyle = `rgba(${rgb}, ${lineAlpha})`
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <div class="atmosphere-wrapper" aria-hidden="true">
    <!-- Hallmark Console Hairline Ground Grid -->
    <div class="console-grid"></div>
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
  </div>
</template>

<style scoped>
.atmosphere-wrapper {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  background-color: var(--color-paper);
}

.console-grid {
  position: absolute;
  inset: 0;
  background-size: 64px 64px;
  background-image: 
    linear-gradient(to right, color-mix(in oklch, var(--color-rule) 35%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--color-rule) 35%, transparent) 1px, transparent 1px);
  mask-image: radial-gradient(ellipse at 50% 20%, rgba(0, 0, 0, 0.7) 0%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 20%, rgba(0, 0, 0, 0.7) 0%, transparent 85%);
}

.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
