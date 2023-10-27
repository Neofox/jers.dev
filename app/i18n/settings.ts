import { LanguageType } from "@/types/Language";

export const fallbackLng = "en";
export const languages: Array<LanguageType> = [fallbackLng, "fr", "ko"];
export const defaultNS = "translation";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
    return {
        debug: process.env.NODE_ENV === "development" ? true : false,
        supportedLngs: languages,
        fallbackLng: process.env.NODE_ENV === "development" ? false : fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}
