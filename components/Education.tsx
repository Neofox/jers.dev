import { LanguageType } from "@/types/Language";
import { EducationType } from "../types/Education";
import Block from "./Utils/Block";
import ListEducation from "./Utils/ListEducation";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const educations: EducationType[] = [
    {
        begin: new Date("2009"),
        end: new Date("2012"),
        name: "education.bac",
        schoolName: "Lycée Polyvalent Jean-Baptiste Schwilgué",
    },
    {
        begin: new Date("2012"),
        end: new Date("2014"),
        name: "education.dut",
        schoolName: "IUT Robert SCHUMAN",
    },
];

const Education: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:col-span-2 lg:col-span-1 lg:col-start-1  ">
            <Block>
                <Title>{t("education.title")}</Title>

                <ol className="relative m-2">
                    {educations
                        .sort((a, b) => b.begin.getTime() - a.begin.getTime())
                        .map((education, i) => (
                            <ListEducation key={i} education={education} lng={lng} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Education;
