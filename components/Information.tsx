import Block from "./Utils/Block";
import Title from "./Utils/Title";

const informations: { key: string; value: string }[] = [
    { key: "Location", value: "Seoul, South Korea" },
    { key: "Experience", value: "8+ years" },
    { key: "Remote work", value: "No/Hybrid" },
    { key: "Relocation", value: "No" },
];

const Information: React.FC = () => (
    <div className="h-fit md:h-full lg:col-start-1 lg:row-start-2 lg:h-fit">
        <Block>
            <Title>Informations</Title>
            <div className="w-4/5 columns-2">
                {informations.map((info, i) => {
                    return (
                        <div key={i} className="py-2 text-gray-500">
                            {info.key}
                        </div>
                    );
                })}
                {informations.map((info, i) => {
                    return (
                        <div key={i} className=" text-gray-900 dark:text-white w-36 py-2 font-semibold">
                            {info.value}
                        </div>
                    );
                })}
            </div>
        </Block>
    </div>
);

export default Information;
