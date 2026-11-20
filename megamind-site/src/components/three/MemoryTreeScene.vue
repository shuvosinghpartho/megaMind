<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { useThemeStore } from '@/stores/theme'
import { useReducedMotion } from '@/composables/useReducedMotion'
import Fallback2D from './Fallback2D.vue'

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const themeStore = useThemeStore()
const { prefersReduced } = useReducedMotion()

const showFallback = ref(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let animationFrameId: number | null = null
let isVisible = true

interface TreeNode {
  mesh: THREE.Mesh
  targetPos: THREE.Vector3
  type: 'root' | 'big' | 'small' | 'orphan'
  baseScale: number
  phase: number
  parentIdx?: number
}

const nodes: TreeNode[] = []
let linesMesh: THREE.LineSegments | null = null
let particlesMesh: THREE.Points | null = null
let pulseTimer: any = null

// Mouse parallax
let targetRotationX = 0
let targetRotationY = 0
let currentRotationX = 0
let currentRotationY = 0

function handleMouseMove(e: MouseEvent) {
  const { innerWidth, innerHeight } = window
  const mouseX = (e.clientX / innerWidth) * 2 - 1
  const mouseY = -(e.clientY / innerHeight) * 2 + 1
  targetRotationY = mouseX * 0.18
  targetRotationX = mouseY * 0.12
}

function initScene() {
  if (!containerRef.value || !canvasRef.value) return

  const width = containerRef.value.clientWidth || window.innerWidth
  const height = containerRef.value.clientHeight || window.innerHeight

  // 1. Scene & Camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 28

  // 2. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
  scene.add(ambientLight)

  const purpleLight = new THREE.PointLight(0xbc8cff, 2.8, 40)
  purpleLight.position.set(0, 2, 8)
  scene.add(purpleLight)

  const blueLight = new THREE.PointLight(0x58a6ff, 2.2, 40)
  blueLight.position.set(-8, 5, 6)
  scene.add(blueLight)

  const greenLight = new THREE.PointLight(0x3fb950, 1.8, 35)
  greenLight.position.set(8, -4, 6)
  scene.add(greenLight)

  // 4. Materials with semi-transparency and soft emissive glow
  const isDark = themeStore.resolvedTheme === 'dark'

  const rootMaterial = new THREE.MeshStandardMaterial({
    color: 0xbc8cff,
    emissive: 0xbc8cff,
    emissiveIntensity: 0.7,
    roughness: 0.2,
    metalness: 0.2,
    transparent: true,
    opacity: 0.85,
  })

  const bigTreeMaterial = new THREE.MeshStandardMaterial({
    color: 0xbc8cff,
    emissive: 0x9a65d6,
    emissiveIntensity: 0.5,
    roughness: 0.3,
    transparent: true,
    opacity: 0.75,
  })

  const smallTreeMaterial = new THREE.MeshStandardMaterial({
    color: 0x58a6ff,
    emissive: 0x58a6ff,
    emissiveIntensity: 0.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.75,
  })

  const growthMaterial = new THREE.MeshStandardMaterial({
    color: 0x3fb950,
    emissive: 0x3fb950,
    emissiveIntensity: 0.6,
    roughness: 0.3,
    transparent: true,
    opacity: 0.75,
  })

  const sphereGeo = new THREE.SphereGeometry(1, 24, 24)

  // 5. Node Positions: SPREAD OUTWARD away from the exact center text
  // Central Root Node (shifted slightly up/back to frame headline)
  const rootMesh = new THREE.Mesh(sphereGeo, rootMaterial)
  rootMesh.scale.setScalar(1.05)
  rootMesh.position.set(0, 0, -3)
  scene.add(rootMesh)
  nodes.push({
    mesh: rootMesh,
    targetPos: new THREE.Vector3(0, 3.8, -3),
    type: 'root',
    baseScale: 1.05,
    phase: 0,
  })

  // Big Trees (Branches spread around the periphery)
  const bigConfigs = [
    { pos: new THREE.Vector3(-9.5, 4.2, -1), mat: bigTreeMaterial },
    { pos: new THREE.Vector3(9.5, 3.8, -1), mat: bigTreeMaterial },
    { pos: new THREE.Vector3(-8.8, -4.5, 0), mat: bigTreeMaterial },
    { pos: new THREE.Vector3(8.8, -4.2, 0), mat: bigTreeMaterial },
    { pos: new THREE.Vector3(0, -6.8, -1.5), mat: bigTreeMaterial },
  ]

  bigConfigs.forEach((cfg) => {
    const mesh = new THREE.Mesh(sphereGeo, cfg.mat)
    mesh.scale.setScalar(0.7)
    mesh.position.set(0, 3.8, -3)
    scene!.add(mesh)
    nodes.push({
      mesh,
      targetPos: cfg.pos,
      type: 'big',
      baseScale: 0.7,
      phase: Math.random() * Math.PI * 2,
      parentIdx: 0,
    })
  })

  // Small Trees (Atomic sub-skills clustered around each branch)
  const smallOffsets = [
    // Around Left-Top Big Tree (index 1)
    { parent: 1, offset: new THREE.Vector3(-3.2, 1.8, 1), mat: smallTreeMaterial },
    { parent: 1, offset: new THREE.Vector3(-2.4, -2.2, -0.5), mat: growthMaterial },
    { parent: 1, offset: new THREE.Vector3(2.5, 2.2, 0.5), mat: smallTreeMaterial },

    // Around Right-Top Big Tree (index 2)
    { parent: 2, offset: new THREE.Vector3(3.2, 1.6, 1), mat: smallTreeMaterial },
    { parent: 2, offset: new THREE.Vector3(2.2, -2.4, -0.5), mat: growthMaterial },
    { parent: 2, offset: new THREE.Vector3(-2.6, 2.0, 0.5), mat: smallTreeMaterial },

    // Around Left-Bottom Big Tree (index 3)
    { parent: 3, offset: new THREE.Vector3(-2.8, -1.8, 1), mat: growthMaterial },
    { parent: 3, offset: new THREE.Vector3(-2.2, 2.4, -0.5), mat: smallTreeMaterial },

    // Around Right-Bottom Big Tree (index 4)
    { parent: 4, offset: new THREE.Vector3(2.8, -1.8, 1), mat: smallTreeMaterial },
    { parent: 4, offset: new THREE.Vector3(2.4, 2.2, -0.5), mat: growthMaterial },

    // Around Bottom-Center Big Tree (index 5)
    { parent: 5, offset: new THREE.Vector3(-3.5, 1.5, 0.8), mat: smallTreeMaterial },
    { parent: 5, offset: new THREE.Vector3(3.5, 1.5, -0.8), mat: growthMaterial },
  ]

  smallOffsets.forEach((cfg) => {
    const parentPos = nodes[cfg.parent].targetPos
    const targetPos = parentPos.clone().add(cfg.offset)

    const mesh = new THREE.Mesh(sphereGeo, cfg.mat)
    mesh.scale.setScalar(0.42)
    mesh.position.set(parentPos.x, parentPos.y, parentPos.z)
    scene!.add(mesh)
    nodes.push({
      mesh,
      targetPos,
      type: 'small',
      baseScale: 0.42,
      phase: Math.random() * Math.PI * 2,
      parentIdx: cfg.parent,
    })
  })

  // 6. Ambient Floating Particles (Subtle Neural Synapses)
  const particleCount = 120
  const particlePositions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 36
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 24
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
  }

  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

  const particleMat = new THREE.PointsMaterial({
    color: isDark ? 0x58a6ff : 0x0f172a,
    size: 0.16,
    transparent: true,
    opacity: isDark ? 0.35 : 0.2,
  })

  particlesMesh = new THREE.Points(particleGeo, particleMat)
  scene.add(particlesMesh)

  // 7. Connections (Lines)
  updateConnections()

  // 8. Periodic Skill Reuse Pulse
  pulseTimer = setInterval(() => {
    if (!isVisible) return
    const smallNodes = nodes.filter((n) => n.type === 'small')
    if (smallNodes.length > 0) {
      const luckyNode = smallNodes[Math.floor(Math.random() * smallNodes.length)]
      const origScale = luckyNode.baseScale
      luckyNode.mesh.scale.setScalar(origScale * 1.9)
      setTimeout(() => {
        luckyNode.mesh.scale.setScalar(origScale)
      }, 750)
    }
  }, 3000)

  // 9. Start render loop
  animate(0)
}

