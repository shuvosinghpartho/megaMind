<script setup lang="ts">
import Hero from '@/components/sections/Hero.vue'
import TechTicker from '@/components/sections/TechTicker.vue'
import InteractiveConsole from '@/components/sections/InteractiveConsole.vue'
import BentoFeatures from '@/components/sections/BentoFeatures.vue'
import LayersSection from '@/components/sections/LayersSection.vue'
import BenchmarkMatrix from '@/components/sections/BenchmarkMatrix.vue'
import DeveloperSuite from '@/components/sections/DeveloperSuite.vue'
import RoadmapSection from '@/components/sections/RoadmapSection.vue'
import DownloadHub from '@/components/sections/DownloadHub.vue'
import FaqAndCite from '@/components/sections/FaqAndCite.vue'
import Footer from '@/components/sections/Footer.vue'
</script>

<template>
  <div class="home-page">
    <!-- 1. Hero Section (with 3D Brain Scene & Live Telemetry) -->
    <Hero />

    <!-- 2. Tech Credentials Ticker -->
    <TechTicker />

    <!-- 3. Interactive Engine Simulation Studio (Perception, Tree-Graph, Growth Gate) -->
    <InteractiveConsole />

    <!-- 4. Core Breakthroughs Bento Grid -->
    <BentoFeatures />

    <!-- 5. The 6 Engine Architecture Layers -->
    <LayersSection />

    <!-- 6. Measured Performance & Benchmark Comparison -->
    <BenchmarkMatrix />

    <!-- 7. Developer Experience Terminal & SDK -->
    <DeveloperSuite />

    <!-- 8. Development Roadmap & Research Phases -->
    <RoadmapSection />

    <!-- 9. Official App Download Hub (Get MegaMind) -->
    <DownloadHub />

    <!-- 10. FAQ & Academic Citation -->
    <FaqAndCite />

    <!-- 11. Minimal Footer -->
    <Footer />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
