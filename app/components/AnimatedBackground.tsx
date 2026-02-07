"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  brightness: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const nodes: Node[] = []
    const MAX_DIST = 160

    const getColors = () => {
      const isDark = document.documentElement.classList.contains("dark")
      return {
        accent: isDark ? "245, 197, 24" : "140, 110, 20",
        nodeAlpha: isDark ? 0.7 : 0.55,
        lineAlpha: isDark ? 0.25 : 0.2,
        glowAlpha: isDark ? 0.18 : 0.15,
      }
    }

    let colors = getColors()

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      colors = getColors()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const resize = () => {
      const dpr = window.devicePixelRatio
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initNodes = () => {
      nodes.length = 0
      const area = window.innerWidth * window.innerHeight
      const count = Math.min(Math.floor(area / 12000), 150)
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          brightness: Math.random(),
        })
      }
    }

    resize()
    initNodes()
    window.addEventListener("resize", () => {
      resize()
      initNodes()
    })

    const draw = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > W) node.vx *= -1
        if (node.y < 0 || node.y > H) node.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * colors.lineAlpha
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${colors.accent}, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        // Glow for bright nodes
        if (node.brightness > 0.6) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${colors.accent}, ${colors.glowAlpha * node.brightness})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colors.accent}, ${colors.nodeAlpha * (node.brightness * 0.5 + 0.5)})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}
