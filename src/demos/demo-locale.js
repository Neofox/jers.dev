// Demo modules render on demand in the language of the current page.
export function uiText(english, korean) {
  return document.documentElement.lang === "ko" ? korean : english
}