function updateConnections() {
  if (!scene || nodes.length < 6) return

  if (linesMesh) {
    scene.remove(linesMesh)
    linesMesh.geometry.dispose()
    ;(linesMesh.material as THREE.Material).dispose()
  }

  const linePositions: number[] = []

  // Connect Root to each Big Tree
  for (let i = 1; i <= 5; i++) {
    const rootPos = nodes[0].mesh.position
    const bigPos = nodes[i].mesh.position
    linePositions.push(rootPos.x, rootPos.y, rootPos.z)
    linePositions.push(bigPos.x, bigPos.y, bigPos.z)
  }

  // Connect Big Trees to their respective Small Trees
  for (let i = 6; i < nodes.length; i++) {
    const pIdx = nodes[i].parentIdx ?? 1
    const pPos = nodes[pIdx].mesh.position
    const sPos = nodes[i].mesh.position
    linePositions.push(pPos.x, pPos.y, pPos.z)
    linePositions.push(sPos.x, sPos.y, sPos.z)
  }

  // Shared Skill Cross-Edges (connecting small trees across compound tasks)
  const crossEdges = [
    [6, 9], // Left top to right top
    [8, 13], // Left top to left bottom
    [11, 15], // Right top to right bottom
    [12, 16], // Left bottom to bottom center
  ]

  crossEdges.forEach(([a, b]) => {
    if (nodes[a] && nodes[b]) {
      const pa = nodes[a].mesh.position
      const pb = nodes[b].mesh.position
      linePositions.push(pa.x, pa.y, pa.z)
      linePositions.push(pb.x, pb.y, pb.z)
    }
  })

  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

  const isDark = themeStore.resolvedTheme === 'dark'
  const lineMaterial = new THREE.LineBasicMaterial({
    color: isDark ? 0x58a6ff : 0x0f172a,
    transparent: true,
    opacity: isDark ? 0.32 : 0.22,
    linewidth: 1,
  })

  linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(linesMesh)
}

