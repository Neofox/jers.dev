import { LanguageType } from "@/types/Language";
import Block from "./Utils/Block";
import ProgressBar from "./Utils/ProgressBar";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const languages: { key: string; value: number }[] = [
    { key: "common.fr", value: 95 },
    { key: "common.en", value: 75 },
    { key: "common.ko", value: 40 },
    { key: "common.de", value: 10 },
];

const Languages: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:h-full lg:h-fit">
            <Block>
                <Title>{t("languages.title")}</Title>
                {languages.map((language, i) => (
                    <div className="mb-3" key={i}>
                        <ProgressBar value={language.value} header={t(language.key)} />
                    </div>
                ))}
            </Block>
        </div>
    );
};

export default Languages;
