import { MdCalendarMonth } from "react-icons/md";
import { ProjectType } from "../../types/Project";
import Badge from "./Badge";

const ListProject: React.FC<{ project: ProjectType }> = ({ project }) => {
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
                {project.name}&nbsp;<span className="font-normal">-</span>&nbsp;
                <span className="text-sm font-normal italic">{project.type}</span>
            </h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {formatDate(project.begin)}
            </time>

            <p className="my-2 text-base font-normal text-gray-500 dark:text-gray-400">{project.description}</p>
            <div className="mb-3">
                Link to the project:{" "}
                <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href={project.link}>
                    {project.name}
                </a>
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