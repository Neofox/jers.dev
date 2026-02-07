"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    const footer = footerRef.current

    if (!section || !headline || !card || !footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headline.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.5,
          },
        },
      )

      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.5,
          },
        },
      )

      gsap.fromTo(
        footer,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            end: "top 70%",
            scrub: 0.5,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-[60] min-h-screen">
      <div className="relative flex min-h-screen flex-col">
        <div className="relative flex flex-1 items-center">
          <div ref={headlineRef} className="headline-display-wrapper absolute top-[22vh] left-[8vw] w-[38vw]">
            <div className="mb-4 flex items-center gap-2">
              <Send size={16} style={{ color: "var(--accent)" }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
                {t("contact.title").toUpperCase()}
              </span>
            </div>
            <h1 className="headline-display text-display-md mb-6">
              <span style={{ color: "var(--text-primary)" }}>{t("contact.subtitle")}</span>
              <br />
              <span style={{ color: "var(--accent)" }}>{t("contact.subtitle.highlight")}</span>
            </h1>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("contact.tagline")}
            </p>
          </div>

          <div ref={cardRef} className="glass-card absolute right-[6vw] bottom-[12vh] w-[min(460px,38vw)] p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="status-dot" />
              <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>
                {t("contact.open-to").toUpperCase()}
              </span>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded"
                  style={{ background: "var(--skill-bg)" }}
                >
                  <Mail size={14} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("contact.email").toUpperCase()}
                  </div>
                  <a href="mailto:jer.schaeffer@gmail.com" className="link-hover text-sm">
                    jer.schaeffer@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded"
                  style={{ background: "var(--skill-bg)" }}
                >
                  <MapPin size={14} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("contact.location").toUpperCase()}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {t("common.city.seoul")}, {t("common.country.ko")}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="mailto:jer.schaeffer@gmail.com"
                className="btn-primary flex flex-1 items-center justify-center gap-2"
              >
                <Mail size={14} />
                {t("contact.email")}
              </a>
              <a
                href="https://www.linkedin.com/in/jerome-schaeffer/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex flex-1 items-center justify-center gap-2"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="relative border-t px-[6vw] py-5"
          style={{ borderColor: "var(--border-accent)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} {t("footer.copyright")}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Neofox"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/jerome-schaeffer/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Linkedin size={18} />
              </a>
            </div>

            <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {t("footer.built-with")}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