let startTime = performance.now()

function animate(time: number) {
  if (!isVisible) {
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  const elapsed = (time - startTime) * 0.001

  // Smooth outward growth on load
  nodes.forEach((n) => {
    n.mesh.position.lerp(n.targetPos, 0.045)
    // Organic floating movement
    n.mesh.position.y += Math.sin(elapsed * 1.6 + n.phase) * 0.003
    n.mesh.position.x += Math.cos(elapsed * 1.2 + n.phase) * 0.002
  })

  // Gentle particle drift
  if (particlesMesh) {
    particlesMesh.rotation.y = elapsed * 0.02
    particlesMesh.rotation.x = elapsed * 0.01
  }

  // Parallax rotation
  currentRotationX += (targetRotationX - currentRotationX) * 0.05
  currentRotationY += (targetRotationY - currentRotationY) * 0.05

  if (scene) {
    scene.rotation.x = currentRotationX
    scene.rotation.y = currentRotationY + elapsed * 0.03
    updateConnections()
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  if (!containerRef.value || !renderer || !camera) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

// Watch theme change to update colors
watch(
  () => themeStore.resolvedTheme,
  (newTheme) => {
    if (!scene) return
    const isDark = newTheme === 'dark'
    if (linesMesh) {
      ;(linesMesh.material as THREE.LineBasicMaterial).color.setHex(
        isDark ? 0x58a6ff : 0x0f172a
      )
      ;(linesMesh.material as THREE.LineBasicMaterial).opacity = isDark ? 0.32 : 0.22
    }
    if (particlesMesh) {
      ;(particlesMesh.material as THREE.PointsMaterial).color.setHex(
        isDark ? 0x58a6ff : 0x0f172a
      )
      ;(particlesMesh.material as THREE.PointsMaterial).opacity = isDark ? 0.35 : 0.2
    }
  }
)

onMounted(() => {
  if (prefersReduced.value) {
    showFallback.value = true
    return
  }

  try {
    initScene()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden
    })
  } catch (err) {
    console.warn('WebGL init error, falling back to 2D SVG:', err)
    showFallback.value = true
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (pulseTimer) clearInterval(pulseTimer)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)

  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div ref="containerRef" class="scene-container">
    <Fallback2D v-if="showFallback" />
    <canvas v-else ref="canvasRef" class="scene-canvas"></canvas>
  </div>
</template>

<style scoped>
.scene-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.85;
}

.scene-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
