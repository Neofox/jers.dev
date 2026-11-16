import { notFound, permanentRedirect } from "next/navigation"

export default async function LegacyLocale({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  if (!["en", "fr", "ko"].includes(lng)) notFound()
  permanentRedirect("/")
}
