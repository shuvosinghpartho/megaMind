<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="container">
      <h1>404</h1>
      <p>Page not found.</p>
      <button class="btn" @click="router.push('/')">Go Home</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60dvh;
}

.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
}

h1 {
  font-size: 6rem;
  font-weight: 800;
  color: var(--accent-prune);
}

p { color: var(--muted); font-size: 1.1rem; }

.btn {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--text);
  border: 1px solid var(--border);
  font-size: .95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--dur-fast);
}

.btn:hover { background: var(--surface); }
</style>
