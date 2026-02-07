import { ImageResponse } from "next/og"
import { LanguageType } from "@/types/Language"

export const runtime = "edge"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Jérôme Schaeffer — Software Engineer"

const taglines: Record<LanguageType, string> = {
  en: "Software Engineer · Seoul, South Korea",
  fr: "Ingénieur Logiciel · Séoul, Corée du Sud",
  ko: "소프트웨어 엔지니어 · 서울, 대한민국",
}

const subtitles: Record<LanguageType, string> = {
  en: "TypeScript · React · Cloud-Native",
  fr: "TypeScript · React · Cloud-Native",
  ko: "TypeScript · React · 클라우드 네이티브",
}

export default async function OgImage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const locale = lng as LanguageType

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
          fontFamily: "monospace",
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #c8a848, transparent)",
          }}
        />

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            width: "40px",
            height: "40px",
            borderLeft: "2px solid #c8a848",
            borderTop: "2px solid #c8a848",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            width: "40px",
            height: "40px",
            borderRight: "2px solid #c8a848",
            borderBottom: "2px solid #c8a848",
            display: "flex",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#f4f1eb",
            letterSpacing: "-1px",
            display: "flex",
          }}
        >
          Jérôme Schaeffer
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "80px",
            height: "3px",
            background: "#c8a848",
            margin: "24px 0",
            display: "flex",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#c8a848",
            fontWeight: 500,
            display: "flex",
          }}
        >
          {taglines[locale]}
        </div>

        {/* Tech subtitle */}
        <div
          style={{
            fontSize: "20px",
            color: "#7a7a7a",
            marginTop: "16px",
            fontWeight: 400,
            display: "flex",
          }}
        >
          {subtitles[locale]}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "60px",
            fontSize: "18px",
            color: "#4a4a4a",
            display: "flex",
          }}
        >
          jers.dev
        </div>
      </div>
    ),
    { ...size },
  )
}
