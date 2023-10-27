/** @type {import('next').NextConfig} */
const nextConfig = {
    staticPageGenerationTimeout: 60,
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development",
    },
};

module.exports = nextConfig;
