"use client"

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper"
import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false)

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied"

    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      })

      setLocalStorage("cookie_consent", cookieConsent)
    }
  }, [cookieConsent])

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 mx-auto my-10 max-w-max flex-col items-center justify-between gap-4 rounded-lg bg-slate-200 px-3 py-3 text-gray-900 shadow sm:flex-row md:max-w-(--breakpoint-sm) md:px-4 dark:bg-gray-600 ${cookieConsent != null ? "hidden" : "flex"} `}
    >
      <div className="text-center">
        <p className="dark:text-white">
          I use <span className="font-bold text-sky-700 dark:text-sky-300">cookies</span> on my site.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          aria-label="decline cookies"
          className="rounded-md border-gray-900 px-5 py-2 text-gray-900 dark:text-gray-300"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          aria-label="allow cookies"
          className="rounded-lg bg-gray-900 px-5 py-2 text-white"
          onClick={() => setCookieConsent(true)}
        >
          Allow Cookies
        </button>
      </div>
    </div>
  )
}
