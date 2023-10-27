import { LanguageType } from "@/types/Language";

export const fallbackLng = "en";
export const languages: Array<LanguageType> = [fallbackLng, "fr", "ko"];
export const defaultNS = "translation";

export function getOptions(
    lng = fallbackLng,
    ns = defaultNS
): {
    debug: boolean;
    supportedLngs: Array<LanguageType>;
    fallbackLng: false | string;
    lng: string;
    fallbackNS: string;
    defaultNS: string;
    ns: string;
} {
    return {
        debug: false,
        supportedLngs: languages,
        fallbackLng: false,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
