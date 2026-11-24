import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import astro from "eslint-plugin-astro"
import globals from "globals"

export default defineConfig([
  globalIgnores([".astro/**", ".next/**", ".vercel/**", "dist/**", "new-design-app/**"]),
  js.configs.recommended,
  ...astro.configs.recommended,
  { files: ["**/*.{js,mjs}"], languageOptions: { globals: globals.node } },
  { files: ["public/**/*.{js,mjs}", "src/{scripts,demos}/**/*.js"], languageOptions: { globals: globals.browser } },
  { rules: { "no-empty": ["error", { allowEmptyCatch: true }] } },
])
