import type { APIRoute } from "astro"
import { portfolioPages } from "../i18n/pages"
import { localPath } from "../i18n/locale"

export const GET: APIRoute = ({ site }) => {
  const urls = portfolioPages.flatMap(({ path }) =>
    ["en", "ko"].map(locale => {
      const href = localPath(path ? `/${path}/` : "/", locale)
      return `<url><loc>${new URL(href, site).href}</loc></url>`
    }),
  )
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`, { headers: { "Content-Type": "application/xml" } })
}
