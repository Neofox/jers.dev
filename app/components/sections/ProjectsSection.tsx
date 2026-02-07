"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FolderGit2, ExternalLink, Github } from "lucide-react"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    name: "Jeromesphotographie",
    descriptionKey: "project.desc.jsphotographie",
    tech: ["SvelteKit", "TypeScript"],
    link: "https://github.com/Neofox/jeromesphotography",
  },
  {
    name: "FFTA Events API",
    descriptionKey: "project.desc.ffta",
    tech: ["Symfony", "PHP"],
    link: "https://github.com/Neofox/ffta-events-api",
  },
  {
    name: "neocah",
    descriptionKey: "project.desc.neocah",
    tech: ["React", "Firebase", "TypeScript"],
    link: "https://github.com/Neofox/neocah",
  },
  {
    name: "Camie",
    descriptionKey: "project.desc.camie",
    tech: ["Symfony", "React"],
    link: "https://camie.lu/",
  },
  {
    name: "Objective PHP",
    descriptionKey: "project.desc.objectivephp",
    tech: ["PHP", "PHPUnit"],
    link: "https://github.com/objective-php",
  },
  {
    name: "Slamp",
    descriptionKey: "project.desc.slamp",
    tech: ["PHP"],
    link: "https://github.com/geekdpt/slamp",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    const projectsContainer = projectsRef.current

    if (!section || !headline || !card || !projectsContainer) return

    const projectItems = projectsContainer.querySelectorAll(".project-item")

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
        projectItems,
        { y: 12, opacity: 0 },
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
    <section ref={sectionRef} className="section-pinned z-50">
      <div className="absolute inset-0 flex items-center">
        <div ref={headlineRef} className="headline-display-wrapper absolute top-[22vh] left-[8vw] w-[38vw]">
          <div className="mb-4 flex items-center gap-2">
            <FolderGit2 size={16} style={{ color: "var(--accent)" }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {t("projects.title").toUpperCase()}
            </span>
          </div>
          <h1 className="headline-display text-display-md mb-6">
            <span style={{ color: "var(--text-primary)" }}>{t("projects.subtitle")}</span>
            <br />
            <span style={{ color: "var(--accent)" }}>{t("projects.subtitle.highlight")}</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {t("projects.tagline")}
          </p>
        </div>

        <div ref={cardRef} className="glass-card absolute right-[6vw] bottom-[12vh] w-[min(520px,44vw)] p-8">
          <span className="micro-label mb-5 block">{t("projects.personal-work").toUpperCase()}</span>

          <div ref={projectsRef} className="max-h-[44vh] space-y-3 overflow-y-auto pr-2">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-item group block rounded-lg p-3 transition-colors"
                style={{
                  background: "var(--fact-bg)",
                  border: "1px solid var(--fact-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--fact-border)"
                }}
              >
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="font-mono text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {project.name}
                  </h3>
                  <ExternalLink size={12} style={{ color: "var(--text-muted)" }} />
                </div>
                <p className="mb-2 text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {t(project.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                      style={{
                        background: "var(--skill-bg)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <a
            href="https://github.com/Neofox"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-4 flex w-full items-center justify-center gap-2"
          >
            <Github size={14} />
            {t("projects.view-github")}
          </a>
        </div>
      </div>
    </section>
  )
}
