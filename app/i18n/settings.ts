export const fallbackLng = 'en'
export const languages: Array<'fr' | 'en' | 'ko'> = [fallbackLng, 'fr', 'ko']
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}