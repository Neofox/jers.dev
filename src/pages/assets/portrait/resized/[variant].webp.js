import { resolve } from "node:path"
import sharp from "sharp"
import { EXPRESSIONS } from "../../../../../lib/portrait-catalog.mjs"
import { portraitWidths } from "../../../../../public/portrait-core.mjs"

export function getStaticPaths() {
  return EXPRESSIONS.flatMap((expression) =>
    ["", "cutout-"].flatMap(prefix => portraitWidths.map((width) => ({
      params: { variant: `${prefix}${expression}-${width}` },
      props: { expression, width, cutout: Boolean(prefix) },
    }))),
  )
}

export async function GET({ props: { expression, width, cutout } }) {
  const original = resolve("public/assets/portrait", cutout ? "cutout" : "", `portrait-${expression}.webp`)
  const data = await sharp(original).resize(width).webp({ quality: 82 }).toBuffer()
  return new Response(data, { headers: { "Content-Type": "image/webp" } })
}
