import { DragGesture } from "@use-gesture/vanilla"

const COAST_DECELERATION = 1500 // CSS pixels per second squared

export function launchVelocity(dx, dy, speed, bounds) {
  const length = Math.hypot(dx, dy)
  if (!length || !speed) return { vx: 0, vy: 0 }
  const ux = dx / length, uy = dy / length
  const crossing = Math.min(
    ux ? (bounds.right - bounds.left) / Math.abs(ux) : Infinity,
    uy ? (bounds.bottom - bounds.top) / Math.abs(uy) : Infinity,
  )
  // At 1000 px/s the unobstructed stopping distance is one screen in this direction.
  // With constant deceleration, half that release speed travels a quarter as far.
  const launch = Math.min(speed / 1000, 2) * Math.sqrt(2 * COAST_DECELERATION * crossing)
  return { vx: ux * launch, vy: uy * launch }
}

// Offsets are relative to the dock's normal CSS position, including its mobile safe area.
export function enablePortraitFlick(dock, button, motionEnabled, onLandedFlick) {
  const career = dock.closest(".career-portrait")
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n))
  let x = 0, y = 0, angle = 0
  let bounds, grab, gesture
  let frame = 0

  function paint() {
    dock.style.translate = `${x}px ${y}px`
    button.style.rotate = `${angle}deg`
  }

  function reset() {
    cancelAnimationFrame(frame)
    frame = 0
    const id = grab?.id
    grab = null
    if (id != null && button.hasPointerCapture(id)) button.releasePointerCapture(id)
    x = y = angle = 0
    dock.style.removeProperty("translate")
    button.style.removeProperty("rotate")
    delete dock.dataset.flick
  }

  function available() {
    return motionEnabled() && !dock.hidden && (!career || career.hasAttribute("data-floating"))
  }

  function sync() {
    const active = available()
    if (active && !gesture) {
      gesture = new DragGesture(button, drag, { filterTaps: true, tapsThreshold: 5, threshold: 6, pointer: { keys: false } })
    } else if (!active && gesture) {
      reset()
      gesture.destroy()
      gesture = null
    }
    button.toggleAttribute("data-tossable", active)
    if (active) {
      button.title = "Why this face? Drag to toss, or use the arrow keys."
      button.setAttribute("aria-description", button.title)
    } else {
      button.removeAttribute("title")
      button.removeAttribute("aria-description")
    }
  }

  function measure() {
    const rect = dock.getBoundingClientRect()
    const left = rect.left - x
    const top = rect.top - y
    const inset = 8
    bounds = {
      left: inset - left,
      right: document.documentElement.clientWidth - inset - rect.width - left,
      top: inset - top,
      bottom: window.innerHeight - inset - rect.height - top,
    }
  }

  function returnToDock(afterToss, onLand) {
    dock.dataset.flick = afterToss ? "dizzy" : "returning"
    const fromX = x, fromY = y, fromAngle = angle
    const start = performance.now()
    function settle(now) {
      const t = clamp((now - start) / (afterToss ? 920 : 650), 0, 1)
      const remaining = 1 - t * t * (3 - 2 * t)
      x = fromX * remaining
      y = fromY * remaining
      angle = fromAngle * remaining
      if (afterToss) angle += 12 * Math.sin(t * 4 * Math.PI) * (1 - t)
      paint()
      if (t < 1) frame = requestAnimationFrame(settle)
      else {
        reset()
        onLand?.()
      }
    }
    frame = requestAnimationFrame(settle)
  }

  function toss(dx, dy, speed = Math.hypot(dx, dy)) {
    cancelAnimationFrame(frame)
    let { vx, vy } = launchVelocity(dx, dy, speed, bounds)
    if (!vx && !vy) return returnToDock(false)
    dock.dataset.flick = "flying"
    let last = performance.now()
    const firmFlick = speed >= 650
    let spin = clamp(vx * .16, -330, 330)
    function fly(now) {
      const currentSpeed = Math.hypot(vx, vy)
      const dt = clamp((now - last) / 1000, 0, Math.min(.08, currentSpeed / COAST_DECELERATION))
      last = now
      const remaining = Math.max(0, 1 - COAST_DECELERATION * dt / currentSpeed)
      const travel = dt * (1 + remaining) / 2
      const nextX = x + vx * travel, nextY = y + vy * travel
      x = clamp(nextX, bounds.left, bounds.right)
      y = clamp(nextY, bounds.top, bounds.bottom)
      if (nextX !== x) { vx *= -.82; spin *= -.8 }
      if (nextY !== y) { vy *= -.82; spin *= .85 }
      angle += spin * travel
      vx *= remaining
      vy *= remaining
      spin *= remaining
      paint()
      if (Math.hypot(vx, vy) > 1) frame = requestAnimationFrame(fly)
      else returnToDock(firmFlick, firmFlick ? onLandedFlick : undefined)
    }
    frame = requestAnimationFrame(fly)
  }

  function drag({ first, last, tap, event, xy, initial, velocity, elapsedTime }) {
    if (first) {
      cancelAnimationFrame(frame)
      measure()
      grab = { id: event.pointerId, x, y, aimX: initial[0], aimY: initial[1], dx: 0, dy: 0, speed: 0 }
      dock.dataset.flick = "dragging"
    }
    if (!grab) return

    if (last) {
      const { dx, dy, speed, lastMove } = grab
      grab = null
      if (tap || event.type.endsWith("cancel") || event.type === "lostpointercapture") returnToDock(false)
      else {
        // Give the pointer time to lift, then bleed off momentum if the hand stopped.
        const idleMs = event.timeStamp - lastMove
        toss(dx, dy, speed * clamp((240 - idleMs) / 160, 0, 1))
      }
      return
    }

    x = clamp(grab.x + xy[0] - initial[0], bounds.left, bounds.right)
    y = clamp(grab.y + xy[1] - initial[1], bounds.top, bounds.bottom)
    const dx = xy[0] - grab.aimX, dy = xy[1] - grab.aimY
    // Aim from the last few pixels of travel so a curved drag follows the hand.
    // Keep that bearing through a stationary pointerup or a small release wobble.
    if (Math.hypot(dx, dy) >= 5) {
      grab.aimX = xy[0]
      grab.aimY = xy[1]
      grab.dx = dx
      grab.dy = dy
      grab.lastMove = event.timeStamp
      grab.speed = first
        ? Math.hypot(dx, dy) * 1000 / Math.max(1, elapsedTime)
        : Math.hypot(...velocity) * 1000
      angle = clamp(Math.sign(dx) * grab.speed / 100, -18, 18)
    }
    paint()
  }
  // Moving the face can expose a project link under the original press. Browsers
  // may start a native link drag there and cancel the captured portrait pointer.
  document.addEventListener("dragstart", event => {
    if (grab || button.contains(event.target)) event.preventDefault()
  }, true)
  const arrows = { ArrowLeft: [-1450, -500], ArrowRight: [1450, -500], ArrowUp: [-500, -1450], ArrowDown: [-500, 1450] }
  button.addEventListener("keydown", event => {
    if (!available() || grab || !Object.hasOwn(arrows, event.key)) return
    event.preventDefault()
    if (event.repeat) return
    measure()
    toss(...arrows[event.key])
  })
  new MutationObserver(sync).observe(dock, { attributes: true, attributeFilter: ["hidden"] })
  if (career) new MutationObserver(sync).observe(career, { attributes: true, attributeFilter: ["data-floating"] })
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] })
  for (const event of ["resize", "pagehide", "pageswap", "blur"]) window.addEventListener(event, reset)
  document.addEventListener("visibilitychange", () => { if (document.hidden) reset() })
  sync()
}
