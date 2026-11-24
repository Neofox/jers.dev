import { icon } from "../scripts/icons.js"

export function demoShell(name, label, body) {
  return `<div class="demo demo-${name}" role="group" aria-label="Working demo: ${label}"><div class="demo-bar"><span class="demo-tag">${icon("cursor")}Working demo · sample data</span><button type="button" class="demo-reset" data-demo-reset data-focus-id="demo-reset">Restart demo</button></div>${body}</div>`
}

export const motionEnabled = () => document.documentElement.dataset.motion === "on"
