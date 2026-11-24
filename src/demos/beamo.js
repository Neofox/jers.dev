import { demoShell, motionEnabled } from "./shared.js"

// Beamo · 3D viewer measurement. Re-implements audited behaviour of the 3D tour ruler and viewer:
// toolbar Select / Measure / Build objects (keys 1·2·3); Measure adds points with a dashed live preview,
// snaps to existing points (~30 px) or locks to a world axis within 10°, closes when you click the first
// point (3+ points), Escape or Finish keeps a line of 2+ points, Backspace removes the last point, and lines
// stay until Clear all. Build objects places a box in 4 clicks (corner, edge, depth, height) and labels
// s: area and v: volume. Orbit and first-person cameras, a shared section box and click-to-inspect BIM
// elements (orange highlight, IFC properties, off in first-person). Geometry is a synthetic sample room.
function markup() {
  return demoShell(
    "beamo",
    "Beamo 3D measurement on a sample room",
    `<div class="bm">
      <div class="bm-toolbar">
        <div class="bm-seg" role="group" aria-label="Measurement tool">
          <button type="button" data-bm-mode="select" aria-pressed="false"><kbd>1</kbd>Select</button>
          <button type="button" data-bm-mode="distance" aria-pressed="true"><kbd>2</kbd>Measure</button>
          <button type="button" data-bm-mode="volume" aria-pressed="false"><kbd>3</kbd>Build objects</button>
        </div>
        <div class="bm-actions">
          <button type="button" data-bm="finish">Finish</button>
          <button type="button" data-bm="reset">Reset</button>
          <button type="button" data-bm="save" disabled title="Saving is not part of this demo">Save <span data-bm="count">0</span></button>
          <button type="button" data-bm="clear">Clear all</button>
        </div>
      </div>
      <div class="bm-view">
        <svg class="bm-svg" data-bm="svg" tabindex="0" role="application" aria-label="Sample room in 3D. Press ] or [ to move between snap targets and Enter to place a point or select. Arrow keys orbit; in first-person, W A S D move and Q E change eye height. Escape keeps the line, Backspace removes the last point."></svg>
        <p class="bm-hint" data-bm="hint" aria-live="polite"></p>
        <div class="bm-inspect" data-bm="inspect" hidden></div>
      </div>
      <div class="bm-side">
        <div class="bm-seg" role="group" aria-label="Camera"><button type="button" data-bm-cam="orbit" aria-pressed="true">Orbit</button><button type="button" data-bm-cam="fp" aria-pressed="false">First-person</button></div>
        <div class="bm-seg" role="group" aria-label="Units"><button type="button" data-bm-unit="m" aria-pressed="true">m</button><button type="button" data-bm-unit="ft" aria-pressed="false">ft</button></div>
        <div class="bm-seg bm-kbd" role="group" aria-label="Keyboard targets"><button type="button" data-bm="prev" aria-label="Previous target">‹</button><button type="button" data-bm="next" aria-label="Next target">›</button><button type="button" data-bm="place">Place point</button></div>
        <label class="bm-clip"><input type="checkbox" data-bm="clip"> Section box</label>
        <div class="bm-sliders" data-bm="sliders" hidden>
          <label>X max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="0"></label>
          <label>Y max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="1"></label>
          <label>Z max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="2"></label>
        </div>
      </div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  const q = (k) => root.querySelector(`[data-bm="${k}"]`)
  const svg = q("svg")
  const NS = "http://www.w3.org/2000/svg"
  // ── Vector helpers
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s]
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  const len = (a) => Math.hypot(a[0], a[1], a[2])
  const norm = (a) => mul(a, 1 / (len(a) || 1))
  // ── Synthetic room (metres): 6 × 4 × 2.8 with BIM-like elements
  const W = 6,
    D = 4,
    H = 2.8
  const quad = (a, b, c, d) => [a, b, c, d]
  const elements = [
    { id: 1, type: "IfcSlab", name: "Floor slab", obj: "Concrete slab", tag: "S-01", pre: "FLOOR", faces: [quad([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])], n: [0, 0, 1] },
    { id: 2, type: "IfcWall", name: "Wall north", obj: "Partition 120", tag: "W-01", pre: "STANDARD", faces: [quad([0, D, 0], [W, D, 0], [W, D, H], [0, D, H])], n: [0, -1, 0] },
    { id: 3, type: "IfcWall", name: "Wall south", obj: "Partition 120", tag: "W-02", pre: "STANDARD", faces: [quad([0, 0, 0], [0, 0, H], [W, 0, H], [W, 0, 0])], n: [0, 1, 0] },
    { id: 4, type: "IfcWall", name: "Wall west", obj: "Partition 120", tag: "W-03", pre: "STANDARD", faces: [quad([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])], n: [1, 0, 0] },
    { id: 5, type: "IfcWall", name: "Wall east", obj: "Partition 120", tag: "W-04", pre: "STANDARD", faces: [quad([W, 0, 0], [W, 0, H], [W, D, H], [W, D, 0])], n: [-1, 0, 0] },
    { id: 6, type: "IfcDoor", name: "Door 01", obj: "Single swing 900", tag: "D-01", pre: "DOOR", faces: [quad([0.01, 1.2, 0], [0.01, 2.1, 0], [0.01, 2.1, 2.1], [0.01, 1.2, 2.1])], n: [1, 0, 0] },
    { id: 7, type: "IfcWindow", name: "Window 01", obj: "Fixed 2000×1100", tag: "WN-01", pre: "WINDOW", faces: [quad([2, D - 0.01, 0.9], [4, D - 0.01, 0.9], [4, D - 0.01, 2], [2, D - 0.01, 2])], n: [0, -1, 0] },
    {
      id: 8, type: "IfcColumn", name: "Column C1", obj: "Concrete 400×400", tag: "C-01", pre: "COLUMN",
      faces: [
        quad([4.6, 1, 0], [5, 1, 0], [5, 1, H], [4.6, 1, H]),
        quad([5, 1, 0], [5, 1.4, 0], [5, 1.4, H], [5, 1, H]),
        quad([5, 1.4, 0], [4.6, 1.4, 0], [4.6, 1.4, H], [5, 1.4, H]),
        quad([4.6, 1.4, 0], [4.6, 1, 0], [4.6, 1, H], [4.6, 1.4, H]),
      ],
    },
  ]
  elements.forEach((e) => (e.guid = "SAMPLE" + String(e.id).padStart(4, "0") + "x" + e.tag.replace("-", "")))
  // Splat-like capture dots scattered over the surfaces (purely decorative sample density)
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const dots = []
  for (let i = 0; i < 260; i++) {
    const s = rnd()
    let p
    if (s < 0.4) p = [rnd() * W, rnd() * D, 0]
    else if (s < 0.6) p = [rnd() * W, D, rnd() * H]
    else if (s < 0.8) p = [0, rnd() * D, rnd() * H]
    else p = [W, rnd() * D, rnd() * H]
    dots.push({ p, g: 0.35 + rnd() * 0.4 })
  }
  // ── State
  const st = {
    mode: "distance", cam: "orbit", unit: "m", clip: false, box: [1, 1, 1],
    orbit: { t: [W / 2, D / 2, 0.8], d: 9.5, az: -2.2, pol: 1.05 },
    fp: { pos: [1.2, 0.8, 1.6], yaw: 0.75, pitch: -0.12 },
    lines: [], current: [], boxes: [], building: [], hover: null, snap: null, guide: null,
    selected: null, picked: null, target: -1,
  }
  let vw = 800,
    vh = 450,
    frame = 0
  // ── Camera
  function camera() {
    let pos, fwd
    if (st.cam === "orbit") {
      const o = st.orbit
      pos = add(o.t, [o.d * Math.sin(o.pol) * Math.cos(o.az), o.d * Math.sin(o.pol) * Math.sin(o.az), o.d * Math.cos(o.pol)])
      fwd = norm(sub(o.t, pos))
    } else {
      const f = st.fp
      pos = f.pos
      fwd = [Math.cos(f.pitch) * Math.cos(f.yaw), Math.cos(f.pitch) * Math.sin(f.yaw), Math.sin(f.pitch)]
    }
    const right = norm(cross(fwd, [0, 0, 1]))
    const up = cross(right, fwd)
    const focal = vh / 2 / Math.tan((st.cam === "orbit" ? 40 : 70) * Math.PI / 360)
    return { pos, fwd, right, up, focal }
  }
  const NEAR = 0.05
  const toCam = (c, p) => {
    const v = sub(p, c.pos)
    return [dot(v, c.right), dot(v, c.up), dot(v, c.fwd)]
  }
  const proj = (c, v) => [vw / 2 + (c.focal * v[0]) / v[2], vh / 2 - (c.focal * v[1]) / v[2]]
  function ray(c, sx, sy) {
    return norm(add(add(c.fwd, mul(c.right, (sx - vw / 2) / c.focal)), mul(c.up, -(sy - vh / 2) / c.focal)))
  }
  // ── Clipping: section box (world) then near plane (camera)
  const limits = () => [W * st.box[0], D * st.box[1], H * st.box[2]]
  function clipPoly(poly, inside, cut) {
    let out = []
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i],
        b = poly[(i + 1) % poly.length],
        ia = inside(a),
        ib = inside(b)
      if (ia) out.push(a)
      if (ia !== ib) out.push(cut(a, b))
    }
    return out
  }
  function sectionPoly(poly) {
    if (!st.clip) return poly
    const L = limits()
    for (let k = 0; k < 3; k++) {
      poly = clipPoly(poly, (p) => p[k] <= L[k] + 1e-6, (a, b) => {
        const t = (L[k] - a[k]) / (b[k] - a[k])
        return add(a, mul(sub(b, a), t))
      })
      if (!poly.length) return poly
    }
    return poly
  }
  const insideSection = (p) => !st.clip || limits().every((l, k) => p[k] <= l + 1e-6)
  function screenPoly(c, poly) {
    const cp = clipPoly(poly.map((p) => toCam(c, p)), (v) => v[2] > NEAR, (a, b) => {
      const t = (NEAR - a[2]) / (b[2] - a[2])
      return add(a, mul(sub(b, a), t))
    })
    return cp.length < 3 ? null : { pts: cp.map((v) => proj(c, v)), depth: cp.reduce((s, v) => s + v[2], 0) / cp.length }
  }
  function screenSeg(c, a, b) {
    let va = toCam(c, a),
      vb = toCam(c, b)
    if (va[2] <= NEAR && vb[2] <= NEAR) return null
    if (va[2] <= NEAR) va = add(va, mul(sub(vb, va), (NEAR - va[2]) / (vb[2] - va[2])))
    if (vb[2] <= NEAR) vb = add(vb, mul(sub(va, vb), (NEAR - vb[2]) / (va[2] - vb[2])))
    return [proj(c, va), proj(c, vb)]
  }
  // Walls facing the orbit camera are cut away so the room stays readable
  function visibleElement(c, e) {
    if (st.cam !== "orbit" || e.type !== "IfcWall") return true
    return dot(e.n, sub(c.pos, e.faces[0][0])) > 0
  }
  // ── Picking: ray against element faces
  function hit(c, sx, sy) {
    const dir = ray(c, sx, sy)
    let best = null
    for (const e of elements) {
      if (!visibleElement(c, e)) continue
      for (const f of e.faces) {
        const nrm = norm(cross(sub(f[1], f[0]), sub(f[3], f[0])))
        const den = dot(nrm, dir)
        if (Math.abs(den) < 1e-6) continue
        const t = dot(nrm, sub(f[0], c.pos)) / den
        if (t <= NEAR || (best && t >= best.t)) continue
        const p = add(c.pos, mul(dir, t))
        const u = sub(f[1], f[0]),
          v = sub(f[3], f[0]),
          w = sub(p, f[0])
        const a = dot(w, u) / dot(u, u),
          b = dot(w, v) / dot(v, v)
        if (a < -1e-6 || a > 1 + 1e-6 || b < -1e-6 || b > 1 + 1e-6 || !insideSection(p)) continue
        best = { t, p, e }
      }
    }
    return best
  }
  // ── Formatting (in-scene labels)
  function fmtLen(m) {
    if (st.unit === "m") return m.toFixed(2) + " m"
    const feet = m * 3.28084,
      ft = Math.floor(feet)
    return `${ft}' ${Math.floor((feet - ft) * 12)}"`
  }
  const fmtArea = (m2) => (st.unit === "m" ? `s: ${m2.toFixed(2)} m²` : `s: ${(m2 * 10.7639).toFixed(2)} ft²`)
  const fmtVol = (m3) => (st.unit === "m" ? `v: ${m3.toFixed(2)} m³` : `v: ${(m3 * 35.31467).toFixed(2)} ft³`)
  // ── Snapping: existing points within ~30 px, else world-axis lock within 10°
  function snapPoint(c, p, sx, sy) {
    st.guide = null
    const radius = Math.max(24, vh * 0.027 * 1.2)
    const all = [...st.lines.flatMap((l) => l.pts), ...st.current]
    for (const s of all) {
      const v = toCam(c, s)
      if (v[2] <= NEAR) continue
      const [x, y] = proj(c, v)
      if (Math.hypot(x - sx, y - sy) < radius) return { p: s, kind: "point" }
    }
    const last = st.current[st.current.length - 1]
    if (last) {
      const d = sub(p, last),
        L = len(d)
      if (L > 0.05) {
        const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        for (const a of axes) {
          const cos = Math.abs(dot(d, a)) / L
          if (cos > Math.cos((10 * Math.PI) / 180)) {
            const s = add(last, mul(a, dot(d, a)))
            st.guide = [add(last, mul(a, -20)), add(last, mul(a, 20))]
            return { p: s, kind: "axis" }
          }
        }
      }
    }
    return { p, kind: null }
  }
  // ── Box building: corner → edge (horizontal) → depth (perpendicular) → height (vertical)
  const BOX_PROMPTS = ["Box: click the first corner.", "Click the end of the first edge.", "Click the depth.", "Click the height."]
  function boxCandidate(c, sx, sy) {
    const b = st.building,
      dir = ray(c, sx, sy)
    if (b.length === 0) {
      const h = hit(c, sx, sy)
      return h ? h.p : null
    }
    if (b.length === 1 || b.length === 2) {
      const z = b[0][2]
      if (Math.abs(dir[2]) < 1e-6) return null
      const t = (z - c.pos[2]) / dir[2]
      if (t <= 0) return null
      const p = add(c.pos, mul(dir, t))
      if (b.length === 1) return p
      const e = norm(sub(b[1], b[0])),
        perp = [-e[1], e[0], 0]
      return add(b[1], mul(perp, dot(sub(p, b[1]), perp)))
    }
    // height: closest point on the vertical line through the third corner to the pointer ray
    const base = b[2],
      up = [0, 0, 1],
      w0 = sub(base, c.pos)
    const a = dot(up, up),
      bb = dot(up, dir),
      cc = dot(dir, dir),
      d = dot(up, w0),
      e2 = dot(dir, w0)
    const den = a * cc - bb * bb
    if (Math.abs(den) < 1e-6) return null
    const s = (bb * e2 - cc * d) / den
    return add(base, mul(up, Math.max(0, s)))
  }
  function boxGeometry(b) {
    const [p0, p1, p2] = b
    const h = b[3] ? b[3][2] - p2[2] : 0
    const e = sub(p1, p0),
      dvec = sub(p2, p1)
    const base = [p0, p1, add(p1, dvec), add(p0, dvec)]
    const top = base.map((p) => add(p, [0, 0, h]))
    return { base, top, area: len(e) * len(dvec), volume: len(e) * len(dvec) * h, h }
  }
  // ── Keyboard targets: snap points (room, door, window, column corners) or, in Select, items
  const anchors = [
    ...[[0, 0], [W, 0], [W, D], [0, D]].map(([x, y]) => [x, y, 0]),
    ...[[0, 0], [W, 0], [W, D], [0, D]].map(([x, y]) => [x, y, H]),
    [2, D, 0.9], [4, D, 0.9], [4, D, 2], [2, D, 2],
    [0, 1.2, 0], [0, 2.1, 0], [0, 2.1, 2.1], [0, 1.2, 2.1],
    [4.6, 1, 0], [5, 1, 0], [5, 1.4, 0], [4.6, 1.4, 0], [4.6, 1, H], [5, 1.4, H],
  ]
  function targets() {
    if (st.mode !== "select")
      return [...anchors.filter((p) => insideSection(p)), ...st.current.slice(0, 1)].map((p) => ({ kind: "point", p }))
    const items = [
      ...st.lines.map((l, i) => ({ kind: "line", key: "l" + i, p: l.pts[0], label: "Measurement " + (i + 1) })),
      ...st.boxes.map((b, i) => ({ kind: "box", key: "b" + i, p: b[0], label: "Box " + (i + 1) })),
    ]
    if (st.cam === "orbit")
      for (const e of elements) items.push({ kind: "element", id: e.id, p: e.faces[0][0].map((v, k) => e.faces[0].reduce((a, q2) => a + q2[k], 0) / 4), label: e.name })
    return items
  }
  function moveTarget(step) {
    const list = targets()
    if (!list.length) return
    st.target = st.target < 0 ? (step > 0 ? 0 : list.length - 1) : (st.target + step + list.length) % list.length
    schedule()
  }
  function placeTarget() {
    const list = targets(),
      t = list[st.target]
    if (!t) return moveTarget(1)
    if (st.mode === "distance") {
      if (st.current.length >= 3 && t.p === st.current[0]) {
        st.lines.push({ pts: st.current, closed: true })
        st.current = []
      } else st.current = [...st.current, t.p]
    } else if (st.mode === "volume") {
      const b = st.building,
        p = t.p
      let next
      if (b.length === 0) next = p
      else if (b.length === 1) next = [p[0], p[1], b[0][2]]
      else if (b.length === 2) {
        const e = norm(sub(b[1], b[0])),
          perp = [-e[1], e[0], 0]
        next = add(b[1], mul(perp, dot(sub([p[0], p[1], b[0][2]], b[1]), perp)))
      } else next = [b[2][0], b[2][1], Math.max(b[2][2] + 0.1, p[2])]
      st.building = [...b, next]
      if (st.building.length === 4) {
        st.boxes.push(st.building)
        st.building = []
      }
    } else if (t.kind === "element") {
      st.picked = t.id
      st.selected = null
    } else {
      st.selected = t.key
      st.picked = null
    }
    schedule()
  }
  // ── Draw
  function el(tag, attrs, parent) {
    const n = document.createElementNS(NS, tag)
    for (const k in attrs) n.setAttribute(k, attrs[k])
    parent.appendChild(n)
    return n
  }
  function label(g, at, text, cls = "") {
    const t = el("text", { x: at[0], y: at[1] - 10, class: "bm-label " + cls, "text-anchor": "middle" }, g)
    t.textContent = text
  }
  function draw() {
    frame = 0
    const c = camera()
    svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`)
    svg.replaceChildren()
    const world = el("g", {}, svg)
    // faces, painter-sorted
    const faces = []
    for (const e of elements) {
      if (!visibleElement(c, e)) continue
      for (const f of e.faces) {
        const s = screenPoly(c, sectionPoly(f))
        if (s) faces.push({ ...s, e })
      }
    }
    faces.sort((a, b) => b.depth - a.depth)
    for (const f of faces) {
      const picked = st.picked === f.e.id
      el("polygon", { points: f.pts.map((p) => p.join(",")).join(" "), class: `bm-face t-${f.e.type}${picked ? " is-picked" : ""}` }, world)
    }
    // capture dots
    for (const d of dots) {
      if (!insideSection(d.p)) continue
      const v = toCam(c, d.p)
      if (v[2] <= NEAR) continue
      const [x, y] = proj(c, v)
      el("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: Math.max(0.6, Math.min(2.4, 14 / v[2])).toFixed(2), class: "bm-dot", "fill-opacity": d.g }, world)
    }
    // section box outline
    if (st.clip) {
      const L = limits()
      const corners = [[0, 0, 0], [L[0], 0, 0], [L[0], L[1], 0], [0, L[1], 0]]
      const ring = (z) => corners.map((p) => [p[0], p[1], z])
      const lo = ring(0),
        hi = ring(L[2])
      const segs = [...lo.map((p, i) => [p, lo[(i + 1) % 4]]), ...hi.map((p, i) => [p, hi[(i + 1) % 4]]), ...lo.map((p, i) => [p, hi[i]])]
      for (const [a, b] of segs) {
        const s = screenSeg(c, a, b)
        if (s) el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-section" }, world)
      }
    }
    const ink = el("g", {}, svg)
    if (st.guide) {
      const s = screenSeg(c, st.guide[0], st.guide[1])
      if (s) el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-guide" }, ink)
    }
    const drawLine = (pts, opts = {}) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const s = screenSeg(c, pts[i], pts[i + 1])
        if (!s) continue
        el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-seg-line" + (opts.cls ? " " + opts.cls : "") }, ink)
        if (!opts.noLabel) label(ink, [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2], fmtLen(len(sub(pts[i + 1], pts[i]))), opts.cls || "")
      }
      for (const p of pts) {
        const v = toCam(c, p)
        if (v[2] <= NEAR) continue
        const [x, y] = proj(c, v)
        el("circle", { cx: x, cy: y, r: 4.5, class: "bm-pt" + (opts.cls ? " " + opts.cls : "") }, ink)
      }
    }
    st.lines.forEach((l, i) => drawLine(l.closed ? [...l.pts, l.pts[0]] : l.pts, { cls: st.selected === "l" + i ? "is-selected" : "" }))
    const drawBox = (b, cls = "") => {
      const g = boxGeometry(b)
      const ring = (r) => [...r, r[0]]
      drawLine(ring(g.base), { noLabel: true, cls })
      if (g.h > 0) {
        drawLine(ring(g.top), { noLabel: true, cls })
        g.base.forEach((p, i) => drawLine([p, g.top[i]], { noLabel: true, cls }))
      }
      const center = g.top.reduce((a, p) => add(a, mul(p, 0.25)), [0, 0, 0])
      const v = toCam(c, center)
      if (v[2] > NEAR) {
        const [x, y] = proj(c, v)
        label(ink, [x, y], fmtArea(g.area), cls)
        if (g.h > 0) label(ink, [x, y + 20], fmtVol(g.volume), cls)
      }
    }
    st.boxes.forEach((b, i) => drawBox(b, st.selected === "b" + i ? "is-selected" : ""))
    // in-progress geometry + live dashed preview
    if (st.mode === "distance" && st.current.length) {
      drawLine(st.current)
      if (st.hover) {
        const s = screenSeg(c, st.current[st.current.length - 1], st.hover)
        if (s) {
          el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-preview" }, ink)
          label(ink, [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2], fmtLen(len(sub(st.hover, st.current[st.current.length - 1]))), "is-live")
        }
      }
    }
    if (st.mode === "volume" && st.building.length) {
      const preview = st.hover ? [...st.building, st.hover] : st.building
      if (preview.length >= 3) drawBox(preview.length === 4 ? preview : [...preview], "is-live")
      else drawLine(preview, { cls: "is-live" })
    }
    if (st.hover && st.mode !== "select") {
      const v = toCam(c, st.hover)
      if (v[2] > NEAR) {
        const [x, y] = proj(c, v)
        el("circle", { cx: x, cy: y, r: st.snap === "point" ? 9 : 6, class: "bm-cursor" + (st.snap ? " is-snapped" : "") }, ink)
      }
    }
    const tList = targets()
    if (st.target >= tList.length) st.target = tList.length ? tList.length - 1 : -1
    const tgt = tList[st.target]
    if (tgt) {
      const v = toCam(c, tgt.p)
      if (v[2] > NEAR) {
        const [x, y] = proj(c, v)
        el("circle", { cx: x, cy: y, r: 11, class: "bm-target" }, ink)
        if (tgt.label) label(ink, [x, y - 8], tgt.label, "is-live")
      }
    }
    q("place").textContent = st.mode === "select" ? "Select item" : "Place point"
    // toolbar + hint state
    root.querySelectorAll("[data-bm-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmMode === st.mode)))
    root.querySelectorAll("[data-bm-cam]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmCam === st.cam)))
    root.querySelectorAll("[data-bm-unit]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmUnit === st.unit)))
    q("count").textContent = st.lines.length + st.boxes.length
    q("clear").textContent = st.selected ? "Delete" : "Clear all"
    q("sliders").hidden = !st.clip
    q("hint").textContent =
      st.mode === "distance"
        ? st.current.length
          ? `${st.current.length} point${st.current.length > 1 ? "s" : ""} · Esc or Finish keeps it · Backspace removes the last point`
          : "Click a surface, or press ] then Enter to place a point."
        : st.mode === "volume"
          ? BOX_PROMPTS[st.building.length]
          : st.cam === "fp"
            ? "Picking is off in first-person · click the floor to glide there."
            : "Click a measurement or a building element."
    const e = elements.find((x) => x.id === st.picked)
    q("inspect").hidden = !e
    if (e)
      q("inspect").innerHTML = `<p class="bm-ifc">${e.type}</p><dl><div><dt>Name</dt><dd>${e.name}</dd></div><div><dt>GlobalId</dt><dd>${e.guid}</dd></div><div><dt>ObjectType</dt><dd>${e.obj}</dd></div><div><dt>Tag</dt><dd>${e.tag}</dd></div><div><dt>PredefinedType</dt><dd>${e.pre}</dd></div></dl>`
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(draw)
  }
  // ── Actions
  function finish() {
    if (st.mode === "distance") {
      if (st.current.length >= 2) st.lines.push({ pts: st.current, closed: false })
      st.current = []
    } else if (st.mode === "volume") {
      if (st.building.length >= 3) st.boxes.push([...st.building])
      st.building = []
    }
    schedule()
  }
  function setMode(m) {
    finish()
    st.target = -1
    st.mode = m
    st.selected = null
    schedule()
  }
  function localXY(ev) {
    const r = svg.getBoundingClientRect()
    return [((ev.clientX - r.left) / r.width) * vw, ((ev.clientY - r.top) / r.height) * vh]
  }
  function onClick(sx, sy) {
    const c = camera()
    if (st.mode === "distance") {
      const h = hit(c, sx, sy)
      if (!h) return
      const { p } = snapPoint(c, h.p, sx, sy)
      if (st.current.length >= 3 && p === st.current[0]) {
        st.lines.push({ pts: st.current, closed: true }) // clicking the first point closes the shape
        st.current = []
      } else st.current = [...st.current, p]
    } else if (st.mode === "volume") {
      const p = boxCandidate(c, sx, sy)
      if (!p) return
      st.building = [...st.building, p]
      if (st.building.length === 4) {
        st.boxes.push(st.building)
        st.building = []
      }
    } else if (st.cam === "fp") {
      const h = hit(c, sx, sy)
      if (h && h.e.type === "IfcSlab") glide([h.p[0], h.p[1]])
    } else {
      st.selected = pickMeasurement(c, sx, sy)
      if (!st.selected) {
        const h = hit(c, sx, sy)
        st.picked = h ? h.e.id : null
      } else st.picked = null
    }
    schedule()
  }
  function pickMeasurement(c, sx, sy) {
    const near = (a, b) => {
      const s = screenSeg(c, a, b)
      if (!s) return false
      const [p, r] = s,
        dx = r[0] - p[0],
        dy = r[1] - p[1],
        L2 = dx * dx + dy * dy || 1
      const t = Math.max(0, Math.min(1, ((sx - p[0]) * dx + (sy - p[1]) * dy) / L2))
      return Math.hypot(p[0] + t * dx - sx, p[1] + t * dy - sy) < 8
    }
    for (let i = st.lines.length - 1; i >= 0; i--) {
      const pts = st.lines[i].closed ? [...st.lines[i].pts, st.lines[i].pts[0]] : st.lines[i].pts
      for (let k = 0; k < pts.length - 1; k++) if (near(pts[k], pts[k + 1])) return "l" + i
    }
    for (let i = st.boxes.length - 1; i >= 0; i--) {
      const g = boxGeometry(st.boxes[i])
      const ring = [...g.top, g.top[0]]
      for (let k = 0; k < 4; k++) if (near(ring[k], ring[k + 1]) || near(g.base[k], g.base[(k + 1) % 4])) return "b" + i
    }
    return null
  }
  let glideFrame = 0
  function glide(to) {
    cancelAnimationFrame(glideFrame)
    const from = [...st.fp.pos],
      target = [to[0], to[1], from[2]]
    if (!motionEnabled()) {
      st.fp.pos = target
      return schedule()
    }
    const t0 = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / 550),
        e = 1 - Math.pow(1 - k, 3)
      st.fp.pos = add(from, mul(sub(target, from), e))
      draw()
      if (k < 1) glideFrame = requestAnimationFrame(tick)
    }
    glideFrame = requestAnimationFrame(tick)
  }
  // ── Pointer: drag rotates (orbit) or looks (first-person); a press under 4 px is a click
  let drag = null
  svg.addEventListener("pointerdown", (ev) => {
    drag = { x: ev.clientX, y: ev.clientY, moved: false }
  })
  svg.addEventListener("pointermove", (ev) => {
    const [sx, sy] = localXY(ev)
    if (drag && (drag.moved || Math.hypot(ev.clientX - drag.x, ev.clientY - drag.y) > 4)) {
      if (!drag.moved) svg.setPointerCapture?.(ev.pointerId)
      drag.moved = true
      const dx = ev.movementX || 0,
        dy = ev.movementY || 0
      if (st.cam === "orbit") {
        st.orbit.az -= dx * 0.008 // grab-the-world feel
        st.orbit.pol = Math.min(Math.PI / 2 + 0.35, Math.max(0.1, st.orbit.pol - dy * 0.006))
      } else {
        st.fp.yaw += dx * 0.005
        st.fp.pitch = Math.min(1.2, Math.max(-1.2, st.fp.pitch + dy * 0.004))
      }
      st.hover = null
      return schedule()
    }
    const c = camera()
    if (st.mode === "distance") {
      const h = hit(c, sx, sy)
      if (h) {
        const s = snapPoint(c, h.p, sx, sy)
        st.hover = s.p
        st.snap = s.kind
      } else st.hover = null
    } else if (st.mode === "volume") {
      st.hover = boxCandidate(c, sx, sy)
      st.snap = null
      st.guide = null
    } else st.hover = null
    schedule()
  })
  svg.addEventListener("pointerup", (ev) => {
    if (drag && !drag.moved) onClick(...localXY(ev))
    drag = null
  })
  svg.addEventListener("pointerleave", () => {
    st.hover = null
    st.guide = null
    schedule()
  })
  // ── Keyboard: 1/2/3 tools, Esc keeps, Backspace removes; arrows orbit; WASD/QE first-person
  svg.addEventListener("keydown", (ev) => {
    const k = ev.key
    if (k === "1" || k === "2" || k === "3") return setMode(["select", "distance", "volume"][+k - 1])
    if (k === "]" || k === "n" || k === "N") return ev.preventDefault(), moveTarget(1)
    if (k === "[" || k === "p" || k === "P") return ev.preventDefault(), moveTarget(-1)
    if (k === "Enter" || k === " ") return ev.preventDefault(), placeTarget()
    if (k === "Escape") return ev.preventDefault(), finish()
    if (k === "Backspace") {
      ev.preventDefault()
      if (st.mode === "distance") st.current = st.current.slice(0, -1)
      if (st.mode === "volume") st.building = st.building.slice(0, -1)
      return schedule()
    }
    const step = ev.shiftKey ? 0.3 : 0.1
    if (st.cam === "orbit") {
      const map = { ArrowLeft: [0.12, 0], ArrowRight: [-0.12, 0], ArrowUp: [0, -0.08], ArrowDown: [0, 0.08] }
      if (!map[k]) return
      ev.preventDefault()
      st.orbit.az += map[k][0]
      st.orbit.pol = Math.min(Math.PI / 2 + 0.35, Math.max(0.1, st.orbit.pol + map[k][1]))
      return schedule()
    }
    const f = st.fp,
      fwd = [Math.cos(f.yaw), Math.sin(f.yaw), 0],
      right = [Math.sin(f.yaw), -Math.cos(f.yaw), 0]
    const moves = { w: fwd, ArrowUp: fwd, s: mul(fwd, -1), ArrowDown: mul(fwd, -1), d: right, ArrowRight: right, a: mul(right, -1), ArrowLeft: mul(right, -1) }
    const key = k.length === 1 ? k.toLowerCase() : k
    if (moves[key]) {
      ev.preventDefault()
      const n = add(f.pos, mul(moves[key], step * (ev.shiftKey ? 3 : 1) * 2))
      f.pos = [Math.min(W - 0.2, Math.max(0.2, n[0])), Math.min(D - 0.2, Math.max(0.2, n[1])), f.pos[2]]
    } else if (key === "q" || key === "e") {
      ev.preventDefault()
      f.pos = [f.pos[0], f.pos[1], Math.min(2.6, Math.max(0.4, f.pos[2] + (key === "e" ? 0.1 : -0.1)))]
    } else return
    schedule()
  })
  // ── Controls
  root.querySelectorAll("[data-bm-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.bmMode)))
  root.querySelectorAll("[data-bm-cam]").forEach((b) =>
    b.addEventListener("click", () => {
      st.cam = b.dataset.bmCam // instant switch, like the source
      if (st.cam === "fp") st.picked = null
      schedule()
    }),
  )
  root.querySelectorAll("[data-bm-unit]").forEach((b) => b.addEventListener("click", () => ((st.unit = b.dataset.bmUnit), schedule())))
  q("finish").addEventListener("click", finish)
  q("prev").addEventListener("click", () => moveTarget(-1))
  q("next").addEventListener("click", () => moveTarget(1))
  q("place").addEventListener("click", placeTarget)
  q("reset").addEventListener("click", () => ((st.current = []), (st.building = []), schedule()))
  q("clear").addEventListener("click", () => {
    if (st.selected) {
      const i = +st.selected.slice(1)
      if (st.selected[0] === "l") st.lines.splice(i, 1)
      else st.boxes.splice(i, 1)
      st.selected = null
    } else {
      st.lines = []
      st.boxes = []
      st.current = []
      st.building = []
    }
    schedule()
  })
  q("clip").addEventListener("change", (e) => ((st.clip = e.target.checked), schedule()))
  root.querySelectorAll("[data-bm-axis]").forEach((s) => s.addEventListener("input", () => ((st.box[+s.dataset.bmAxis] = +s.value), schedule())))
  // ── Size
  const ro = new ResizeObserver(([entry]) => {
    vw = Math.max(280, Math.round(entry.contentRect.width))
    vh = Math.max(240, Math.round(entry.contentRect.height))
    draw()
  })
  ro.observe(svg)
  // A first sample measurement so the result is visible before interacting
  st.lines.push({ pts: [[0.6, 3.4, 0], [3.6, 3.4, 0], [3.6, 3.4, 2]], closed: false })
  draw()
  return () => {
    ro.disconnect()
    cancelAnimationFrame(frame)
    cancelAnimationFrame(glideFrame)
  }
}
