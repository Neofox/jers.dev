import { enhansStudies } from "./enhans-studies"
import { sideStudies } from "./side-studies"

export function studyPaths() {
  return [
    ...enhansStudies.map(study => ({
      params: { collection: "enhans", project: study.slug },
      props: { study, employer: "Enhans" as const },
    })),
    ...sideStudies.map(study => ({
      params: { collection: "side-projects", project: study.slug },
      props: { study, employer: "Independent" as const },
    })),
  ]
}
