import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import { dir } from "i18next"
import { Metadata } from "next"

import Providers from "@/app/provider"
import { languages } from "@/app/i18n/settings"
import { LanguageType } from "@/types/Language"

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

const localeMap: Record<LanguageType, string> = {
  en: "en_US",
  fr: "fr_FR",
  ko: "ko_KR",
}

const titles: Record<LanguageType, string> = {
  en: "Jérôme Schaeffer — Software Engineer",
  fr: "Jérôme Schaeffer — Ingénieur Logiciel",
  ko: "Jérôme Schaeffer — 소프트웨어 엔지니어",
}

const descriptions: Record<LanguageType, string> = {
  en: "Software engineer based in Seoul, South Korea. Building web applications with TypeScript, React, and cloud-native technologies.",
  fr: "Ingénieur logiciel basé à Séoul, Corée du Sud. Développement d'applications web avec TypeScript, React et technologies cloud-native.",
  ko: "서울에 기반을 둔 소프트웨어 엔지니어. TypeScript, React 및 클라우드 네이티브 기술로 웹 애플리케이션을 개발합니다.",
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params
  const locale = lng as LanguageType

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      locale: localeMap[locale],
      title: titles[locale],
      description: descriptions[locale],
    },
    alternates: {
      canonical: `/${lng}`,
      languages: {
        "x-default": "/en",
        en: "/en",
        fr: "/fr",
        ko: "/ko",
      },
    },
  }
}

export default async function LngLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params

  return (
    <html lang={lng} dir={dir(lng)} className="h-full" suppressHydrationWarning>
      <head>
        <Script src="https://app.rybbit.io/api/script.js" data-site-id="1712" strategy="afterInteractive" />
      </head>
      <body className={dmSans.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
