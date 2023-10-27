import { LanguageType } from "@/types/Language";
import Badge from "./Utils/Badge";
import Block from "./Utils/Block";
import ProgressBar from "./Utils/ProgressBar";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const skills: { key: string; value: number; tags: string[] }[] = [
    { key: "PHP", value: 90, tags: ["Symfony", "Laravel", "PHPUnit"] },
    { key: "Javascript", value: 80, tags: ["ReactJS", "Svelte", "Node.js", "jest", "typescript", "jQuery"] },
    { key: "Devops", value: 50, tags: ["docker", "Redis", "PostgreSQL", "MariaDB", "git"] },
    { key: "HTML/CSS", value: 50, tags: ["tailwind", "bootstrap", "material-UI"] },
];

const Skills: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

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
    );
};

export default Skills;
