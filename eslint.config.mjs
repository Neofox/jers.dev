import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import eslintConfigPrettier from "eslint-config-prettier/flat"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      semi: ["warn", "never"],
      "react-hooks/set-state-in-effect": "off",
    },
  },
  eslintConfigPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "dist/**", "next-env.d.ts", "new-design-app/**"]),
])

export default eslintConfig
