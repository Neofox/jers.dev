import { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://jers.dev"),
  title: {
    default: "Jérôme Schaeffer",
    template: "%s | Jérôme Schaeffer",
  },
  description:
    "Software engineer based in Seoul, South Korea. Building web applications with TypeScript, React, and cloud-native technologies.",
  authors: [{ name: "Jérôme Schaeffer", url: "https://jers.dev" }],
  creator: "Jérôme Schaeffer",
  keywords: [
    "Jérôme Schaeffer",
    "software engineer",
    "web developer",
    "TypeScript",
    "React",
    "Next.js",
    "Seoul",
    "LLM",
    "AI",
    "portfolio",
  ],
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    siteName: "Jérôme Schaeffer",
    locale: "en_US",
    images: [{ url: "/en/opengraph-image", width: 1200, height: 630, alt: "Jérôme Schaeffer — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@neofox_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/en",
      fr: "/fr",
      ko: "/ko",
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
