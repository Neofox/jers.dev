import { defineConfig } from "astro/config"
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite"
import vercel from "@astrojs/vercel"

const redirects = { "/ko/case-studies": { status: 308, destination: "/ko/work/" } }
for (const locale of ["en", "fr", "ko"]) {
  if (locale !== "ko") redirects["/" + locale] = { status: 308, destination: "/" }
  for (const card of ["opengraph-image", "twitter-image"]) {
    redirects["/" + locale + "/" + card] = { status: 308, destination: "/assets/social/" + locale + ".png" }
  }
}

export default defineConfig({
  site: "https://www.jers.dev",
  adapter: vercel({ maxDuration: 10 }),
  vite: { plugins: [wgslVitePlugin()] },
  redirects,
})
