"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import AnimatedBackground from "./AnimatedBackground"
import NavRail from "./NavRail"
import HeroSection from "./sections/HeroSection"
import AboutSection from "./sections/AboutSection"
import SkillsSection from "./sections/SkillsSection"
import ExperienceSection from "./sections/ExperienceSection"
import ProjectsSection from "./sections/ProjectsSection"
import ContactSection from "./sections/ContactSection"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollPortfolio() {
  useEffect(() => {
    // Wait for section ScrollTriggers to initialize, then create global snap
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()

      const pinTriggers = ScrollTrigger.getAll().filter((st) => st.vars.pin)
      const maxScroll = ScrollTrigger.maxScroll(window)
      if (maxScroll === 0 || pinTriggers.length === 0) return

      // Build snap points: top of page, midpoint of each pin, end of last pin, bottom
      const snapPoints = [0] // Top of page (hero fully visible)
      pinTriggers.forEach((st) => {
        snapPoints.push((st.start + st.end) / 2 / maxScroll)
      })
      // End of last pin = where contact section begins
      const lastTrigger = pinTriggers[pinTriggers.length - 1]
      if (lastTrigger) {
        snapPoints.push(lastTrigger.end / maxScroll)
      }
      snapPoints.push(1) // Bottom of page

      ScrollTrigger.create({
        snap: {
          snapTo: snapPoints,
          directional: false,
          duration: { min: 0.2, max: 0.5 },
          delay: 0.15,
          ease: "power1.inOut",
        },
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div className="relative" style={{ background: "var(--bg-primary)" }}>
      {/* Single global animated background */}
      <AnimatedBackground />

      {/* Navigation Rail */}
      <NavRail />

      {/* Main Content */}
      <main className="relative">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  )
}
