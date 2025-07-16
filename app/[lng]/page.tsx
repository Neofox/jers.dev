import AboutMe from "@/components/AboutMe"
import Education from "@/components/Education"
import Experiences from "@/components/Experiences"
import Header from "@/components/Header"
import Information from "@/components/Information"
import Languages from "@/components/Languages"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Navbar from "@/components/Navbar"
import { LanguageType } from "@/types/Language"

export default async function Home({ params }: { params: Promise<{ lng: LanguageType }> }) {
  const { lng } = await params

  return (
    <div className="bg-[url('/assets/background-light-v1.svg')] dark:bg-[url('/assets/background-dark-v1.svg')]">
      <Navbar lng={lng} />
      <div className="flex h-full justify-center p-5">
        <div className="grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:mt-4 lg:max-w-(--breakpoint-lg) lg:grid-cols-3 2xl:max-w-(--breakpoint-2xl)">
          <Header lng={lng} />
          <Information lng={lng} />
          <Skills lng={lng} />
          <AboutMe lng={lng} />
          <Languages lng={lng} />
          <Experiences lng={lng} />
          <Education lng={lng} />
          <Projects lng={lng} />
        </div>
      </div>
    </div>
  )
}
