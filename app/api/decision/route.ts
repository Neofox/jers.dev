import { createDecisionService } from "@/lib/decisions.mjs"
import { createDecisionHandler } from "@/lib/decision-handler.mjs"

export const runtime = "nodejs"
export const maxDuration = 30

const decide = createDecisionService({ apiKey: process.env.OPENAI_API_KEY })
export const POST = createDecisionHandler(decide)
