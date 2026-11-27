// What each chapter shows: an authentic capture, the small renderer images, or an illustration.
export const visuals = {
  translater: {
    entry: { image: "translater", source: "Translater · language, tone and reply context.", sourceKo: "Translater · 언어와 말투, 답장할 대화의 맥락" },
    refine: { demo: "translater" },
  },
  "kaltoe-timer": {
    popover: { image: "kaltoe", source: "Kaltoe Timer · macOS popover · sample data.", sourceKo: "Kaltoe Timer · macOS 팝오버 · 예시 데이터" },
    phases: { demo: "kaltoe" },
    label: {
      custom: "label",
      source: "Official ring and track label images, shown at their natural proportions.", sourceKo: "공식 저장소의 링과 막대 이미지로, 원본 비율로 표시했습니다.",
    },
    linux: {
      custom: "linux",
      source: "KDE tray renderer examples from the public repository · synthetic data.", sourceKo: "공개 저장소의 KDE 트레이 렌더링 예시 · 예시 데이터",
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
    rubiwin: { image: "rubiwin-auction", source: "Rubiwin support · product reference", sourceKo: "Rubiwin 고객지원 문서 · 제품 화면" },
    pricing: { image: "rubiwin-pricing", source: "Rubiwin support · product reference · CSV upload detail", sourceKo: "Rubiwin 고객지원 문서 · 요율표 CSV 업로드 화면" },
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
