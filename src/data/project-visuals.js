// What each chapter shows: an authentic capture, the small renderer images, or an illustration.
export const visuals = {
  translater: {
    entry: { image: "translater", source: "Translater · language, tone and reply context." },
    refine: { demo: "translater" },
  },
  "kaltoe-timer": {
    popover: { image: "kaltoe", source: "Kaltoe Timer · macOS popover · sample data." },
    phases: { demo: "kaltoe" },
    label: {
      custom: "label",
      source: "Official ring and track label images, shown at their natural proportions.",
    },
    linux: {
      custom: "linux",
      source: "KDE tray renderer examples from the public repository · synthetic data.",
    },
  },
  "3i": {
    beamo: { demo: "beamo" },
    live: { demo: "meet", capture: "pivo-recording" },
    library: { demo: "cloud", capture: "pivo-cloud-current" },
    coaches: { demo: "coaches", capture: "pivo-coaches-current" },
    cs: { demo: "cs", capture: "pivo-cs-current" },
    ax: { illo: "ax" },
  },
  enhans: {
    act: { demo: "enhansAct" },
    workflow: { demo: "enhansWorkflow" },
    compare: { demo: "enhansCompare" },
    recorder: { demo: "enhansRecorder" },
  },
  rubiwin: {
    rubiwin: { image: "rubiwin-auction", source: "Rubiwin support · product reference" },
    pricing: { image: "rubiwin-pricing", source: "Rubiwin support · product reference · CSV upload detail" },
    supplier: { illo: "logistics" },
  },
  neoharness: {
    turn: { demo: "neoharness" },
    memory: { illo: "neoharness", glyph: "memory" },
    tools: { illo: "neoharness", glyph: "build" },
    schedules: { illo: "neoharness", glyph: "clock" },
    reliability: { illo: "neoharness", glyph: "shield" },
  },
  gleamstral: { request: { demo: "gleamstral" }, interface: { illo: "gleamstral" } },
}

// Resolve the existing portrait catalog ID when Astro renders a standalone demo.
export const demoPortraitItems = {}
for (const [project, chapters] of Object.entries(visuals)) {
  for (const [chapter, visual] of Object.entries(chapters)) {
    if (visual.demo) demoPortraitItems[visual.demo] = `demo:${project}/${chapter}`
  }
}
