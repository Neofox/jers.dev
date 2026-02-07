"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    beginKey: "2025",
    endKey: null,
    titleKey: "jobtitle.dev.frontend",
    company: "3i",
    descriptionKey: "jobdesc.3i",
  },
  {
    beginKey: "2024",
    endKey: "2025",
    titleKey: "jobtitle.dev.senior",
    company: "인핸스",
    descriptionKey: "jobdesc.enhans",
  },
  {
    beginKey: "2023",
    endKey: "2024",
    titleKey: "jobtitle.teacher",
    company: "WCODING",
    descriptionKey: "jobdesc.teacher",
  },
  {
    beginKey: "2021",
    endKey: "2023",
    titleKey: "jobtitle.dev.teamlead",
    company: "Redspher",
    descriptionKey: null,
  },
  {
    beginKey: "2017",
    endKey: "2021",
    titleKey: "jobtitle.dev.senior",
    company: "Flash Global",
    descriptionKey: "jobdesc.dev.senior",
  },
  {
    beginKey: "2015",
    endKey: "2017",
    titleKey: "jobtitle.dev",
    company: "OpCoding",
    descriptionKey: null,
  },
  {
    beginKey: "2015",
    endKey: "2015",
    titleKey: "jobtitle.dev.junior",
    company: "Olkypay",
    descriptionKey: "jobdesc.dev.junior",
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    const timeline = timelineRef.current

    if (!section || !headline || !card || !timeline) return

    const timelineItems = timeline.querySelectorAll(".timeline-entry")

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: true,
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
      scrollTl.fromTo(
        timelineItems,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", stagger: 0.04 },
        0.08,
      )

      // EXIT (0.85 → 1.0)
      scrollTl.fromTo(headline.children, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
      scrollTl.fromTo(card, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-40 grid grid-cols-1 gap-6 px-[4vw] pt-[10vh] pb-[72px] md:grid-cols-2 md:grid-rows-[1fr] md:gap-0 md:pt-[22vh] md:pr-[6vw] md:pb-[12vh] md:pl-[8vw]"
    >
      <div ref={headlineRef} className="md:w-[38vw] md:self-start">
        <div className="mb-4 flex items-center gap-2">
          <Briefcase size={16} style={{ color: "var(--accent)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
            {t("experiences.title").toUpperCase()}
          </span>
        </div>
        <h1 className="headline-display text-display-md mb-6">
          <span style={{ color: "var(--text-primary)" }}>{t("experiences.subtitle")}</span>
          <br />
          <span style={{ color: "var(--accent)" }}>{t("experiences.subtitle.highlight")}</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {t("experiences.tagline")}
        </p>
      </div>

      <div ref={cardRef} className="glass-card p-4 md:w-[min(520px,44vw)] md:self-end md:justify-self-end md:p-8">
        <span className="micro-label mb-5 block">{t("experiences.timeline").toUpperCase()}</span>

        <div ref={timelineRef} className="space-y-0 p-2 md:max-h-[48vh] md:overflow-y-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-entry timeline-item">
              <div className="mb-1 font-mono text-xs" style={{ color: "var(--accent)" }}>
                {exp.beginKey} – {exp.endKey ?? t("common.today").toUpperCase()}
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                {t(exp.titleKey)}
              </div>
              <div className="mb-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {exp.company}
              </div>
              {exp.descriptionKey && (
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={{ __html: t(exp.descriptionKey) }}
                />
              )}
            </div>
          ))}
        </div>

        <Link
          href="/assets/resume.pdf"
          target="_blank"
          style={{ color: "var(--accent)" }}
          prefetch={false}
          className="link-hover mt-4 font-mono text-xs"
        >
          {t("experiences.full-resume")}
          <ExternalLink size={12} />
        </Link>
      </div>
    </section>
  )
}
