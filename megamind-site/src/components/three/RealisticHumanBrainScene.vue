<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { useThemeStore } from '@/stores/theme'

const props = withDefaults(
  defineProps<{
    stage?: number
    autoPlay?: boolean
  }>(),
  {
    stage: 2,
    autoPlay: true,
  }
)

const emit = defineEmits<{
  (e: 'update:stage', stage: number): void
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const themeStore = useThemeStore()

const currentStage = ref(props.stage)
const isAutoPlay = ref(props.autoPlay)
let autoPlayTimer: any = null
let animationFrameId: number | null = null

// Three.js Core Objects
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let rootGroup: THREE.Group | null = null
let brainGroup: THREE.Group | null = null
let brainMeshGroup: THREE.Group | null = null
let treeGroup: THREE.Group | null = null
let bridgeGroup: THREE.Group | null = null
let dustGroup: THREE.Points | null = null

// Dynamic Framing & Interactive Parallax
let baseCamX = 6.75
let baseCamY = 0.0
let baseCamZ = 36.0

// Real-time Brain Growth & Synaptogenesis Scaling
let currentBrainScale = 1.08
let targetBrainScale = 1.08

// Interactive Parallax
let targetRotY = 0
let targetRotX = 0
let currentRotY = 0
let currentRotX = 0
let targetCamX = 0
let targetCamY = 0
let currentCamX = 0
let currentCamY = 0
let pulseClock = 0

// Node 3D Objects mapping
interface ThreeNodeRef {
  mesh: THREE.Mesh
  stage: number
  id: string
  basePos: THREE.Vector3
  size: [number, number]
  phase: number
}
const threeNodes: ThreeNodeRef[] = []

// Procedural Neurons
interface ProceduralNeuron {
  id: number
  sprite: THREE.Sprite
  pos: THREE.Vector3
  stage: number
  baseScale: number
  currentScale: number
}
const proceduralNeurons: ProceduralNeuron[] = []

// Procedural Axon Connections
interface ProceduralAxon {
  mesh: THREE.Mesh
  from: THREE.Vector3
  to: THREE.Vector3
  stage: number
  isMaster?: boolean
}
const proceduralAxons: ProceduralAxon[] = []

// Traveling Action Potential Comets
interface CometRef {
  mesh: THREE.Mesh
  start: THREE.Vector3
  end: THREE.Vector3
  speed: number
  progress: number
  stage: number
}
const proceduralComets: CometRef[] = []

// Tree Branches and Traveling Signals
const treeBranchMeshes: THREE.Mesh[] = []
const treeComets: CometRef[] = []
let brainToRootTube: THREE.Mesh | null = null
let brainToRootComet: THREE.Mesh | null = null
let brainToRootCurve: THREE.CubicBezierCurve3 | null = null

// Watch props
watch(
  () => props.stage,
  (val) => {
    if (val !== undefined && val !== currentStage.value) {
      currentStage.value = val
      updateStageGrowth()
    }
  }
)

watch(
  () => props.autoPlay,
  (val) => {
    isAutoPlay.value = val
    if (val) startAutoPlay()
    else clearInterval(autoPlayTimer)
  }
)

watch(
  () => themeStore.resolvedTheme,
  () => {
    refreshAllTextures()
  }
)

function nextStage() {
  currentStage.value = (currentStage.value % 4) + 1
  emit('update:stage', currentStage.value)
  updateStageGrowth()
}

function startAutoPlay() {
  clearInterval(autoPlayTimer)
  if (!isAutoPlay.value) return
  autoPlayTimer = setInterval(() => {
    nextStage()
  }, 4800)
}

function handleMouseMove(e: MouseEvent) {
  const { innerWidth, innerHeight } = window
  const nx = (e.clientX / innerWidth - 0.5) * 2
  const ny = -(e.clientY / innerHeight - 0.5) * 2
  targetRotY = nx * 0.12
  targetRotX = ny * 0.08
  targetCamX = nx * 0.8
  targetCamY = ny * 0.5
}

// ----------------------------------------------------
// Texture Generator Helpers
// ----------------------------------------------------
function createNeuralEmberTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  const ctx = c.getContext('2d')!
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(0.12, 'rgba(255, 240, 180, 0.95)')
  grad.addColorStop(0.32, 'rgba(255, 160, 30, 0.65)')
  grad.addColorStop(0.65, 'rgba(240, 90, 0, 0.15)')
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function createCircleDotTexture(colorHex: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 64
  c.height = 64
  const ctx = c.getContext('2d')!
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(0.35, colorHex)
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function createRadialAuraTexture(color1: string, color2: string): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')!
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  grad.addColorStop(0, color1)
  grad.addColorStop(0.45, color2)
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ----------------------------------------------------
// Large, Ultra-Crisp, High-DPI Canvas Textures
// (Exact replica of user reference image, scaled 2x larger for crystal-clear readability)
// ----------------------------------------------------

// 1. Root Pill (Capsule with soft coral/pink tint & border - Bold, Large & Vector-Crisp)
function createRootPillTexture(
  title: string,
  subtitle: string,
  isDark: boolean
): THREE.CanvasTexture {
  const w = 1050
  const h = 310
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!

  ctx.clearRect(0, 0, w, h)

  // Rounded Pill Body
  ctx.beginPath()
  ctx.roundRect(14, 14, w - 28, h - 28, 140)
  ctx.fillStyle = isDark ? 'rgba(244, 114, 182, 0.28)' : 'rgba(254, 226, 226, 0.98)'
  ctx.shadowColor = isDark ? 'rgba(244, 114, 182, 0.65)' : 'rgba(239, 68, 68, 0.35)'
  ctx.shadowBlur = 30
  ctx.fill()
  ctx.shadowBlur = 0

  // Outer Glowing Border Stroke
  ctx.strokeStyle = isDark ? '#f472b6' : '#e11d48'
  ctx.lineWidth = 6.0
  ctx.stroke()

  // Inner subtle highlight border
  ctx.beginPath()
  ctx.roundRect(22, 22, w - 44, h - 44, 132)
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.30)' : 'rgba(255, 255, 255, 0.85)'
  ctx.lineWidth = 2.0
  ctx.stroke()

  // Live Pulsing Beacon Dot inside the pill on the left
  ctx.beginPath()
  ctx.arc(80, h / 2, 14, 0, Math.PI * 2)
  ctx.fillStyle = isDark ? '#f472b6' : '#e11d48'
  ctx.shadowColor = isDark ? '#f472b6' : '#e11d48'
  ctx.shadowBlur = 12
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.beginPath()
  ctx.arc(80, h / 2, 7, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  // Centered Bold Title Text
  ctx.font = '800 76px "Host Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  ctx.fillStyle = isDark ? '#ffffff' : '#881337'
  ctx.textAlign = 'center'
  if (isDark) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'
    ctx.shadowBlur = 12
  }
  ctx.fillText(title, (w / 2) + 20, 140)
  ctx.shadowBlur = 0

  // Subtitle Text
  ctx.font = '700 36px "Atkinson Hyperlegible Mono", monospace'
  ctx.fillStyle = isDark ? '#fbcfe8' : '#be123c'
  ctx.fillText(subtitle, (w / 2) + 20, 218)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy() || 4
  return tex
}

// 2. Minimal Branch Node: Ultra-Premium Glassmorphism Card with Tag & Colored Accent
function createMinimalBranchTexture(
  fullTitle: string,
  barColor: string,
  isDark: boolean
): THREE.CanvasTexture {
  const w = 1100
  const h = 240
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!

  ctx.clearRect(0, 0, w, h)

  // Split title and tag if present (e.g. "Click '#login-btn' (Shared · Ref: 2)")
  let mainText = fullTitle
  let tagText = ''
  const tagMatch = fullTitle.match(/^(.*?)\s*\((.*?)\)$/)
  if (tagMatch) {
    mainText = tagMatch[1].trim()
    tagText = tagMatch[2].trim()
  }

  const startX = 36
  const cardY = 32
  const cardH = 150
  const cardW = w - startX - 16
  const cardR = 24

  // 1. Sleek Glassmorphic Floating Leaf Card Container
  ctx.beginPath()
  ctx.roundRect(startX, cardY, cardW, cardR)
  ctx.fillStyle = isDark ? 'rgba(10, 15, 28, 0.88)' : 'rgba(255, 255, 255, 0.95)'
  ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.12)'
  ctx.shadowBlur = 16
  ctx.shadowOffsetY = 4
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.shadowOffsetY = 0

  // Hairline Border
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)'
  ctx.lineWidth = 2.0
  ctx.stroke()

  // Left Accent Pillar Indicator (Vertical glow band in barColor)
  ctx.beginPath()
  ctx.roundRect(startX + 4, cardY + 12, 6, cardH - 24, 3)
  ctx.fillStyle = barColor
  ctx.shadowColor = barColor
  ctx.shadowBlur = isDark ? 8 : 0
  ctx.fill()
  ctx.shadowBlur = 0

  // 2. Connector Port Dot on Left Outer Edge
  ctx.beginPath()
  ctx.arc(startX, cardY + cardH / 2, 7, 0, Math.PI * 2)
  ctx.fillStyle = barColor
  ctx.shadowColor = barColor
  ctx.shadowBlur = isDark ? 10 : 0
  ctx.fill()
  ctx.shadowBlur = 0

  // Inner white dot
  ctx.beginPath()
  ctx.arc(startX, cardY + cardH / 2, 3, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  // 3. Main Action Title
  let fontSize = 66
  ctx.font = `800 ${fontSize}px "Host Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  const maxTitleW = tagText ? cardW - 320 : cardW - 70
  while (ctx.measureText(mainText).width > maxTitleW && fontSize > 38) {
    fontSize -= 2
    ctx.font = `800 ${fontSize}px "Host Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  }

  ctx.fillStyle = isDark ? '#ffffff' : '#090d16'
  ctx.textAlign = 'left'
  if (isDark) {
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'
    ctx.shadowBlur = 8
  }
  ctx.fillText(mainText, startX + 26, cardY + (cardH / 2) + (fontSize * 0.35))
  ctx.shadowBlur = 0

  // 4. Tag Badge Pill on the Right (if present)
  if (tagText) {
    ctx.font = '700 32px "Atkinson Hyperlegible Mono", monospace'
    const tagW = ctx.measureText(tagText).width + 28
    const tagH = 50
    const tagX = startX + cardW - tagW - 20
    const tagY = cardY + (cardH - tagH) / 2

    // Tag background
    ctx.beginPath()
    ctx.roundRect(tagX, tagY, tagW, tagH, 12)
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'
    ctx.fill()
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.12)'
    ctx.lineWidth = 1.6
    ctx.stroke()

    // Tag text
    ctx.fillStyle = isDark ? '#93c5fd' : '#2563eb'
    if (tagText.includes('Shared')) ctx.fillStyle = isDark ? '#6ee7b7' : '#059669'
    else if (tagText.includes('YOLO')) ctx.fillStyle = isDark ? '#fdba74' : '#c2410c'

    ctx.textAlign = 'center'
    ctx.fillText(tagText, tagX + tagW / 2, tagY + 36)
  }

  // 5. Solid Glowing Horizontal Accent Line Underneath
  ctx.beginPath()
  ctx.moveTo(startX + 8, cardY + cardH)
  ctx.lineTo(startX + cardW - 8, cardY + cardH)
  ctx.strokeStyle = barColor
  ctx.lineWidth = 9
  ctx.lineCap = 'round'
  if (isDark) {
    ctx.shadowColor = barColor
    ctx.shadowBlur = 10
  }
  ctx.stroke()
  ctx.shadowBlur = 0

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy() || 4
  return tex
}

