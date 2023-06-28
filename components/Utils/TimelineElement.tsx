import { MdCalendarMonth, MdLocationPin, MdWork } from "react-icons/md";
import { ExperienceType } from "../../types/Experience";

const TimelineElement: React.FC<{ experience: ExperienceType }> = ({ experience }) => {
    const formatDate = (date: Date, format = "en-GB"): string => {
        return new Intl.DateTimeFormat(format, {
            month: "long",
            year: "numeric",
        }).format(date);
    };

    return (
        <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdCalendarMonth className="h-3 w-3 text-blue-800 dark:text-blue-300" />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                {experience.jobTitle}&nbsp;
                {!experience.end && (
                    <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Current
                    </span>
                )}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {formatDate(experience.begin)} - {experience.end ? formatDate(experience.end) : "Today"}
            </time>
            <div className="text-gray-700">
                <MdWork className="inline h-4 w-4" />
                <span className="text-sm">&nbsp;{experience.companyName}</span>
            </div>
            <div className="text-gray-700">
                <MdLocationPin className="inline h-4 w-4" />
                <span className="text-sm">&nbsp;{experience.location}</span>
            </div>
            <p className="my-2 text-base font-normal text-gray-500 dark:text-gray-400">{experience.description}</p>
        </li>
    );
};

export default TimelineElement;
