import Block from "./Utils/Block"
import { Title } from "@/components/Utils/Title"
import { useTranslation } from "@/app/i18n"

const informations: { key: string; value: string }[] = [
  { key: "information.location.key", value: "$t(common.city.seoul), $t(common.country.ko)" },
  { key: "information.experience.key", value: "information.experience.value" },
  { key: "information.remote.key", value: "information.remote.value" },
  { key: "information.relocation.key", value: "common.no" },
]

export async function Information() {
  const { t } = await useTranslation()

  return (
    <div className="h-fit md:h-full lg:col-start-1 lg:row-start-2 lg:h-fit">
      <Block>
        <Title>{t("information.title")}</Title>
        <div className="columns-2">
          {informations.map((info, i) => {
            return (
              <div key={i} className="py-2 text-gray-500 md:text-sm">
                {t(info.key)}
              </div>
            )
          })}
          {informations.map((info, i) => {
            return (
              <div key={i} className="py-2 font-medium text-gray-900 md:w-36 md:text-sm dark:text-white">
                {t(info.value)}
              </div>
            )
          })}
        </div>
      </Block>
    </div>
  )
}
