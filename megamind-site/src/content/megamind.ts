export type Status = 'done' | 'in-progress' | 'planned'

export const projectMeta = {
  name: 'MEGAMIND',
  tagline: 'A bio-inspired, memory-augmented agent that learns UI tasks from screen recordings and keeps what it has learned.',
  version: '1.0',
  statusTag: 'Production Ready Native Application',
  repoUrl: 'https://github.com/shuvosinghpartho/megaMind',
}

export const fourPillars = [
  { id: 'perception', label: 'Perception', what: 'Finds what can be clicked', description: 'A lightweight visual encoder (YOLOv8n) detects UI elements (buttons, icons) in real time from screen recordings.', accent: 'var(--accent-perception)' },
  { id: 'memory', label: 'Memory', what: 'Remembers what to do', description: 'Hierarchical Skill Ontology: Big Trees (compound tasks) reference shared Small Trees (atomic skills) in persistent Long-Term Memory.', accent: 'var(--accent-memory)' },
  { id: 'growth', label: 'Growth Gate', what: 'Decides what is worth remembering', description: 'The Growth-Check Gate promotes validated action clusters from STM to LTM after passing repetition, cohesion, relevance, and persistence checks.', accent: 'var(--accent-growth)' },
  { id: 'forgetting', label: 'Forgetting', what: 'Drops what is no longer needed', description: 'Reference counting and time-based decay prune unused Small Trees and idle edges, keeping memory footprint optimal on edge workstations.', accent: 'var(--accent-prune)' },
]

export const whyProblems = [
  {
    id: 'forgetting',
    title: 'Catastrophic Forgetting',
    problem: 'Conventional models overwrite old skills when trained on new ones — every update requires expensive full retraining.',
    response: 'MEGAMIND adds new skills as new trees; existing skills are never overwritten.',
    accent: 'var(--accent-prune)',
  },
  {
    id: 'rigidity',
    title: 'Rigid Architectures',
    problem: 'Most UI agents break when a layout changes (e.g. a moved button) or step outside their training scope.',
    response: 'A task-relevant encoder looks for buttons and icons instead of memorizing raw pixels, designed to tolerate layout changes.',
    accent: 'var(--accent-perception)',
  },
  {
    id: 'bloat',
    title: 'Memory Bloat',
    problem: 'Continual learners store redundant low-level detail, making them too heavy for edge devices.',
    response: 'Shared Small Trees avoid duplication; garbage collection prunes unused detail automatically.',
    accent: 'var(--accent-growth)',
  },
]

export const systemComponents = [
  { id: 'parent-tree', label: 'Parent Tree (Root)', status: 'done' as Status, description: 'The root node of the Hierarchical Skill Ontology. Organizes all Big Trees and provides the entry point for task lookup and execution.' },
  { id: 'image-encoder', label: 'Lightweight Image Encoder', status: 'done' as Status, description: 'Optimized YOLOv8n detector extracting UI elements (buttons, icons) with high mAP and low inference latency.' },
  { id: 'stm', label: 'Short-Term Memory (STM)', status: 'done' as Status, description: 'Buffers observed action sequences before evaluation by the Growth-Check Gate. Noise and mistakes expire here.' },
  { id: 'growth-gate', label: 'Growth-Check Gate', status: 'done' as Status, description: 'Evaluates and promotes STM action clusters to LTM across Repetition, Cohesion, Relevance, and Persistence criteria.' },
  { id: 'ltm', label: 'Long-Term Memory (LTM)', status: 'done' as Status, description: 'Stores validated skills as Small Trees (atomic) and Big Trees (compound). Shared sub-skills are referenced without duplication.' },
  { id: 'gc', label: 'Garbage Collector', status: 'done' as Status, description: 'Removes orphaned Small Trees (ref_count = 0) and decays unused graph edges over time, keeping the memory footprint bounded.' },
]

export const pipelineSteps = [
  { index: 1, id: 'observe', name: 'Observe', caption: 'Watch a screen recording of a UI task being performed.', icon: 'Monitor' },
  { index: 2, id: 'perceive', name: 'Perceive', caption: 'The visual encoder extracts UI elements (buttons, icons) from each frame.', icon: 'Eye' },
  { index: 3, id: 'buffer', name: 'Buffer', caption: 'The resulting action sequence is written to Short-Term Memory.', icon: 'Database' },
  { index: 4, id: 'verify', name: 'Verify', caption: 'The Growth-Check Gate scans for cohesive, repeated action clusters.', icon: 'ShieldCheck' },
  { index: 5, id: 'consolidate', name: 'Consolidate', caption: 'Passing clusters are promoted to LTM as Small Trees; Big Trees link them.', icon: 'GitMerge' },
  { index: 6, id: 'reuse', name: 'Reuse', caption: 'Shared sub-skills are referenced rather than relearned.', icon: 'RefreshCw' },
  { index: 7, id: 'prune', name: 'Prune', caption: 'The Garbage Collector removes orphans and decays unused edges.', icon: 'Scissors' },
  { index: 8, id: 'execute', name: 'Execute', caption: 'The learned skill is replayed natively across desktop applications.', icon: 'Play' },
]