// ----------------------------------------------------
// Scene Initialization
// ----------------------------------------------------
function initThree() {
  if (!containerRef.value || !canvasRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const width = rect.width || 800
  const height = rect.height || 500

  // 1. Scene & Camera (Dynamically framed to show full brain and large mind map tree)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000)
  camera.position.set(baseCamX, baseCamY, baseCamZ)
  camera.lookAt(baseCamX, baseCamY, 0)

  // 2. Renderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
  } catch (err) {
    console.warn('RealisticHumanBrainScene: WebGLRenderer creation failed', err)
    return
  }
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  // 3. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const lightAmber = new THREE.PointLight(0xffaa33, 1.8, 50)
  lightAmber.position.set(-8.0, 1.0, 8)
  scene.add(lightAmber)

  const lightCyan = new THREE.PointLight(0x7df9ff, 1.8, 50)
  lightCyan.position.set(10.0, 4.0, 8)
  scene.add(lightCyan)

  const lightEmerald = new THREE.PointLight(0x10b981, 1.8, 50)
  lightEmerald.position.set(20.0, 1.0, 8)
  scene.add(lightEmerald)

  // Root Group for Mouse Parallax
  rootGroup = new THREE.Group()
  scene.add(rootGroup)

  brainGroup = new THREE.Group()
  rootGroup.add(brainGroup)

  brainMeshGroup = new THREE.Group()
  brainMeshGroup.position.set(-7.5, 0.0, 0)
  brainGroup.add(brainMeshGroup)

  treeGroup = new THREE.Group()
  rootGroup.add(treeGroup)

  bridgeGroup = new THREE.Group()
  rootGroup.add(bridgeGroup)

  const isDark = themeStore.resolvedTheme === 'dark'

  // --------------------------------------------------
  // A. ATMOSPHERIC BIOLUMINESCENT AURA & 3D HEAD PROFILE
  // --------------------------------------------------
  const auraTex = createRadialAuraTexture('rgba(0, 210, 255, 0.22)', 'rgba(188, 140, 255, 0.07)')
  const auraMat = new THREE.MeshBasicMaterial({
    map: auraTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const auraMesh = new THREE.Mesh(new THREE.PlaneGeometry(17.8, 17.8), auraMat)
  auraMesh.position.set(0, 0, -0.3)
  brainMeshGroup.add(auraMesh)

  const texLoader = new THREE.TextureLoader()
  const headTexture = texLoader.load('/assets/human-head-rembg.png')
  headTexture.colorSpace = THREE.SRGBColorSpace

  const headPlaneGeo = new THREE.PlaneGeometry(16.8, 16.8)
  const headPlaneMat = new THREE.MeshBasicMaterial({
    map: headTexture,
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
  })
  const headPlaneMesh = new THREE.Mesh(headPlaneGeo, headPlaneMat)
  headPlaneMesh.position.set(0, 0, -0.05)
  brainMeshGroup.add(headPlaneMesh)

  // --------------------------------------------------
  // B. LIVING PROCEDURAL SYNAPTIC NEURONS IN BRAIN
  // --------------------------------------------------
  const emberTex = createNeuralEmberTexture()
  const rawNeurons = [
    // Spine & Brainstem (Stage 1)
    { id: 1, pos: new THREE.Vector3(4.50, -7.20, 0.15), stage: 1, baseScale: 1.35 },
    { id: 2, pos: new THREE.Vector3(4.30, -5.50, 0.18), stage: 1, baseScale: 1.30 },
    { id: 3, pos: new THREE.Vector3(4.00, -3.72, 0.20), stage: 1, baseScale: 1.40 },
    { id: 4, pos: new THREE.Vector3(3.60, -2.10, 0.18), stage: 1, baseScale: 1.35 },
    { id: 5, pos: new THREE.Vector3(2.80, 0.30, 0.18), stage: 1, baseScale: 1.30 },
    { id: 6, pos: new THREE.Vector3(0.61, 1.48, 0.20), stage: 1, baseScale: 1.35 },
    { id: 7, pos: new THREE.Vector3(-0.73, -0.11, 0.15), stage: 1, baseScale: 1.30 },

    // Occipital Visual Cortex Hub & Frontal Planning (Stage 2)
    { id: 8, pos: new THREE.Vector3(4.41, 3.14, 0.25), stage: 2, baseScale: 1.60 },
    { id: 9, pos: new THREE.Vector3(3.47, 4.23, 0.20), stage: 2, baseScale: 1.40 },
    { id: 10, pos: new THREE.Vector3(2.52, 3.27, 0.22), stage: 2, baseScale: 1.35 },
    { id: 11, pos: new THREE.Vector3(1.73, 2.11, 0.25), stage: 2, baseScale: 1.35 },
    { id: 12, pos: new THREE.Vector3(0.75, 3.75, 0.22), stage: 2, baseScale: 1.40 },
    { id: 13, pos: new THREE.Vector3(-0.25, 2.23, 0.28), stage: 2, baseScale: 1.35 },
    { id: 14, pos: new THREE.Vector3(-1.12, 3.88, 0.25), stage: 2, baseScale: 1.35 },
    { id: 15, pos: new THREE.Vector3(-3.00, 1.89, 0.20), stage: 2, baseScale: 1.35 },
    { id: 16, pos: new THREE.Vector3(-4.11, 2.03, 0.25), stage: 2, baseScale: 1.40 },
    { id: 17, pos: new THREE.Vector3(-4.28, 4.98, 0.15), stage: 2, baseScale: 1.35 },

    // Synaptic Density Across Entire Brain (Stage 3)
    { id: 18, pos: new THREE.Vector3(2.22, 6.83, 0.12), stage: 3, baseScale: 1.35 },
    { id: 19, pos: new THREE.Vector3(0.72, 6.53, 0.15), stage: 3, baseScale: 1.40 },
    { id: 20, pos: new THREE.Vector3(-0.48, 5.27, 0.20), stage: 3, baseScale: 1.40 },
    { id: 21, pos: new THREE.Vector3(2.14, 5.52, 0.18), stage: 3, baseScale: 1.35 },
    { id: 22, pos: new THREE.Vector3(-5.23, 3.27, 0.20), stage: 3, baseScale: 1.40 },
    { id: 23, pos: new THREE.Vector3(-3.77, 0.66, 0.15), stage: 3, baseScale: 1.30 },
    { id: 24, pos: new THREE.Vector3(-1.55, 1.28, 0.18), stage: 3, baseScale: 1.35 },
    { id: 25, pos: new THREE.Vector3(3.27, 1.81, 0.22), stage: 3, baseScale: 1.35 },
    { id: 26, pos: new THREE.Vector3(3.20, -0.80, 0.15), stage: 3, baseScale: 1.30 },
  ]

  rawNeurons.forEach((rn) => {
    const haloMat = new THREE.SpriteMaterial({
      map: emberTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    })
    const sprite = new THREE.Sprite(haloMat)
    sprite.scale.setScalar(0.001)
    sprite.position.copy(rn.pos)
    brainMeshGroup!.add(sprite)

    proceduralNeurons.push({
      id: rn.id,
      sprite,
      pos: rn.pos,
      stage: rn.stage,
      baseScale: rn.baseScale,
      currentScale: 0,
    })
  })

  // Procedural Axon Tubes in Brain
  const rawAxonLinks = [
    { a: 1, b: 2, stage: 1, isMaster: true },
    { a: 2, b: 3, stage: 1, isMaster: true },
    { a: 3, b: 4, stage: 1, isMaster: true },
    { a: 4, b: 5, stage: 1, isMaster: true },
    { a: 5, b: 6, stage: 1, isMaster: true },
    { a: 6, b: 7, stage: 1, isMaster: true },
    { a: 6, b: 11, stage: 2 },
    { a: 11, b: 10, stage: 2 },
    { a: 10, b: 8, stage: 2, isMaster: true },
    { a: 8, b: 9, stage: 2, isMaster: true },
    { a: 9, b: 12, stage: 2 },
    { a: 12, b: 14, stage: 2, isMaster: true },
    { a: 14, b: 13, stage: 2 },
    { a: 13, b: 15, stage: 2 },
    { a: 15, b: 16, stage: 2, isMaster: true },
    { a: 16, b: 17, stage: 2 },
    { a: 9, b: 21, stage: 3 },
    { a: 21, b: 18, stage: 3 },
    { a: 18, b: 19, stage: 3, isMaster: true },
    { a: 19, b: 20, stage: 3 },
    { a: 20, b: 14, stage: 3 },
    { a: 17, b: 22, stage: 3 },
    { a: 22, b: 16, stage: 3 },
    { a: 16, b: 23, stage: 3 },
    { a: 23, b: 24, stage: 3 },
    { a: 24, b: 7, stage: 3 },
    { a: 8, b: 25, stage: 3 },
    { a: 25, b: 26, stage: 3 },
    { a: 26, b: 5, stage: 3 },
  ]

  const sphereGeo = new THREE.SphereGeometry(1, 10, 10)
  const cometMat = new THREE.MeshBasicMaterial({ color: 0xffffff })

  rawAxonLinks.forEach((link, idx) => {
    const na = proceduralNeurons.find((n) => n.id === link.a)
    const nb = proceduralNeurons.find((n) => n.id === link.b)
    if (!na || !nb) return

    const dist = na.pos.distanceTo(nb.pos)
    const geo = new THREE.CylinderGeometry(0.035, 0.035, dist, 6, 1, true)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const tubeMesh = new THREE.Mesh(geo, mat)
    tubeMesh.position.copy(na.pos).add(nb.pos).multiplyScalar(0.5)
    tubeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), nb.pos.clone().sub(na.pos).normalize())
    tubeMesh.scale.set(0.001, 0.001, 0.001)
    brainMeshGroup!.add(tubeMesh)

    proceduralAxons.push({
      mesh: tubeMesh,
      from: na.pos,
      to: nb.pos,
      stage: link.stage,
      isMaster: link.isMaster,
    })

    if (idx % 2 === 0) {
      const cometMesh = new THREE.Mesh(sphereGeo, cometMat)
      cometMesh.scale.setScalar(0.08)
      brainMeshGroup!.add(cometMesh)

      proceduralComets.push({
        mesh: cometMesh,
        start: na.pos,
        end: nb.pos,
        speed: 0.015 + (idx % 3) * 0.005,
        progress: Math.random(),
        stage: link.stage,
      })
    }
  })

  // --------------------------------------------------
  // C. OPTICAL NEURAL FIBER (Visual Cortex -> MEGAMIND ROOT Pill)
  // --------------------------------------------------
  const visualHubWorldPos = new THREE.Vector3(-7.5 + 4.41 * 1.08, 0.0 + 3.14 * 1.08, 0.25) // (-2.74, 3.39, 0.25)
  const rootPillLeftEdge = new THREE.Vector3(-3.3, 0.0, 0.3)

  brainToRootCurve = new THREE.CubicBezierCurve3(
    visualHubWorldPos,
    new THREE.Vector3(-3.0, 2.2, 0.3),
    new THREE.Vector3(-3.2, 0.8, 0.3),
    rootPillLeftEdge
  )

  const bTubeGeo = new THREE.TubeGeometry(brainToRootCurve, 32, 0.075, 8, false)
  const bTubeMat = new THREE.MeshBasicMaterial({
    color: 0x7df9ff,
    transparent: true,
    opacity: 0.90,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  brainToRootTube = new THREE.Mesh(bTubeGeo, bTubeMat)
  bridgeGroup.add(brainToRootTube)

  brainToRootComet = new THREE.Mesh(sphereGeo, cometMat)
  brainToRootComet.scale.setScalar(0.18)
  bridgeGroup.add(brainToRootComet)

  // --------------------------------------------------
  // D. TREE DIAGRAM DESIGN (Exact Replica of Attached Image 1 - Bold & Large)
  // - Root Node: Coral Pill Capsule (size 8.6 x 2.7)
  // - Level 1: Primary branches (size 10.2 x 2.4)
  // - Level 2: Sub-branches (size 10.6 x 2.4)
  // --------------------------------------------------
  const treeNodesConfig = [
    // ROOT PILL (Like "Performance of a Projects" - Bold & Large)
    {
      id: 'root',
      type: 'root-pill',
      title: 'MEGAMIND ROOT',
      sub: 'Hierarchical Memory Core',
      barColor: '#f472b6',
      pos: new THREE.Vector3(1.0, 0.0, 0.3),
      size: [8.6, 2.7] as [number, number],
      stage: 1,
      phase: 0.0,
    },

    // LEVEL 1: PRIMARY BRANCHES (Like "ProjectPlanning" & "Project Execution" - Large & Bold)
    {
      id: 'branch_web',
      type: 'branch-line',
      title: 'Big Tree: Web Automation Flow',
      barColor: '#f97316', // Orange
      pos: new THREE.Vector3(11.6, 4.0, 0.2),
      size: [10.2, 2.4] as [number, number],
      stage: 2,
      phase: 0.5,
    },
    {
      id: 'branch_desktop',
      type: 'branch-line',
      title: 'Big Tree: Desktop Report Sync',
      barColor: '#22c55e', // Green
      pos: new THREE.Vector3(11.6, -4.0, 0.2),
      size: [10.2, 2.4] as [number, number],
      stage: 3,
      phase: 0.9,
    },

    // LEVEL 2: SUB-BRANCHES FROM WEB (Large & Bold Text)
    {
      id: 'sub_yolo',
      type: 'branch-line',
      title: 'UI Vision Anchors (YOLOv8n 6.3MB)',
      barColor: '#f97316', // Orange
      pos: new THREE.Vector3(23.2, 7.0, 0.2),
      size: [10.6, 2.4] as [number, number],
      stage: 2,
      phase: 0.2,
    },
    {
      id: 'sub_shared_click',
      type: 'branch-line',
      title: "Click '#login-btn' (Shared · Ref: 2)",
      barColor: '#10b981', // Emerald Green (Shared Sub-Tree!)
      pos: new THREE.Vector3(23.2, 3.5, 0.2),
      size: [10.6, 2.4] as [number, number],
      stage: 2,
      phase: 0.6,
    },
    {
      id: 'sub_type',
      type: 'branch-line',
      title: "Type '#password' (Keystroke Token)",
      barColor: '#f97316', // Orange
      pos: new THREE.Vector3(23.2, 0.0, 0.2),
      size: [10.6, 2.4] as [number, number],
      stage: 2,
      phase: 1.0,
    },

    // LEVEL 2: SUB-BRANCHES FROM DESKTOP (Large & Bold Text)
    {
      id: 'sub_select',
      type: 'branch-line',
      title: "Select '#date-filter' (UI Dropdown)",
      barColor: '#22c55e', // Green
      pos: new THREE.Vector3(23.2, -3.5, 0.2),
      size: [10.6, 2.4] as [number, number],
      stage: 3,
      phase: 1.4,
    },
    {
      id: 'sub_save',
      type: 'branch-line',
      title: "Save '#export.csv' (Disk Stream)",
      barColor: '#22c55e', // Green
      pos: new THREE.Vector3(23.2, -7.0, 0.2),
      size: [10.6, 2.4] as [number, number],
      stage: 3,
      phase: 1.8,
    },
  ]

  threeNodes.length = 0
  treeNodesConfig.forEach((cfg) => {
    let tex: THREE.CanvasTexture
    if (cfg.type === 'root-pill') {
      tex = createRootPillTexture(cfg.title, cfg.sub || '', isDark)
    } else {
      tex = createMinimalBranchTexture(cfg.title, cfg.barColor, isDark)
    }

    const geo = new THREE.PlaneGeometry(cfg.size[0], cfg.size[1])
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.copy(cfg.pos)
    treeGroup!.add(mesh)

    threeNodes.push({
      mesh,
      stage: cfg.stage,
      id: cfg.id,
      basePos: cfg.pos.clone(),
      size: cfg.size,
      phase: cfg.phase,
    })
  })

  buildTreeEdges()

  // --------------------------------------------------
  // E. ATMOSPHERIC BIOLUMINESCENT DUST
  // --------------------------------------------------
  const dustCount = 42
  const dustPositions = new Float32Array(dustCount * 3)
  const dustColors = new Float32Array(dustCount * 3)
  const cyanColor = new THREE.Color(0x7df9ff)
  const amberColor = new THREE.Color(0xffaa33)

  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 44 + 8
    dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 24
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 24

    const c = i % 2 === 0 ? cyanColor : amberColor
    dustColors[i * 3] = c.r
    dustColors[i * 3 + 1] = c.g
    dustColors[i * 3 + 2] = c.b
  }

  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3))

  const dotTex = createCircleDotTexture('#ffffff')
  const dustMat = new THREE.PointsMaterial({
    size: 0.32,
    map: dotTex,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    opacity: isDark ? 0.60 : 0.35,
    depthWrite: false,
  })
  dustGroup = new THREE.Points(dustGeo, dustMat)
  rootGroup.add(dustGroup)

  updateCameraProjection()
  updateStageGrowth()
}

