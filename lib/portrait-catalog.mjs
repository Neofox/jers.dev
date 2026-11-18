// Single source of truth for everything the living portrait can react to.
// Server code uses ITEMS (facts and asides); the browser only gets clientCatalog().
// Asides are a DRAFT until Jérôme approves them. They may express feeling but must not
// add any fact, number or claim that is not already in the résumé copy (public/portfolio.js).
// Bump CATALOG_VERSION whenever items, facts or asides change (it keys the prompt cache).

export const CATALOG_VERSION = 2

export const EXPRESSIONS = ["neutral", "smile", "grin", "proud", "wince", "laugh", "thinking", "surprised"]

export const EXPRESSION_DESCRIPTIONS = {
  neutral: "calm, attentive, no particular feeling",
  smile: "warm and friendly, quietly pleased",
  grin: "playful and a little mischievous",
  proud: "satisfied with the work, chin up",
  wince: "a small grimace at a hard or painful memory",
  laugh: "amused, laughing out loud",
  thinking: "curious, weighing something up",
  surprised: "caught off guard, eyebrows up",
}

export const ACTIONS = ["open_project", "open_demo", "download_resume", "dwell", "reach_end", "idle", "return"]
export const HIGH_PRIORITY = ["open_project", "open_demo", "download_resume"]

function item(kind, label, defaultExpression, facts, asides) {
  return { kind, label, facts, asides: asides.map((text, i) => ({ id: `a${i + 1}`, text })), defaultExpression }
}

