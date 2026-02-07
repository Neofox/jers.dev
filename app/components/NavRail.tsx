"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Terminal, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useTranslation } from "@/app/i18n/client"
import { getFlagFromLang, languages } from "@/app/i18n/settings"
import { LanguageType } from "@/types/Language"

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: "hero", labelKey: "nav.hero" },
  { id: "about", labelKey: "nav.about" },
  { id: "skills", labelKey: "nav.skills" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "contact", labelKey: "nav.contact" },
]

export default function NavRail() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()

  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)

      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sectionElements = sections.map((sec) => ({
        id: sec.id,
        element: document.getElementById(sec.id),
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const sec = sectionElements[i]
        if (sec?.element) {
          if (scrollPosition >= sec.element.offsetTop) {
            setActiveSection(sec.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const wrapperEl = document.getElementById(sectionId)
    if (!wrapperEl) return

    // Find the ScrollTrigger associated with this section's pinned element
    const sectionEl = wrapperEl.querySelector("section")
    const triggers = ScrollTrigger.getAll()
    const trigger = triggers.find((st) => st.trigger === sectionEl)

    if (trigger) {
      // Offset past the entrance animation so content is fully visible
      const pinDistance = trigger.end - trigger.start
      window.scrollTo({ top: trigger.start + pinDistance * 0.25, behavior: "smooth" })
    } else {
      wrapperEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <div
        className={`utility-cluster fixed top-4 right-4 z-[100] flex items-center gap-1 px-2 py-1.5 transition-all duration-500 md:top-5 md:right-5 ${
          isVisible ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-base transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {getFlagFromLang(i18n.language as LanguageType)}
          </button>
          {langOpen && !isVisible && (
            <div
              className="absolute top-full right-0 mt-1 overflow-hidden rounded-lg py-1"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--card-border)",
                backdropFilter: "blur(12px)",
              }}
            >
              {languages
                .filter((lang) => lang !== i18n.language)
                .map((lang) => (
                  <Link
                    key={lang}
                    href={`/${lang}`}
                    onClick={() => setLangOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--skill-bg)"
                      e.currentTarget.style.color = "var(--accent)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                      e.currentTarget.style.color = "var(--text-secondary)"
                    }}
                  >
                    <span>{getFlagFromLang(lang)}</span>
                    <span className="font-mono text-xs break-keep">{t(`common.${lang}`)}</span>
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            aria-label="Toggle theme"
          >
            {currentTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>

      {/* Desktop: Left rail */}
      <nav
        className={`nav-rail fixed top-0 left-0 z-[100] hidden h-full transition-all duration-500 md:block ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        style={{ width: "68px" }}
      >
        <div className="flex h-full flex-col items-center py-5">
          {/* Logo */}
          <div className="mb-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition-colors"
              style={{
                borderColor: "var(--border-accent)",
                background: "var(--skill-bg)",
              }}
            >
              <Terminal size={15} style={{ color: "var(--accent)" }} />
            </button>
          </div>

          {/* Section Dots */}
          <div className="flex flex-1 flex-col items-center gap-5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex cursor-pointer items-center justify-center"
                aria-label={t(section.labelKey)}
              >
                <div className={`nav-dot ${activeSection === section.id ? "active" : ""}`} />
                <span
                  className="pointer-events-none absolute left-full ml-3 rounded px-2 py-1 font-mono text-[10px] whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-accent)",
                    color: "var(--accent)",
                  }}
                >
                  {t(section.labelKey)}
                </span>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {getFlagFromLang(i18n.language as LanguageType)}
              </button>
              {langOpen && (
                <div
                  className="absolute bottom-full left-full mb-1 ml-1 overflow-hidden rounded-lg py-1"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--card-border)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {languages
                    .filter((lang) => lang !== i18n.language)
                    .map((lang) => (
                      <Link
                        key={lang}
                        href={`/${lang}`}
                        onClick={() => setLangOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--skill-bg)"
                          e.currentTarget.style.color = "var(--accent)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                          e.currentTarget.style.color = "var(--text-secondary)"
                        }}
                      >
                        <span>{getFlagFromLang(lang)}</span>
                        <span className="font-mono text-xs break-keep">{t(`common.${lang}`)}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                aria-label="Toggle theme"
              >
                {currentTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Divider */}
            <div className="my-1 h-px w-5" style={{ background: "var(--border-accent)" }} />

            {/* Social */}
            <a
              href="https://github.com/Neofox"
              target="_blank"
              aria-label="GitHub"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/jerome-schaeffer/"
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile: Bottom bar */}
      <nav
        className={`nav-mobile fixed right-0 bottom-0 left-0 z-[100] block md:hidden ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } transition-all duration-500`}
      >
        <div className="flex items-center px-4 py-3">
          {/* Section dots */}
          <div className="flex flex-1 items-center justify-center gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="flex cursor-pointer items-center justify-center p-1"
                aria-label={t(section.labelKey)}
              >
                <div className={`nav-dot ${activeSection === section.id ? "active" : ""}`} />
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-base transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {getFlagFromLang(i18n.language as LanguageType)}
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 bottom-full mb-2 overflow-hidden rounded-lg py-1"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--card-border)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {languages
                    .filter((lang) => lang !== i18n.language)
                    .map((lang) => (
                      <Link
                        key={lang}
                        href={`/${lang}`}
                        onClick={() => setLangOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span>{getFlagFromLang(lang)}</span>
                        <span className="font-mono text-xs break-keep">{t(`common.${lang}`)}</span>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors"
                style={{ color: "var(--text-muted)" }}
                aria-label="Toggle theme"
              >
                {currentTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
