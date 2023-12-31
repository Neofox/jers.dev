import { MdCalendarMonth, MdLocationPin, MdWork } from "react-icons/md";
import { ExperienceType } from "@/types/Experience";
import { LanguageType } from "@/types/Language";
import { useTranslation } from "@/app/i18n";

const TimelineElement: React.FC<{ experience: ExperienceType; lng: LanguageType }> = async ({ experience, lng }) => {
    const formatDate = (date: Date, format = lng): string => {
        return new Intl.DateTimeFormat(format, {
            month: "long",
            year: "numeric",
        }).format(date);
    };
    const { t } = await useTranslation(lng);

    return (
        <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdCalendarMonth className="h-3 w-3 text-blue-800 dark:text-blue-300" />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                {t(experience.jobTitle)}&nbsp;
                {!experience.end && (
                    <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {t("common.current")}
                    </span>
                )}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {formatDate(experience.begin)} - {experience.end ? formatDate(experience.end) : t("common.today")}
            </time>
            <div className="text-gray-700">
                <MdWork className="inline h-4 w-4" />
                <span className="text-sm">&nbsp;{experience.companyName}</span>
            </div>
            <div className="text-gray-700">
                <MdLocationPin className="inline h-4 w-4" />
                <span className="text-sm">
                    &nbsp;{t(experience.location.city)} - {t(experience.location.country)}
                </span>
            </div>
            {experience.description && (
                <p
                    className="my-2 text-base font-normal text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: t(experience.description) }}
                ></p>
            )}
        </li>
    );
};

export default TimelineElement;
