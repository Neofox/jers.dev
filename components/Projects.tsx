import { LanguageType } from "@/types/Language";
import { ProjectType } from "../types/Project";
import Block from "./Utils/Block";
import ListProject from "./Utils/ListProject";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const projects: ProjectType[] = [
    {
        begin: new Date("2019"),
        name: "Camie",
        type: "project.type.webapp",
        description: "project.desc.camie",
        link: "https://camie.lu/",
        technologies: ["php", "symfony", "reactJS", "MariaDB", "phpunit"],
    },
    {
        begin: new Date("2015"),
        name: "Objective PHP",
        type: "project.type.phpframework",
        description: "project.desc.objectivephp",
        link: "https://github.com/objective-php",
        technologies: ["php", "phpunit"],
    },
    {
        begin: new Date("2016"),
        name: "Slamp",
        type: "project.type.asyncphplib",
        description: "project.desc.slamp",
        link: "https://github.com/geekdpt/slamp",
        technologies: ["php", "phpunit"],
    },
    {
        begin: new Date("2023"),
        name: "Jeromesphotographie",
        type: "project.type.webapp",
        description: "project.desc.jsphotographie",
        link: "https://github.com/Neofox/jeromesphotography",
        technologies: ["svelte", "jest", "sveltekit", "typescript"],
    },
    {
        begin: new Date("2020"),
        name: "neocah",
        type: "project.type.multiwebgame",
        description: "project.desc.neocah",
        link: "https://github.com/Neofox/neocah",
        technologies: ["javascript", "typescript", "reactJS", "firebase"],
    },
    {
        begin: new Date("2022"),
        name: "FFTA Events API",
        type: "project.type.restapi",
        description: "project.desc.ffta",
        link: "https://github.com/Neofox/ffta-events-api",
        technologies: ["php", "symfony", "phpunit"],
    },
];

const Projects: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:col-span-2 lg:col-start-2">
            <Block>
                <Title>{t("projects.title")}</Title>

                <ol className="relative m-2">
                    {projects
                        .sort((a, b) => b.begin.getTime() - a.begin.getTime())
                        .map((project, i) => (
                            <ListProject key={i} project={project} lng={lng} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Projects;
