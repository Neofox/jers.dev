import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 60,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
}

module.exports = nextConfig
