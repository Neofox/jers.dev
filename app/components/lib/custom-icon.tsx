"use client"

import { type SVGProps, useEffect, useRef, useState } from "react"
import { cn } from "@/components/lib/utils"

export type IconCode = "history" | "logo" | "avatar" | "left-arrow" | "right-arrow" | "chevron" | "more" | "new_chat"

const DEFAULT_SVG_SIZE = 24

type Props = SVGProps<SVGSVGElement> & {
  code: IconCode
  eager?: boolean
}

export function CustomIcon({ code, className, eager = false, ...props }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const [inView, setInView] = useState(eager)

  // Lazy loading of icons when in view, unless eager is true
  useEffect(() => {
    if (eager) {
      setInView(true)
      return
    }
    const isCompatible = "IntersectionObserver" in window
    if (isCompatible) {
      const svg = ref.current
      if (svg) {
        const observer = new IntersectionObserver(([entry]) => setInView(entry!.isIntersecting), {
          rootMargin: `${DEFAULT_SVG_SIZE}px`,
        })
        observer.observe(svg)
        return () => {
          observer.unobserve(svg)
        }
      }
      return undefined
    } else {
      setInView(true)
      return undefined
    }
  }, [eager])

  const href = inView ? `/assets/icons/${code}.svg#icon` : undefined

  return (
    <svg ref={ref} width={DEFAULT_SVG_SIZE} height={DEFAULT_SVG_SIZE} className={cn("text-icon", className)} {...props}>
      <use href={href} />
    </svg>
  )
}