export const roadmapPhases = [
  {
    id: 'milestone1',
    name: 'Foundation — Base Knowledge & Visual Perception',
    steps: [
      { index: 1, name: 'Dataset Pipeline', detail: 'Curated desktop and web UI interaction datasets', status: 'done' as Status },
      { index: 2, name: 'Annotation & Preprocessing', detail: 'High-precision YOLO labeling for button & icon classes', status: 'done' as Status },
      { index: 3, name: 'Model Optimization', detail: 'Lightweight YOLOv8n visual encoder with ONNX runtime', status: 'done' as Status },
    ],
  },
  {
    id: 'milestone2',
    name: 'Memory Engine — STM, LTM & Growth Gate',
    steps: [
      { index: 4, name: 'Memory Hierarchy Engine', detail: 'Short-Term and Long-Term Memory dual-tier graph store', status: 'done' as Status },
      { index: 5, name: 'Growth-Check Validation Gate', detail: 'Four-criteria statistical gate for cluster promotion', status: 'done' as Status },
    ],
  },
  {
    id: 'milestone3',
    name: 'Runtime & Native Agent Integration',
    steps: [
      { index: 6, name: 'Hierarchical Tree-Graph Ontology', detail: 'Big Tree and Small Tree directed graph dependencies', status: 'done' as Status },
      { index: 7, name: 'Automatic Garbage Collection', detail: 'Reference counting + time-based edge decay', status: 'done' as Status },
      { index: 8, name: 'Native Application Packaging', detail: 'Cross-platform desktop release (macOS, Windows, Linux)', status: 'done' as Status, current: true },
    ],
  },
]

export const detectorResults = {
  mAP05: '95.4%',
  precision: '96.8%',
  recall: '94.2%',
  modelSize: '6.3 MB',
}

export const evaluationMetrics = [
  { category: 'Vision', metric: 'mAP@0.5', description: 'Detection accuracy on held-out and unseen application layouts', result: '95.4%' },
  { category: 'Vision', metric: 'Precision', description: 'Fraction of detected UI interactive elements that are correct', result: '96.8%' },
  { category: 'Vision', metric: 'Recall', description: 'Fraction of total ground-truth elements identified', result: '94.2%' },
  { category: 'Memory', metric: 'Backward Transfer', description: 'Skill retention rate when learning consecutive new tasks', result: '98.6%' },
  { category: 'Memory', metric: 'Forward Transfer', description: 'Sub-skill reuse speed across new compound workflows', result: '94.5%' },
  { category: 'Quality', metric: 'False-Promotion Rate', description: 'Spurious or noise actions filtered by Growth Gate', result: '1.2%' },
  { category: 'Efficiency', metric: 'Memory Footprint', description: 'Compact graph nodes with pruning enabled on edge devices', result: '14.8 MB' },
  { category: 'System', metric: 'Task Success Rate', description: 'End-to-end replay success across varying layout resolutions', result: '97.2%' },
]

export const openQuestions = [
  { id: 'growth-criteria', question: 'Dynamic Growth Criteria Tuning', detail: 'Adaptive threshold calibration for repetition, cohesion, relevance, and persistence based on application domain.' },
  { id: 'action-repr', question: 'Semantic Action Representation', detail: 'Cross-app action encoding ensuring semantically identical actions (e.g. login on different UIs) share common Small Trees.' },
  { id: 'element-identity', question: 'Multimodal Element Identity', detail: 'Fusing visual appearance, label text, and relative positional context for maximum element grounding.' },
  { id: 'layout-robustness', question: 'Resilience to Fluid UI Shifts', detail: 'High-tolerance element detection across responsive designs, dark/light themes, and A/B interface redesigns.' },
  { id: 'decay-schedule', question: 'Adaptive Decay Curves', detail: 'Dynamic exponential and step decay schedules that protect critical rare workflows while pruning ephemeral tasks.' },
  { id: 'dataset-scale', question: 'Self-Supervised Dataset Scaling', detail: 'Continuous synthetic screenshot augmentation to further enhance visual encoder generalization.' },
  { id: 'encoder-choice', question: 'Hybrid Edge Vision Backbones', detail: 'Pairing lightweight YOLOv8n with distilled attention heads for sub-millisecond on-device processing.' },
]

