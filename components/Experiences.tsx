import { LanguageType } from "@/types/Language";
import { ExperienceType } from "../types/Experience";
import Block from "./Utils/Block";
import TimelineElement from "./Utils/TimelineElement";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const experiences: ExperienceType[] = [
    {
        begin: new Date("2015-03"),
        end: new Date("2015-11"),
        jobTitle: "Junior Web Developer",
        companyName: "Olkypay",
        location: "Livange - Luxembourg",
        description: `Development of a payment application using the Symfony 2 framework.
        Implementation of monitoring of servers and webservices.`,
    },
    {
        begin: new Date("2015-11"),
        end: new Date("2017-02"),
        jobTitle: "Web Developer",
        companyName: "OpCoding",
        location: "Metz - France",
    },
    {
        begin: new Date("2017-02"),
        end: new Date("2021-02"),
        jobTitle: "Senior Web Developer",
        companyName: "Flash Global",
        location: "Contern - Luxembourg",
        description: `Implementation of technical services in legacy applications
        Migrating a PHP 5 application park in PHP 7
        Modernization of a legacy stack
        Training developers to new tools throughout their implementation
        Upgrading the development stack with the usage of Docker`,
    },
    {
        begin: new Date("2021-02"),
        end: new Date("2023-03"),
        jobTitle: "Team Lead Web Developer",
        companyName: "Redspher",
        location: "Strasbourg - France",
    },
    {
        begin: new Date("2023-03"),
        jobTitle: "Fullstack Web Teacher",
        companyName: "WCODING",
        location: "Seoul - South Korea",
        description: `Teaching to complete beginner and experienced people
        CSS, HTML, PHP, Javascript, MySQL`,
    },
];

const Experiences: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:col-span-2 lg:row-span-3 lg:row-start-2 lg:h-full">
            <Block>
                <Title>{t("experiences.title")}</Title>
                <ol className="relative border-l border-gray-200 py-2 dark:border-gray-700">
                    {experiences
                        .sort((expA, expB) => expB.begin.getTime() - expA.begin.getTime())
                        .map((exp, i) => (
                            <TimelineElement key={i} experience={exp} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Experiences;
