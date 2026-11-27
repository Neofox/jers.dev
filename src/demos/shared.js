import { uiText } from "./demo-locale.js"
import { icon } from "../scripts/icons.js"

export function demoShell(name, label, body) {
  return `<div class="demo demo-${name}" role="group" aria-label="${uiText(`Working demo: ${label}`, `${label} 체험`)}"><div class="demo-bar"><span class="demo-tag">${icon("cursor")}${uiText("Working demo · sample data", "체험용 데모 · 예시 데이터")}</span><button type="button" class="demo-reset" data-demo-reset data-focus-id="demo-reset">${uiText("Restart demo", "처음부터 다시")}</button></div>${body}</div>`
}

export const motionEnabled = () => document.documentElement.dataset.motion === "on"
