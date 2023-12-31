"use client";

import { useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./settings";
import { LanguageType } from "@/types/Language";
import cookie from "js-cookie";

const runsOnServerSide = typeof window === "undefined";
export const cookieName = "i18next";

//
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ["path", "htmlTag", "cookie", "navigator"],
        },
        preload: runsOnServerSide ? languages : [],
    });

export function useTranslation(lng: LanguageType, ns?: string, options = {}) {
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;
    if (runsOnServerSide && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
        cookie.set(cookieName, lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (i18n.resolvedLanguage === lng) return;
            i18n.changeLanguage(lng);
            cookie.set(cookieName, lng);
        }, [lng, i18n]);
    }
    return ret;
}
