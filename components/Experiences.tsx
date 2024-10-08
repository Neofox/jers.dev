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
        jobTitle: "jobtitle.dev.junior",
        companyName: "Olkypay",
        location: {
            city: "common.city.livange",
            country: "common.country.lu",
        },
        description: "jobdesc.dev.junior",
    },
    {
        begin: new Date("2015-11"),
        end: new Date("2017-02"),
        jobTitle: "jobtitle.dev",
        companyName: "OpCoding",
        location: {
            city: "common.city.metz",
            country: "France",
        },
    },
    {
        begin: new Date("2017-02"),
        end: new Date("2021-02"),
        jobTitle: "jobtitle.dev.senior",
        companyName: "Flash Global",
        location: {
            city: "common.city.contern",
            country: "common.country.lu",
        },
        description: "jobdesc.dev.senior",
    },
    {
        begin: new Date("2021-02"),
        end: new Date("2023-03"),
        jobTitle: "jobtitle.dev.teamlead",
        companyName: "Redspher",
        location: {
            city: "common.city.strasbourg",
            country: "common.country.fr",
        },
    },
    {
        begin: new Date("2023-03"),
        end: new Date("2023-12"),
        jobTitle: "jobtitle.teacher",
        companyName: "WCODING",
        location: {
            city: "common.city.seoul",
            country: "common.country.ko",
        },
        description: "jobdesc.teacher",
    },
    {
        begin: new Date("2024-03"),
        jobTitle: "jobtitle.dev.senior",
        companyName: "인핸스",
        location: {
            city: "common.city.seoul",
            country: "common.country.ko",
        },
        description: "jobdesc.enhans",
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
                            <TimelineElement key={i} experience={exp} lng={lng} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Experiences;
