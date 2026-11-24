import { getSecret } from "astro:env/server"
import OpenAI from "openai"
import { clientPayload, validateSituation } from "../../../lib/portrait-decision.mjs"
import { createPortraitService } from "../../../lib/portrait-service.mjs"
import { createGuardedJsonHandler } from "../../../lib/request-guard.mjs"

export const prerender = false

const apiKey = getSecret("OPENAI_API_KEY")
const client = apiKey ? new OpenAI({ apiKey, maxRetries: 0, timeout: 4000 }) : null
const react = createPortraitService({ client })
const handlePost = createGuardedJsonHandler((body) => react(validateSituation(body)))

export function POST({ request }) {
  return handlePost(request)
}

export function GET() {
  return Response.json(clientPayload(), { headers: { "Cache-Control": "public, max-age=300" } })
}