// ----------------------------------------------------
// Rebuild Tree Bezier Curved Branches (Matching Reference Image Exact Splitting Geometry)
// ----------------------------------------------------
function buildTreeEdges() {
  if (!treeGroup) return

  treeBranchMeshes.forEach((m) => {
    treeGroup!.remove(m)
    m.geometry.dispose()
    ;(m.material as THREE.Material).dispose()
  })
  treeBranchMeshes.length = 0

  treeComets.forEach((c) => {
    treeGroup!.remove(c.mesh)
    c.mesh.geometry.dispose()
    ;(c.mesh.material as THREE.Material).dispose()
  })
  treeComets.length = 0

  // Geometric coordinates of branch connection points:
  // Root right edge: (5.3, 0.0, 0.3)
  // Branch Web: start at (6.5, 4.0, 0.2), end at (16.7, 4.0, 0.2)
  // Branch Desktop: start at (6.5, -4.0, 0.2), end at (16.7, -4.0, 0.2)
  // Sub-branches start at x = 17.9
  const edgesConfig = [
    // 1. Root to Branch Web (S-curve up)
    {
      fromId: 'root',
      toId: 'branch_web',
      p1: new THREE.Vector3(5.3, 0.0, 0.3),
      p2: new THREE.Vector3(6.5, 4.0, 0.2),
      c1: new THREE.Vector3(5.9, 0.0, 0.25),
      c2: new THREE.Vector3(5.9, 4.0, 0.2),
      stage: 2,
      color: 0xf97316,
    },
    // 2. Root to Branch Desktop (S-curve down)
    {
      fromId: 'root',
      toId: 'branch_desktop',
      p1: new THREE.Vector3(5.3, 0.0, 0.3),
      p2: new THREE.Vector3(6.5, -4.0, 0.2),
      c1: new THREE.Vector3(5.9, 0.0, 0.25),
      c2: new THREE.Vector3(5.9, -4.0, 0.2),
      stage: 3,
      color: 0x22c55e,
    },

    // 3. Branch Web to Sub-branches (3 child lines, exact Mind Map geometry)
    {
      fromId: 'branch_web',
      toId: 'sub_yolo',
      p1: new THREE.Vector3(16.7, 4.0, 0.2),
      p2: new THREE.Vector3(17.9, 7.0, 0.2),
      c1: new THREE.Vector3(17.3, 4.0, 0.2),
      c2: new THREE.Vector3(17.3, 7.0, 0.2),
      stage: 2,
      color: 0xf97316,
    },
    {
      fromId: 'branch_web',
      toId: 'sub_shared_click',
      p1: new THREE.Vector3(16.7, 4.0, 0.2),
      p2: new THREE.Vector3(17.9, 3.5, 0.2),
      c1: new THREE.Vector3(17.3, 4.0, 0.2),
      c2: new THREE.Vector3(17.3, 3.5, 0.2),
      stage: 2,
      color: 0x10b981,
    },
    {
      fromId: 'branch_web',
      toId: 'sub_type',
      p1: new THREE.Vector3(16.7, 4.0, 0.2),
      p2: new THREE.Vector3(17.9, 0.0, 0.2),
      c1: new THREE.Vector3(17.3, 4.0, 0.2),
      c2: new THREE.Vector3(17.3, 0.0, 0.2),
      stage: 2,
      color: 0xf97316,
    },

    // 4. Branch Desktop to Sub-branches + SHARED Connection back up to Click node!
    {
      fromId: 'branch_desktop',
      toId: 'sub_shared_click',
      p1: new THREE.Vector3(16.7, -4.0, 0.2),
      p2: new THREE.Vector3(17.9, 3.5, 0.2),
      c1: new THREE.Vector3(17.0, -4.0, 0.2),
      c2: new THREE.Vector3(17.2, 3.5, 0.2),
      stage: 3,
      color: 0x10b981,
      isShared: true,
    },
    {
      fromId: 'branch_desktop',
      toId: 'sub_select',
      p1: new THREE.Vector3(16.7, -4.0, 0.2),
      p2: new THREE.Vector3(17.9, -3.5, 0.2),
      c1: new THREE.Vector3(17.3, -4.0, 0.2),
      c2: new THREE.Vector3(17.3, -3.5, 0.2),
      stage: 3,
      color: 0x22c55e,
    },
    {
      fromId: 'branch_desktop',
      toId: 'sub_save',
      p1: new THREE.Vector3(16.7, -4.0, 0.2),
      p2: new THREE.Vector3(17.9, -7.0, 0.2),
      c1: new THREE.Vector3(17.3, -4.0, 0.2),
      c2: new THREE.Vector3(17.3, -7.0, 0.2),
      stage: 3,
      color: 0x22c55e,
    },
  ]

  const isDark = themeStore.resolvedTheme === 'dark'
  const activeEdges = edgesConfig.filter((e) => currentStage.value === 4 || e.stage <= currentStage.value)
  const sphereGeo = new THREE.SphereGeometry(1, 8, 8)
  const cometMat = new THREE.MeshBasicMaterial({ color: 0xffffff })

  activeEdges.forEach((e, idx) => {
    const curve = new THREE.CubicBezierCurve3(e.p1, e.c1, e.c2, e.p2)
    const lineColor = isDark ? (e.isShared ? 0x10b981 : 0x7df9ff) : (e.isShared ? 0x059669 : 0x334155)
    const radius = e.isShared ? 0.080 : 0.060

    const tubeGeo = new THREE.TubeGeometry(curve, 32, radius, 8, false)
    const tubeMat = new THREE.MeshBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: isDark ? 0.90 : 0.80,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    })
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat)
    treeGroup!.add(tubeMesh)
    treeBranchMeshes.push(tubeMesh)

    // Junction dot at branching fork
    const dotGeo = new THREE.SphereGeometry(0.14, 14, 14)
    const dotMat = new THREE.MeshBasicMaterial({
      color: lineColor,
      depthWrite: false,
    })
    const dotMesh = new THREE.Mesh(dotGeo, dotMat)
    dotMesh.position.copy(e.p1)
    treeGroup!.add(dotMesh)
    treeBranchMeshes.push(dotMesh)

    // Luminous Action Potential Comet traveling along the curve
    const cometMesh = new THREE.Mesh(sphereGeo, cometMat)
    cometMesh.scale.setScalar(e.isShared ? 0.17 : 0.13)
    treeGroup!.add(cometMesh)

    treeComets.push({
      mesh: cometMesh,
      start: e.p1,
      end: e.p2,
      speed: 0.012 + (idx % 3) * 0.004,
      progress: (idx * 0.22) % 1,
      stage: e.stage,
    })
  })
}

