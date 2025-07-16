import { Inter } from "next/font/google"
import Head from "../head"
import Providers from "../Providers"
import { dir } from "i18next"
import { languages } from "../i18n/settings"
import GoogleAnalytics from "@/components/Utils/GoogleAnalytics"
import CookieBanner from "@/components/CookieBanner"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"

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
      <Suspense fallback={<></>}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-MLEGW0GG4H" />
      </Suspense>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <CookieBanner />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
