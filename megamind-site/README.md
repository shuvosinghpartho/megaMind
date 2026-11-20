# MEGAMIND — Official Landing Website & WebApp

A production-grade, native-app-styled landing website and interactive system visualizer for **MEGAMIND**: *A Bio-Inspired Memory-Augmented Continual Learning System with Dynamic Category Growth* (Thesis project, 2026).

---

## 🚀 Key Features

- **App-Like Native Experience**:
  - **Animated Splash Screen**: SVG stroke-dash tree animation with real staged booting states, progress tracking, and `<kbd>Esc</kbd>` / click skip.
  - **Command Palette (`Ctrl/Cmd + K`)**: Instant keyboard-driven navigation across all sections, repository links, and dark/light theme toggling.
  - **Adaptive Theme System**: Real-time Dark and Light themes with an inline no-flash bootloader script in `index.html`.
  - **Mobile Dock**: App-styled bottom navigation bar with safe-area spacing.

- **3D Living Memory Visualization**:
  - **Three.js Tree-Graph Scene**: Central Parent Tree with branching Big Trees, Small Tree leaf nodes, outward growth animation, mouse parallax, periodic skill-reuse pulsing, and dynamic theme synchronization.
  - **Zero-Layout-Shift 2D SVG Fallback**: Automatically switches for devices without WebGL or when `prefers-reduced-motion` is active.
  - **Dynamic Code-Splitting**: Three.js bundle is lazy-loaded asynchronously (`~71kB` initial Home chunk).

- **Interactive System Simulations**:
  - **Memory Playground**: Interactive graph demonstrating Big Trees referencing shared Small Trees, real-time reference counting badges, adding/removing compound tasks, time decay weakening edge weights, and automatic garbage collection when `ref_count = 0`.
  - **Growth-Check Gate Simulator**: Action token stream entering Short-Term Memory with live adjustable sliders (`min_repetitions`, `cohesion_threshold`, `min_relevant_ratio`, `time_window`) and live Promoted/Held/Discarded counters.
  - **Task-Relevant Perception Demo**: Mock application UI with labeled bounding boxes (`button`, `icon`, confidence: `n/a`) and a "Shift UI Layout" toggle demonstrating layout robustness.

- **Scientific Transparency & Honesty**:
  - Clearly marked badges (`Conceptual`, `Simulated demo`, `Planned`, `Target scenario`) for unmeasured design targets.
  - Zero fabricated benchmark numbers or fake logos.
  - Full Phase 1 developer guide with one-click terminal commands (clone, train YOLOv8n, ONNX export).
  - Open research questions accordion and copyable BibTeX citation.

---

## 📁 Project Architecture

```
megamind-site/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── config/
│   │   └── site.config.ts        # Repo URLs, contact email, release states, deep links
│   ├── content/
│   │   └── megamind.ts           # Single source of truth for facts, pillars, roadmap, metrics
│   ├── composables/
│   │   ├── useOS.ts              # OS detection (macOS, Windows, Linux)
│   │   ├── useReducedMotion.ts   # Accessibility media query listener
│   │   ├── useScrollSections.ts  # Active section intersection tracking
│   │   └── useWebGL.ts           # WebGL capability detection
│   ├── stores/
│   │   ├── theme.ts              # Pinia theme persistence (dark / light / system)
│   │   ├── splash.ts             # Splash screen session state
│   │   ├── commandPalette.ts     # Command palette open/toggle state
│   │   └── toast.ts              # Non-intrusive toast notifications
│   ├── styles/
│   │   ├── tokens.css            # CSS custom properties design tokens
│   │   └── base.css              # Global styles, scrollbars, focus-visible
│   ├── components/
│   │   ├── shell/                # AppHeader, MobileDock, CommandPalette, SplashScreen, Toast
│   │   ├── three/                # MemoryTreeScene.vue, Fallback2D.vue
│   │   ├── ui/                   # Badge, Button, StatusChip, Card, Accordion, Slider
│   │   └── sections/
│   │       ├── Hero.vue          # Living 3D background & CTAs
│   │       ├── Problem.vue       # 3 bottlenecks + conceptual retention curve
│   │       ├── Pipeline.vue      # 8-stage interactive architecture flow
│   │       ├── Architecture.vue  # 6-module interactive inspector
│   │       ├── MemoryPlayground.vue # Draggable ontology & GC simulation
│   │       ├── GrowthGate.vue    # Hyperparameter & token gate simulator
│   │       ├── PerceptionDemo.vue # Layout shift & YOLO box tracker
│   │       ├── Compare.vue       # Qualitative paradigm comparison table
│   │       ├── UseCases.vue      # 5 target real-world scenarios
│   │       ├── Integration.vue   # Local-first, ONNX, and pilot contact form
│   │       ├── Roadmap.vue       # 3 phases, 8 steps, pulsing "We are here"
│   │       ├── Evaluation.vue    # Planned empirical metrics table
│   │       ├── GetMegamind.vue   # Waitlist & Phase 1 CLI commands
│   │       ├── Research.vue      # 7 open research questions
│   │       ├── Faq.vue           # 4 core architectural FAQ items
│   │       ├── Contribute.vue    # Contribution guide & BibTeX copy
│   │       └── Footer.vue        # Navigation, license & back-to-top
│   ├── views/
│   │   ├── HomeView.vue          # Master assembled page
│   │   └── NotFoundView.vue      # Styled 404 page
│   ├── router.ts                 # Vue Router configuration
│   ├── App.vue                   # Root shell wrapper
│   └── main.ts                   # App entrypoint
├── index.html                    # SEO tags, JSON-LD, no-flash theme bootloader
├── vite.config.ts                # Vite config with @tailwindcss/vite & aliases
└── package.json
```

---

## 🛠️ Quickstart

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Install Dependencies
```bash
cd megamind-site
npm install
```

### 2. Start Local Development Server
```bash
# Using convenient shortcut scripts:
./start.sh      # Starts dev server in background at http://localhost:5173
./stop.sh       # Stops the running dev server

# Or standard npm commands:
npm run dev     # Foreground interactive mode
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized static distribution in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Updating Content & Releases

- **Updating Project Facts or Roadmap**: Edit `src/content/megamind.ts`. All section copy, pipeline stages, roadmap status chips, and FAQ answers will update automatically.
- **Publishing a Native Release**: Open `src/config/site.config.ts` and add a release object to `releases: [...]`. The `GetMegamind` section will automatically switch from the waitlist state to the multi-platform download button with OS detection!
- **Connecting Pilot Form / Waitlist**: Set `waitlistEndpoint` in `src/config/site.config.ts`. If left empty, it safely falls back to a pre-filled `mailto:` client link.

---

## 📜 Academic Citation

```bibtex
@misc{megamind2026,
  author       = {Methun},
  title        = {MEGAMIND: A Bio-Inspired Memory-Augmented Continual Learning System with Dynamic Category Growth},
  year         = {2026},
  howpublished = {\url{https://github.com/methun404/MegaMind}},
  note         = {Thesis project, work in progress}
}
```
