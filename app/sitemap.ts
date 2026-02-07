import { MetadataRoute } from "next"
import { languages } from "@/app/i18n/settings"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jers.dev"

  const languageAlternates = Object.fromEntries(languages.map((lng) => [lng, `${baseUrl}/${lng}`]))

  return languages.map((lng) => ({
    url: `${baseUrl}/${lng}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: languageAlternates,
    },
  }))
}
