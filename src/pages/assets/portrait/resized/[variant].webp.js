import { resolve } from "node:path"
import sharp from "sharp"
import { EXPRESSIONS } from "../../../../../lib/portrait-catalog.mjs"
import { portraitWidths } from "../../../../../public/portrait-core.mjs"

export function getStaticPaths() {
  return EXPRESSIONS.flatMap((expression) =>
    portraitWidths.map((width) => ({
      params: { variant: `${expression}-${width}` },
      props: { expression, width },
    })),
  )
}

export async function GET({ props: { expression, width } }) {
  const original = resolve("public/assets/portrait", `portrait-${expression}.webp`)
  const data = await sharp(original).resize(width).webp({ quality: 82 }).toBuffer()
  return new Response(data, { headers: { "Content-Type": "image/webp" } })
}
