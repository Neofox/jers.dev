"use client";

import { useState } from "react";
import Availability from "./Utils/Availability";
import { MdModeNight, MdLightMode } from "react-icons/md";

const languages: { flag: string; name: string; code: string }[] = [
    { flag: "🇺🇸", name: "English", code: "en" },
    { flag: "🇫🇷", name: "French", code: "fr" },
    { flag: "🇰🇷", name: "Korean", code: "ko" },
];

const Navbar: React.FC = () => {
    const [langOpen, setLangOpen] = useState(false);

    return (
        <>
            <nav className="shadow-md0 border-gray-200 bg-transparent backdrop-blur-md">
                <div className="mx-auto flex flex-wrap items-center justify-between p-1">
                    <Availability isAvailable />

                    <div className="flex items-center ">
                        <button
                            type="button"
                            onClick={() => setLangOpen(!langOpen)}
                            className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="h-10 w-10 rounded-full border p-1 text-xl shadow-sm">
                                {languages[0].flag}
                            </span>
                            <span className="ml-2 hidden md:inline">{languages[0].name}</span>
                        </button>

                        <button
                            type="button"
                            className="mr-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <MdModeNight className="h-10 w-10 rounded-full border p-1" />
                        </button>
                    </div>
                </div>
            </nav>
            {langOpen && (
                <div className="absolute right-20 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700">
                    <ul className="py-2 font-medium" role="none">
                        {languages.map(lang => (
                            <li key={lang.code}>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                    role="menuitem"
                                >
                                    <div className="inline-flex items-center">
                                        <span className="text-md mr-2 h-3.5 w-3.5 rounded-full">{lang.flag}</span>
                                        {lang.name}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
