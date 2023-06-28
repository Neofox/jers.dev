import AboutMe from '@/components/AboutMe'
import Education from '@/components/Education'
import Experiences from '@/components/Experiences'
import Header from '@/components/Header'
import Information from '@/components/Information'
import Languages from '@/components/Languages'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

export default function Home() {
  
  return (
    <div className="bg-[url('/background-light-v1.svg')] dark:bg-[url('/background-dark-v1.svg')]">
            <Navbar />
            <div className="flex h-full justify-center p-5">
                <div className="grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:mt-4 lg:max-w-screen-lg lg:grid-cols-3 2xl:max-w-screen-2xl">
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
