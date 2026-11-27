import { studyPaths } from "../data/study-paths"

// Discover standalone article templates alongside the two data-driven collections.
const standalone = import.meta.glob("../pages/work/*.astro")
export const portfolioPages = [
  { path: "", template: "index" },
  { path: "career", template: "career" },
  ...Object.keys(standalone).map(file => {
    const template = file.slice("../pages/".length, -".astro".length)
    return { path: template.replace(/\/index$/, ""), template }
  }),
  ...studyPaths().map(({ params, props }) => ({
    path: `work/${params.collection}/${params.project}`,
    template: "work/[collection]/[project]",
    ...props,
  })),
]
