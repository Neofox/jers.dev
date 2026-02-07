"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin, Monitor, Award, User } from "lucide-react"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  const facts = [
    { icon: Calendar, labelKey: "information.experience.value", sublabelKey: "information.experience.key" },
    { icon: Monitor, labelKey: "information.remote.value", sublabelKey: "information.remote.key" },
    { icon: MapPin, label: "Seoul", sublabelKey: "common.country.ko" },
    { icon: Award, label: "Zend", sublabel: "Certified PHP" },
  ]

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current

    if (!section || !headline || !card) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=50%",
          pin: true,
          pinSpacing: false,
          scrub: 0.6,
        },
      })

      // ENTRANCE (0 → 0.18)
      scrollTl.fromTo(
        headline.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", stagger: 0.015 },
        0,
      )
      scrollTl.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.03)

      // EXIT (0.85 → 1.0)
      scrollTl.fromTo(headline.children, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
      scrollTl.fromTo(card, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-pinned z-20">
      <div className="absolute inset-0 flex items-center">
        <div ref={headlineRef} className="headline-display-wrapper absolute top-[22vh] left-[8vw] w-[38vw]">
          <div className="mb-4 flex items-center gap-2">
            <User size={16} style={{ color: "var(--accent)" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {t("aboutme.title").toUpperCase()}
            </span>
          </div>
          <h1 className="headline-display text-display-md mb-6">
            <span style={{ color: "var(--text-primary)" }}>{t("aboutme.subtitle")}</span>
            <br />
            <span style={{ color: "var(--accent)" }}>{t("aboutme.subtitle.highlight")}</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t("aboutme.short")}
          </p>
        </div>

        <div ref={cardRef} className="glass-card absolute right-[6vw] bottom-[12vh] w-[min(480px,40vw)] p-8">
          <span className="micro-label mb-5 block">{t("information.title").toUpperCase()}</span>

          <div className="grid grid-cols-2 gap-3">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg p-3"
                style={{
                  background: "var(--fact-bg)",
                  border: "1px solid var(--fact-border)",
                }}
              >
                <fact.icon size={16} style={{ color: "var(--accent)" }} />
                <div>
                  <div className="font-mono text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {fact.label ?? t(fact.labelKey!)}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {fact.sublabel ?? t(fact.sublabelKey!)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
