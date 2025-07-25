import { useTranslation } from "@/app/i18n"
import Block from "./Utils/Block"
import { ProgressBar } from "./Utils/ProgressBar"
import { Title } from "@/components/Utils/Title"

const languages: { key: string; value: number }[] = [
  { key: "common.fr", value: 100 },
  { key: "common.en", value: 85 },
  { key: "common.ko", value: 65 },
  { key: "common.de", value: 10 },
]

export async function Languages() {
  const { t } = await useTranslation()

  return (
    <div className="h-fit md:h-full lg:h-fit">
      <Block>
        <Title>{t("languages.title")}</Title>
        {languages.map((language, i) => (
          <div className="mb-3" key={i}>
            <ProgressBar value={language.value} header={t(language.key)} />
          </div>
        ))}
      </Block>
    </div>
  )
}
