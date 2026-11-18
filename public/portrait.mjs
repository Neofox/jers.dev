// Living portrait: swaps Jérôme's face in reaction to `portrait:trigger` events from portfolio.js,
// docks as a bubble on non-home stages and explains each reaction in the "Why this face?" drawer.
// Only { action, itemId, recent } is ever sent to /api/portrait.
import { createScheduler } from "./portrait-core.mjs"

const HIGH_PRIORITY = ["open_project", "open_demo", "download_resume"]
const ACTIONS = new Set([...HIGH_PRIORITY, "dwell", "reach_end", "idle", "return"])
const MAX_PER_VISIT = 20
const ASIDE_MS = 4000
const SWAP_MS = 260
const IDLE_MS = 45000
const AWAY_MS = 60000
const KEY = { muted: "portrait-muted", count: "portrait-count", idle: "portrait-idle", back: "portrait-return" }
const ALT = {
  neutral: "Jérôme, calm",
  smile: "Jérôme, smiling",
  grin: "Jérôme, grinning",
  proud: "Jérôme, looking proud",
  wince: "Jérôme, wincing",
  laugh: "Jérôme, laughing",
  thinking: "Jérôme, thinking",
  surprised: "Jérôme, surprised",
}
const TRIGGER_WORDS = {
  open_project: (label) => `You opened ${label}`,
  open_demo: (label) => `You opened the ${label} demo`,
  download_resume: () => "You downloaded my résumé",
  dwell: (label) => `You lingered on ${label}`,
  reach_end: () => "You reached the end of my timeline",
  idle: () => "You went quiet for a while",
  return: () => "You came back",
}
const FALLBACK_COPY = {
  no_key: "No API key, showing the default face",
  limit: "Hourly limit reached, showing the default face",
  upstream: "OpenAI didn't answer in time, showing the default face",
  network: "Couldn't reach the server, showing the default face",
  cap: "That's 20 reactions this visit, showing the default face",
  low_confidence: "Not confident enough, kept the default face",
  refused: "No usable answer, kept the default face",
  invalid: "No usable answer, kept the default face",
}
const INTENSITY_LABELS = ["subtle", "light", "clear", "big"]
const EASE_OUT = "cubic-bezier(0.2, 0, 0, 1)"
const DRAWER_IN = [
  { opacity: 0, transform: "translateX(24px)" },
  { opacity: 1, transform: "none" },
]

const $ = (id) => document.getElementById(id)
function store(area, key, value) {
  try {
    const s = window[area]
    if (value === undefined) return s.getItem(key)
    if (value === null) s.removeItem(key)
    else s.setItem(key, value)
  } catch {
    // storage can be blocked; the portrait then simply forgets
  }
  return null
}
const motionEnabled = () =>
  document.documentElement.dataset.motion !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches
const faceUrl = (expression) => `/assets/portrait/portrait-${expression}.webp`
const fixed = (n) => (typeof n === "number" && Number.isFinite(n) ? n.toFixed(2) : "—")
const count = () => Number(store("sessionStorage", KEY.count) ?? 0) || 0

const dock = $("portrait-dock")
const drawer = $("portrait-dialog")
if (dock && drawer && $("portrait-home")) init()

