import { TFunction, createInstance, i18n } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'
import { LanguageType } from '@/types/Language'

const initI18next = async (lng: LanguageType, ns?: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns))
  return i18nInstance
}

export async function useTranslation(lng: LanguageType, ns?: string, options: {keyPrefix?: string} = {}): Promise<{t: TFunction, i18n: i18n}> {
  const i18nextInstance = await initI18next(lng, ns)

  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

export function getFlagFromLang(country: LanguageType): string {
    
    //TODO: improve that
    const flags = {
        en: '🇺🇸',
        fr: '🇫🇷',
        ko: '🇰🇷'
    }

    return flags[country]
}