"use client"

import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, Download, Mail, Terminal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { useTranslation } from "@/app/i18n/client"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const card = cardRef.current
    const scrollIndicator = scrollIndicatorRef.current
    if (!section || !headline || !card) return

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline()

      loadTl.fromTo(
        headline.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 },
        "-=0.5",
      )

      loadTl.fromTo(card, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")

      // Scroll exit
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=80%",
          pin: true,
          scrub: 0.6,

          onLeaveBack: () => {
            gsap.set(headline.children, { y: 0, opacity: 1 })
            gsap.set(card, { y: 0, opacity: 1 })
            if (scrollIndicator) gsap.set(scrollIndicator, { opacity: 1 })
          },
        },
      })

      // EXIT only (0.85 → 1.0) — explicit durations keep the fade confined to the end of the pin
      scrollTl.fromTo(
        headline.children,
        { y: 0, opacity: 1 },
        { y: -40, opacity: 0, duration: 0.15, ease: "power2.in" },
        0.85,
      )
      scrollTl.fromTo(card, { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.15, ease: "power2.in" }, 0.85)
      if (scrollIndicator) {
        scrollTl.fromTo(scrollIndicator, { opacity: 1 }, { opacity: 0, duration: 0.15, ease: "power2.in" }, 0.85)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10 grid grid-cols-1 gap-6 px-[4vw] pt-[10vh] pb-[72px] md:grid-cols-2 md:grid-rows-[1fr_auto] md:gap-0 md:pt-[22vh] md:pr-[6vw] md:pb-8 md:pl-[8vw]"
    >
      {/* Headline - Left Side */}
      <div ref={headlineRef} className="md:w-[40vw] md:self-start">
        <div className="mb-4 flex items-center gap-2">
          <Terminal size={16} style={{ color: "var(--accent)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--text-secondary)" }}>
            {t("header.job-title").toUpperCase()}
          </span>
        </div>
        <h1 className="headline-display text-display-lg mb-4">
          <span className="block" style={{ color: "var(--text-primary)" }}>
            JÉRÔME
          </span>
          <span className="block" style={{ color: "var(--accent)" }}>
            SCHAEFFER
          </span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {t("header.tagline")}
        </p>
      </div>

      {/* Content Card - Bottom Right */}
      <div ref={cardRef} className="glass-card p-4 md:w-[min(480px,40vw)] md:self-end md:justify-self-end md:p-8">
        {/* Profile picture + status */}
        <div className="mb-4 flex items-center gap-4">
          <Image
            src="/assets/pict210113.jpeg"
            alt="Jérôme Schaeffer"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
            style={{ border: "2.5px solid var(--border-accent)" }}
            priority
          />
          <div>
            <div className="font-mono text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Jérôme Schaeffer
            </div>
            <div className="flex items-center gap-1.5">
              <div className="status-dot" />
              <span className="font-mono text-[10px]" style={{ color: "var(--text-secondary)" }}>
                {t("availability.status")}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {t("information.location.key").toUpperCase()}
            </span>
            <span style={{ color: "var(--text-primary)" }}>
              {t("common.city.seoul")}, {t("common.country.ko")}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {t("information.experience.key").toUpperCase()}
            </span>
            <span style={{ color: "var(--text-primary)" }}>{t("information.experience.value")}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {t("information.focus.key").toUpperCase()}
            </span>
            <span style={{ color: "var(--text-primary)" }}>{t("information.focus.value")}</span>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {["React", "Next.js", "TypeScript", "Vue.js", "MCP", "Claude"].map((skill) => (
            <span key={skill} className="skill-tag" style={{ fontSize: "10px", padding: "0.25rem 0.5rem" }}>
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            download
            href="/assets/resume.pdf"
            prefetch={false}
            target="_blank"
            className="btn-primary flex flex-1 items-center justify-center gap-2"
          >
            <Download size={14} />
            CV
          </Link>
          <a
            href="mailto:jer.schaeffer@gmail.com"
            aria-label="Send Email"
            className="btn-secondary flex flex-1 items-center justify-center gap-2"
          >
            <Mail size={14} />
            {t("contact.email")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="col-span-full justify-self-center"
        style={{ animation: "bounce-soft 2s ease-in-out infinite", color: "var(--text-muted)" }}
      >
        <ChevronDown size={20} />
      </div>
    </section>
  )
}