function refreshAllTextures() {
  const isDark = themeStore.resolvedTheme === 'dark'

  threeNodes.forEach((n) => {
    let tex: THREE.CanvasTexture
    if (n.id === 'root') {
      tex = createRootPillTexture('MEGAMIND ROOT', 'Hierarchical Memory Core', isDark)
    } else if (n.id === 'branch_web') {
      tex = createMinimalBranchTexture('Big Tree: Web Automation Flow', '#f97316', isDark)
    } else if (n.id === 'branch_desktop') {
      tex = createMinimalBranchTexture('Big Tree: Desktop Report Sync', '#22c55e', isDark)
    } else if (n.id === 'sub_yolo') {
      tex = createMinimalBranchTexture('UI Vision Anchors (YOLOv8n 6.3MB)', '#f97316', isDark)
    } else if (n.id === 'sub_shared_click') {
      tex = createMinimalBranchTexture("Click '#login-btn' (Shared · Ref: 2)", '#10b981', isDark)
    } else if (n.id === 'sub_type') {
      tex = createMinimalBranchTexture("Type '#password' (Keystroke Token)", '#f97316', isDark)
    } else if (n.id === 'sub_select') {
      tex = createMinimalBranchTexture("Select '#date-filter' (UI Dropdown)", '#22c55e', isDark)
    } else if (n.id === 'sub_save') {
      tex = createMinimalBranchTexture("Save '#export.csv' (Disk Stream)", '#22c55e', isDark)
    } else {
      tex = createMinimalBranchTexture(n.id, '#7df9ff', isDark)
    }

    ;(n.mesh.material as THREE.MeshBasicMaterial).map = tex
    ;(n.mesh.material as THREE.MeshBasicMaterial).needsUpdate = true
  })

  buildTreeEdges()
}

