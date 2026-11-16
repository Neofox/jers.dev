import Script from "next/script"
import markup from "./portfolio.json"

// Trusted, versioned markup from the approved OpenDesign design.
// React owns the outer shell; portfolio.js owns interaction inside it.
export default function Home() {
  return (
    <>
      <div id="portfolio" dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/portfolio.js" strategy="afterInteractive" />
    </>
  )
}
