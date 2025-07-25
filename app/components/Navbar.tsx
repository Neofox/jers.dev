"use client"

import { useState } from "react"
import Link from "next/link"

import Availability from "./Utils/Availability"
import { getFlagFromLang, languages } from "@/app/i18n/settings"
import { useTranslation } from "@/app/i18n/client"
import { LanguageType } from "@/types/Language"
import { ThemeModeToggle } from "@/components/ui/theme-mode-toggle"

export function Navbar() {
  const [langOpen, setLangOpen] = useState(false)
  const { t, i18n } = useTranslation()

  return (
    <>
      <nav className="border-gray-200 bg-transparent shadow-md backdrop-blur-md">
        <div className="mx-auto flex flex-wrap items-center justify-between p-1">
          <Availability isAvailable />

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="h-10 w-10 rounded-full border p-1 text-xl shadow-sm">
                {getFlagFromLang(i18n.language as LanguageType)}
              </span>
              <span className="ml-2 hidden md:inline">{t(`common.${i18n.language}`)}</span>
            </button>

            <ThemeModeToggle />
          </div>
        </div>
      </nav>
      {langOpen && (
        <div className="absolute top-10 right-20 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700">
          <ul className="py-2 font-medium" role="none">
            {languages
              .filter((lang) => lang !== i18n.language) // Exclude the current language
              .map((lang) => (
                <li key={lang}>
                  <Link
                    href={`/${lang}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <div className="inline-flex items-center">
                      <span className="text-md mr-2 h-3.5 w-3.5 rounded-full">{getFlagFromLang(lang)}</span>
                      {t(`common.${lang}`)}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  )
}
