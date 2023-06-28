import { EducationType } from "../types/Education";
import Block from "./Utils/Block";
import ListEducation from "./Utils/ListEducation";
import Title from "./Utils/Title";

const educations: EducationType[] = [
    {
        begin: new Date("2009"),
        end: new Date("2012"),
        name: "Professional Baccalaureate in Electronic Engineering",
        schoolName: "Lycée Polyvalent Jean-Baptiste Schwilgué",
    },
    {
        begin: new Date("2012"),
        end: new Date("2014"),
        name: "BTEC Higher National Diploma, IT",
        schoolName: "IUT Robert SCHUMAN",
    },
];

const Education: React.FC = () => {
    return (
        <div className="h-fit md:col-span-2 lg:col-span-1 lg:col-start-1  ">
            <Block>
                <Title>Education</Title>

                <ol className="relative m-2">
                    {educations
                        .sort((a, b) => b.begin.getTime() - a.begin.getTime())
                        .map((education, i) => (
                            <ListEducation key={i} education={education} />
                        ))}
                </ol>
            </Block>
        </div>
    );
};

export default Education;
