import { FlatCompat } from "@eslint/eslintrc"
// import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintConfigPrettier from "eslint-config-prettier/flat"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  {
    rules: {
      semi: ["warn", "never"],
    },
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // ...pluginQuery.configs["flat/recommended"],
  eslintConfigPrettier,
]

export default eslintConfig
