"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "../lib/utils"

export function ThemeModeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      aria-label="theme selector"
      onClick={() => (currentTheme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={cn(
        "mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
        className,
      )}
    >
      {currentTheme == "dark" ? (
        <Sun className="h-10 w-10 rounded-full border p-1" />
      ) : (
        <Moon className="h-10 w-10 rounded-full border p-1" />
      )}
    </button>
  )
}
