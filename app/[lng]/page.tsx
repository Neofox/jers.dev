import { AboutMe } from "@/components/AboutMe"
import { Education } from "@/components/Education"
import { Experiences } from "@/components/Experiences"
import { Header } from "@/components/Header"
import { Languages } from "@/components/Languages"
import { Navbar } from "@/components/Navbar"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { Information } from "@/components/Information"

export default async function Home() {
  return (
    <div className="bg-[url('/assets/background-light-v1.svg')] dark:bg-[url('/assets/background-dark-v1.svg')]">
      <Navbar />
      <div className="flex h-full justify-center p-5">
        <div className="grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:mt-4 lg:max-w-(--breakpoint-lg) lg:grid-cols-3 2xl:max-w-(--breakpoint-2xl)">
          <Header />
          <Information />
          <Skills />
          <AboutMe />
          <Languages />
          <Experiences />
          <Education />
          <Projects />
        </div>
      </div>
    </div>
  )
}
