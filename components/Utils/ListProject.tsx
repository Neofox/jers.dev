import { MdCalendarMonth } from "react-icons/md";
import { ProjectType } from "../../types/Project";
import Badge from "./Badge";
import Link from "next/link";
import { LanguageType } from "@/types/Language";
import { useTranslation } from "@/app/i18n";

const ListProject: React.FC<{ project: ProjectType; lng: LanguageType }> = async ({ project, lng }) => {
    const formatDate = (date: Date, format = lng): string => {
        return new Intl.DateTimeFormat(format, {
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
                {project.name}&nbsp;<span className="font-normal">-</span>&nbsp;
                <span className="text-sm font-normal italic">{t(project.type)}</span>
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {formatDate(project.begin)}
            </time>

            {project.description && (
                <p
                    className="my-2 text-base font-normal text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: t(project.description) }}
                ></p>
            )}
            <div className="mb-3">
                {t("project.link")}:{" "}
                <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href={project.link}>
                    {project.name}
                </Link>
            </div>
            <div className="mb-7">
                <div className="flex flex-wrap gap-y-2">
                    {project.technologies.map((techno, i) => (
                        <Badge key={i} color="blue">
                            {techno}
                        </Badge>
                    ))}
                </div>
            </div>
        </li>
    );
};

export default ListProject;
