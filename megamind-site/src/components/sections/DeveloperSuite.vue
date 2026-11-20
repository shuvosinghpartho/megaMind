<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const activeTab = ref<'quickstart' | 'train' | 'api' | 'onnx'>('quickstart')

const snippets = {
  quickstart: {
    lang: 'bash',
    filename: 'terminal.sh',
    code: `# 1. Install MegaMind core engine via pip
pip install megamind-agent

# 2. Launch the background daemon watching screen recordings
megamind daemon start --video-source=screen_stream --output=skill_tree.json

# 3. Trigger execution of any consolidated task
megamind run "export_monthly_report" --target-app="Chrome"`,
  },
  train: {
    lang: 'python',
    filename: 'train_yolo.py',
    code: `from ultralytics import YOLO

# Load the nano base model (~6.3 MB)
model = YOLO('yolov8n.pt')

# Train on UI affordances dataset (button & icon classes)
results = model.train(
    data='data/data.yaml',
    epochs=100,
    imgsz=640,
    device='mps', # Metal Acceleration on Apple Silicon / 'cuda'
    project='megamind_perception',
    name='v1_cortex'
)`,
  },
  api: {
    lang: 'python',
    filename: 'skill_graph.py',
    code: `from megamind.core import TreeGraphOntology, ActionCluster

# Initialize on-device skill ontology
ontology = TreeGraphOntology(storage_path="~/.megamind/memory.db")

# Link reusable atomic Small Tree into a new Big Tree
login_skill = ontology.get_or_create_small_tree("oauth_login")
login_skill.increment_ref()

new_task = ontology.create_big_tree(
    name="generate_quarterly_pdf",
    context="desktop",
    sequence=[login_skill, "fill_filter_form", "click_export"]
)

print(f"Skill tree created! Total nodes: {ontology.total_nodes}")`,
  },
  onnx: {
    lang: 'bash',
    filename: 'export_edge.sh',
    code: `# Export trained PyTorch weights to optimized Edge ONNX
yolo export model=runs/detect/v1_cortex/weights/best.pt format=onnx simplify=True

# Benchmark sub-millisecond edge latency
python -m megamind.benchmark --model best.onnx --runtime onnxruntime-gpu`,
  },
}

function copyActiveCode() {
  const code = snippets[activeTab.value].code
  navigator.clipboard.writeText(code)
  toastStore.show('Copied code to clipboard!', 'info')
}
</script>

<template>
  <section id="developer" class="section-container dev-section">
    <!-- Header: Centered Alignment -->
    <div class="section-header text-center">
      <div class="console-badge">
        <span class="badge-dot"></span>
        <span>05 · DEVELOPER EXPERIENCE & SDK</span>
      </div>
      <h2 class="section-title">
        Designed for Developers. <br />
        <span class="amber">Plug into Python, ONNX & Edge CLI.</span>
      </h2>
      <p class="section-desc">
        Integrate MegaMind's visual perception and tree-graph memory directly into your automated pipelines, desktop agents, or local scripts.
      </p>
    </div>

    <!-- Terminal Box (Hallmark Hairline Panel) -->
    <div class="terminal-card">
      <!-- Terminal Header -->
      <div class="terminal-top">
        <div class="top-left">
          <div class="window-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="seg font-mono">
            <button
              :class="{ active: activeTab === 'quickstart' }"
              @click="activeTab = 'quickstart'"
            >
              quickstart.sh
            </button>
            <button
              :class="{ active: activeTab === 'train' }"
              @click="activeTab = 'train'"
            >
              train_yolo.py
            </button>
            <button
              :class="{ active: activeTab === 'api' }"
              @click="activeTab = 'api'"
            >
              skill_graph.py
            </button>
            <button
              :class="{ active: activeTab === 'onnx' }"
              @click="activeTab = 'onnx'"
            >
              export_edge.sh
            </button>
          </div>
        </div>

        <button class="btn btn--amber btn--nav font-mono" @click="copyActiveCode">
          <span class="copy-icon">📋</span>
          <span>Copy Snippet</span>
        </button>
      </div>

      <!-- Terminal Body -->
      <div class="terminal-body">
        <pre class="code-editor font-mono"><code>{{ snippets[activeTab].code }}<span class="blinking-cursor">▋</span></code></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dev-section {
  position: relative;
  z-index: 2;
}

.terminal-card {
  border-radius: var(--radius-card);
  overflow: hidden;
  border: var(--rule-hair) solid var(--color-rule);
  background: var(--color-paper-3);
  box-shadow: 0 4px 20px -8px rgba(0, 0, 0, 0.15);
  transition: transform var(--dur-short) var(--ease-out), border-color var(--dur-short) var(--ease-out), box-shadow var(--dur-short) var(--ease-out);
}

.terminal-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in oklch, var(--color-cool) 60%, var(--color-rule-2));
  box-shadow: 0 12px 32px -10px color-mix(in oklch, var(--color-cool) 20%, transparent);
}

.terminal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--color-paper-2);
  border-bottom: var(--rule-hair) solid var(--color-rule);
  flex-wrap: wrap;
  gap: 12px;
}

.top-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.window-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  transition: transform var(--dur-short) var(--ease-out), filter var(--dur-short) var(--ease-out);
}

.dot.red { background: var(--color-bad); }
.dot.yellow { background: var(--color-accent); }
.dot.green { background: var(--color-ok); }

.terminal-card:hover .dot {
  transform: scale(1.1);
  filter: drop-shadow(0 0 3px currentColor);
}

.seg {
  display: inline-flex;
  gap: var(--rule-hair);
  background: var(--color-rule);
  border: var(--rule-hair) solid var(--color-rule);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.seg button {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  border: 0;
  background: var(--color-paper-2);
  color: var(--color-ink-2);
  font-family: var(--font-outlier);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: all var(--dur-short);
}

.seg button:hover {
  background: var(--color-paper-3);
  color: var(--color-ink);
}

.seg button.active {
  background: var(--color-paper-3);
  color: var(--color-cool);
  box-shadow: inset 0 -2px 0 var(--color-cool);
  font-weight: 600;
}

.copy-icon {
  margin-right: 4px;
}

.terminal-body {
  padding: var(--space-lg);
  overflow-x: auto;
}

.code-editor {
  margin: 0;
  font-family: var(--font-outlier);
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--color-cool);
  white-space: pre;
  animation: code-fade-in 0.25s ease-out;
}

@keyframes code-fade-in {
  from {
    opacity: 0.65;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blinking-cursor {
  display: inline-block;
  margin-left: 4px;
  color: var(--color-cool);
  animation: cursor-blink 1.06s infinite;
}

@keyframes cursor-blink {
  0%, 49% {
    opacity: 1;
  }
  50%, 100% {
    opacity: 0;
  }
}
</style>
