"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2 } from "lucide-react"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    titleKey: "skills.frontend",
    skills: ["Next.js", "React", "Svelte", "TypeScript", "Tailwind"],
  },
  {
    titleKey: "skills.backend",
    skills: ["Node.js", "Symfony", "Laravel", "PostgreSQL", "Redis"],
  },
  {
    titleKey: "skills.devops",
    skills: ["Docker", "Git", "CI/CD", "Linux"],
  },
  {
    titleKey: "skills.testing",
    skills: ["Jest", "PHPUnit", "Cypress", "Playwright"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    const skillsContainer = skillsRef.current

    if (!section || !headline || !card || !skillsContainer) return

    const skillItems = skillsContainer.querySelectorAll(".skill-category")

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
      scrollTl.fromTo(
        skillItems,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", stagger: 0.03 },
        0.08,
      )

      // EXIT (0.85 → 1.0)
      scrollTl.fromTo(headline.children, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
      scrollTl.fromTo(card, { y: 0, opacity: 1 }, { y: -30, opacity: 0, ease: "power2.in" }, 0.85)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-pinned z-30">
      <div className="absolute inset-0 flex items-center">
        <div ref={headlineRef} className="headline-display-wrapper absolute top-[22vh] left-[8vw] w-[38vw]">
          <div className="mb-4 flex items-center gap-2">
            <Code2 size={16} style={{ color: "var(--accent)" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {t("skills.technologies").toUpperCase()}
            </span>
          </div>
          <h1 className="headline-display text-display-md mb-6">
            <span style={{ color: "var(--text-primary)" }}>{t("skills.subtitle")}</span>
            <br />
            <span style={{ color: "var(--accent)" }}>{t("skills.subtitle.highlight")}</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t("skills.tagline")}
          </p>
        </div>

        <div ref={cardRef} className="glass-card absolute right-[6vw] bottom-[12vh] w-[min(500px,42vw)] p-8">
          <span className="micro-label mb-5 block">{t("skills.technologies").toUpperCase()}</span>

          <div ref={skillsRef} className="space-y-4">
            {skillCategories.map((category, index) => (
              <div key={index} className="skill-category">
                <div className="mb-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                  {t(category.titleKey)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
