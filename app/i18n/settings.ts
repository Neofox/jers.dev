import { LanguageType } from "@/types/Language"

export const cookieName = "i18next"
export const headerName = "x-i18next-current-language"
export const fallbackLng = "en"
export const languages: Array<LanguageType> = [fallbackLng, "fr", "ko"]
export const defaultNS = "translation"

const runsOnServerSide = typeof window === "undefined"

export function getOptions(
  lng = fallbackLng,
  ns = defaultNS,
): {
  debug: boolean
  supportedLngs: Array<LanguageType>
  fallbackLng: false | string
  lng: string
  fallbackNS: string
  defaultNS: string
  ns: string
  preload: Array<LanguageType>
} {
  return {
    debug: false,
    supportedLngs: languages,
    fallbackLng: process.env.NODE_ENV === "development" ? false : fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    preload: runsOnServerSide ? languages : [],
  }
}

export function getFlagFromLang(country: LanguageType): string {
  // TODO: improve that
  const flags = {
    en: "🇺🇸",
    fr: "🇫🇷",
    ko: "🇰🇷",
  }

  return flags[country]
}
