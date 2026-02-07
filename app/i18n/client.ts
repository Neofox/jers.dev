"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation as useTranslationI18n } from "react-i18next"
import i18next from "./i18n"

export function useTranslation(ns?: string, options?: Record<string, string>) {
  const lng = useParams()?.lng

  if (typeof lng !== "string") throw new Error("useT is only available inside /app/[lng]")

  const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage)

  useEffect(() => {
    if (activeLng === i18next.resolvedLanguage) return
    setActiveLng(i18next.resolvedLanguage)
  }, [activeLng])

  useEffect(() => {
    if (!lng || i18next.resolvedLanguage === lng) return
    i18next.changeLanguage(lng)
  }, [lng])

  return useTranslationI18n(ns, options)
}