function init() {
  // The intensity pop runs on the bordered face at home and on the whole bubble in the dock.
  const surfaces = [
    { home: true, button: $("portrait-home"), face: $("portrait-home-face"), aside: $("portrait-home-aside") },
    { home: false, button: $("portrait-dock-button"), face: $("portrait-dock-face"), aside: $("portrait-dock-aside") },
  ].map((surface) => ({ ...surface, token: 0, pop: surface.home ? surface.face : surface.button }))
  const muteButtons = [$("portrait-dock-mute"), $("pd-mute")]
  let catalog = null
  let latest = null
  let shown = { expression: "neutral", asideText: null }
  let muted = store("localStorage", KEY.muted) === "1"
  let preloaded = false
  let asideTimer = 0
  let pending = 0
  let tilt = 1
  let opener = null

  const known = (expression) => Boolean(catalog?.expressions.includes(expression))
  const defaultFor = (itemId) => catalog?.items[itemId]?.defaultExpression ?? "neutral"
  const active = () => surfaces[document.body.dataset.stage === "home" ? 0 : 1]

  // ─── Faces ───────────────────────────────────────────────────────────
  // Decode off-screen first; a failed or superseded load never touches the visible face.
  async function swap(surface, expression) {
    const token = ++surface.token
    const img = new Image(960, 960)
    img.alt = ALT[expression] ?? `Jérôme, ${expression}`
    img.src = faceUrl(expression)
    try {
      await img.decode()
    } catch {
      return false
    }
    if (token !== surface.token) return false
    const layers = [...surface.face.querySelectorAll("img")]
    const top = layers.at(-1)
    if (top?.getAttribute("src") === img.getAttribute("src")) return true
    layers.slice(0, -1).forEach((layer) => layer.remove())
    if (top) top.alt = ""
    surface.face.append(img)
    void img.offsetWidth
    img.classList.add("is-in")
    setTimeout(() => token === surface.token && top?.remove(), SWAP_MS)
    return true
  }

  function pop(surface, intensity) {
    if (!intensity || !motionEnabled() || !surface.pop.animate) return
    tilt = -tilt
    const scale = 1 + intensity * (surface.home ? 0.01 : 0.03)
    surface.pop.animate(
      [
        { transform: "none" },
        { transform: `scale(${scale}) rotate(${tilt * intensity * 0.7}deg)`, offset: 0.35 },
        { transform: "none" },
      ],
      { duration: 560, easing: EASE_OUT },
    )
  }

  function setFace(expression, intensity = 0) {
    $("portrait-home-tag").textContent = expression
    for (const surface of surfaces) {
      swap(surface, expression).then((ok) => ok && surface === active() && pop(surface, intensity))
    }
  }

  function preloadAll() {
    if (preloaded || !catalog) return
    preloaded = true
    for (const expression of catalog.expressions) if (expression !== "neutral") new Image().src = faceUrl(expression)
  }

  // ─── Asides and names ────────────────────────────────────────────────
  function showAside(text) {
    clearTimeout(asideTimer)
    for (const surface of surfaces) surface.aside.classList.remove("is-shown")
    if (!text) return
    const { aside } = active()
    aside.textContent = text
    void aside.offsetWidth
    aside.classList.add("is-shown")
    asideTimer = setTimeout(() => aside.classList.remove("is-shown"), ASIDE_MS)
  }

  function syncNames() {
    const name = `Jérôme's reaction: ${shown.asideText ?? shown.expression}`
    for (const surface of surfaces) surface.button.setAttribute("aria-label", name)
  }

  // ─── Requests ────────────────────────────────────────────────────────
  async function send(situation) {
    pending += 1
    syncBusy()
    try {
      const response = await fetch("/api/portrait", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: situation.action, itemId: situation.itemId, recent: situation.recent }),
      })
      if (!response.ok) throw new Error(`portrait ${response.status}`)
      return await response.json()
    } finally {
      pending -= 1
      syncBusy()
    }
  }

  function syncBusy() {
    for (const surface of surfaces) surface.button.classList.toggle("is-asking", pending > 0)
  }

  function apply(raw, situation) {
    if (muted || !raw || typeof raw !== "object") return
    const response = {
      ...raw,
      expression: known(raw.expression) ? raw.expression : defaultFor(situation.itemId),
      asideText: typeof raw.asideText === "string" && raw.asideText ? raw.asideText : null,
      intensity: Math.max(0, Math.min(3, Math.round(Number(raw.intensity) || 0))),
    }
    latest = { response, situation }
    if (response.react !== false) {
      shown = { expression: response.expression, asideText: response.asideText }
      setFace(response.expression, response.intensity)
      showAside(response.asideText)
      syncNames()
    }
    if (drawer.open) render()
  }

  const scheduler = createScheduler({
    now: () => Date.now(),
    send,
    apply,
    defaultFor,
    highPriority: HIGH_PRIORITY,
    maxPerVisit: MAX_PER_VISIT,
    getCount: count,
    setCount: (n) => store("sessionStorage", KEY.count, String(n)),
  })

  // Muted, hidden, offline or before the catalog: nothing is sent. Offline and the per-visit cap
  // still show the item's default face, like any other fallback.
  function request(action, itemId) {
    if (muted || !catalog || document.hidden || !ACTIONS.has(action) || !Object.hasOwn(catalog.items, itemId)) return
    preloadAll()
    const local = !navigator.onLine ? "network" : count() >= MAX_PER_VISIT ? "cap" : null
    if (!local) return scheduler.trigger(action, itemId)
    const fallback = { react: true, expression: defaultFor(itemId), asideText: null, intensity: 0 }
    apply({ ...fallback, fallbackReason: local }, { action, itemId, recent: scheduler.recent() })
  }

  document.addEventListener("portrait:trigger", (event) => {
    const { action, itemId } = event.detail ?? {}
    request(action, itemId)
  })

  fetch("/api/portrait")
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || !Array.isArray(data.expressions) || !data.items || typeof data.items !== "object") return
      const expressions = data.expressions.filter((e) => typeof e === "string" && /^[a-z]+$/.test(e))
      catalog = { expressions, items: data.items }
      window.portraitKnows = (id) => typeof id === "string" && Object.hasOwn(catalog.items, id)
      setTimeout(checkIdle, IDLE_MS)
    })
    .catch(() => {})

  // ─── Idle and return (once per visit each) ───────────────────────────
  let lastInput = Date.now()
  let hiddenAt = null
  const markInput = () => (lastInput = Date.now())
  for (const type of ["pointerdown", "pointermove", "keydown", "wheel", "scroll", "touchstart"]) {
    window.addEventListener(type, markInput, { capture: true, passive: true })
  }
  function checkIdle() {
    if (store("sessionStorage", KEY.idle) === "1") return
    const wait = lastInput + IDLE_MS - Date.now()
    if (wait > 0 || document.hidden) return void setTimeout(checkIdle, Math.max(wait, 1000))
    store("sessionStorage", KEY.idle, "1")
    request("idle", "event:idle")
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenAt = Date.now()
      showAside(null)
      return
    }
    markInput()
    const away = hiddenAt !== null && Date.now() - hiddenAt >= AWAY_MS
    hiddenAt = null
    if (away && store("sessionStorage", KEY.back) !== "1" && catalog && !muted) {
      store("sessionStorage", KEY.back, "1")
      request("return", "event:return")
    }
  })

  // ─── Dock visibility ─────────────────────────────────────────────────
  function syncDock() {
    const stage = document.body.dataset.stage
    const show = Boolean(stage) && stage !== "home" && !document.querySelector("dialog[open]")
    if (dock.hidden === !show) return
    dock.hidden = !show
    showAside(null)
  }
  new MutationObserver(syncDock).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-stage", "open"],
    subtree: true,
  })
  syncDock()

  // ─── Mute ────────────────────────────────────────────────────────────
  function setMuted(on) {
    muted = on
    store("localStorage", KEY.muted, on ? "1" : null)
    for (const button of muteButtons) button.setAttribute("aria-pressed", String(on))
    dock.classList.toggle("is-muted", on)
    if (on) {
      shown = { expression: "neutral", asideText: null }
      setFace("neutral")
      showAside(null)
      syncNames()
    }
    if (drawer.open) render()
  }
  for (const button of muteButtons) button.addEventListener("click", () => setMuted(!muted))
  if (muted) setMuted(true)

  // ─── Drawer ──────────────────────────────────────────────────────────
  function el(tag, className, text) {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
  }

  function bars(rows, chosen) {
    const list = el("ul", "pd-bars")
    for (const { name, p } of rows) {
      const row = el("li", name === chosen ? "is-chosen" : "")
      const track = el("span", "pd-track")
      const fill = el("i")
      fill.style.setProperty("--p", String(Math.max(0, Math.min(1, p || 0))))
      track.append(fill)
      row.append(el("span", "", name), track, el("span", "pd-value", fixed(p)))
      list.append(row)
    }
    return list
  }

  function answer(name, ...nodes) {
    $(`pd-a-${name}`).replaceChildren(...nodes)
  }

  function renderQuestions(response) {
    const q = response?.questions ?? {}
    const missing = () => el("p", "pd-none", response ? "No answer." : "Waiting for a first reaction.")
    const should = q.should_react
    if (should) {
      const verdict = response.react === false ? "stayed as it was" : "reacted"
      answer("should_react", bars([{ name: "react", p: should.probability }], "react"), el("p", "", `→ ${verdict}`))
    } else answer("should_react", missing())
    const expression = q.expression
    if (expression) {
      const probability = new Map(expression.probabilities.map((x) => [x.value, x.probability]))
      const rows = (catalog?.expressions ?? [...probability.keys()]).map((name) => ({
        name,
        p: probability.get(name) ?? 0,
      }))
      rows.sort((a, b) => b.p - a.p)
      answer("expression", bars(rows, expression.choice), el("p", "", `confidence ${fixed(expression.confidence)}`))
    } else answer("expression", missing())
    const aside = q.aside
    if (aside) answer("aside", el("p", "", `${aside.choice} · confidence ${fixed(aside.confidence)}`))
    else answer("aside", missing())
    const intensity = q.intensity
    if (intensity) {
      const probability = new Map(intensity.probabilities.map((x) => [x.label, x.probability]))
      const rows = INTENSITY_LABELS.map((name) => ({ name, p: probability.get(name) ?? 0 }))
      const level = INTENSITY_LABELS[Math.round(intensity.score)]
      answer(
        "intensity",
        bars(rows, level),
        el("p", "", `score ${fixed(intensity.score)} · confidence ${fixed(intensity.confidence)}`),
      )
    } else answer("intensity", missing())
  }

  function render() {
    const { response, situation } = latest ?? {}
    $("pd-face").src = faceUrl(shown.expression)
    $("pd-face").alt = ALT[shown.expression] ?? ""
    if (muted) $("pd-trigger").textContent = "Muted. I'll keep a straight face."
    else if (!situation) $("pd-trigger").textContent = "No reaction yet. Open a project and watch my face."
    else {
      const label = catalog?.items[situation.itemId]?.label ?? situation.itemId
      $("pd-trigger").textContent = TRIGGER_WORDS[situation.action]?.(label) ?? label
    }
    $("pd-sent").textContent = situation
      ? `sent: ${situation.action} · ${situation.itemId} · ${situation.recent.length} recent`
      : ""
    $("pd-quote").hidden = !shown.asideText
    $("pd-quote").textContent = shown.asideText ?? ""
    const reason = response?.fallbackReason ?? response?.fallback ?? null
    $("pd-fallback").hidden = !reason
    $("pd-fallback").textContent = FALLBACK_COPY[reason] ?? (reason ? "Fallback, showing the default face" : "")
    renderQuestions(response)
    const usage = response?.usage
    const cachedTokens = usage?.input_tokens_details?.cached_tokens
    const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : "—")
    $("pd-latency").textContent = response?.latencyMs > 0 ? `${response.latencyMs} ms` : "—"
    const cost = response?.estimatedCostUsd
    $("pd-cost").textContent = typeof cost !== "number" ? "—" : cost === 0 ? "$0" : `$${cost.toFixed(5)}`
    const noCall = !response || ["network", "cap", "no_key", "limit"].includes(reason)
    $("pd-cache").textContent = noCall ? "—" : response.cached ? "hit, no API call" : "miss"
    $("pd-tokens").textContent = usage ? `${fmt(cachedTokens ?? 0)} / ${fmt(usage.input_tokens)} tokens` : "—"
  }

  function openDrawer() {
    opener = document.activeElement
    render()
    drawer.showModal()
    $("pd-close").focus({ preventScroll: true })
    if (motionEnabled() && drawer.animate) drawer.animate(DRAWER_IN, { duration: 240, easing: EASE_OUT })
  }
  for (const id of ["portrait-home", "portrait-dock-button", "portrait-hint"])
    $(id).addEventListener("click", openDrawer)
  $("pd-close").addEventListener("click", () => drawer.close())
  drawer.addEventListener("click", (event) => {
    if (event.target !== drawer) return
    const r = drawer.getBoundingClientRect()
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)
      drawer.close()
  })
  drawer.addEventListener("close", () => {
    syncDock()
    if (opener?.isConnected && !opener.closest("[hidden]")) opener.focus({ preventScroll: true })
  })
}
