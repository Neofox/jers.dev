import { MdCalendarMonth, MdSchool } from "react-icons/md";
import { EducationType } from "../../types/Education";

const ListEducation: React.FC<{ education: EducationType }> = ({ education }) => {
    const formatDate = (date: Date, format = "en-GB"): string => {
        return new Intl.DateTimeFormat(format, {
            year: "numeric",
        }).format(date);
    };

    return (
        <li className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                <MdCalendarMonth className="h-3 w-3 text-blue-800 dark:text-blue-300" />
            </span>
            <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                {education.name}&nbsp;
                {!education.end && (
                    <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Current
                    </span>
                )}
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {formatDate(education.begin)} - {education.end ? formatDate(education.end) : "Today"}
            </time>
            <div className="text-gray-700">
                <MdSchool className="inline h-4 w-4" />
                <span className=" text-sm">&nbsp;{education.schoolName}</span>
            </div>
        </li>
    );
};

export default ListEducation;
