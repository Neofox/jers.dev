import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel"

const redirects = {}
for (const locale of ["en", "fr", "ko"]) {
  redirects["/" + locale] = { status: 308, destination: "/" }
  for (const card of ["opengraph-image", "twitter-image"]) {
    redirects["/" + locale + "/" + card] = { status: 308, destination: "/assets/social/" + locale + ".png" }
  }
}

export default defineConfig({
  site: "https://www.jers.dev",
  adapter: vercel({ maxDuration: 10 }),
  redirects,
})