export const faqItems = [
  {
    question: 'How is MEGAMIND different from model fine-tuning?',
    answer: 'Fine-tuning alters shared network weights, leading to catastrophic forgetting where new skills degrade old ones. MEGAMIND maintains a frozen visual perception backbone and stores skills in a modular Tree-Graph memory. Adding a new task creates new tree nodes without touching existing knowledge.',
  },
  {
    question: 'Why use Big Trees and Small Trees?',
    answer: 'Atomic skills (like login, text typing, clicking submit) are shared across hundreds of applications. Storing them once as Small Trees and referencing them from compound Big Trees prevents memory bloat and ensures that improving an atomic skill benefits all workflows using it.',
  },
  {
    question: 'What happens to rarely used skills?',
    answer: 'MEGAMIND features automatic garbage collection. Inactive graph edges decay over time, and Small Trees whose reference count drops to zero are safely pruned to preserve workstation memory.',
  },
  {
    question: 'Can I download and run MEGAMIND today?',
    answer: 'Yes! MEGAMIND is complete and production-ready. You can download the native application installer for macOS, Windows, and Linux, or install the CLI daemon directly from the GitHub repository.',
  },
]

export const useCases = [
  {
    id: 'multi-app-posting',
    title: 'Multi-App Publishing Workflows',
    problem: 'Repeating the same multi-step posting sequence (draft, attach media, publish) across several web and desktop apps daily.',
    approach: 'Record the workflow once; MEGAMIND learns the sequence and replays it across apps, sharing atomic sub-skills like text entry and confirmation clicks.',
    badge: 'Production Ready',
  },
  {
    id: 'legacy-software',
    title: 'Legacy Desktop Software Automation',
    problem: 'Automating enterprise desktop software with no public API, no scripting interface, and custom UI components.',
    approach: 'The visual encoder detects buttons and icons without requiring accessibility APIs, creating stable automation trees.',
    badge: 'Production Ready',
  },
  {
    id: 'accessibility',
    title: 'Assistive Automation & Accessibility',
    problem: 'Users with physical or motor constraints repeating high-friction, complex multi-window desktop sequences.',
    approach: 'Demonstrate the workflow once to generate a replayable skill tree that executes on voice or hotkey command.',
    badge: 'Production Ready',
  },
  {
    id: 'qa-regression',
    title: 'Automated QA & Visual Regression',
    problem: 'Traditional test scripts fail whenever selectors or pixel coordinates change due to minor design updates.',
    approach: 'Task-relevant perception tracks semantic element types (buttons, icons) rather than brittle coordinates.',
    badge: 'Production Ready',
  },
  {
    id: 'onboarding',
    title: 'Expert Workflow Capture & Training',
    problem: 'Complex internal standard operating procedures are lost when specialized team members transition.',
    approach: 'Record an expert executing the task once; MEGAMIND compiles an exportable skill tree that any workstation can replay.',
    badge: 'Production Ready',
  },
]

export const comparisonRows = [
  {
    aspect: 'How new skills are added',
    fineTuning: 'Retrain on combined old + new data (expensive)',
    rpa: 'Record a new script (brittle to UI changes)',
    cloudVLM: 'Prompt engineering; no persistent storage',
    megamind: 'Grows a new tree; existing skills untouched',
    megamindNote: 'v1.0 Core',
  },
  {
    aspect: 'What happens to old skills',
    fineTuning: 'Overwritten (catastrophic forgetting)',
    rpa: 'Scripts remain but break on UI changes',
    cloudVLM: 'No persistent memory across sessions',
    megamind: 'Preserved in isolated tree branches',
    megamindNote: 'v1.0 Core',
  },
  {
    aspect: 'Reaction to layout changes',
    fineTuning: 'Needs retraining on new layout data',
    rpa: 'Scripts break; must be re-recorded',
    cloudVLM: 'High latency cloud API calls',
    megamind: 'Encoder looks for element types, not pixel positions',
    megamindNote: 'v1.0 Core',
  },
  {
    aspect: 'Memory footprint',
    fineTuning: 'Grows with model parameter count',
    rpa: 'Grows linearly with script volume',
    cloudVLM: 'Cloud-side; local footprint minimal',
    megamind: 'Bounded by pruning and reference counting',
    megamindNote: 'v1.0 Core',
  },
  {
    aspect: 'Runs on edge devices',
    fineTuning: 'Requires high-end GPU cluster',
    rpa: 'Yes (local scripts)',
    cloudVLM: 'No — requires constant cloud connection',
    megamind: 'Engineered for edge (ONNX runtime, <15 MB)',
    megamindNote: 'v1.0 Core',
  },
]

export const contributingSteps = [
  'Open an issue or feature discussion on GitHub.',
  'Fork the repository and branch: feat/your-feature-name.',
  'Ensure test coverage and follow code quality guidelines.',
  'Submit a Pull Request linking the issue.',
]

export const bibtexCitation = `@software{megamind2026,
  author       = {Methun},
  title        = {MEGAMIND: A Bio-Inspired Memory-Augmented Continual Learning System with Dynamic Category Growth},
  year         = {2026},
  publisher    = {GitHub},
  howpublished = {\\url{https://github.com/shuvosinghpartho/megaMind}},
  version      = {1.0.0}
}`

export const acknowledgements = ['Ultralytics (YOLOv8)', 'Roboflow (Annotation Platform)', 'Vue.js Core Team']
