import OpenAI from "openai"
import { clientPayload, validateSituation } from "@/lib/portrait-decision.mjs"
import { createPortraitService } from "@/lib/portrait-service.mjs"
import { createGuardedJsonHandler } from "@/lib/request-guard.mjs"

export const runtime = "nodejs"
export const maxDuration = 10

const apiKey = process.env.OPENAI_API_KEY
const client = apiKey ? new OpenAI({ apiKey, maxRetries: 0, timeout: 4000 }) : null
const react = createPortraitService({ client })

export const POST = createGuardedJsonHandler((body: unknown) => react(validateSituation(body)))

export function GET() {
  return Response.json(clientPayload(), { headers: { "Cache-Control": "public, max-age=300" } })
}
