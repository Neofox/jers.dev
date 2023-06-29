import { LanguageType } from "@/types/Language";
import { ProjectType } from "../types/Project";
import Block from "./Utils/Block";
import ListProject from "./Utils/ListProject";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const projects: ProjectType[] = [
    {
        begin: new Date("2019"),
        name: "Camile",
        type: "Web Application",
        description: `Complete development of a management application for nurseries`,
        link: "https://camie.lu/",
        technologies: ["php", "symfony", "reactJS", "MariaDB", "phpunit"],
    },
    {
        begin: new Date("2015"),
        name: "Objective PHP",
        type: "PHP Framework",
        description: `Development of a PHP micro framework.`,
        link: "https://github.com/objective-php",
        technologies: ["php", "phpunit"],
    },
    {
        begin: new Date("2016"),
        name: "Slamp",
        type: "Asynchronous PHP Slack client",
        description: `Development of a slack PHP client using asynchronous features.`,
        link: "https://github.com/geekdpt/slamp",
        technologies: ["php", "phpunit"],
    },
    {
        begin: new Date("2023"),
        name: "Jeromesphotographie",
        type: "Web app",
        description: `Personal Photography portfolio written in PHP and using ReactJS`,
        link: "https://github.com/Neofox/jeromesphotography",
        technologies: ["svelte", "jest", "sveltekit", "typescript"],
    },
    {
        begin: new Date("2023"),
        name: "neocah",
        type: "Multiplayer Web game",
        description: `Adaptation of the card game "Cards Against Humanity" as a web game`,
        link: "https://github.com/Neofox/neocah",
        technologies: ["javascript", "typescript", "reactJS", "firebase"],
    },
    {
        begin: new Date("2022"),
        name: "FFTA Events API",
        type: "RESTFUL API",
        description: `API providing the list of all archery events from the French Archery Federation by scraping the official website`,
        link: "https://github.com/Neofox/ffta-events-api",
        technologies: ["php", "symfony", "phpunit"],
    },
];

const Projects: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:col-span-2 lg:col-start-2">
            <Block>
                <Title>Projects</Title>

                <ol className="relative m-2">
                    {projects
                        .sort((a, b) => b.begin.getTime() - a.begin.getTime())
                        .map((project, i) => (
                            <ListProject key={i} project={project} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Projects;
