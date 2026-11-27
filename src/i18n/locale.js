/** Portfolio pages exist in English at the root and in Korean under /ko/. */
export function localeFromPath(pathname) {
  return /^\/ko(?:\/|$)/.test(pathname) ? "ko" : "en"
}

/** Accept an internal portfolio URL, including its query or fragment. */
export function localPath(path, locale) {
  const canonical = path.replace(/^\/ko(?=\/|[?#]|$)/, "") || "/"
  const rooted = canonical.startsWith("/") ? canonical : "/" + canonical
  return locale === "ko" ? "/ko" + rooted : rooted
}
