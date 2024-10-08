"use client";

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);

        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? "granted" : "denied";

        if (window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: newValue,
            });

            setLocalStorage("cookie_consent", cookieConsent);
        }
    }, [cookieConsent]);

    return (
        <div
            className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 text-gray-900
                         px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         dark:bg-gray-600 bg-slate-200 rounded-lg shadow ${cookieConsent != null ? "hidden" : "flex"} `}
        >
            <div className="text-center">
                <p className="dark:text-white">
                    I use <span className="font-bold dark:text-sky-300 text-sky-700">cookies</span> on my site.
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    aria-label="decline cookies"
                    className="px-5 py-2 dark:text-gray-300 text-gray-900 rounded-md border-gray-900"
                    onClick={() => setCookieConsent(false)}
                >
                    Decline
                </button>
                <button
                    aria-label="allow cookies"
                    className="bg-gray-900 px-5 py-2 text-white rounded-lg"
                    onClick={() => setCookieConsent(true)}
                >
                    Allow Cookies
                </button>
            </div>
        </div>
    );
}
