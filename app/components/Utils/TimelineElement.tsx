import { ExperienceType } from "@/types/Experience"
import { useTranslation } from "@/app/i18n"
import { Building2, Calendar1, MapPin } from "lucide-react"

type TimelineElementProps = {
  experience: ExperienceType
}

export async function TimelineElement({ experience }: TimelineElementProps) {
  const { t, i18n } = await useTranslation()

  const formatDate = (date: Date, format = i18n.language): string => {
    return new Intl.DateTimeFormat(format, {
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <li className="mb-10 ml-6">
      <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
        <Calendar1 className="h-3 w-3 text-blue-800 dark:text-blue-300" />
      </span>
      <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
        {t(experience.jobTitle)}&nbsp;
        {!experience.end && (
          <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {t("common.current")}
          </span>
        )}
      </h3>
      <time className="mb-2 block text-sm leading-none font-normal text-gray-400 dark:text-gray-500">
        {formatDate(experience.begin)} - {experience.end ? formatDate(experience.end) : t("common.today")}
      </time>
      <div className="text-gray-700">
        <Building2 className="inline h-4 w-4" />
        <span className="text-sm">&nbsp;{experience.companyName}</span>
      </div>
      <div className="text-gray-700">
        <MapPin className="inline h-4 w-4" />
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
  )
}
