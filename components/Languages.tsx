import Block from "./Utils/Block";
import ProgressBar from "./Utils/ProgressBar";
import Title from "./Utils/Title";

const languages: { key: string; value: number }[] = [
    { key: "French", value: 95 },
    { key: "English", value: 75 },
    { key: "Korean", value: 40 },
    { key: "German", value: 10 },
];

const Languages: React.FC = () => (
    <div className="h-fit md:h-full lg:h-fit">
        <Block>
            <Title>Spoken languages</Title>
            {languages.map((language, i) => (
                <div className="mb-3" key={i}>
                    <ProgressBar value={language.value} header={language.key} />
                </div>
            ))}
        </Block>
    </div>
);

export default Languages;
