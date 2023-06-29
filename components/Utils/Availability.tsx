import { LanguageType } from "@/types/Language";
import { useTranslation } from "react-i18next";
import { MdEventAvailable } from "react-icons/md";

const Availability: React.FC<{ isAvailable?: boolean; lng: LanguageType }> = async ({ isAvailable = false, lng }) => {
    const { t } = useTranslation(lng);

    return (
        <a
            href="mailto:jer.schaeffer@gmail.com"
            className={`${
                !isAvailable ? "opacity-0" : ""
            } mx-2 inline-flex items-center justify-center rounded-lg border bg-green-50 px-5 py-2 text-base font-medium text-gray-700 hover:bg-green-100 hover:text-gray-900 dark:bg-green-900 dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white`}
        >
            <MdEventAvailable className="mr-3 h-6 w-6" />
            <span className="w-full">{t("availability.open")}</span>
        </a>
    );
};

export default Availability;
