const supported = ["en", "ko"]

export function preferredLanguage(saved, acceptLanguage) {
  if (supported.includes(saved)) return saved

  const ranges = new Map()
  const entries = (acceptLanguage ?? "").split(",")
  for (const [order, entry] of entries.entries()) {
    const match = /^(en|ko|\*)(?:-[a-z0-9]{1,8})*\s*(?:;\s*q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?))?$/i.exec(entry.trim())
    if (!match) continue
    const range = match[1].toLowerCase()
    const quality = Number(match[2] ?? 1)
    if (!ranges.has(range) || quality > ranges.get(range).quality) {
      ranges.set(range, { quality, order })
    }
  }

  // An explicit match takes precedence over the wildcard for that language,
  // including q=0. Equally preferred named languages follow the browser's order.
  const candidates = supported.flatMap(language => {
    const exact = ranges.get(language)
    const match = exact ?? ranges.get("*")
    return match?.quality > 0 ? [{ language, exact: Boolean(exact), ...match }] : []
  })
  candidates.sort((a, b) => b.quality - a.quality || Number(b.exact) - Number(a.exact) || a.order - b.order)
  return candidates[0]?.language ?? "en"
}

export function languageSwitchHref(target, search = "", hash = "") {
  const params = new URLSearchParams(search)
  params.set("switchTo", target)
  return "/?" + params.toString() + hash
}
