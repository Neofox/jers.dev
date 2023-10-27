import { LanguageType } from "@/types/Language";
import Block from "./Utils/Block";
import Title from "./Utils/Title";
import { useTranslation } from "@/app/i18n";

const informations: { key: string; value: string }[] = [
    { key: "information.location.key", value: "information.location.value" },
    { key: "information.experience.key", value: "information.experience.value" },
    { key: "information.remote.key", value: "information.remote.value" },
    { key: "information.relocation.key", value: "common.no" },
];

const Information: React.FC<{ lng: LanguageType }> = async ({ lng }) => {
    const { t } = await useTranslation(lng);

    return (
        <div className="h-fit md:h-full lg:col-start-1 lg:row-start-2 lg:h-fit">
            <Block>
                <Title>{t("information.title")}</Title>
                <div className="columns-2">
                    {informations.map((info, i) => {
                        return (
                            <div key={i} className="py-2 md:text-sm text-gray-500">
                                {t(info.key)}
                            </div>
                        );
                    })}
                    {informations.map((info, i) => {
                        return (
                            <div key={i} className=" text-gray-900 md:text-sm dark:text-white md:w-36 py-2 font-medium">
                                {t(info.value)}
                            </div>
                        );
                    })}
                </div>
            </Block>
        </div>
    );
};

export default Information;
