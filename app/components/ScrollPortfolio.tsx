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
    return () => {
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
