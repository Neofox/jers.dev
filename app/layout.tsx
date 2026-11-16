import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jers.dev"),
  title: "Jérôme Schaeffer — Senior Product Engineer",
  description:
    "Senior product engineer in Seoul. Product interfaces, backend systems, AI and team delivery. Explore my experience and selected work.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jérôme Schaeffer — Senior Product Engineer",
    description: "I build the experience. And what makes it work.",
    url: "https://www.jers.dev",
    type: "website",
    images: [{ url: "/assets/jerome-portrait.jpeg", width: 960, height: 960, alt: "Jérôme Schaeffer" }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-motion="off" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <Script src="https://app.rybbit.io/api/script.js" data-site-id="1712" strategy="afterInteractive" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
