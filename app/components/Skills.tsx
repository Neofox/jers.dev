import { useTranslation } from "@/app/i18n"
import Badge from "./Utils/Badge"
import Block from "./Utils/Block"
import { ProgressBar } from "./Utils/ProgressBar"
import { Title } from "@/components/Utils/Title"

const skills: { key: string; value: number; tags: string[] }[] = [
  { key: "Javascript", value: 90, tags: ["Next", "ReactJS", "Svelte", "Node.js", "jest", "typescript", "jQuery"] },
  { key: "PHP", value: 75, tags: ["Symfony", "Laravel", "PHPUnit"] },
  { key: "Devops", value: 50, tags: ["docker", "Redis", "PostgreSQL", "MariaDB", "git"] },
  { key: "HTML/CSS", value: 60, tags: ["Sass", "tailwind", "bootstrap", "material-UI"] },
]

export async function Skills() {
  const { t } = await useTranslation()

  return (
    <div className="h-fit lg:col-start-1 lg:row-start-3">
      <Block>
        <Title>{t("skills.title")}</Title>
        {skills.map((skill, i) => (
          <div className="mb-7" key={i}>
            <ProgressBar value={skill.value} header={skill.key} />
            <div className="flex flex-wrap gap-y-2">
              {skill.tags.map((tag, j) => (
                <Badge key={j} color="blue">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Block>
    </div>
  )
}

export default Skills
