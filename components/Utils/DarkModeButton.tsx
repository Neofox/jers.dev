"use client";

import { useTheme } from "next-themes";
import { MdLightMode, MdModeNight } from "react-icons/md";

const DarkModeButton: React.FC = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button
            type="button"
            aria-label="theme selector"
            onClick={() => (currentTheme == "dark" ? setTheme("light") : setTheme("dark"))}
            className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
            {currentTheme == "dark" ? (
                <MdLightMode className="h-10 w-10 rounded-full border p-1" />
            ) : (
                <MdModeNight className="h-10 w-10 rounded-full border p-1" />
            )}
        </button>
    );
};

export default DarkModeButton;
