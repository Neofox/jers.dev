import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"

import Head from "@/app/head"
import Providers from "@/app/provider"
import { languages } from "@/app/i18n/settings"
import CookieBanner from "@/components/ui/cookie-banner"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jerome Schaeffer",
  description: "Resume of Jerome Schaeffer",
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params

  return (
    <html lang={lng} dir={dir(lng)} className="h-full scroll-smooth" suppressHydrationWarning>
      <Head />
      <body className={inter.className}>
        <Providers>{children}</Providers>
        {/* <CookieBanner /> */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
