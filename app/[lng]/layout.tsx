import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import Script from "next/script"
import { dir } from "i18next"

import Providers from "@/app/provider"
import { languages } from "@/app/i18n/settings"

const inter = Inter({ subsets: ["latin"] })

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
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
    <html lang={lng} dir={dir(lng)} className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <Script src="https://app.rybbit.io/api/script.js" data-site-id="1712" strategy="afterInteractive" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