export const ITEMS = {
  "project:3i": item(
    "project",
    "3i (2025–present)",
    "proud",
    [
      "Develops the Beamo digital-twin viewer in React/Three.js: panoramas, Gaussian Splatting, BIM/IMDF.",
      "Sole frontend developer for four core Vue 3 web apps.",
      "Runs company-wide Claude adoption with MCP servers and role-based access.",
    ],
    [
      "Three jobs in one role. I'm still enjoying every one of them.",
      "Beamo, Pivo and Claude adoption: my current playground.",
      "Sole frontend dev is a lot of hats. I like wearing them.",
    ],
  ),
  "project:enhans": item(
    "project",
    "Enhans (2024–25)",
    "smile",
    [
      "Built React/Next.js AI products and SaaS prototypes from architecture to deployment.",
      "AIAP, Enhans Model and Select LLM: visual workflows and multi-LLM comparison.",
      "ACT-1, Synergy and Chrome extensions: LLM web agents and automation.",
    ],
    [
      "Making AI something people can actually use. That was the fun part.",
      "A whole family of AI products. I loved the variety.",
      "From architecture to deployment, all in one place. Good times.",
    ],
  ),
  "project:rubiwin": item(
    "project",
    "Rubiwin & Supplier Portal",
    "proud",
    [
      "Full-stack work on Rubiwin and Supplier Portal, logistics products for the carrier network.",
      "Combined hands-on development with team leadership at Redspher.",
      "Worked with PMs and POs to plan and deliver features.",
    ],
    [
      "A leader who kept building. That's how I like it.",
      "Leading a team without ever leaving the code. Proud of that.",
      "Logistics software taught me a lot about people too.",
    ],
  ),
  "project:translater": item(
    "project",
    "Translater",
    "smile",
    [
      "Personal translation tool for daily life, English and Korean.",
      "Friends, Casual and Professional tones as a starting point.",
      "Up to three removable refinements regenerate the whole result.",
    ],
    [
      "Say it like you mean it. That's the whole idea.",
      "The words are only half the job. Tone is the other half.",
      "A small tool I'd actually use myself.",
    ],
  ),
  "project:kaltoe-timer": item(
    "project",
    "Kaltoe Timer",
    "grin",
    [
      "Menu-bar countdown built around Korean office flex-time rules.",
      "Handles Flex clock-in, lunch, a weekly overtime cap and time off.",
      "One shared core for the macOS menu bar and the Linux tray.",
    ],
    [
      "A tiny app that answers 'when can I go home?'. Very satisfying.",
      "Making a number understandable is harder than it sounds.",
      "Small surface, real constraints. My favourite kind of puzzle.",
    ],
  ),
  "project:neoharness": item(
    "project",
    "Neoharness",
    "thinking",
    [
      "Personal agent runtime on Elixir/OTP with a Phoenix LiveView chat interface.",
      "Each agent keeps its own memory, skills, schedules and conversations.",
      "Supervision isolates failures; tool calling is bounded.",
    ],
    [
      "A conversation should not be a dead end. That's what I'm chasing here.",
      "Still building this one. I think about it a lot.",
      "Agents that remember and recover. That's the dream.",
    ],
  ),
  "project:gleamstral": item(
    "project",
    "Gleamstral",
    "smile",
    [
      "Typed Gleam client for Mistral: chat, vision, tools, embeddings, agents, structured output.",
      "Requests and responses stay independent of the HTTP client.",
      "Documented examples are the entry point for other developers.",
    ],
    [
      "Make AI easier to build with. Open source and proud of it.",
      "I like keeping the transport out of the way.",
      "A tidy little library. Hope other developers enjoy it.",
    ],
  ),

  "demo:3i/beamo": item(
    "demo",
    "Beamo 3D viewer",
    "proud",
    [
      "Working demo with sample data: measure a room, build a box, orbit or walk, cut a section.",
      "Click an element to inspect its BIM properties.",
      "Beamo turns captures of real sites into digital twins; I develop its React/Three.js viewer.",
    ],
    [
      "Still proud of this one.",
      "Go on, measure something. It's a lot of fun.",
      "Try the first-person mode. Walking through a twin feels great.",
    ],
  ),
  "demo:3i/coaches": item(
    "demo",
    "Pivo Coaches",
    "smile",
    [
      "Working demo on fictional coaches: discipline, language, certification and new-student filters.",
      "Sort, paging and profiles.",
      "I designed and built the public equestrian coach catalog.",
    ],
    [
      "I designed and built this one. Happy to show it off.",
      "Filters, sorting, profiles. Go ahead and play.",
      "Finding the right coach should feel easy.",
    ],
  ),
  "demo:3i/cs": item(
    "demo",
    "Pivo CS report triage",
    "thinking",
    [
      "Working demo with invented reports: filter the queue and inspect device details.",
      "Record an investigation update on a support report.",
      "The CS/QA intranet is a React product I designed and built.",
    ],
    [
      "Triage is detective work. I like detective work.",
      "A tidy queue makes a support team's day better.",
      "I built the real one. This is the friendly version.",
    ],
  ),
  "demo:3i/live": item(
    "demo",
    "Pivo Meet",
    "grin",
    [
      "Working demo of a remote lesson for two, with sample participants.",
      "Layouts, mic and camera, guest-granted camera control, cloud recording states, leave survey.",
      "Meet brings coaches and students into a remote lesson.",
    ],
    [
      "Nobody's actually on camera here. Promise.",
      "Try the guest control toggle. It's a fun detail.",
      "A remote lesson for two, with nobody to wave at.",
    ],
  ),
  "demo:3i/library": item(
    "demo",
    "Pivo Cloud",
    "smile",
    [
      "Working demo: galleries grouped by day, select mode with share, download and delete rules.",
      "A keyboard viewer and the storage bar.",
      "Cloud organizes uploaded and lesson videos.",
    ],
    [
      "A video library you can really work through. I like this one.",
      "Keyboard users, this viewer is for you.",
      "Tidy galleries make me happy.",
    ],
  ),
  "demo:kaltoe-timer/phases": item(
    "demo",
    "Kaltoe workday",
    "grin",
    [
      "Working demo: scrub through a workday and watch lunch, leave and overtime phases.",
      "Fill length tracks the phase; color tracks the whole day.",
      "Follows the app's own rules.",
    ],
    [
      "Scrub away. Time travel without the paperwork.",
      "Two meanings, kept apart. I'm quite pleased with that.",
      "Color for the whole day, length for the phase. Neat.",
    ],
  ),
  "demo:translater/refine": item(
    "demo",
    "Translater refinements",
    "thinking",
    [
      "Working demo: pick a tone, stack up to three refinements or simulate a failure.",
      "A refinement regenerates the whole result coherently.",
      "If refinement fails, the previous result stays available.",
    ],
    [
      "Adjust the intention, not just the text.",
      "Try breaking it. It recovers, I promise.",
      "Three chips, one coherent result.",
    ],
  ),
  "demo:neoharness/turn": item(
    "demo",
    "Neoharness turn",
    "thinking",
    [
      "Working demo of one agent turn: thinking, tool calls with results, the reply and the stats bar.",
      "Or a heartbeat that skips itself.",
      "Tool calling is bounded; activity stays inspectable.",
    ],
    [
      "Watch it think, step by step. I find it oddly relaxing.",
      "A heartbeat that skips itself. I love that detail.",
      "Inspectable activity is what I care about most here.",
    ],
  ),
  "demo:gleamstral/request": item(
    "demo",
    "Gleamstral request builder",
    "smile",
    [
      "Working demo: set options and watch the exact request the library builds.",
      "Decode a sample reply. Nothing is sent.",
      "Typed request in, plain HTTP out.",
    ],
    [
      "Typed in, plain HTTP out. I find that satisfying.",
      "Nothing is sent, so poke around freely.",
      "Seeing the exact request is my favourite part.",
    ],
  ),
  "demo:enhans/act": item(
    "demo",
    "Enhans ACT-1",
    "proud",
    [
      "Working demo with a fictional research task: task progress and grouped action logs.",
      "Based on the ACT-1 interface I built.",
      "ACT is an AI assistant for carrying out tasks.",
    ],
    [
      "I built the real interface behind this. Following an agent's work is fun.",
      "Grouped logs make an agent's work easy to follow.",
      "The task is made up, but I enjoyed building this one.",
    ],
  ),
  "demo:enhans/workflow": item(
    "demo",
    "Enhans AIAP workflow",
    "thinking",
    [
      "Working demo of an AIAP workflow: inspect connected blocks and change the translation language.",
      "Follow processing, completion or an error.",
      "Visual workflows make the setup understandable.",
    ],
    [
      "Connect the input to something useful. That's the game.",
      "Blocks and arrows. I never get bored of them.",
      "Go on, trigger the error. It's educational.",
    ],
  ),
  "demo:enhans/compare": item(
    "demo",
    "Enhans model comparison",
    "surprised",
    [
      "Working demo based on Select LLM: select sample models and watch results arrive.",
      "Switch output variants and inspect a sample evaluation.",
      "Responses, rankings and metrics are invented.",
    ],
    [
      "Different answers, side by side. Models can be surprising.",
      "The rankings are invented, so don't quote me on them.",
      "Making answers comparable is harder than it looks.",
    ],
  ),
  "demo:enhans/recorder": item(
    "demo",
    "Enhans action recorder",
    "grin",
    [
      "Working demo based on the imitation-learning Chrome extension.",
      "Track interactions inside a sample page, inspect the event log and annotate actions.",
      "Makes browser actions inspectable.",
    ],
    [
      "Every click gets logged. Yes, even that one.",
      "Annotate away. Browser actions deserve a paper trail.",
      "I like watching the event log fill up.",
    ],
  ),

  "career:3i": item(
    "career",
    "3i (Sep 2025–present)",
    "proud",
    [
      "Frontend Developer & AX Engineer, Sep 2025 to present.",
      "Develops the Beamo viewer, maintains four core Vue 3 web apps as sole frontend developer.",
      "Built the CS/QA intranet and public coach catalog; runs company-wide Claude adoption.",
    ],
    [
      "My current chapter, and I'm enjoying it.",
      "Frontend and AI engineering in one role. Lucky me.",
      "Still writing this chapter.",
    ],
  ),
  "career:enhans": item(
    "career",
    "Enhans (2024–25)",
    "smile",
    [
      "Frontend Developer, Mar 2024 to Sep 2025.",
      "Built React/Next.js AI products and SaaS prototypes from architecture to deployment.",
      "AIAP, Enhans Model, Select LLM, ACT-1, Synergy and Chrome extensions.",
    ],
    [
      "A fun chapter. So many AI products to build.",
      "Architecture to deployment. I liked owning the whole path.",
      "Good memories from this one.",
    ],
  ),
  "career:wcoding": item(
    "career",
    "WCODING (2023)",
    "grin",
    [
      "Full-stack Web Development Instructor, Mar to Nov 2023.",
      "Designed curriculum and projects, reviewed learners' work and mentored them.",
      "Taught HTML, CSS, JavaScript, PHP and MySQL.",
    ],
    [
      "Teaching taught me more than I expected.",
      "I loved watching learners get it.",
      "Reviewing code is a different kind of fun.",
    ],
  ),
  "career:redspher": item(
    "career",
    "Redspher (2021–23)",
    "proud",
    [
      "Full-stack Developer & Team Lead, Feb 2021 to Mar 2023.",
      "Led a development team and built a React/TypeScript/Node logistics portal.",
      "Coordinated with PMs and POs and mentored developers.",
    ],
    [
      "Leading a team, and still coding. I'm proud of this chapter.",
      "I learned a lot about people here.",
      "Mentoring developers is one of my favourite things.",
    ],
  ),
  "career:flash": item(
    "career",
    "Flash Europe International (2017–21)",
    "wince",
    [
      "Full-stack Developer, Feb 2017 to Feb 2021.",
      "Refactored, deployed and tested legacy PHP; built Node microservices.",
      "Worked on a gradual migration to React.",
    ],
    [
      "Legacy PHP. We went through a lot together.",
      "Gradual migrations need patience. Lots of it.",
      "Some of that old code still haunts me, fondly.",
    ],
  ),
  "career:opcoding": item(
    "career",
    "OpCoding (2015–17)",
    "smile",
    [
      "Full-stack Web Developer, Nov 2015 to Feb 2017.",
      "Built a Laravel REST API for the Luxembourg tennis federation's event workflows.",
      "Symfony/PostgreSQL logistics microservices for authentication, location and files.",
    ],
    ["Early days, and I loved them.", "Tennis events and logistics. What a mix.", "I learned so much in these years."],
  ),
  "career:olkypay": item(
    "career",
    "Olkypay (2015)",
    "neutral",
    [
      "Web Developer, Mar to Nov 2015.",
      "Frontend and backend work on an online banking and payment application.",
      "Symfony and MariaDB.",
    ],
    [
      "Where it all started. Brave little me.",
      "A short chapter, but a good one.",
      "Banking software was a serious start.",
    ],
  ),

  "event:resume": item(
    "event",
    "Résumé download",
    "smile",
    ["The visitor is downloading Jérôme's résumé as a PDF.", "A strong sign of interest in his work."],
    [
      "Oh, you're taking the résumé home. Thank you!",
      "Reading it offline? I'm flattered.",
      "Good choice. I hope you like it.",
    ],
  ),
  "event:end": item(
    "event",
    "End of the timeline",
    "proud",
    [
      "The visitor has scrolled to the end of the career timeline.",
      "The timeline runs from Olkypay in 2015 to 3i today.",
    ],
    ["You made it all the way back to the start.", "That's the whole story so far.", "Thanks for reading all of it."],
  ),
  "event:idle": item(
    "event",
    "Visitor is idle",
    "thinking",
    ["The visitor has not interacted with the page for a while.", "The portrait may comment lightly, once."],
    ["Still there? Take your time.", "I'm just here, thinking.", "No rush. I'll wait."],
  ),
  "event:return": item(
    "event",
    "Visitor came back",
    "surprised",
    ["The visitor returned to the tab after being away for a while.", "The portrait may greet them, once."],
    ["Oh, you're back!", "Welcome back. I didn't move.", "There you are. Shall we continue?"],
  ),
}

export function clientCatalog() {
  return {
    version: CATALOG_VERSION,
    expressions: [...EXPRESSIONS],
    items: Object.fromEntries(
      Object.entries(ITEMS).map(([id, { label, defaultExpression }]) => [id, { label, defaultExpression }]),
    ),
  }
}
