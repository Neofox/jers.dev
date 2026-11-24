import { icon } from "./icons.js"
import { demoLoaders } from "./demo-loaders.js"

;(function () {
  "use strict"
  const projectOrder = ["3i", "enhans", "rubiwin", "translater", "kaltoe-timer", "neoharness", "gleamstral"]
  const projects = {
    translater: {
      name: "Translater",
      short: "Tone & context",
      category: "independent",
      meta: "Independent · Daily-life translation",
      headline: "Say it like you mean it.",
      summary:
        "I’m building a translation tool for daily life: the right language, the right tone, and room to refine what you mean.",
      role: "Personal product · Design & development",
      stack: "Translation · English / Korean · Tone & context",
      story: {
        overview: [
          "The words are only half the job.",
          "A useful translation also needs the right register. Friends, Casual and Professional tones give a starting point; short inputs become dictionary lookups, while sentences have alternatives.",
          "Two gaps shaped the refinement design: a result can be almost right, and a reply can miss the context of the conversation.",
        ],
        role: [
          "From daily friction to a product.",
          "I’m working across the interface and translation flow. The case here focuses on understandable iteration: how to adjust a result, carry context forward, and recover when an adjustment fails.",
        ],
        decisions: [
          "Adjust the intention, not just the text.",
          "The design uses removable refinement chips, capped at three. A refinement regenerates the whole result coherently through the same pipeline.",
          "Reply context stays visible when collapsed and lasts only for the session. If refinement fails, the previous result stays available.",
        ],
      },
      chapters: [
        [
          "entry",
          "Product interface",
          "Language, tone and context.",
          "The entry screen puts language, tone and reply context beside the text, so each translation starts with a clear intention.",
        ],
      ],
      links: [
        ["Visit product", "https://www.neofox.dev/"],
        ["Repository", "https://github.com/Neofox/translater"],
      ],
      sources: [
        [
          "Refinement & context design",
          "https://github.com/Neofox/translater/blob/master/docs/superpowers/specs/2026-07-09-refine-context-design.md",
        ],
      ],
      note: "Product screenshot captured at neofox.dev. Visit the product to translate and refine your own text.",
    },
    "kaltoe-timer": {
      name: "Kaltoe Timer",
      short: "Time, made legible",
      category: "independent",
      meta: "Independent · macOS & Linux",
      headline: "A little clarity about the working day.",
      summary:
        "I built a menu-bar countdown around Korean office flex-time rules. The small surface has to make lunch, leave time, and a changing daily target understandable.",
      role: "Personal product · Desktop utility",
      stack: "Flex clock-in · macOS menu bar · Linux tray",
      story: {
        overview: [
          "A countdown with real constraints.",
          "Kaltoe reads Flex clock-in and works with target hours, lunch, a weekly overtime cap, family day and time off. The Linux tray shares the core logic.",
          "A number alone is not enough: it needs to say what is ending, and why the target may have changed.",
        ],
        role: [
          "One product, different desktop surfaces.",
          "I built the countdown and its desktop presentation around the same time rules. The macOS menu bar has room for a label; the Linux tray needs a more compact way to convey that progress.",
        ],
        decisions: [
          "Two meanings, kept distinct.",
          "The fill follows the current phase: lunch, break or leave. Color follows the whole day, so a full lunch ring does not imply the workday is over.",
          "Weekly bars rescale together to stay comparable. A shortened target gets a caption explaining family day or time off.",
        ],
      },
      chapters: [
        [
          "popover",
          "The popover",
          "The next useful answer, first.",
          "Remaining time leads, followed by expected leave time, clock-in and the weekly view.",
        ],
        [
          "label",
          "Ring & track",
          "One countdown. Two readable forms.",
          "Ring and track styles gauge the number beside them. The fill resets for the next phase; color keeps the whole day in view.",
        ],
        [
          "linux",
          "Linux tray",
          "Same rules. A different amount of space.",
          "The KDE tray draws the countdown inside the icon, with progress around its outline. These are public renderer examples from the repository.",
        ],
      ],
      links: [["Repository", "https://github.com/Neofox/kaltoe-timer"]],
      sources: [["Product behavior & screenshot sources", "https://github.com/Neofox/kaltoe-timer#readme"]],
      note: "Screenshots and renderer examples from the project repository, using sample data.",
    },
    "3i": {
      name: "3i · Beamo, Pivo & AI/AX",
      short: "Digital twins, Pivo apps & AI adoption",
      category: "professional",
      meta: "3i · Sep 2025 — present",
      headline: "From 3D site captures to AI-assisted teams.",
      summary:
        "I develop the Beamo digital-twin viewer, maintain and extend the Pivo web apps, and run company-wide Claude adoption—frontend product work and AI/AX engineering in one role.",
      role: "Frontend Developer & AX Engineer",
      stack: "React · Three.js · Vue 3 · MCP · Claude",
      story: {
        overview: [
          "Three areas, one role.",
          "Beamo turns captures of real sites into digital twins. I develop its React/Three.js viewer: 360° panorama tours, Gaussian Splatting 3D of site captures, first-person and orbit navigation, and BIM/IMDF viewers with waypoint navigation.",
          "Pivo helps people find a coach, meet remotely and revisit their videos. Behind those experiences, the CS app gives the team a structured way to investigate product issues.",
          "Across the company, I run Claude adoption and access for engineering and HR, and build the integrations that make it useful.",
        ],
        role: [
          "Sole frontend developer, plus AX engineering.",
          "I am the sole frontend developer maintaining four core Vue 3 web apps, handling maintenance and feature development together with the backend and mobile teams.",
          "I independently designed and built two React products: the CS/QA intranet and the public equestrian coach catalog.",
          "On the AX side, I build MCP servers that connect Claude to Google Workspace and internal systems with role-based access control, develop the team’s Claude skills and plugins, and support agent-assisted migration of legacy backend code.",
        ],
        decisions: [
          "Different users. Different jobs.",
          "Beamo’s viewer brings panorama tours, Gaussian Splatting 3D and BIM/IMDF views of a site together, with first-person, orbit and waypoint navigation.",
          "Cloud organizes uploaded and lesson videos. Meet brings coaches and students into a remote lesson. Coaches lets riders explore profiles and narrow their search.",
          "CS connects support reports to investigation: Zendesk import, device and app context, assignment, root causes and releases. The view here is an empty report form.",
          "For AI adoption, MCP integrations apply role-based access control, so connecting Claude to Google Workspace and internal systems follows each person’s permissions.",
        ],
      },
      chapters: [
        [
          "beamo",
          "Beamo viewer",
          "Illustrative overview · Beamo digital-twin viewer.",
          "How the viewer’s capabilities fit together. This is a designed overview, not a product capture.",
        ],
        [
          "live",
          "Meet",
          "Pivo Meet.",
          "The remote lesson experience, from joining a session to returning to a recording.",
        ],
        [
          "library",
          "Cloud",
          "Pivo Cloud.",
          "A video library with separate Cloud and Lesson galleries, navigation and storage feedback.",
        ],
        [
          "coaches",
          "Coaches",
          "Designed and built · Pivo Coaches.",
          "A public discovery experience for finding equestrian coaches, with search, filters and profiles.",
        ],
        [
          "cs",
          "CS",
          "Triage a support report.",
          "Filter the queue, inspect the device details and record an investigation update.",
        ],
        [
          "ax",
          "AI / AX",
          "Illustrative overview · AI adoption at 3i.",
          "How Claude access, MCP integrations and team skills connect. A designed overview, not a capture of internal systems.",
        ],
      ],
      links: [
        ["Meet", "https://meet.pivo.app/"],
        ["Cloud", "https://cloud.pivo.app/"],
        ["Coaches", "https://coaches.pivo.app/"],
      ],
      sources: [
        ["Pivo Cloud", "https://cloud.pivo.app/"],
        [
          "Pivo Lessons recording guide",
          "https://support.pivo.ai/hc/en-001/articles/18876082361881-Desktop-recording-feature-for-Lessons-Mode",
        ],
        ["Pivo Coaches", "https://coaches.pivo.app/"],
      ],
      note: "Beamo, Meet, Cloud, Coaches and CS: source-based working demos with synthetic data, not production interfaces. AI/AX: an illustrative capability overview. No private code or site data are included. Real captures open from each Pivo demo: Cloud and Coaches are current product captures; Meet is the recording view from Pivo’s public documentation. The CS capture shows the empty report form.",
    },
    enhans: {
      name: "Enhans",
      short: "AI products, agents & SaaS prototypes",
      category: "professional",
      meta: "Enhans · Mar 2024 — Sep 2025",
      headline: "Make AI something people can use.",
      summary:
        "I built React/Next.js AI products and SaaS prototypes from architecture to deployment—from visual model workflows and multi-LLM comparison to LLM web agents and Chrome extensions.",
      role: "Frontend Developer",
      stack: "React · Next.js · TypeScript · Tailwind · LLM APIs · AWS S3 / Lambda / SQS",
      story: {
        overview: [
          "From instructions to useful work.",
          "At Enhans I worked across a family of AI products: AIAP, Enhans Model and Select LLM for building and comparing models, and ACT-1, Synergy and Chrome extensions for LLM web agents and automation.",
          "ACT is an AI assistant for carrying out tasks. I built the ACT-1 interface; the working demo below recreates its task progress and grouped action logs with a fictional research task.",
          "Model Generator makes AI models available through a product experience, with public examples for video, image and text annotation.",
        ],
        role: [
          "Architecture to deployment.",
          "I built AI products and SaaS prototypes with React, Next.js, TypeScript and Tailwind, from architecture through deployment.",
          "On AIAP, Enhans Model and Select LLM, that meant visual workflows, a model builder, multi-LLM comparison and reliable handling of asynchronous work.",
          "On ACT-1, Synergy and the Chrome extensions, I worked on LLM web agents, automation and user-action tracking, integrating LLM APIs with AWS S3, Lambda and SQS. I built the ACT-1 interface and delivered AI Model Generator end to end.",
        ],
        decisions: [
          "Two different ways to use AI.",
          "An assistant interface is where people give an instruction and follow the work. A model product connects an input to a usable output.",
          "The Model Generator’s public examples show that contract concretely: a video URL becomes structured tags; image and text examples make the other input types understandable.",
          "Visual workflows and a model builder make the setup understandable; multi-LLM comparison lets people weigh results from different models side by side.",
        ],
      },
      chapters: [
        [
          "act",
          "ACT-1",
          "Follow the agent’s work.",
          "A sample task moves through grouped action logs, illustrated browser snapshots and a final result, based on the ACT-1 interface I built.",
        ],
      ],
      links: [
        ["Watch ACT-2 demo", "https://www.youtube.com/watch?v=RclYTBCA7D4"],
        ["Model Generator", "https://model.enhans.ai/"],
      ],
      sources: [
        ["ACT-2 · current product", "https://act-2.enhans.ai/en"],
        ["AI Model Generator", "https://model.enhans.ai/"],
      ],
      note: "ACT-1, AIAP workflows, Select LLM and the action recorder are source-based working demos with sample data. Responses, rankings and metrics are invented. The linked ACT-2 video shows the successor to my ACT-1 work.",
    },
    rubiwin: {
      name: "Rubiwin & Supplier Portal",
      short: "Logistics portals & team leadership",
      category: "professional",
      meta: "Flash Europe International / Redspher · 2017 — 2023",
      headline: "A leader who kept building.",
      summary:
        "I worked on Rubiwin and Supplier Portal across full-stack development and team leadership, building logistics products for transport orders, supplier bidding and the carrier network.",
      role: "Full-stack Developer → Full-stack Developer & Team Lead",
      stack: "Flash Europe International 2017–21 · Redspher 2021–23",
      story: {
        overview: [
          "Products for the carrier network.",
          "Rubiwin is a platform for transport companies. Carriers can upload pricing rules as a CSV, and the offer form can suggest a price using matching rules.",
          "Alongside Rubiwin, my work included Supplier Portal, where I combined hands-on development with team leadership.",
        ],
        role: [
          "Delivery, people, and hands-on work.",
          "At Redspher, as Full-stack Developer & Team Lead, I led a development team, worked with PMs and POs to plan and deliver features, and onboarded and mentored internal and external developers.",
          "I built a React/TypeScript/Node logistics portal covering transport orders, supplier bidding and real-time chat. On Supplier Portal, my role included both development and team leadership.",
        ],
        decisions: [
          "A wider view of the application.",
          "At Flash Europe International, I refactored, deployed and tested legacy PHP, built Node microservices and worked on a gradual migration to React.",
          "Across my Flash Europe International and Redspher roles, I also worked with Node-RED. My broader application performance work included CQRS and Solr.",
          "The pricing screens illustrate Rubiwin’s product context; my development and leadership scope is described in My role.",
        ],
      },
      chapters: [
        [
          "rubiwin",
          "Offer form",
          "A suggestion within the offer.",
          "Rubiwin’s public guide shows a proposed price based on matching carrier pricing rules.",
        ],
        [
          "pricing",
          "Pricing rules",
          "Give the suggestion a basis.",
          "The CSV upload detail is where carriers provide their pricing grid. Rules can then inform a suggested auction price.",
        ],
        [
          "supplier",
          "Supplier Portal",
          "Developer and team leader.",
          "I combined hands-on development with team leadership and collaboration with product managers and product owners.",
        ],
      ],
      links: [["Rubiwin product", "https://carrier.rubiwin.com/login"]],
      sources: [
        ["Rubiwin · pricing-grid guide", "https://support.rubiwin.com/portal/en/kb/articles/how-to-use-pricing-grid"],
      ],
      note: "Rubiwin support · product reference. The documentation’s original highlights are preserved.",
    },
    neoharness: {
      name: "Neoharness",
      short: "Agents with continuity",
      category: "independent",
      meta: "Independent · Agent runtime",
      headline: "A conversation should not be a dead end.",
      summary:
        "I’m building a personal agent runtime for continuity: independent agents with memory, tools, schedules and a way to recover when something goes wrong.",
      role: "Personal project · Runtime & interface",
      stack: "Elixir / OTP · Phoenix LiveView · MCP",
      story: {
        overview: [
          "Beyond one-shot chat.",
          "An agent needs more than the current exchange. Neoharness keeps persistent conversations alongside each agent’s own memory, skills, schedules and connectors.",
          "The product question is how to keep that activity understandable and recoverable.",
        ],
        role: [
          "The runtime and the surfaces around it.",
          "I’m building on Elixir/OTP with a Phoenix LiveView chat interface for streaming and tool calls. Telegram and Discord connectors provide other entry points.",
          "The runtime also exposes observability so activity can be inspected.",
        ],
        decisions: [
          "Bound the work. Isolate the failure.",
          "Tool calling is bounded. Supervision isolates failures so one conversation does not take the others down. Schedules persist, and independent agents keep separate context.",
          "This system overview shows how the runtime keeps each agent’s work understandable and recoverable.",
        ],
      },
      chapters: [
        [
          "memory",
          "Memory",
          "Give the next conversation a past.",
          "Each agent has its own memory, skills and persistent conversations. Context is separated between agents.",
        ],
        [
          "tools",
          "Tools",
          "Reach beyond the conversation.",
          "Bounded tool calling and MCP let an agent interact with tools. This overview explains the boundary without running any tools.",
        ],
        [
          "schedules",
          "Schedules",
          "Useful work has a when.",
          "Persistent schedules support recurring prompts and heartbeats for each agent. Connectors route activity to the appropriate channel.",
        ],
        [
          "reliability",
          "Reliability",
          "Recover without losing everything.",
          "OTP supervision isolates failures. Observability and the chat interface make activity inspectable. ",
        ],
      ],
      links: [["Repository", "https://github.com/Neofox/neoharness"]],
      sources: [["Runtime features & architecture", "https://github.com/Neofox/neoharness#readme"]],
      note: "Architecture overview of my personal agent runtime. Implementation and documentation are linked below.",
    },
    gleamstral: {
      name: "Gleamstral",
      short: "A coherent Mistral interface",
      category: "independent",
      meta: "Independent · Open source library",
      headline: "Make AI easier to build with.",
      summary:
        "I built a typed Gleam client for Mistral, giving developers a coherent library interface while leaving the HTTP client independent.",
      role: "Open source library · Developer experience",
      stack: "Gleam · Mistral · Typed interfaces",
      story: {
        overview: [
          "A useful product surface for developers.",
          "Gleamstral brings chat, vision, tools, embeddings, agents and structured output into a typed library interface. Developers get a consistent way to work with these capabilities.",
        ],
        role: [
          "The library and the path into it.",
          "I built the Gleam client and documented examples, covering requests and responses across Mistral capabilities. The documentation provides the practical entry point for other developers.",
        ],
        decisions: [
          "Keep the transport independent.",
          "The library prepares requests and handles responses separately from the HTTP client. Applications can use the transport that fits their environment.",
          "Structured output adds an explicit response shape; tool support lets applications describe their own capabilities.",
        ],
      },
      chapters: [
        [
          "interface",
          "Library interface",
          "A clear boundary.",
          "A typed Mistral interface, with an independent HTTP client.",
        ],
      ],
      links: [
        ["Documentation", "https://hexdocs.pm/gleamstral/"],
        ["Repository", "https://github.com/Neofox/gleamstral"],
      ],
      sources: [],
      note: "Library overview. Documentation and examples are available in the project links.",
    },
  }
  const order3i = ["beamo", "live", "library", "coaches", "cs", "ax"]
  projects["3i"].chapters.sort((a, b) => order3i.indexOf(a[0]) - order3i.indexOf(b[0]))
  const imageAssets = {
    "pivo-cloud-current": {
      src: "/assets/pivo-cloud-current.jpg",
      w: 1280,
      h: 720,
      title: "Pivo Cloud · video library",
      alt: "Pivo Cloud with Cloud and Lesson galleries, dated videos and storage usage.",
      caption: "Pivo Cloud · current product capture. Full UI contribution.",
    },
    "pivo-coaches-current": {
      src: "/assets/pivo-coaches-current.jpg",
      w: 1280,
      h: 720,
      title: "Pivo Coaches · discovery",
      alt: "Pivo Coaches discovery page with equestrian imagery, search and coach filters.",
      caption: "Pivo Coaches · current public product. Whole project contribution.",
    },
    "pivo-cs-current": {
      src: "/assets/pivo-cs-current.jpg",
      w: 1280,
      h: 720,
      title: "Pivo CS · new report",
      alt: "Empty Pivo CS report form with Zendesk import and issue details.",
      caption: "Pivo CS · empty report form. Whole project contribution.",
    },
    "enhans-act-demo": {
      src: "/assets/enhans-act-demo.jpg",
      w: 1275,
      h: 717,
      title: "ACT · official demo",
      alt: "Official ACT-2 demo poster on the current Enhans product page.",
      caption: "ACT-2 · current public product reference. My UI work was on ACT-1.",
    },
    "enhans-model-current": {
      src: "/assets/enhans-model-current.jpg",
      w: 1280,
      h: 720,
      title: "Enhans AI Model Generator",
      alt: "Enhans AI Model Generator public landing page.",
      caption: "Enhans AI Model Generator · current public page. Whole project contribution.",
    },
    "enhans-model-usecase": {
      src: "/assets/enhans-model-usecase.jpg",
      w: 1280,
      h: 720,
      title: "Model Generator · video example",
      alt: "Video annotation example mapping a video URL to structured labels and metadata.",
      caption: "Enhans AI Model Generator · public video annotation example.",
    },

    portrait: {
      src: "/assets/jerome-portrait.jpeg",
      w: 960,
      h: 960,
      title: "Jérôme Schaeffer",
      caption: "Jérôme Schaeffer · portrait from my portfolio.",
      alt: "Black-and-white portrait of Jérôme Schaeffer.",
    },
    "pivo-meet": {
      src: "/assets/pivo-meet.png",
      w: 2872,
      h: 1550,
      title: "Pivo Lessons · welcome",
      caption: "Pivo support · product reference. Public Lessons welcome and profile interface.",
      alt: "Pivo Lessons welcome and profile form, with participant details and rider, coach, parent and other roles.",
    },
    "pivo-recording": {
      src: "/assets/pivo-recording.png",
      w: 2418,
      h: 1364,
      title: "Pivo Lessons · recording",
      caption:
        "Pivo support · product reference. Original documentation highlights show the recording notice and timer.",
      alt: "Pivo web lesson with two sample yoga callers, a recording-started notice and a recording timer highlighted by the documentation.",
    },
    "pivo-gallery": {
      src: "/assets/pivo-gallery.png",
      w: 598,
      h: 1180,
      title: "Pivo Cloud · video gallery",
      caption: "Pivo support · product reference. Mobile web gallery from public documentation.",
      alt: "Pivo Cloud mobile web gallery showing one video and a Select control.",
    },
    "rubiwin-auction": {
      src: "/assets/rubiwin-auction.png",
      w: 2248,
      h: 1042,
      title: "Rubiwin · offer form",
      caption: "Rubiwin support · product reference. The original documentation highlight marks the suggested price.",
      alt: "Rubiwin offer form with pickup and delivery dates, carrier and vehicle fields, and a pricing-grid suggestion highlighted in red.",
    },
    "rubiwin-pricing": {
      src: "/assets/rubiwin-pricing.png",
      w: 1208,
      h: 146,
      title: "Rubiwin · pricing CSV upload detail",
      caption: "Rubiwin support · product reference. CSV pricing-grid upload control detail.",
      alt: "Rubiwin pricing-grid CSV upload control with drag-and-drop or browse and a maximum file size of 20 MB.",
    },
    translater: {
      src: "/assets/translater-product.jpg",
      w: 1280,
      h: 720,
      title: "Translater · entry screen",
      caption: "Translater · entry screen captured at neofox.dev.",
      alt: "Translater entry screen with source and target language controls, tone selection, Replying to context, and empty input and result panels.",
    },
    kaltoe: {
      src: "/assets/kaltoe-product.png",
      w: 600,
      h: 702,
      title: "Kaltoe Timer · macOS popover",
      caption: "Kaltoe Timer · repository screenshot · sample data.",
      alt: "Kaltoe Timer macOS menu-bar popover showing remaining time, leave time, clock-in, weekly bars, overtime and label style controls in Korean.",
    },
    ring: {
      src: "/assets/kaltoe-menubar.png",
      w: 154,
      h: 60,
      title: "Kaltoe Timer · ring label",
      caption: "Official repository image. Progress ring around the countdown glyph.",
      alt: "Kaltoe ring-style menu-bar countdown label.",
    },
    track: {
      src: "/assets/kaltoe-track.png",
      w: 184,
      h: 62,
      title: "Kaltoe Timer · track label",
      caption: "Official repository image. Progress fills the countdown capsule.",
      alt: "Kaltoe track-style menu-bar countdown label.",
    },
    linux: {
      src: "/assets/kaltoe-linux-kde.png",
      w: 1134,
      h: 168,
      title: "Kaltoe Timer · KDE tray",
      caption: "Official repository renderer examples at tray scale · synthetic data.",
      alt: "KDE tray countdown examples with phase progress around each icon, from morning through overtime.",
    },
  }
  const chapters = [
    {
      id: "3i",
      date: "Sep 2025 — present",
      company: "3i",
      role: "Frontend Developer & AX Engineer",
      description:
        "I develop the Beamo digital-twin viewer, maintain and extend four core Vue 3 web apps as the sole frontend developer, built the CS/QA intranet and public coach catalog, and run company-wide Claude adoption with MCP integrations.",
      project: "3i",
    },
    {
      id: "enhans",
      date: "Mar 2024 — Sep 2025",
      company: "Enhans",
      role: "Frontend Developer",
      description:
        "I built React/Next.js AI products and SaaS prototypes from architecture to deployment, including AIAP, Enhans Model, Select LLM, ACT-1, Synergy and Chrome extensions.",
      project: "enhans",
    },
    {
      id: "wcoding",
      date: "Mar — Nov 2023",
      company: "WCODING",
      role: "Full-stack Web Development Instructor",
      description:
        "I designed curriculum and projects, reviewed learners’ work and mentored them, teaching HTML, CSS, JavaScript, PHP and MySQL.",
    },
    {
      id: "redspher",
      date: "Feb 2021 — Mar 2023",
      company: "Redspher",
      role: "Full-stack Developer & Team Lead",
      description:
        "I led a development team and built a React/TypeScript/Node logistics portal for transport orders, supplier bidding and real-time chat, coordinating with PMs and POs and mentoring developers. My work included development and leadership on Supplier Portal.",
      project: "rubiwin",
    },
    {
      id: "flash",
      date: "Feb 2017 — Feb 2021",
      company: "Flash Europe International",
      role: "Full-stack Developer",
      description:
        "I refactored, deployed and tested legacy PHP, built Node microservices and worked on a gradual migration to React. My Flash Europe International and Redspher work included Rubiwin and Supplier Portal.",
      project: "rubiwin",
    },
    {
      id: "opcoding",
      date: "Nov 2015 — Feb 2017",
      company: "OpCoding",
      role: "Full-stack Web Developer",
      description:
        "I built a Laravel REST API for the Luxembourg tennis federation’s event workflows, and Symfony/PostgreSQL logistics microservices for authentication, location and files.",
    },
    {
      id: "olkypay",
      date: "Mar — Nov 2015",
      company: "Olkypay",
      role: "Web Developer",
      description:
        "I worked on the frontend and backend of an online banking and payment application with Symfony and MariaDB.",
    },
  ]

  const $ = (id) => document.getElementById(id)
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let motionPreference = true
  try {
    motionPreference = localStorage.getItem("jerome-studio-motion") !== "off"
  } catch {}
  const motionEnabled = () => motionPreference && !reducedMotion.matches
  let activeStage = "",
    currentProject = "3i",
    currentChapter = "3i",
    currentVisual = "live",
    currentInspector = "overview",
    currentFilter = "professional",
    caseRendered = false,
    routeTransition = null,
    dialogOpener = null,
    imageOpener = null
  function playAnimation(el, frames, options) {
    const animation = el.animate(frames, options)
    animation.finished?.catch(() => {})
    return animation
  }
  function animateIn(el, subtle = false) {
    if (!motionEnabled() || !el?.animate) return
    el.getAnimations().forEach((a) => a.cancel())
    playAnimation(
      el,
      [
        { opacity: 0, transform: subtle ? "translateY(9px)" : "translateY(19px) scale(.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: subtle ? 240 : 400, easing: "linear(0,.3 10%,.7 25%,.94 45%,1.025 65%,1.012 82%,1)" },
    )
  }
  function revealStage(stage) {
    if (!motionEnabled()) return
    stage.querySelectorAll("[data-reveal]").forEach((el, i) => {
      if (!el.animate) return
      el.getAnimations().forEach((a) => a.cancel())
      playAnimation(
        el,
        [
          { opacity: 0, transform: "translateY(21px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 420,
          delay: Math.min(i, 3) * 45,
          easing: "linear(0,.3 10%,.7 25%,.94 45%,1.025 65%,1.012 82%,1)",
          fill: "backwards",
        },
      )
    })
  }
  function syncMotion() {
    const on = motionEnabled()
    if (!on && routeTransition) routeTransition.skipTransition()
    document.documentElement.dataset.motion = on ? "on" : "off"
    $("motion-toggle").setAttribute("aria-pressed", String(on))
    $("motion-label").textContent = on ? "Motion on" : reducedMotion.matches ? "Reduced motion" : "Motion off"
    $("motion-toggle").setAttribute(
      "aria-label",
      reducedMotion.matches
        ? "Reduced motion follows your device setting"
        : on
          ? "Turn animations off"
          : "Turn animations on",
    )
    if (!on) {
      resetPortrait()
      document.getAnimations?.().forEach((a) => a.cancel())
    }
  }
  $("motion-toggle").addEventListener("click", () => {
    motionPreference = reducedMotion.matches ? false : !motionPreference
    try {
      localStorage.setItem("jerome-studio-motion", motionPreference ? "on" : "off")
    } catch {}
    syncMotion()
  })
  reducedMotion.addEventListener("change", syncMotion)

  // Portrait triggers: announce what the visitor is doing as `portrait:trigger` events whose
  // detail is { action, itemId }, using the catalog IDs in lib/portrait-catalog.mjs. The portrait
  // UI listens for them; nothing here depends on it being present. The remaining emitters
  // (résumé, dwell, end of timeline) are near the end of this file.
  const REPEAT_MS = 30000
  const lastEmitAt = {}
  let lastDwell = null,
    routeProject = null,
    routeDemo = null
  function emitTrigger(action, itemId) {
    if (!itemId || (window.portraitKnows && !window.portraitKnows(itemId))) return
    lastEmitAt[itemId] = Date.now()
    document.dispatchEvent(new CustomEvent("portrait:trigger", { detail: { action, itemId } }))
  }
  // Discrete clicks (capture lightbox, résumé) repeat an item only after REPEAT_MS.
  function emitRepeatable(action, itemId) {
    if (itemId && Date.now() - (lastEmitAt[itemId] ?? -Infinity) >= REPEAT_MS) emitTrigger(action, itemId)
  }
  function demoItem(project, visual) {
    return visuals[project]?.[visual]?.demo ? "demo:" + project + "/" + visual : null
  }
  // Compares with the previous render: opening a project emits only open_project; switching to a
  // demo chapter within the same project emits open_demo.
  function routeTriggers(r) {
    const project = r.stage === "work" ? r.project : null,
      demo = project && demoItem(r.project, r.visual)
    if (project && project !== routeProject) emitTrigger("open_project", "project:" + project)
    else if (demo && demo !== routeDemo) emitTrigger("open_demo", demo)
    routeProject = project
    routeDemo = demo
  }
  function parseRoute(hash) {
    const [path, search = ""] = hash.replace(/^#/, "").split("?"),
      parts = path.split("/")
    const name = parts[0] === "studio" ? "home" : parts[0],
      stage = ["home", "work", "about"].includes(name) ? name : "home"
    let filter = new URLSearchParams(search).get("filter")
    let project = Object.hasOwn(projects, parts[1]) ? parts[1] : "3i"
    if (!["professional", "independent"].includes(filter)) filter = projects[project].category
    if (projects[project].category !== filter) project = projectOrder.find((id) => projects[id].category === filter)
    const p = projects[project]
    if (project === "3i" && parts[2] === "recordings") parts[2] = "live"
    if (project === "3i" && parts[2] === "finder") parts[2] = "coaches"
    if (project === "enhans" && parts[2] === "frontend") parts[2] = "act"
    if (project === "enhans" && ["model", "usecase"].includes(parts[2])) parts[2] = "compare"
    return {
      stage,
      project,
      visual: p.chapters.some((c) => c[0] === parts[2]) ? parts[2] : p.chapters[0][0],
      page: Math.max(0, Math.min(999, parseInt(new URLSearchParams(search).get("page"), 10) || 0)),
      inspector: ["overview", "role", "decisions", "sources"].includes(parts[3]) ? parts[3] : "overview",
      filter,
      chapter: chapters.some((c) => c.id === parts[1]) ? parts[1] : "3i",
      chapterExplicit: chapters.some((c) => c.id === parts[1]),
      fullCareer: stage === "about" && parts[1] === "career",
    }
  }
  function workPath(id = currentProject, visual, inspector = currentInspector, filter = currentFilter, page = 0) {
    return (
      "work/" +
      id +
      "/" +
      (visual || projects[id].chapters[0][0]) +
      "/" +
      inspector +
      "?filter=" +
      filter +
      (page ? "&page=" + page : "")
    )
  }

  function go(path) {
    if (location.hash === "#" + path) {
      renderRoute()
      return
    }
    location.hash = path
  }
  function shareProject(id) {
    document
      .querySelectorAll(".home-preview")
      .forEach((el) => (el.style.viewTransitionName = el.dataset.project === id ? "project-visual" : "none"))
  }
  function renderRoute() {
    const r = parseRoute(location.hash),
      stageChanged = r.stage !== activeStage,
      caseChanged = !caseRendered || r.project !== currentProject || r.filter !== currentFilter,
      visualChanged = r.visual !== currentVisual,
      inspectorChanged = r.inspector !== currentInspector,
      chapterChanged = r.chapter !== currentChapter
    const focused = document.activeElement,
      focusId = focused?.dataset.focusId,
      contentFocus = $("main").contains(focused)
    if ($("work-directory").open) $("work-directory").close()
    if ($("detail-dialog").open) $("detail-dialog").close()
    if ($("image-dialog").open) $("image-dialog").close()
    document.querySelectorAll(".stage").forEach((el) => (el.hidden = el.id !== "stage-" + r.stage))
    document.querySelectorAll(".site-nav a").forEach((a) => {
      if (a.dataset.nav === r.stage) a.setAttribute("aria-current", "page")
      else a.removeAttribute("aria-current")
    })
    if (activeStage === "work" && stageChanged) {
      disposeVisual()
      $("visual-stage").replaceChildren()
      caseRendered = false
    }
    activeStage = r.stage
    document.body.dataset.stage = r.stage
    if (stageChanged) resetPortrait()
    // Legacy links (#work/<id>/<chapter>/<section>, #about/<id>) land on the matching part of a scrolling page.
    let scrollTarget = null
    if (r.stage === "work") {
      currentFilter = r.filter
      currentProject = r.project
      currentVisual = r.visual
      currentInspector = r.inspector
      shareProject(r.project)
      if (caseChanged) {
        renderCase()
        if (!stageChanged) animateIn($("project-story"), true)
      }
      else if (visualChanged) {
        renderChapters()
        renderVisual()
        if (!stageChanged) animateIn($("visual-stage"), true)
      }
      if (r.inspector !== "overview" && (stageChanged || caseChanged || inspectorChanged)) {
        // Section links open the full case first, then land on the requested part.
        $("case-more").open = true
        scrollTarget = $("case-" + r.inspector)
      } else if (directoryNavigation) {
        directoryNavigation = false
        scrollTarget = $("view-title")
      } else if (caseChanged && !stageChanged && !focused?.closest(".product-picker, .workplaces")) scrollTarget = "top"
    }
    if (r.stage === "about") {
      renderChapter(r.chapter, r.chapterExplicit)
      if (r.fullCareer) scrollTarget = $("chapter-list")
      else if (r.chapterExplicit && (stageChanged || chapterChanged)) scrollTarget = $("career-" + r.chapter)
    }
    routeTriggers(r)
    if (stageChanged) {
      revealStage($("stage-" + r.stage))
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    if (scrollTarget === "top") window.scrollTo({ top: 0, behavior: "instant" })
    else if (scrollTarget)
      scrollTarget.scrollIntoView({ block: "start", behavior: motionEnabled() && !stageChanged ? "smooth" : "instant" })
    if (contentFocus && scrollTarget && scrollTarget !== "top") {
      scrollTarget.focus({ preventScroll: true })
    } else if (contentFocus && stageChanged) {
      const title = $("stage-" + r.stage).querySelector("h1,h2")
      title.setAttribute("tabindex", "-1")
      title.focus({ preventScroll: true })
    } else if (focusId && (!focused.isConnected || focused.closest("[hidden]"))) {
      const replacement = document.querySelector('[data-focus-id="' + focusId + '"]')
      if (replacement && !replacement.closest("[hidden]")) replacement.focus({ preventScroll: true })
      else $("work-title").focus({ preventScroll: true })
    }
    const label = {
      home: "Home",
      work: $("work-context-path").textContent || projects[r.project].name,
      about: "Career and background",
    }[r.stage]
    $("stage-announcement").textContent = label
    document.title = label + " — Jérôme Schaeffer"
  }
  function routeChange() {
    if (!motionEnabled() || !document.startViewTransition || (activeStage === "work" && parseRoute(location.hash).stage === "work")) {
      renderRoute()
      return
    }
    routeTransition?.skipTransition()
    const t = document.startViewTransition(renderRoute)
    routeTransition = t
    t.finished
      .catch(() => {})
      .finally(() => {
        if (routeTransition === t) routeTransition = null
      })
  }
  window.addEventListener("hashchange", routeChange)
  function ext(label, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" data-focus-id="external-${currentProject}-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${label} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`
  }
  function visibleProjects() {
    return projectOrder.filter((id) => currentFilter === "all" || projects[id].category === currentFilter)
  }
  // ── Work: scannable summary first, visuals second, full case behind one disclosure ──
  // Short lines are condensed from the vetted story copy above; no new claims.
  const extras = {
    "3i": {
      highlights: ["Beamo 3D viewer", "Sole frontend · 4 Vue apps", "Company-wide Claude adoption"],
      did: [
        ["cube", "Beamo digital-twin viewer in React/Three.js: panoramas, Gaussian splats, BIM/IMDF."],
        ["layers", "Sole frontend developer for four core Vue 3 web apps."],
        ["build", "Designed and built the CS/QA intranet and the public coach catalog."],
        ["spark", "Claude adoption, MCP servers with role-based access, team skills and plugins."],
      ],
    },
    enhans: {
      highlights: ["AI products, architecture to deployment", "Multi-LLM workflows", "LLM web agents"],
      did: [
        ["layers", "AI products and SaaS prototypes in React/Next.js, from architecture to deployment."],
        ["flow", "AIAP, Enhans Model, Select LLM: visual workflows and multi-LLM comparison."],
        ["cursor", "ACT-1, Synergy, Chrome extensions: web agents, automation, action tracking."],
        ["cloud", "LLM APIs with AWS S3, Lambda and SQS."],
      ],
    },
    rubiwin: {
      highlights: ["Full-stack → team lead", "Logistics portal", "Legacy PHP → React"],
      did: [
        ["truck", "React/TypeScript/Node portal: transport orders, supplier bidding, real-time chat."],
        ["people", "Led a development team; planned delivery with PMs and POs."],
        ["refresh", "Refactored legacy PHP, built Node microservices, moved gradually to React."],
      ],
    },
    translater: {
      highlights: ["Tone-aware translation", "English / Korean", "Refinement chips"],
      did: [
        ["chat", "Friends, Casual and Professional tones as a starting point."],
        ["chips", "Up to three removable refinements regenerate the whole result."],
        ["shield", "Reply context stays visible; a failed refinement keeps the previous result."],
      ],
    },
    "kaltoe-timer": {
      highlights: ["macOS menu bar", "Linux tray", "Korean flex-time rules"],
      did: [
        ["clock", "Countdown built on Flex clock-in, lunch, a weekly overtime cap and time off."],
        ["ring", "The fill follows the current phase; the color follows the whole day."],
        ["layers", "One shared core for the macOS menu bar and the Linux tray."],
      ],
    },
    neoharness: {
      highlights: ["Elixir / OTP runtime", "Memory & schedules", "Supervised agents"],
      did: [
        ["memory", "Each agent keeps its own memory, skills and conversations."],
        ["build", "Bounded tool calling and MCP connectors."],
        ["clock", "Persistent schedules for recurring prompts and heartbeats."],
        ["shield", "OTP supervision isolates failures between conversations."],
      ],
    },
    gleamstral: {
      highlights: ["Typed Gleam client", "Mistral API", "Bring your own HTTP client"],
      did: [
        ["code", "Chat, vision, tools, embeddings, agents and structured output, typed."],
        ["swap", "Requests and responses stay independent of the HTTP client."],
        ["book", "Documented examples as the entry point for other developers."],
      ],
    },
  }
  function setChapter(projectId, chapterId, label, title, text) {
    const chapter = projects[projectId].chapters.find((c) => c[0] === chapterId)
    if (chapter) chapter.splice(1, 3, label, title, text)
  }
  setChapter(
    "3i",
    "beamo",
    "Beamo viewer",
    "Measure a sample room.",
    "Click surfaces to measure, build a box for volume, orbit or walk, cut a section and inspect elements.",
  )
  setChapter(
    "3i",
    "live",
    "Meet",
    "A remote lesson for two.",
    "Layouts, mic and camera, guest-granted camera control, cloud recording states and the leave survey, with sample participants.",
  )
  setChapter(
    "3i",
    "library",
    "Cloud",
    "A video library you can work through.",
    "Galleries grouped by day, select mode with share, download and delete rules, a keyboard viewer and the storage bar.",
  )
  setChapter(
    "3i",
    "coaches",
    "Coaches",
    "Find a coach in the catalog.",
    "Discipline, language, certification and new-student filters, sort, paging and profiles, on fictional coaches.",
  )
  setChapter(
    "3i",
    "ax",
    "AI / AX",
    "Claude, connected to the way teams work.",
    "Claude access for engineering and HR, MCP servers with role-based access, and agent-assisted migration.",
  )
  setChapter(
    "rubiwin",
    "supplier",
    "Logistics portal",
    "Orders, bids and chat.",
    "At Redspher: a React/TypeScript/Node portal for transport orders, supplier bidding and real-time chat.",
  )
  projects.translater.chapters.unshift([
    "refine",
    "Try refining",
    "Adjust the intention, not just the text.",
    "Pick a tone, stack up to three refinements or simulate a failure; the breakdown reads the same result.",
  ])
  projects["kaltoe-timer"].chapters.unshift([
    "phases",
    "Try a workday",
    "Scrub through a workday.",
    "Lunch, leave and overtime follow the app's own rules; length tracks the phase, color the whole day.",
  ])
  projects.gleamstral.chapters.unshift([
    "request",
    "Build a request",
    "Typed request in, plain HTTP out.",
    "Set options and watch the exact request the library builds, then decode a sample reply. Nothing is sent.",
  ])
  projects.neoharness.chapters.unshift([
    "turn",
    "One turn",
    "Watch one turn, step by step.",
    "Thinking, tool calls with results, the reply and the stats bar — or a heartbeat that skips itself.",
  ])

  projects.enhans.chapters.splice(1, 0,
    ["workflow", "Visual workflows", "Connect the input to something useful.", "Inspect connected blocks, change the translation language and follow processing, completion or an error through an AIAP workflow."],
    ["compare", "Compare models", "Make different answers comparable.", "Select sample models, watch results arrive, switch output variants and inspect a sample evaluation, based on Select LLM."],
    ["recorder", "Action recorder", "Make browser actions inspectable.", "Track interactions inside a sample page, inspect the event log and annotate actions, based on the imitation-learning Chrome extension."],
  )

  // What each chapter shows: an authentic capture, the small renderer images, or an illustration.
  const visuals = {
    translater: {
      entry: { image: "translater", source: "Translater · language, tone and reply context." },
      refine: { demo: "translater" },
    },
    "kaltoe-timer": {
      popover: { image: "kaltoe", source: "Kaltoe Timer · macOS popover · sample data." },
      phases: { demo: "kaltoe" },
      label: {
        custom: "label",
        source: "Official ring and track label images, shown at their natural proportions.",
      },
      linux: {
        custom: "linux",
        source: "KDE tray renderer examples from the public repository · synthetic data.",
      },
    },
    "3i": {
      beamo: { demo: "beamo" },
      live: { demo: "meet", capture: "pivo-recording" },
      library: { demo: "cloud", capture: "pivo-cloud-current" },
      coaches: { demo: "coaches", capture: "pivo-coaches-current" },
      cs: { demo: "cs", capture: "pivo-cs-current" },
      ax: { illo: "ax" },
    },
    enhans: {
      act: { demo: "enhansAct" },
      workflow: { demo: "enhansWorkflow" },
      compare: { demo: "enhansCompare" },
      recorder: { demo: "enhansRecorder" },
    },
    rubiwin: {
      rubiwin: { image: "rubiwin-auction", source: "Rubiwin support · product reference" },
      pricing: { image: "rubiwin-pricing", source: "Rubiwin support · product reference · CSV upload detail" },
      supplier: { illo: "logistics" },
    },
    neoharness: {
      turn: { demo: "neoharness" },
      memory: { illo: "neoharness", glyph: "memory" },
      tools: { illo: "neoharness", glyph: "build" },
      schedules: { illo: "neoharness", glyph: "clock" },
      reliability: { illo: "neoharness", glyph: "shield" },
    },
    gleamstral: { request: { demo: "gleamstral" }, interface: { illo: "gleamstral" } },
  }
  const illoGlyph = {
    beamo: "cube",
    ax: "spark",
    enhans: "flow",
    logistics: "truck",
    neoharness: "memory",
    gleamstral: "swap",
    kaltoe: "ring",
    translater: "chips",
  }


  function storyParagraphs(lines) {
    return lines
      .slice(1)
      .map((text) => "<p>" + text + "</p>")
      .join("")
  }
  function linkGroup(label, links) {
    if (!links.length) return ""
    return (
      '<div class="link-group"><p class="link-group-label">' +
      label +
      '</p><ul class="link-list">' +
      links.map((link) => "<li>" + ext(...link) + "</li>").join("") +
      "</ul></div>"
    )
  }
  const workplaces = [
    { id: "3i", name: "3i", dates: "2025–now" },
    { id: "enhans", name: "Enhans", dates: "2024–25" },
    { id: "rubiwin", name: "Redspher", dates: "2021–23" },
    { id: "independent", name: "Side projects", dates: "Independent" },
  ]
  // Case and chapter IDs remain the shareable route. Group only genuine sibling views.
  const workProducts = {
    "3i": [
      { name: "Beamo", description: "Digital twin viewer", preview: "beamo", caseStudy: "/work/beamo/", views: ["beamo"] },
      { name: "Pivo Meet", description: "Remote video lessons", preview: "meet", caseStudy: "/work/pivo-meet/", views: ["live"] },
      { name: "Pivo Cloud", description: "Personal video library", preview: "cloud", caseStudy: "/work/pivo-cloud/", views: ["library"] },
      { name: "Pivo Coaches", description: "Equestrian coach discovery", preview: "coaches", views: ["coaches"] },
      { name: "CS / QA app", description: "Internal support triage", preview: "cs", views: ["cs"] },
      { name: "AI / AX", description: "Company-wide AI adoption", views: ["ax"] },
    ],
    enhans: [
      { name: "ACT-1", description: "Web agent task runner", preview: "enhans-act", views: ["act"] },
      { name: "AIAP", description: "Visual workflow builder", preview: "enhans-workflow", views: ["workflow"] },
      { name: "Select LLM", description: "Side-by-side model comparison", preview: "enhans-compare", views: ["compare"] },
      {
        name: "Action Recorder",
        description: "Browser interaction recorder",
        preview: "enhans-recorder",
        views: ["recorder"],
      },
    ],
    rubiwin: [
      { name: "Rubiwin", description: "Carrier offers and pricing", preview: "rubiwin", views: ["rubiwin", "pricing"] },
      { name: "Supplier Portal", description: "Orders, bids and chat", views: ["supplier"] },
    ],
  }
  const sidePreviews = {
    translater: "translater",
    "kaltoe-timer": "kaltoe",
    neoharness: "neoharness",
    gleamstral: "gleamstral",
  }
  function productsAt(place) {
    if (place !== "independent") return workProducts[place].map((p) => ({ ...p, caseId: place }))
    return projectOrder
      .filter((id) => projects[id].category === "independent")
      .map((id) => ({
        caseId: id,
        name: projects[id].name,
        description: projects[id].short,
        preview: sidePreviews[id],
        views: projects[id].chapters.map(([view]) => view),
      }))
  }
  function activePlace() {
    return currentFilter === "independent" ? "independent" : currentProject
  }
  function productPath(p, view = p.views[0]) {
    return "#" + workPath(p.caseId, view, "overview", projects[p.caseId].category)
  }
  function viewType(v) {
    return v.demo ? "Demo" : v.illo ? "Overview" : "Capture"
  }
  function chapterLabel(id, view) {
    return projects[id].chapters.find(([key]) => key === view)[1]
  }
  function productCard(p, active) {
    const view = visuals[p.caseId][p.views[0]]
    const kind = p.views.length > 1 ? p.views.length + " views" : viewType(view) + (view.capture ? " · Capture" : "")
    const demoPreview = view.demo && !view.capture && !["kaltoe", "translater"].includes(p.preview)
    const media = p.preview
      ? `<span class="product-image"><img src="/assets/work-previews/${p.preview}.webp" width="384" height="240" alt="">${demoPreview ? "<small>Demo preview</small>" : ""}</span>`
      : `<span class="product-image is-illustration">${icon(illoGlyph[view.illo])}</span>`
    return `<li><a class="product-card" href="${productPath(p, active ? currentVisual : undefined)}" data-focus-id="product-${p.caseId}-${p.views[0]}" ${active ? 'aria-current="true"' : ""}>${media}<span class="product-copy"><strong>${p.name}</strong><span class="product-description">${p.description}</span><small class="product-kind">${kind}</small></span></a></li>`
  }
  function renderChapters() {
    const place = workplaces.find((w) => w.id === activePlace())
    const productsHere = productsAt(place.id)
    const selected = productsHere.find((p) => p.caseId === currentProject && p.views.includes(currentVisual))
    const chapter = projects[currentProject].chapters.find(([key]) => key === currentVisual)
    const multiple = selected.views.length > 1
    $("product-list-title").textContent =
      place.id === "independent" ? "Independent projects" : "Projects at " + place.name
    $("project-list").innerHTML = productsHere.map((p) => productCard(p, p === selected)).join("")
    $("view-owner").textContent = place.name + " / " + viewType(visuals[currentProject][currentVisual])
    $("view-title").textContent = selected.name
    $("work-context-path").textContent = [place.name, selected.name, ...(multiple ? [chapter[1]] : [])].join(" › ")
    const tabs = $("visual-chapters"),
      panel = $("visual-stage")
    const priorTab = tabs.querySelector('[aria-selected="true"]')
    const priorLeft = priorTab?.offsetLeft
    const sameProduct = tabs.dataset.product === selected.name
    tabs.dataset.product = selected.name
    tabs.hidden = !multiple
    tabs.innerHTML = multiple
      ? selected.views
          .map((view) => {
            const active = view === currentVisual,
              type = viewType(visuals[currentProject][view])
            return `<button type="button" role="tab" id="view-tab-${view}" aria-controls="visual-stage" aria-selected="${active}" tabindex="${active ? 0 : -1}" data-visual="${view}" data-focus-id="visual-${currentProject}-${view}"><i aria-hidden="true" data-type="${type}"></i>${chapterLabel(currentProject, view)}<span class="sr-only"> · ${type}</span></button>`
          })
          .join("")
      : ""
    panel.setAttribute("role", multiple ? "tabpanel" : "group")
    panel.setAttribute("aria-labelledby", multiple ? "view-tab-" + currentVisual : "view-title")
    // Keep the selected view in its own horizontal strip without moving the page.
    const tab = tabs.querySelector('[aria-selected="true"]')
    if (tab) {
      tabs.scrollLeft = Math.max(0, tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2)
      const indicator = document.createElement("span")
      indicator.className = "view-indicator"
      indicator.setAttribute("aria-hidden", "true")
      tab.append(indicator)
      if (sameProduct && priorLeft !== undefined && motionEnabled()) {
        playAnimation(indicator, [{ transform: `translateX(${priorLeft - tab.offsetLeft}px)` }, { transform: "none" }], {
          duration: 220,
          easing: "ease-out",
        })
      }
    }
    $("visual-annotation").innerHTML = "<strong>" + chapter[2] + "</strong> " + chapter[3]
    if (selected.caseStudy) {
      $("visual-annotation").insertAdjacentHTML("beforeend", ` <a class="text-link" href="${selected.caseStudy}">Read the ${selected.name} case study</a>`)
    }
  }
  function renderWorkplaces() {
    $("workplaces").innerHTML = workplaces
      .map((w) => {
        const first = productsAt(w.id)[0]
        return `<a href="${productPath(first)}" data-focus-id="workplace-${w.id}" ${w.id === activePlace() ? 'aria-current="page"' : ""}><strong>${w.id === "independent" ? '<span class="side-long">Side projects</span><span class="side-short">Side</span>' : w.name}</strong><small>${w.dates}</small></a>`
      })
      .join("")
  }
  function openWorkDirectory() {
    $("directory-links").innerHTML = workplaces
      .map((w) => {
        const links = productsAt(w.id)
          .map((p) => {
            const selected = p.caseId === currentProject && p.views.includes(currentVisual)
            const link = (view, name) =>
              `<a href="${productPath(p, view)}" ${selected && currentVisual === view ? 'aria-current="page"' : ""}>${name}</a>`
            return p.views.length === 1
              ? link(p.views[0], p.name)
              : `<details class="directory-product" ${selected ? "open" : ""}><summary>${p.name}</summary>${p.views.map((v) => link(v, chapterLabel(p.caseId, v))).join("")}</details>`
          })
          .join("")
        return `<details ${w.id === activePlace() ? "open" : ""}><summary>${w.name}</summary><div>${links}</div></details>`
      })
      .join("")
    $("work-directory").showModal()
  }
  $("work-context").addEventListener("click", openWorkDirectory)
  $("directory-close").addEventListener("click", () => $("work-directory").close())
  let directoryNavigation = false
  $("directory-links").addEventListener("click", (e) => {
    if (!e.target.closest("a") || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    directoryNavigation = true
    $("work-directory").close()
  })
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => {
        $("work-context").hidden = entry.isIntersecting || entry.boundingClientRect.bottom > (entry.rootBounds?.top ?? 0)
      },
      { rootMargin: "-64px 0px 0px" },
    ).observe($("project-list"))
  }
  $("visual-chapters").addEventListener("keydown", (e) => {
    const tabs = [...e.currentTarget.children],
      i = tabs.indexOf(e.target)
    if (i < 0) return
    const next = {
      ArrowRight: (i + 1) % tabs.length,
      ArrowLeft: (i + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    tabs[next].focus({ preventScroll: true })
    tabs[next].click()
  })
  function staggerIn(items) {
    if (!motionEnabled()) return
    items.forEach((el, i) => {
      if (!el.animate) return
      el.getAnimations().forEach((a) => a.cancel())
      playAnimation(
        el,
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 280, delay: i * 40, easing: "cubic-bezier(.2,0,0,1)", fill: "backwards" },
      )
    })
  }
  // One scrolling case: short header, a large visual, a few lines, and the full write-up on request.
  function renderCase() {
    const p = projects[currentProject],
      x = extras[currentProject],
      list = visibleProjects(),
      index = list.indexOf(currentProject)
    caseRendered = true
    const workplace = workplaces.find((w) => w.id === activePlace())
    const side = currentFilter === "independent"
    renderWorkplaces()
    $("inspector-meta").textContent = side ? p.meta : "Workplace · " + (currentProject === "rubiwin" ? p.meta : p.meta.split(" · ").at(-1))
    $("inspector-title").textContent = side ? p.name : workplace.name
    $("inspector-title").closest(".case-head").hidden = side
    $("case-did-title").textContent = side ? "What I built" : "My work at " + (currentProject === "rubiwin" ? "Flash Europe and Redspher" : workplace.name)
    $("more-title").textContent = side ? "Read the project story" : "Read the workplace story"
    $("inspector-role").textContent = p.role
    $("case-stack").textContent = p.stack
    $("case-highlights").innerHTML = x.highlights.map((h) => "<li>" + h + "</li>").join("")
    $("case-did").innerHTML = x.did
      .map(([name, text]) => `<li><span class="did-icon">${icon(name)}</span><p>${text}</p></li>`)
      .join("")
    $("case-overview-meta").textContent = side ? [p.meta, p.role, p.stack].join(" · ") : p.headline
    $("case-overview-title").textContent = p.story.overview[0]
    $("case-overview-body").innerHTML =
      '<p class="case-summary">' + p.summary + "</p>" + storyParagraphs(p.story.overview)
    for (const section of ["role", "decisions"]) {
      $("case-" + section + "-title").textContent = p.story[section][0]
      $("case-" + section + "-body").innerHTML = storyParagraphs(p.story[section])
    }
    $("case-sources-body").innerHTML =
      '<p class="source-note">' +
      p.note +
      "</p>" +
      linkGroup("Explore the product", p.links) +
      linkGroup("Source & context", p.sources)
    $("case-more").open = false
    const previous = list[(index - 1 + list.length) % list.length],
      next = list[(index + 1) % list.length]
    const nameOf = (id) => side ? projects[id].name : workplaces.find((w) => w.id === id).name
    const unit = side ? "project" : "workplace"
    $("project-position").textContent = (side ? "Project " : "Workplace ") + (index + 1) + " of " + list.length
    $("previous-project").parentElement.setAttribute("aria-label", "More " + unit + "s")
    $("previous-project").innerHTML = '<span aria-hidden="true">←</span> <span class="sr-only">Previous ' + unit + ' </span>' + nameOf(previous)
    $("next-project").innerHTML = '<span class="sr-only">Next ' + unit + ' </span>' + nameOf(next) + ' <span aria-hidden="true">→</span>'
    renderChapters()
    renderVisual()
    staggerIn([...document.querySelectorAll("#case-highlights li, #case-did li")])
  }
  function imageButton(key, extra = "") {
    const im = imageAssets[key]
    return `<button class="image-button ${extra}" style="--w:${im.w}px;--ratio:${(im.w / im.h).toFixed(4)}" data-image="${key}" aria-haspopup="dialog" aria-controls="image-dialog" aria-label="Enlarge ${im.title}" data-focus-id="enlarge-${key}"><img src="${im.src}" width="${im.w}" height="${im.h}" alt="${im.alt}"><span class="zoom-affordance" aria-hidden="true">Enlarge</span></button>`
  }
  // Authentic captures sit in a neutral window frame, sized from the image's own ratio.
  function framedCapture(key) {
    const im = imageAssets[key]
    return `<div class="capture-frame" style="--w:${im.w}px;--ratio:${(im.w / im.h).toFixed(4)}"><div class="capture-bar" aria-hidden="true"><i></i><i></i><i></i></div>${imageButton(key, "in-frame")}</div>`
  }

  // ── Illustrations: line-drawn, on a dotted grid, tagged once. Base styles are the complete still frame;
  // motion is layered on only while the illustration is on screen and motion is enabled.
  function illoShell(name, label, body, focus = "") {
    return `<div class="illo illo-${name}" role="group" aria-label="Illustration: ${label}" data-focus="${focus}"><span class="illo-tag">Illustration</span>${body}</div>`
  }
  function node(title, sub, iconName, extra = "") {
    return `<div class="illo-node ${extra}">${iconName ? icon(iconName) : ""}<strong>${title}</strong>${sub ? `<span>${sub}</span>` : ""}</div>`
  }
  function pipeline(nodes, { returns = false, small = false } = {}) {
    const parts = []
    nodes.forEach((n, i) => {
      if (i) {
        parts.push(
          `<div class="illo-link" style="--i:${i - 1}" aria-hidden="true"><i class="packet"></i>${returns ? '<i class="packet back"></i>' : ""}</div>`,
        )
      }
      parts.push(n)
    })
    return `<div class="illo-pipeline${returns ? " has-return" : ""}${small ? " is-small" : ""}">${parts.join("")}</div>`
  }
  function beamoScene() {
    let seed = 11
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
    const point = (u, v) => [30 + 210 * u + 210 * v, 195 - 105 * u + 105 * v]
    let splats = ""
    for (let i = 0; i < 46; i++) {
      const [x, y] = point(0.08 + rnd() * 0.84, 0.08 + rnd() * 0.84)
      const lift = rnd() * 78
      splats += `<circle class="splat" cx="${x.toFixed(1)}" cy="${(y - lift).toFixed(1)}" r="${(1.6 + rnd() * 2.2).toFixed(1)}" style="--d:${(i * 0.07).toFixed(2)}s"/>`
    }
    const stops = [
      [145.5, 200.25],
      [208.5, 158.25],
      [303, 184.5],
      [250.5, 231.75],
    ]
    const panos = stops
      .map(
        ([x, y], i) =>
          `<circle class="pano-ring" cx="${x}" cy="${y}" r="6" style="--d:${i * 0.4}s"/><circle class="pano" cx="${x}" cy="${y}" r="4.5"/>`,
      )
      .join("")
    return `<svg class="beamo-scene" viewBox="0 0 480 320" aria-hidden="true" focusable="false">
      <polygon class="floor" points="240,300 450,195 240,90 30,195"/>
      <path class="wire" d="M30 195V115M240 90V10M450 195V115M30 115L240 10L450 115"/>
      <g class="layer layer-bim" style="--p:3"><polygon class="room" points="240,90 450,195 345,247.5 135,142.5"/><polygon class="room alt" points="135,142.5 345,247.5 240,300 30,195"/><path class="wall-line" d="M135 142.5L210 180M240 195L345 247.5"/></g>
      <g class="layer layer-splat" style="--p:1">${splats}</g>
      <g class="layer layer-nav" style="--p:2"><path class="route" d="M145.5 200.25L208.5 158.25L303 184.5L250.5 231.75Z"/></g>
      <g class="layer layer-pano" style="--p:0">${panos}</g>
      <g class="camera"><path d="M0 0L26 -11L26 11Z"/><circle r="6.5"/></g>
    </svg>`
  }
  function illustration(name, focus) {
    if (name === "beamo") {
      const modes = [
        ["360° panoramas", "Captured viewpoints", "spark"],
        ["Gaussian Splatting 3D", "The site, in 3D", "cube"],
        ["First-person & orbit", "Two ways to move", "cursor"],
        ["BIM / IMDF", "Waypoint navigation", "layers"],
      ]
      return illoShell(
        "beamo",
        "Beamo digital-twin viewer capabilities",
        `<div class="beamo">${beamoScene()}<ul class="beamo-modes">${modes
          .map(
            ([t, s, ic], i) =>
              `<li style="--p:${i}">${icon(ic)}<span><strong>${t}</strong><small>${s}</small></span></li>`,
          )
          .join("")}</ul></div><p class="illo-foot">React · Three.js</p>`,
      )
    }
    if (name === "ax") {
      return illoShell(
        "ax",
        "AI adoption at 3i",
        `${pipeline([
          node("Teams", "Engineering · HR", "people"),
          node("Claude", "Skills & plugins", "spark"),
          node("MCP servers", "Role-based access", "lock", "is-gate"),
          node("Systems", "Google Workspace · internal", "layers"),
        ])}<div class="illo-lane"><p class="illo-kicker">Legacy migration</p>${pipeline(
          [node("Legacy backend", "", "code"), node("Agent-assisted", "", "spark"), node("Migrated", "", "refresh")],
          { small: true },
        )}</div>`,
      )
    }
    if (name === "gleamstral") {
      return illoShell(
        "gleamstral",
        "Gleamstral request and response flow",
        `${pipeline(
          [
            node("Your app", "Typed calls", "code"),
            node("Gleamstral", "Prepare · handle", "swap"),
            node("Your HTTP client", "Any transport", "cloud"),
            node("Mistral API", "", "spark"),
          ],
          { returns: true },
        )}<p class="illo-foot">Chat · vision · tools · embeddings · agents · structured output</p>`,
      )
    }
    if (name === "enhans") {
      const lanes = ["Model A", "Model B", "Model C"]
        .map((m, i) => `<li style="--i:${i}"><span>${m}</span><i class="enh-bar"><b></b></i></li>`)
        .join("")
      const log = ["Click", "Type", "Submit"].map((a, i) => `<li style="--i:${i}">${a}</li>`).join("")
      return illoShell(
        "enhans",
        "Enhans product families",
        `<div class="enh"><div class="enh-panel"><p class="illo-kicker">AIAP · Enhans Model · Select LLM</p><div class="enh-flow">${node("Prompt", "", "flow")}<svg class="enh-fan" viewBox="0 0 40 96" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48C20 48 20 16 40 16M0 48H40M0 48C20 48 20 80 40 80"/></svg><ul class="enh-lanes">${lanes}</ul></div><p class="illo-foot">Same input · several models · side by side</p></div><div class="enh-panel"><p class="illo-kicker">ACT-1 · Synergy · Chrome extensions</p><div class="enh-browser" aria-hidden="true"><div class="enh-browser-bar"><i></i><i></i><i></i><span></span></div><div class="enh-page"><span class="blk b1"></span><span class="blk b2 target t1"></span><span class="blk b3"></span><span class="blk b4 target t2"></span><span class="blk b5 target t3"></span><svg class="agent-cursor" viewBox="0 0 24 24"><path d="M5 3l14 7.5-6.2 1.6L10 18.5z"/></svg></div></div><div class="enh-log"><p class="illo-kicker">Tracked actions</p><ol>${log}</ol></div></div></div>`,
      )
    }
    if (name === "logistics") {
      const suppliers = [1, 2, 3]
        .map(
          (n, i) =>
            `<li style="--i:${i}"${n === 2 ? ' class="is-chosen"' : ""}><strong>Supplier ${n}</strong><span class="bid">Bid</span></li>`,
        )
        .join("")
      return illoShell(
        "logistics",
        "Transport orders, supplier bidding and chat",
        `<div class="lg">${node("Transport order", "Sent to suppliers", "truck", "lg-order")}<svg class="lg-wires" viewBox="0 0 64 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60C32 60 32 16 64 16M0 60H64M0 60C32 60 32 104 64 104"/></svg><ul class="lg-suppliers">${suppliers}</ul><div class="lg-chat"><p class="illo-kicker">Real-time chat</p><span class="bubble" style="--i:0"></span><span class="bubble me" style="--i:1"></span><span class="bubble short" style="--i:2"></span></div></div>`,
      )
    }
    if (name === "neoharness") {
      const sats = [
        ["memory", "Memory", "Per-agent context", "memory", "a"],
        ["tools", "Tools + MCP", "Bounded calling", "build", "b"],
        ["schedules", "Schedules", "Recurring prompts", "clock", "d"],
        ["reliability", "Supervision", "Isolated failures", "shield", "e"],
      ]
        .map(
          ([k, t, s, ic, area]) =>
            `<div class="illo-node nh-sat" data-k="${k}" style="grid-area:${area}">${icon(ic)}<strong>${t}</strong><span>${s}</span></div>`,
        )
        .join("")
      return illoShell(
        "neoharness",
        "Neoharness agent runtime",
        `<div class="nh"><svg class="nh-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M18 18L50 50M82 18L50 50M18 82L50 50M82 82L50 50"/></svg>${sats}<div class="nh-core"><i class="beat" aria-hidden="true"></i><strong>Independent<br>agent</strong><span>Elixir / OTP</span></div></div><p class="illo-foot">LiveView · Telegram · Discord</p>`,
        focus,
      )
    }
    if (name === "kaltoe") {
      const phases = ["Lunch", "Break", "Leave"].map((t, i) => `<span style="--i:${i}">${t}</span>`).join("")
      return illoShell(
        "kaltoe",
        "Kaltoe ring: phase fill and day color",
        `<div class="kt"><div class="kt-dial"><svg class="kt-ring" viewBox="0 0 160 160" aria-hidden="true"><circle class="kt-base" cx="80" cy="80" r="62"/><circle class="kt-fill" cx="80" cy="80" r="62" pathLength="100"/></svg><div class="kt-center"><small>Phase</small><span class="kt-phases">${phases}</span></div></div><div class="kt-info"><p class="kt-key"><i class="kt-swatch fill"></i><span><strong>Fill</strong> follows the current phase</span></p><p class="kt-key"><i class="kt-swatch day"></i><span><strong>Color</strong> follows the whole day</span></p><div class="kt-bar" aria-hidden="true"><i></i></div><p class="illo-foot">Ring and track · same meaning</p></div></div>`,
      )
    }
    if (name === "translater") {
      const tones = ["Friends", "Casual", "Professional"]
        .map((t, i) => `<span style="--i:${i}"${i === 1 ? ' class="is-on"' : ""}>${t}</span>`)
        .join("")
      const chips = [0, 1, 2]
        .map((i) => `<span class="chip" style="--i:${i}"><i></i><b aria-hidden="true">×</b></span>`)
        .join("")
      return illoShell(
        "translater",
        "Translater tone and refinement",
        `<div class="tr"><div class="tr-card"><p class="illo-kicker">Tone</p><div class="tr-tones">${tones}</div><p class="illo-kicker">Refinements · up to three</p><div class="tr-chips">${chips}</div></div><span class="tr-arrow" aria-hidden="true">${icon("refresh")}</span><div class="tr-card tr-result"><p class="illo-kicker">Result · regenerated</p><span class="line"></span><span class="line"></span><span class="line short"></span><span class="shimmer" aria-hidden="true"></span></div></div>`,
      )
    }
    return ""
  }

  // Illustrations animate only while visible (and never when motion is off or reduced).
  let illoObserver = null
  function syncIllustration() {
    illoObserver?.disconnect()
    const el = $("visual-stage").querySelector(".illo")
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-live")
      return
    }
    illoObserver = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-live", entry.isIntersecting && !document.hidden),
      { threshold: 0.2 },
    )
    illoObserver.observe(el)
  }
  document.addEventListener("visibilitychange", () => {
    const el = $("visual-stage").querySelector(".illo")
    if (!el) return
    if (document.hidden) el.classList.remove("is-live")
    else syncIllustration()
  })

  let visualVersion = 0
  let demoCleanup = null

  function disposeVisual() {
    visualVersion++
    demoCleanup?.()
    demoCleanup = null
    illoObserver?.disconnect()
  }

  async function showDemo(view, stage, version, focusReset) {
    stage.innerHTML = '<p role="status">Loading demo…</p>'
    try {
      const demo = await demoLoaders[view.demo]()
      if (version !== visualVersion) return
      demoCleanup = demo.mount(stage)
      const reset = stage.querySelector("[data-demo-reset]")
      if (view.capture) {
        const image = imageAssets[view.capture]
        reset.insertAdjacentHTML("beforebegin",
          `<button type="button" class="demo-reset demo-capture" data-image="${view.capture}" aria-haspopup="dialog" aria-controls="image-dialog" data-focus-id="demo-capture">View real capture<span class="sr-only">: ${image.title}</span></button>`,
        )
      }
      reset.addEventListener("click", () => renderVisual(true))
      if (focusReset) reset.focus()
    } catch (error) {
      if (version !== visualVersion) return
      console.error("Could not open demo", error)
      stage.innerHTML = '<p role="status">This demo could not load.</p><button type="button" class="button button-outline">Reload demo</button>'
      const retry = stage.querySelector("button")
      retry.addEventListener("click", () => location.reload())
      if (focusReset) retry.focus()
    }
  }
  function renderVisual(focusReset = false) {
    disposeVisual()
    const stage = $("visual-stage")
    const v = visuals[currentProject][currentVisual]
    stage.dataset.project = currentProject
    stage.dataset.view = currentVisual
    stage.dataset.kind = v.demo ? "demo" : v.illo ? "illustration" : "capture"
    $("visual-caption").textContent = v.source || ""
    $("visual-caption").hidden = !v.source
    if (v.demo) {
      void showDemo(v, stage, visualVersion, focusReset)
      return
    }
    let html
    if (v.illo) html = illustration(v.illo, currentVisual)
    else if (v.custom === "label")
      html =
        '<div class="multi-image">' +
        imageButton("ring") +
        imageButton("track") +
        '<p class="micro-explanation">The fill follows the current countdown.<br>The color follows the whole working day.</p></div>'
    else if (v.custom === "linux")
      html =
        '<div class="linux-image">' +
        imageButton("linux") +
        '<p class="micro-explanation">A countdown inside the icon.<br>The phase progress around it.</p></div>'
    else html = framedCapture(v.image)
    stage.innerHTML = html
    syncIllustration()
  }
  // The whole career is visible as a timeline; #about/<id> highlights and scrolls to one entry.
  function renderChapter(id, explicit) {
    currentChapter = id
    document.querySelectorAll(".career-item").forEach((item) => {
      const current = Boolean(explicit) && item.dataset.chapterItem === id
      item.dataset.current = String(current)
      if (current) item.setAttribute("aria-current", "true")
      else item.removeAttribute("aria-current")
    })
  }
  $("chapter-list").innerHTML = chapters
    .map(
      (c) =>
        `<li class="career-item" id="career-${c.id}" tabindex="-1" data-chapter-item="${c.id}" data-focus-id="career-${c.id}"><p class="career-date">${c.date}</p><div class="career-main"><h3>${c.company}</h3><p class="career-role">${c.role}</p><p class="career-description">${c.description}</p>${
          c.project
            ? `<button type="button" class="text-link" data-related="${c.project}" data-focus-id="career-related-${c.id}">Explore related work <span aria-hidden="true">→</span></button>`
            : ""
        }</div></li>`,
    )
    .join("")
  function openImage(key) {
    const im = imageAssets[key]
    if (activeStage === "work") emitRepeatable("open_demo", demoItem(currentProject, currentVisual))
    imageOpener = document.activeElement
    $("lightbox-title").textContent = im.title
    $("lightbox-image").src = im.src
    $("lightbox-image").alt = im.alt
    $("lightbox-image").width = im.w
    $("lightbox-image").height = im.h
    $("lightbox-image").style.setProperty("--natural-width", im.w + "px")
    $("lightbox-caption").textContent = im.caption
    $("lightbox-viewport").classList.remove("actual")
    $("image-size").setAttribute("aria-pressed", "false")
    $("image-size").textContent = "Actual size"
    $("image-dialog").showModal()
    $("image-close").focus({ preventScroll: true })
    animateIn($("image-dialog"), true)
  }
  $("image-size").addEventListener("click", () => {
    const actual = $("lightbox-viewport").classList.toggle("actual")
    $("image-size").setAttribute("aria-pressed", String(actual))
    $("image-size").textContent = actual ? "Fit image" : "Actual size"
  })
  $("image-close").addEventListener("click", () => $("image-dialog").close())
  $("image-dialog").addEventListener("close", () => {
    if (imageOpener?.isConnected && !imageOpener.closest("[hidden]")) imageOpener.focus({ preventScroll: true })
  })
  function showDialog(type) {
    dialogOpener = document.activeElement
    if (type === "resume") {
      $("dialog-label").textContent = "Résumé · English / 한국어"
      $("dialog-body").innerHTML =
        '<h2 id="dialog-title" data-focus-id="resume-heading">Experience, in detail.</h2><p>The Korean résumé is the current version. Both PDFs open in a new tab.</p><div class="resume-choices"><a href="/assets/resume-ko.pdf" target="_blank" rel="noopener noreferrer" type="application/pdf" hreflang="ko" data-focus-id="resume-korean"><span>KO · Current</span><strong lang="ko">한국어</strong><small lang="ko">이력서 PDF 열기 ↗</small></a><a href="/assets/resume-en.pdf" target="_blank" rel="noopener noreferrer" type="application/pdf" hreflang="en" data-focus-id="resume-english"><span>EN · Earlier version</span><strong>English</strong><small>Open résumé PDF ↗</small></a></div>'
    } else {
      $("dialog-label").textContent = "Let’s connect"
      $("dialog-body").innerHTML =
        '<h2 id="dialog-title" data-focus-id="contact-heading">Have an idea<br>worth building?</h2><p>Jérôme Schaeffer<br>Senior product engineer · Seoul</p><div class="detail-links">' +
        '<a href="mailto:jer.schaeffer@gmail.com">Email me ↗</a>' +
        ext("LinkedIn", "https://www.linkedin.com/in/jerome-schaeffer/") +
        ext("GitHub", "https://github.com/Neofox") +
        "</div>"
    }
    $("detail-dialog").showModal()
    $("dialog-close").focus({ preventScroll: true })
    animateIn($("detail-dialog"), true)
  }
  $("dialog-close").addEventListener("click", () => $("detail-dialog").close())
  $("detail-dialog").addEventListener("close", () => {
    if (dialogOpener?.isConnected && !dialogOpener.closest("[hidden]")) dialogOpener.focus({ preventScroll: true })
  })
  for (const dialog of [$("image-dialog"), $("detail-dialog")])
    dialog.addEventListener("click", (e) => {
      if (e.target !== dialog) return
      const r = dialog.getBoundingClientRect()
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close()
    })
  for (const dialog of [$("image-dialog"), $("detail-dialog")])
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        dialog.close()
        return
      }
      if (e.key === "Tab") {
        const items = [...dialog.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]')].filter(
          (el) => !el.closest("[hidden]"),
        )
        const first = items[0],
          last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    })
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button,a")
    if (!b) return
    if (b.dataset.project) {
      e.preventDefault()
      shareProject(b.dataset.project)
      const filter = projects[b.dataset.project].category
      go(workPath(b.dataset.project, undefined, "overview", filter))
    } else if (b.dataset.visual) go(workPath(currentProject, b.dataset.visual, "overview"))
    else if (b.dataset.image) openImage(b.dataset.image)
    else if (b.dataset.related)
      go(workPath(b.dataset.related, undefined, "role", projects[b.dataset.related].category))
    else if (b.dataset.dialog) showDialog(b.dataset.dialog)
    else if (b.id === "previous-project" || b.id === "next-project") {
      const ids = visibleProjects(),
        direction = b.id === "next-project" ? 1 : -1
      go(workPath(ids[(ids.indexOf(currentProject) + direction + ids.length) % ids.length], undefined, "overview"))
    } else if (b.id === "surprise") {
      const id = projectOrder[Math.floor(Math.random() * projectOrder.length)]
      shareProject(id)
      go(workPath(id, undefined, "overview", projects[id].category))
    } else if (b.id === "dialog-career") {
      $("detail-dialog").close()
      go("about/" + currentChapter)
    }
    // Route fragments explicitly: embedded previews may inject a different base URL.
    else if (
      b.tagName === "A" &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      (!b.target || b.target === "_self") &&
      /^#(?:home|work|about|studio)(?:[/?]|$)/.test(b.getAttribute("href") || "")
    ) {
      e.preventDefault()
      go(b.getAttribute("href").slice(1))
    }
  })
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault()
    $("main").focus({ preventScroll: true })
  })

  // Portrait triggers (continued; emitTrigger and the route triggers sit above parseRoute).
  document.addEventListener("click", (e) => {
    if (e.target.closest?.('a[href$=".pdf"]')) emitRepeatable("download_resume", "event:resume")
  })
  // Dwell: hover or keyboard focus resting on a home selection, workplace or career entry for 700 ms.
  const dwellSelector = ".home-selection a[data-project], .workplaces a, .career-item"
  let dwellTarget = null,
    dwellTimer = 0
  function dwellItem(el) {
    if (el.matches(".career-item")) return "career:" + el.dataset.chapterItem
    if (el.dataset.project) return "project:" + el.dataset.project
    return "project:" + parseRoute(el.getAttribute("href") || "").project
  }
  function startDwell(el) {
    if (el === dwellTarget) return
    clearTimeout(dwellTimer)
    dwellTarget = el
    dwellTimer = setTimeout(() => {
      dwellTarget = null
      const item = dwellItem(el)
      if (!el.isConnected || el.closest("[hidden]") || item === lastDwell) return
      lastDwell = item
      emitTrigger("dwell", item)
    }, 700)
  }
  function stopDwell(el) {
    if (el !== dwellTarget) return
    clearTimeout(dwellTimer)
    dwellTarget = null
  }
  // pointerenter/pointerleave do not bubble: listen in the capture phase and match the target itself.
  document.addEventListener(
    "pointerenter",
    (e) => {
      if (e.pointerType !== "touch" && e.target.matches?.(dwellSelector)) startDwell(e.target)
    },
    true,
  )
  document.addEventListener("pointerleave", (e) => stopDwell(e.target), true)
  // Keyboard focus only: programmatic focus (route changes, dialogs closing) is not a dwell.
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest?.(dwellSelector)
    if (el && e.target.matches(":focus-visible")) startDwell(el)
  })
  document.addEventListener("focusout", (e) => {
    const el = e.target.closest?.(dwellSelector)
    if (el && !el.contains(e.relatedTarget)) stopDwell(el)
  })
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopDwell(dwellTarget)
  })
  // Reaching the end of the career timeline, once per visit (sessionStorage).
  const endKey = "jerome-portrait-end"
  let endReached = false
  try {
    endReached = sessionStorage.getItem(endKey) === "1"
  } catch {}
  const lastCareer = document.querySelector("#chapter-list .career-item:last-child")
  if (!endReached && lastCareer && "IntersectionObserver" in window) {
    const endObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        endObserver.disconnect()
        try {
          sessionStorage.setItem(endKey, "1")
        } catch {}
        emitTrigger("reach_end", "event:end")
      },
      { threshold: 0.5 },
    )
    endObserver.observe(lastCareer)
  }

  // Pointer response is input-driven only, never an ambient loop.
  let portraitFrame = 0
  const portrait = $("portrait-composition")
  function resetPortrait() {
    if (portraitFrame) {
      cancelAnimationFrame(portraitFrame)
      portraitFrame = 0
    }
    if (portrait) {
      portrait.style.setProperty("--px", "0px")
      portrait.style.setProperty("--py", "0px")
    }
  }
  portrait.addEventListener("pointermove", (e) => {
    if (!motionEnabled() || activeStage !== "home" || e.pointerType !== "mouse") return
    const r = portrait.getBoundingClientRect()
    if (!r.width || !r.height) return
    const x = Math.max(-7, Math.min(7, ((e.clientX - r.left - r.width / 2) / r.width) * 14)),
      y = Math.max(-7, Math.min(7, ((e.clientY - r.top - r.height / 2) / r.height) * 14))
    if (portraitFrame) cancelAnimationFrame(portraitFrame)
    portraitFrame = requestAnimationFrame(() => {
      portrait.style.setProperty("--px", x + "px")
      portrait.style.setProperty("--py", y + "px")
      portraitFrame = 0
    })
  })
  portrait.addEventListener("pointerleave", resetPortrait)
  window.addEventListener("blur", resetPortrait)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetPortrait()
  })

  function updateClock() {
    $("seoul-time").textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Seoul",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date())
  }
  updateClock()
  setInterval(updateClock, 60000)
  syncMotion()
  renderRoute()
})()
