import ScrollPortfolio from "@/components/ScrollPortfolio"
import { LanguageType } from "@/types/Language"

const jobTitles: Record<LanguageType, string> = {
  en: "Frontend Engineer",
  fr: "Ingénieur Frontend",
  ko: "프론트엔드 엔지니어",
}

function JsonLd({ lng }: { lng: LanguageType }) {
  const baseUrl = "https://jers.dev"

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jérôme Schaeffer",
    url: baseUrl,
    image: `${baseUrl}/${lng}/opengraph-image`,
    jobTitle: jobTitles[lng],
    email: "mailto:jer.schaeffer@gmail.com",
    sameAs: ["https://github.com/Neofox", "https://www.linkedin.com/in/jerome-schaeffer/", "https://x.com/neofox_"],
    knowsAbout: [
      { "@type": "Thing", name: "TypeScript", sameAs: "https://en.wikipedia.org/wiki/TypeScript" },
      { "@type": "Thing", name: "React", sameAs: "https://en.wikipedia.org/wiki/React_(software)" },
      { "@type": "Thing", name: "Next.js", sameAs: "https://en.wikipedia.org/wiki/Next.js" },
      { "@type": "Thing", name: "Vue.js", sameAs: "https://en.wikipedia.org/wiki/Vue.js" },
      { "@type": "Thing", name: "Node.js", sameAs: "https://en.wikipedia.org/wiki/Node.js" },
      { "@type": "Thing", name: "Model Context Protocol" },
      { "@type": "Thing", name: "Claude" },
      { "@type": "Thing", name: "Large language model", sameAs: "https://en.wikipedia.org/wiki/Large_language_model" },
      {
        "@type": "Thing",
        name: "Artificial intelligence",
        sameAs: "https://en.wikipedia.org/wiki/Artificial_intelligence",
      },
    ],
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "Korean", alternateName: "ko" },
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jérôme Schaeffer",
    url: baseUrl,
    inLanguage: [lng],
    author: { "@type": "Person", name: "Jérôme Schaeffer" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  )
}

export default async function Home({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params

  return (
    <>
      <JsonLd lng={lng as LanguageType} />
      <ScrollPortfolio />
    </>
  )
}
