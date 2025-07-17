import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import Block from "./Utils/Block"
import { useTranslation } from "@/app/i18n"
import { Title } from "@/components/Utils/Title"

export async function AboutMe() {
  const { t } = await useTranslation()

  return (
    <div id="aboutme" className="h-fit md:col-span-2 md:row-start-2 lg:row-start-1 lg:h-full">
      <Block>
        <Title>{t("aboutme.title")}</Title>
        <p className="lg:h-full">{t("aboutme.text")}</p>
        <div>
          <Link
            href="mailto:jer.schaeffer@gmail.com"
            className="mt-5 inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            <Mail className="ml-1 h-5 w-5" />
            &nbsp; jer.schaeffer@gmail.com
          </Link>
        </div>

        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />

        <div className="inline-flex self-center rounded-md shadow-sm" role="group">
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/jerome-schaeffer/"
            className="inline-flex items-center rounded-l-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
          >
            <Linkedin className="mr-2 h-4 w-4 fill-current" />
            Linkedin
          </Link>
          <Link
            target="_blank"
            href="https://github.com/Neofox"
            className="inline-flex items-center rounded-r-md border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
          >
            <Github className="mr-2 h-4 w-4 fill-current" />
            Github
          </Link>
        </div>
      </Block>
    </div>
  )
}