function updateStageGrowth() {
  const stage = currentStage.value

  targetBrainScale =
    stage === 1 ? 0.94 :
    stage === 2 ? 1.08 :
    stage === 3 ? 1.25 :
    1.18

  threeNodes.forEach((n) => {
    n.mesh.visible = stage === 4 || n.stage <= stage
  })

  proceduralAxons.forEach((a) => {
    const isVisible = stage === 4 ? a.isMaster || a.stage <= 2 : a.stage <= stage
    a.mesh.visible = isVisible
  })

  proceduralComets.forEach((c) => {
    c.mesh.visible = stage === 4 || c.stage <= stage
  })

  buildTreeEdges()
}

// ----------------------------------------------------
// Animation Render Loop
// ----------------------------------------------------
function renderFrame() {
  if (!renderer || !scene || !camera || !rootGroup) return

  pulseClock += 0.024

  // Parallax Lerp
  currentRotY += (targetRotY - currentRotY) * 0.05
  currentRotX += (targetRotX - currentRotX) * 0.04
  currentCamX += (targetCamX - currentCamX) * 0.04
  currentCamY += (targetCamY - currentCamY) * 0.04

  rootGroup.rotation.y = currentRotY
  rootGroup.rotation.x = currentRotX
  camera.position.x = baseCamX + currentCamX
  camera.position.y = baseCamY + currentCamY
  camera.position.z = baseCamZ
  camera.lookAt(baseCamX, baseCamY, 0)

  // Brain Physical Growth & Leftward Adaptive Shift (Never overlaps root pill)
  currentBrainScale += (targetBrainScale - currentBrainScale) * 0.04
  if (brainMeshGroup) {
    brainMeshGroup.scale.setScalar(currentBrainScale)
    // As head grows larger, translate leftwards so the right edge stays securely separated from MEGAMIND ROOT
    const targetHeadX = -7.5 - (currentBrainScale - 0.94) * 6.5
    brainMeshGroup.position.x += (targetHeadX - brainMeshGroup.position.x) * 0.08
    brainMeshGroup.position.y = 0.0 + Math.sin(pulseClock * 1.2) * 0.08

    if (brainToRootCurve) {
      const hubX = brainMeshGroup.position.x + 4.41 * currentBrainScale
      const hubY = brainMeshGroup.position.y + 3.14 * currentBrainScale
      brainToRootCurve.v0.set(hubX, hubY, 0.25)
    }
  }

  // Smooth Organic Breathing Levitation on Tree Nodes
  threeNodes.forEach((n) => {
    if (n.mesh.visible) {
      n.mesh.position.y = n.basePos.y + Math.sin(pulseClock * 1.6 + n.phase) * 0.04
    }
  })

  // Sprouting Neurons
  const stage = currentStage.value
  proceduralNeurons.forEach((n, idx) => {
    const isAlive = stage === 4 ? n.stage <= 2 || [18, 19, 21, 25].includes(n.id) : n.stage <= stage
    const targetScale = isAlive ? n.baseScale : 0
    n.currentScale += (targetScale - n.currentScale) * 0.08

    if (n.currentScale > 0.05) {
      n.sprite.visible = true
      const pulse = 1.0 + Math.sin(pulseClock * 2.8 + idx * 0.8) * 0.18
      n.sprite.scale.setScalar(n.currentScale * pulse)
    } else {
      n.sprite.visible = false
    }
  })

  // Axon scale
  proceduralAxons.forEach((a) => {
    if (a.mesh.visible) {
      a.mesh.scale.x += (1.0 - a.mesh.scale.x) * 0.06
      a.mesh.scale.y += (1.0 - a.mesh.scale.y) * 0.06
      a.mesh.scale.z += (1.0 - a.mesh.scale.z) * 0.06
    }
  })

  // Brain Comets
  proceduralComets.forEach((c) => {
    if (!c.mesh.visible) return
    c.progress = (c.progress + c.speed) % 1
    c.mesh.position.lerpVectors(c.start, c.end, c.progress)
  })

  // Tree Comets
  treeComets.forEach((c) => {
    c.progress = (c.progress + c.speed) % 1
    c.mesh.position.lerpVectors(c.start, c.end, c.progress)
  })

  // Brain to Root Signal Comet
  if (brainToRootComet && brainToRootCurve) {
    const bProgress = (pulseClock * 0.4) % 1
    const pt = brainToRootCurve.getPoint(bProgress)
    brainToRootComet.position.copy(pt)
  }

  // Dust Particle Float
  if (dustGroup) {
    const positions = (dustGroup.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
    for (let i = 0; i < positions.length / 3; i++) {
      positions[i * 3 + 1] += 0.010
      if (positions[i * 3 + 1] > 10) {
        positions[i * 3 + 1] = -10
      }
    }
    dustGroup.geometry.attributes.position.needsUpdate = true
  }

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(renderFrame)
}

function updateCameraProjection() {
  if (!camera || !renderer || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const width = rect.width || 800
  const height = rect.height || 500
  const aspect = width / height

  camera.aspect = aspect
  camera.fov = 36

  // Fit horizontal span (-15.0 to +28.5 = 43.5 units) and vertical span (16.4 units) with clean framing
  const targetWidth = 43.5
  const targetHeight = 17.5
  const fovRad = (camera.fov * Math.PI) / 180
  const tanHalfFov = Math.tan(fovRad / 2)

  const distForHeight = (targetHeight / 2) / tanHalfFov
  const distForWidth = (targetWidth / 2) / (tanHalfFov * aspect)
  baseCamZ = Math.max(distForHeight, distForWidth)

  camera.position.z = baseCamZ
  camera.position.x = baseCamX
  camera.position.y = baseCamY
  camera.lookAt(baseCamX, baseCamY, 0)
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
}

function handleResize() {
  updateCameraProjection()
}

onMounted(() => {
  initThree()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  startAutoPlay()
  animationFrameId = requestAnimationFrame(renderFrame)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  clearInterval(autoPlayTimer)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div ref="containerRef" class="futuristic-3d-stage">
    <canvas ref="canvasRef" class="futuristic-3d-canvas"></canvas>
  </div>
</template>

<style scoped>
.futuristic-3d-stage {
  position: relative;
  width: 100%;
  height: clamp(375px, 44vh, 480px);
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

@media (max-width: 1080px) {
  .futuristic-3d-stage {
    height: clamp(340px, 44vh, 440px);
  }
}

@media (max-width: 600px) {
  .futuristic-3d-stage {
    height: 300px;
  }
}

.futuristic-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
  pointer-events: auto;
}
</style>
