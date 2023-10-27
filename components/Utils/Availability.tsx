"use client";

import { useTranslation } from "@/app/i18n/client";
import { LanguageType } from "@/types/Language";
import Link from "next/link";
import { MdEventAvailable } from "react-icons/md";

const Availability: React.FC<{ isAvailable?: boolean; lng: LanguageType }> = ({ isAvailable = false, lng }) => {
    const { t } = useTranslation(lng);

    return (
        <Link
            href="mailto:jer.schaeffer@gmail.com"
            className={`${
                !isAvailable ? "opacity-0" : ""
            } mx-2 inline-flex items-center justify-center rounded-lg border bg-green-50 px-5 py-2 text-base font-medium text-gray-700 hover:bg-green-100 hover:text-gray-900 dark:bg-green-900 dark:text-gray-300 dark:hover:bg-green-700 dark:hover:text-white`}
        >
            <MdEventAvailable className="mr-3 h-6 w-6" />
            <span className="w-full">{t("availability.open")}</span>
        </Link>
    );
};

export default Availability;
