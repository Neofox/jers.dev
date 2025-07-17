import i18next from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next/initReactI18next"
import { getOptions } from "./settings"
import { LanguageType } from "@/types/Language"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: LanguageType, namespace: string) => import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  })

export default i18next
