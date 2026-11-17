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
          "Designed and built · Pivo CS.",
          "An internal support and QA workflow connecting reports, investigation context and delivery.",
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
      note: "Beamo, Meet, Cloud and Coaches: source-based working demos with synthetic data, not production interfaces. AI/AX: an illustrative capability overview. No private code or site data are included. Real captures open from each Pivo demo: Cloud and Coaches are current product captures; Meet is the recording view from Pivo’s public documentation. CS: current product capture.",
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
          "ACT is an AI assistant for carrying out tasks. My work was on ACT-1; the public demo shown here presents its current successor, ACT-2.",
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
          "ACT-1 interface.",
          "I built the ACT-1 interface. This official demo shows the current ACT-2 product.",
        ],
        [
          "model",
          "Model Generator",
          "Whole project · AI Model Generator.",
          "I delivered the project end to end, bringing AI models into a usable web product.",
        ],
        [
          "usecase",
          "Product example",
          "Make the input and output concrete.",
          "The public video example shows a URL becoming structured labels and metadata.",
        ],
        [
          "range",
          "Product range",
          "Illustrative overview · Enhans products I worked on.",
          "How the products group by purpose. A designed overview, not a product capture.",
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
      note: "My ACT contribution was ACT-1. ACT imagery and the linked demo show ACT-2, the current public version. Model Generator captures show its public product pages. The product-range view is an illustrative overview.",
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

  let currentExample = "inbox",
    exampleReturn = "work/3i"
  function validReturn(path) {
    if (typeof path !== "string") return "work/3i"
    const [base, query = ""] = path.split("?")
    if (!/^work\/(3i|enhans|rubiwin|translater|kaltoe-timer|neoharness|gleamstral)(?:\/[a-z-]+){0,2}$/.test(base))
      return "work/3i"
    const params = new URLSearchParams(query)
    for (const [key, value] of params) {
      if (key === "filter" && !["all", "professional", "independent"].includes(value)) return "work/3i"
      if (key === "page" && !/^\d{1,3}$/.test(value)) return "work/3i"
      if (!["filter", "page"].includes(key)) return "work/3i"
    }
    return path
  }

  function examplePath(scenario, from) {
    return "playground/" + scenario + "?from=" + encodeURIComponent(validReturn(from))
  }
  function renderCaseApproach() {
    const mapping = {
      "3i": ["access", "When should an agent act?"],
      translater: ["inbox", "When should a draft change?"],
      neoharness: ["access", "When should an agent act?"],
      rubiwin: ["refund", "When should a price be applied?"],
      enhans: ["access", "Where should AI stop?"],
    }
    const entry = mapping[currentProject]
    $("case-approach").hidden = !entry
    if (!entry) return
    $("case-approach").href =
      "#" + examplePath(entry[0], workPath(currentProject, currentVisual, "overview", currentFilter))
    $("case-approach").innerHTML =
      '<span class="case-approach-label">AI demo · try a situation</span><strong>' +
      entry[1] +
      ' <span aria-hidden="true">→</span></strong>'
  }
  function renderExample(route, entering) {
    if (route.scenario && (entering || currentExample !== route.scenario)) {
      fillExample(route.scenario)
    }
    currentExample = route.scenario
    exampleReturn = route.returnPath
    const origin = projects[exampleReturn.split("/")[1]]
    $("example-return").setAttribute("href", "#" + exampleReturn)
    $("example-return").innerHTML =
      (route.hasOrigin ? "Back to " + origin.name : "Explore professional work") + ' <span aria-hidden="true">→</span>'
  }

  function parseRoute(hash) {
    const [path, search = ""] = hash.replace(/^#/, "").split("?"),
      parts = path.split("/")
    const name = parts[0] === "studio" ? "home" : parts[0],
      stage = ["home", "work", "about", "playground"].includes(name) ? name : "home"
    let filter = new URLSearchParams(search).get("filter")
    let project = Object.hasOwn(projects, parts[1]) ? parts[1] : "3i"
    if (!["professional", "independent"].includes(filter)) filter = projects[project].category
    if (projects[project].category !== filter) project = projectOrder.find((id) => projects[id].category === filter)
    const p = projects[project]
    if (project === "3i" && parts[2] === "recordings") parts[2] = "live"
    if (project === "3i" && parts[2] === "finder") parts[2] = "coaches"
    if (project === "enhans" && parts[2] === "frontend") parts[2] = "act"
    return {
      stage,
      project,
      hasOrigin: new URLSearchParams(search).has("from"),
      scenario: ["inbox", "access", "refund"].includes(parts[1]) ? parts[1] : null,
      returnPath: validReturn(new URLSearchParams(search).get("from")),
      visual: p.chapters.some((c) => c[0] === parts[2]) ? parts[2] : p.chapters[0][0],
      page: Math.max(0, Math.min(999, parseInt(new URLSearchParams(search).get("page"), 10) || 0)),
      inspector: ["overview", "role", "decisions", "sources"].includes(parts[3]) ? parts[3] : "overview",
      filter,
      chapter: chapters.some((c) => c.id === parts[1]) ? parts[1] : "3i",
      chapterExplicit: chapters.some((c) => c.id === parts[1]),
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
    if ($("detail-dialog").open) $("detail-dialog").close()
    if ($("image-dialog").open) $("image-dialog").close()
    if (activeStage === "playground" && stageChanged) resetEvaluation()
    document.querySelectorAll(".stage").forEach((el) => (el.hidden = el.id !== "stage-" + r.stage))
    document.querySelectorAll(".site-nav a").forEach((a) => {
      if (a.dataset.nav === r.stage) a.setAttribute("aria-current", "page")
      else a.removeAttribute("aria-current")
    })
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
      if (caseChanged) renderCase()
      else if (visualChanged) {
        renderChapters()
        renderVisual()
        if (!stageChanged) animateIn($("visual-stage"), true)
      }
      if (r.inspector !== "overview" && (stageChanged || caseChanged || inspectorChanged)) {
        // Section links open the full case first, then land on the requested part.
        $("case-more").open = true
        scrollTarget = $("case-" + r.inspector)
      } else if (caseChanged && !stageChanged) scrollTarget = "top"
    }
    if (r.stage === "about") {
      renderChapter(r.chapter, r.chapterExplicit)
      if (r.chapterExplicit && (stageChanged || chapterChanged)) scrollTarget = $("career-" + r.chapter)
    }
    if (r.stage === "playground") renderExample(r, stageChanged)
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
      work: projects[r.project].name,
      about: "Career and background",
      playground: "AI demo",
    }[r.stage]
    $("stage-announcement").textContent = label
    document.title = label + " — Jérôme Schaeffer"
  }
  function routeChange() {
    if (!motionEnabled() || !document.startViewTransition) {
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
      thumb: { illo: "beamo" },
      highlights: ["Beamo 3D viewer", "Sole frontend · 4 Vue apps", "Company-wide Claude adoption"],
      did: [
        ["cube", "Beamo digital-twin viewer in React/Three.js: panoramas, Gaussian splats, BIM/IMDF."],
        ["layers", "Sole frontend developer for four core Vue 3 web apps."],
        ["build", "Designed and built the CS/QA intranet and the public coach catalog."],
        ["spark", "Claude adoption, MCP servers with role-based access, team skills and plugins."],
      ],
    },
    enhans: {
      thumb: { image: "enhans-act-demo" },
      highlights: ["AI products, architecture to deployment", "Multi-LLM workflows", "LLM web agents"],
      did: [
        ["layers", "AI products and SaaS prototypes in React/Next.js, from architecture to deployment."],
        ["flow", "AIAP, Enhans Model, Select LLM: visual workflows and multi-LLM comparison."],
        ["cursor", "ACT-1, Synergy, Chrome extensions: web agents, automation, action tracking."],
        ["cloud", "LLM APIs with AWS S3, Lambda and SQS."],
      ],
    },
    rubiwin: {
      thumb: { image: "rubiwin-auction" },
      highlights: ["Full-stack → team lead", "Logistics portal", "Legacy PHP → React"],
      did: [
        ["truck", "React/TypeScript/Node portal: transport orders, supplier bidding, real-time chat."],
        ["people", "Led a development team; planned delivery with PMs and POs."],
        ["refresh", "Refactored legacy PHP, built Node microservices, moved gradually to React."],
      ],
    },
    translater: {
      thumb: { image: "translater" },
      highlights: ["Tone-aware translation", "English / Korean", "Refinement chips"],
      did: [
        ["chat", "Friends, Casual and Professional tones as a starting point."],
        ["chips", "Up to three removable refinements regenerate the whole result."],
        ["shield", "Reply context stays visible; a failed refinement keeps the previous result."],
      ],
    },
    "kaltoe-timer": {
      thumb: { image: "kaltoe" },
      highlights: ["macOS menu bar", "Linux tray", "Korean flex-time rules"],
      did: [
        ["clock", "Countdown built on Flex clock-in, lunch, a weekly overtime cap and time off."],
        ["ring", "The fill follows the current phase; the color follows the whole day."],
        ["layers", "One shared core for the macOS menu bar and the Linux tray."],
      ],
    },
    neoharness: {
      thumb: { illo: "neoharness" },
      highlights: ["Elixir / OTP runtime", "Memory & schedules", "Supervised agents"],
      did: [
        ["memory", "Each agent keeps its own memory, skills and conversations."],
        ["build", "Bounded tool calling and MCP connectors."],
        ["clock", "Persistent schedules for recurring prompts and heartbeats."],
        ["shield", "OTP supervision isolates failures between conversations."],
      ],
    },
    gleamstral: {
      thumb: { illo: "gleamstral" },
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
    "enhans",
    "range",
    "Product range",
    "Two families of AI products.",
    "Building and comparing models on one side; web agents and automation on the other.",
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
        thumb: "ring",
        source: "Official ring and track label images, shown at their natural proportions.",
      },
      linux: {
        custom: "linux",
        thumb: "linux",
        source: "KDE tray renderer examples from the public repository · synthetic data.",
      },
    },
    "3i": {
      beamo: { demo: "beamo" },
      live: { demo: "meet", capture: "pivo-recording" },
      library: { demo: "cloud", capture: "pivo-cloud-current" },
      coaches: { demo: "coaches", capture: "pivo-coaches-current" },
      cs: { image: "pivo-cs-current", source: "Pivo CS · empty report form" },
      ax: { illo: "ax" },
    },
    enhans: {
      act: { image: "enhans-act-demo", source: "ACT-2 public demo · My contribution: the ACT-1 UI" },
      model: { image: "enhans-model-current", source: "AI Model Generator · public product page" },
      usecase: { image: "enhans-model-usecase", source: "AI Model Generator · public video example" },
      range: { illo: "enhans" },
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

  // One line-icon family: 24px grid, 1.6 stroke, round joins.
  const icons = {
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    build:
      '<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17l3 3 5.5-5.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8"/>',
    flow: '<rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M10 7h2.5a2 2 0 0 1 2 2v5"/>',
    cursor: '<path d="M5 3l14 7.5-6.2 1.6L10 18.5z"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6 10a4 4 0 0 0 1 8z"/>',
    truck:
      '<path d="M3 6h11v10H3zM14 9h4l3 3.5V16h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    people:
      '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a4.5 4.5 0 0 1 5 5"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 3.5V8h4.5M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20.5V16h-4.5"/>',
    chat: '<path d="M4 5h16v11H10l-5 4v-4H4z"/>',
    chips: '<rect x="3" y="6" width="8" height="5" rx="2.5"/><rect x="13" y="6" width="8" height="5" rx="2.5"/><rect x="3" y="14" width="11" height="5" rx="2.5"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    ring: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 7.6 10.5"/>',
    memory: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14"/>',
    swap: '<path d="M4 8h15M15 4l4 4-4 4M20 16H5M9 12l-4 4 4 4"/>',
    book: '<path d="M5 4h10a3 3 0 0 1 3 3v14H8a3 3 0 0 1-3-3z"/><path d="M5 18a3 3 0 0 1 3-3h10"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    fork: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3.5 3.5-3.5 7.5H17"/>',
    cup: '<path d="M4 9h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5v2.5M12 3.5v2.5"/>',
    walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="M9.5 21l2.5-6.5 3 3V21M12 14.5l-.8-5.5 4.3 2.3 2 3M11.2 9l-3.2 2.2-1 3.3"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2.5-5 .5 2 1.5 2.5 2.5 2.5 0-3-1-5 0-7.5z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    share: '<path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    download: '<path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 19h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/>',
  }
  function icon(name) {
    return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || ""}</svg>`
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
  function thumbMedia(visual) {
    const key = visual.image || visual.thumb
    if (key) {
      const im = imageAssets[key]
      const ratio = im.w / im.h
      return `<span class="thumb-media${ratio > 2.2 || ratio < 1 ? " is-whole" : ""}"><img src="${im.src}" width="${im.w}" height="${im.h}" alt="" loading="lazy" decoding="async"></span>`
    }
    if (visual.demo)
      return `<span class="thumb-media is-demo">${icon(visual.glyph || demos[visual.demo].glyph)}<b>Try it</b></span>`
    return `<span class="thumb-media is-illo">${icon(visual.glyph || illoGlyph[visual.illo])}</span>`
  }
  function renderChapters() {
    const p = projects[currentProject],
      chapter = p.chapters.find((c) => c[0] === currentVisual)
    $("visual-chapters").hidden = p.chapters.length < 2
    $("visual-chapters").innerHTML = (p.chapters.length < 2 ? [] : p.chapters)
      .map(
        (c) =>
          `<button type="button" class="chapter-thumb" data-visual="${c[0]}" aria-pressed="${c[0] === currentVisual}" data-focus-id="visual-${currentProject}-${c[0]}">${thumbMedia(visuals[currentProject][c[0]])}<span class="thumb-label">${c[1]}</span></button>`,
      )
      .join("")
    $("visual-annotation").innerHTML = "<strong>" + chapter[2] + "</strong> " + chapter[3]
  }
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
    $("work-collection-label").textContent =
      currentFilter === "professional" ? "Teams & products" : "Experiments & utilities"
    $("project-list").innerHTML = list
      .map((id) => {
        const t = extras[id].thumb
        return `<li><button type="button" class="project-option" data-project="${id}" data-focus-id="project-${id}" aria-current="${id === currentProject}">${thumbMedia(t).replace("thumb-media", "project-thumb thumb-media")}<span class="project-text"><span class="project-name">${projects[id].name}</span><span class="project-short">${projects[id].short}</span></span></button></li>`
      })
      .join("")
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === currentFilter)))
    $("inspector-meta").textContent = p.meta
    $("inspector-title").textContent = p.name
    $("case-headline").textContent = p.headline
    $("inspector-role").textContent = p.role
    $("case-stack").textContent = p.stack
    $("case-highlights").innerHTML = x.highlights.map((h) => "<li>" + h + "</li>").join("")
    $("case-did").innerHTML = x.did
      .map(([name, text]) => `<li><span class="did-icon">${icon(name)}</span><p>${text}</p></li>`)
      .join("")
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
    $("project-position").textContent = index + 1 + " of " + list.length
    $("previous-project").innerHTML =
      '<span aria-hidden="true">←</span> <span class="sr-only">Previous project: </span>' + projects[previous].name
    $("next-project").innerHTML =
      '<span class="sr-only">Next project: </span>' + projects[next].name + ' <span aria-hidden="true">→</span>'
    renderCaseApproach()
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

  // ── Working demos: small re-implementations of real product behaviour, with sample data only.
  // Each demo renders static HTML and mounts its own listeners; window-level listeners are cleaned up on switch.
  const demos = {}
  let demoCleanup = null
  function demoShell(name, label, body) {
    return `<div class="demo demo-${name}" role="group" aria-label="Working demo: ${label}"><div class="demo-bar"><span class="demo-tag">${icon("cursor")}Working demo · sample data</span><button type="button" class="demo-reset" data-demo-reset data-focus-id="demo-reset">Restart demo</button></div>${body}</div>`
  }
  function mountDemo(name, root, focus) {
    demoCleanup?.()
    demoCleanup = null
    if (!root) return
    root.querySelector("[data-demo-reset]")?.addEventListener("click", () => {
      renderVisual()
      $("visual-stage").querySelector("[data-demo-reset]")?.focus()
    })
    demoCleanup = demos[name].mount(root, focus) || null
  }
  // Pivo Meet · a two-person remote lesson. Mirrors the Vue/Agora app's behaviour: exactly two participants,
  // three layouts (side-by-side, small preview, large preview), mic/camera toggles with "Microphone on/off"
  // toasts, "Camera control" that only works after the other side grants "Guest Control" (then arrow keys rotate
  // and zoom their pod), "Start recording" → "Where to save?" (Cloud) → "Starting..." → HH:MM / HH:MM →
  // "Stopping..." → "Processing...", a MM:SS room timer, and Leave → confirm → "How was your call?".
  // Participants and video are samples: no camera, microphone, network or recording is used.
  demos.meet = {
    glyph: "video",
    render() {
      return demoShell(
        "meet",
        "Pivo Meet remote lesson",
        `<div class="pm" data-pm="root">
          <div class="pm-call" data-pm="call">
            <div class="pm-top"><span class="pm-room">Lesson · sample room</span>
              <div class="pm-layouts" role="group" aria-label="Layout"><button type="button" data-pm-layout="fifty" aria-pressed="true">Side by side</button><button type="button" data-pm-layout="small" aria-pressed="false">Small preview</button><button type="button" data-pm-layout="large" aria-pressed="false">Large preview</button></div></div>
            <div class="pm-stage" data-pm="stage" data-layout="fifty">
              <div class="pm-tile remote" data-pm="remote"></div>
              <div class="pm-tile self" data-pm="self"></div>
            </div>
            <div class="pm-podbar" data-pm="podbar" hidden><span>Rotate (← →)</span><span>Zoom in/out (↑ ↓)</span><span class="pm-podbtns"><button type="button" data-pm-pod="left" aria-label="Rotate left">←</button><button type="button" data-pm-pod="right" aria-label="Rotate right">→</button><button type="button" data-pm-pod="in" aria-label="Zoom in">↑</button><button type="button" data-pm-pod="out" aria-label="Zoom out">↓</button></span></div>
            <div class="pm-controls">
              <div class="pm-ctl-mid">
                <button type="button" class="pm-btn" data-pm="mic" aria-pressed="true" title="Turn on/off microphone">${icon("mic")}<span>Mic</span></button>
                <button type="button" class="pm-btn" data-pm="cam" aria-pressed="true" title="Turn on/off camera">${icon("video")}<span>Camera</span></button>
                <button type="button" class="pm-btn" data-pm="pod" aria-pressed="false" aria-describedby="pm-pod-tip">${icon("refresh")}<span>Camera control</span></button>
                <div class="pm-rec-wrap"><button type="button" class="pm-btn pm-rec" data-pm="rec" aria-haspopup="true" aria-expanded="false"><span data-pm="rec-label">Start recording</span></button>
                  <div class="pm-pop" data-pm="where" hidden><p class="illo-kicker">Where to save?</p><button type="button" data-pm-save="cloud"><strong>Cloud</strong><small>02:00 hours remaining</small></button><button type="button" disabled><strong>Desktop <em>BETA</em></strong><small>Records your screen · not in this demo</small></button></div></div>
              </div>
              <div class="pm-ctl-right"><span class="pm-timer" data-pm="timer" title="Room age">00:00</span><button type="button" class="pm-leave" data-pm="leave" title="Leave call">Leave</button></div>
            </div>
            <p class="pm-tip" id="pm-pod-tip" data-pm="tip"></p>
            <div class="pm-guest"><label class="tl-fail"><input type="checkbox" data-pm="grant"> Guest turns “Guest Control” on</label></div>
          </div>
          <div class="pm-sheet" data-pm="sheet" hidden></div>
          <p class="pc-toast" data-pm="toast" role="status" aria-live="polite" hidden></p>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-pm="${k}"]`)
      const st = { layout: "fifty", mic: true, cam: true, grant: false, pod: false, rot: 0, zoom: 1, rec: "idle", recStart: 0, joinedAt: Date.now() }
      let tick = null,
        toastTimer = null,
        recTimer = null,
        // bumped on every genuine leave/rejoin so a pending recording step from the old call can never land
        session = 0
      const pad = (n) => String(n).padStart(2, "0")
      const busy = () => st.rec === "starting" || st.rec === "stopping" || st.rec === "processing"
      function toast(title, body = "") {
        q("toast").innerHTML = `<strong>${title}</strong>${body ? `<span>${body}</span>` : ""}`
        q("toast").hidden = false
        clearTimeout(toastTimer)
        toastTimer = setTimeout(() => (q("toast").hidden = true), 2800)
      }
      function tile(who) {
        const me = who === "self"
        const camOn = me ? st.cam : true
        const micOn = me ? st.mic : true
        const scene = me
          ? ""
          : `<div class="pm-scene" style="--rot:${st.rot}deg;--zoom:${st.zoom}" aria-hidden="true"><i class="pm-arena"></i><i class="pm-rider"></i></div>`
        return `${camOn ? `<div class="pm-video">${scene}${me ? '<span class="pm-avatar sample">C</span>' : ""}</div>` : `<div class="pm-off"><span class="pm-avatar">C</span></div>`}
          <span class="pm-badge"><b>${me ? "Me" : "Guest"}</b><i class="pm-mic${micOn ? "" : " off"}" aria-label="${micOn ? "Microphone on" : "Microphone off"}"></i></span>
          <span class="pm-sample">Sample video</span>`
      }
      function draw() {
        q("stage").dataset.layout = st.layout
        q("remote").innerHTML = tile("remote")
        q("self").innerHTML = tile("self")
        root.querySelectorAll("[data-pm-layout]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pmLayout === st.layout)))
        q("mic").setAttribute("aria-pressed", String(st.mic))
        q("cam").setAttribute("aria-pressed", String(st.cam))
        q("pod").setAttribute("aria-pressed", String(st.pod))
        q("podbar").hidden = !st.pod
        q("tip").textContent = st.grant
          ? st.pod
            ? "Guest Control is on: use the arrows (or ← → ↑ ↓ keys) to move their camera."
            : "Guest Control is on. Press Camera control to move their camera."
          : "You can't move their camera. Ask guest to turn “Guest Control” on."
        const label = { idle: "Start recording", starting: "Starting...", stopping: "Stopping...", processing: "Processing..." }[st.rec]
        if (label) q("rec-label").textContent = label
        q("rec").classList.toggle("is-on", st.rec === "on")
        // aria-disabled (not disabled) so keyboard focus stays on the button through Starting/Stopping/Processing
        q("rec").setAttribute("aria-disabled", String(busy()))
        q("rec").setAttribute("aria-busy", String(busy()))
      }
      function clocks() {
        const s = Math.floor((Date.now() - st.joinedAt) / 1000)
        q("timer").textContent = `${pad(Math.floor(s / 60))}:${pad(s % 60)}`
        if (st.rec === "on") {
          const m = Math.floor((Date.now() - st.recStart) / 60000)
          q("rec-label").textContent = `${pad(Math.floor(m / 60))}:${pad(m % 60)} / 02:00`
        }
      }
      const wait = (ms, fn) => {
        const gen = session
        clearTimeout(recTimer)
        recTimer = setTimeout(() => {
          if (gen !== session) return
          fn()
          // if focus fell to <body> while the call was visible, hand it back to the recording button
          if (!q("call").hidden && (document.activeElement === document.body || !document.activeElement)) q("rec").focus()
        }, motionEnabled() ? ms : 0)
      }
      function setWhere(open) {
        q("where").hidden = !open
        q("rec").setAttribute("aria-expanded", String(open))
        if (open) q("where").querySelector("[data-pm-save]").focus()
      }
      function pod(dir) {
        if (!st.pod) return
        if (dir === "left") st.rot = Math.max(-40, st.rot - 10)
        if (dir === "right") st.rot = Math.min(40, st.rot + 10)
        if (dir === "in") st.zoom = Math.min(1.8, +(st.zoom + 0.1).toFixed(2))
        if (dir === "out") st.zoom = Math.max(1, +(st.zoom - 0.1).toFixed(2))
        draw()
      }
      function sheet(html) {
        q("call").hidden = true
        q("sheet").innerHTML = html
        q("sheet").hidden = false
        q("sheet").querySelector("button, input, textarea")?.focus()
      }
      function closeSheet() {
        q("sheet").hidden = true
        q("sheet").innerHTML = ""
        q("call").hidden = false
      }
      // Cancel on "leave this call?": the call never stopped, so nothing is reset; timers and recording carry on.
      function resume() {
        closeSheet()
        q("leave").focus()
      }
      // A genuine leave ends the call: drop pending recording steps, stop recording and revoke guest control.
      function endCall() {
        session++
        clearTimeout(recTimer)
        clearTimeout(toastTimer)
        q("toast").hidden = true
        setWhere(false)
        q("grant").checked = false
        Object.assign(st, { rec: "idle", grant: false, pod: false, rot: 0, zoom: 1 })
        draw()
      }
      // "Start now" after leaving: a fresh call with a new clock and the same clean state.
      function rejoin() {
        endCall()
        st.joinedAt = Date.now()
        closeSheet()
        draw()
        clocks()
        q("leave").focus()
      }
      root.addEventListener("click", (e) => {
        const t = e.target
        const lay = t.closest("[data-pm-layout]")
        if (lay) return ((st.layout = lay.dataset.pmLayout), draw())
        if (t.closest('[data-pm="mic"]')) return ((st.mic = !st.mic), draw(), toast(st.mic ? "Microphone on" : "Microphone off"))
        if (t.closest('[data-pm="cam"]')) return ((st.cam = !st.cam), draw(), toast(st.cam ? "Camera on" : "Camera off"))
        if (t.closest('[data-pm="pod"]')) {
          if (!st.grant) return toast("Camera control", "You can't move their camera. Ask guest to turn “Guest Control” on.")
          st.pod = !st.pod
          return draw()
        }
        const pb = t.closest("[data-pm-pod]")
        if (pb) return pod(pb.dataset.pmPod)
        if (t.closest('[data-pm="rec"]')) {
          if (busy()) return
          if (st.rec === "idle") return setWhere(q("where").hidden)
          if (st.rec === "on") {
            st.rec = "stopping"
            draw()
            wait(700, () => {
              st.rec = "processing"
              draw()
              wait(900, () => {
                st.rec = "idle"
                draw()
                toast("Cloud recording saved successfully", "Demo · nothing was recorded or saved")
              })
            })
          }
          return
        }
        if (t.closest('[data-pm-save="cloud"]')) {
          setWhere(false)
          st.rec = "starting"
          draw()
          q("rec").focus()
          wait(800, () => {
            st.rec = "on"
            st.recStart = Date.now()
            draw()
            clocks()
            toast("Recording Started", "This meeting is now being recorded · demo, nothing is captured")
          })
          return
        }
        if (t.closest('[data-pm="leave"]'))
          return sheet(`<div class="pm-card" role="dialog" aria-modal="true" aria-labelledby="pm-leave-t"><h4 id="pm-leave-t">Are you sure you want to leave this video call?</h4><div class="pc-dbtns"><button type="button" class="button button-outline" data-pm-back>Cancel</button><button type="button" class="button pc-danger" data-pm-left>Leave</button></div></div>`)
        if (t.closest("[data-pm-back]")) return resume()
        if (t.closest("[data-pm-left]")) {
          // leaving stops your own recording and ends guest control
          endCall()
          return sheet(`<form class="pm-card" data-pm-survey><h4>How was your call?</h4><div class="pm-stars" role="radiogroup" aria-label="Rating">${[1, 2, 3, 4, 5].map((n) => `<label><input type="radio" name="pm-stars" value="${n}"><span aria-hidden="true">★</span><span class="sr-only">${n} star${n > 1 ? "s" : ""}</span></label>`).join("")}</div><label class="kt-field"><span>Tell us how we can improve?</span><textarea rows="2"></textarea></label><div class="pc-dbtns"><button type="button" class="button button-outline" data-pm-skip>Skip</button><button type="submit" class="button button-primary">Submit</button></div><p class="pc-note">Demo · nothing is submitted.</p></form>`)
        }
        if (t.closest("[data-pm-skip]")) return sheet(`<div class="pm-card"><h4>Ready to start?</h4><p class="pc-note">Sample lesson room.</p><button type="button" class="button button-primary" data-pm-rejoin>Start now</button></div>`)
        if (t.closest("[data-pm-rejoin]")) return rejoin()
        if (t.closest("[data-pm-close]")) return sheet(`<div class="pm-card"><h4>Ready to start?</h4><p class="pc-note">Sample lesson room.</p><button type="button" class="button button-primary" data-pm-rejoin>Start now</button></div>`)
      })
      root.addEventListener("submit", (e) => {
        if (!e.target.matches("[data-pm-survey]")) return
        e.preventDefault()
        sheet(`<div class="pm-card"><h4>Thanks for your feedback</h4><p class="pc-note">Go to customer support for help · demo, nothing was sent.</p><button type="button" class="button button-outline" data-pm-close>Close</button></div>`)
      })
      q("grant").addEventListener("change", (e) => {
        st.grant = e.target.checked
        if (!st.grant) st.pod = false
        draw()
      })
      root.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !q("where").hidden) return setWhere(false), q("rec").focus()
        if (e.key === "Escape" && q("sheet").querySelector("[data-pm-back]")) return resume()
        if (!st.pod || e.target.closest("input, textarea, select")) return
        const map = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "in", ArrowDown: "out" }
        if (map[e.key]) {
          e.preventDefault()
          pod(map[e.key])
        }
      })
      draw()
      clocks()
      tick = setInterval(clocks, 1000)
      return () => {
        clearInterval(tick)
        clearTimeout(toastTimer)
        clearTimeout(recTimer)
      }
    },
  }
  // Pivo Cloud · video gallery. Mirrors the Vue app's behaviour: "Cloud Gallery" / "Lesson Gallery" tabs, a
  // "My cloud" panel, items grouped by day (Today, Yesterday, en-US long date) newest first, 4:3 cards with a play
  // icon and status badges, "Select" / "Cancel" mode with select-all, Share (1+), Download (exactly 1) and Delete
  // (1+) icon actions, the "Delete N files" dialog, a viewer with prev/next and Esc/←/→/A/D keys, and the storage
  // bar in decimal units with 80% / 90% thresholds. Files are sample entries; nothing is uploaded or downloaded.
  demos.cloud = {
    glyph: "cloud",
    render() {
      return demoShell(
        "cloud",
        "Pivo Cloud video gallery",
        `<div class="pc">
          <aside class="pc-side">
            <p class="pc-side-title">My cloud</p>
            <button type="button" class="pc-folder" data-pc-tab="cloud">${icon("layers")}Pivo Track Gallery</button>
            <button type="button" class="pc-folder" data-pc-tab="lesson">${icon("layers")}Pivo Lessons</button>
            <div class="pc-storage"><div class="pc-bar" aria-hidden="true"><i data-pc="bar"></i></div><p data-pc="usage"></p><p class="pc-more">Want to have more storage?</p></div>
          </aside>
          <div class="pc-main">
            <div class="pc-tabs" role="tablist" aria-label="Galleries"><button type="button" role="tab" data-pc-tab="cloud">Cloud Gallery</button><button type="button" role="tab" data-pc-tab="lesson">Lesson Gallery</button></div>
            <div class="pc-selectbar">
              <label class="pc-all" data-pc="all-wrap" hidden><input type="checkbox" data-pc="all"><span class="sr-only">Select all</span></label>
              <div class="pc-actions" data-pc="actions" hidden>
                <button type="button" class="pc-icon" data-pc-act="share" aria-label="Share">${icon("share")}</button>
                <button type="button" class="pc-icon" data-pc-act="download" aria-label="Download">${icon("download")}</button>
                <button type="button" class="pc-icon" data-pc-act="delete" aria-label="Delete">${icon("trash")}</button>
              </div>
              <button type="button" class="pc-select" data-pc="select">Select</button>
            </div>
            <div class="pc-list" data-pc="list"></div>
            <p class="pc-toast" data-pc="toast" role="status" aria-live="polite" hidden></p>
          </div>
          <div class="pc-modal" data-pc="modal" hidden></div>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-pc="${k}"]`)
      const day = 86400000,
        now = new Date()
      // Sample files: [gallery, name, ext, bytes, daysAgo, status]
      const seed = [
        ["cloud", "Flatwork warm-up", "mp4", 412_000_000, 0, ""],
        ["cloud", "Canter transitions", "mp4", 655_300_000, 0, "Stabilized"],
        ["cloud", "Lunging session", "mov", 298_700_000, 0, "validating"],
        ["cloud", "Grid work", "mp4", 520_000_000, 1, ""],
        ["cloud", "Trail ride", "mp4", 187_400_000, 4, "Processing"],
        ["cloud", "Course walk", "mp4", 233_100_000, 9, "Compressed"],
        ["lesson", "Lesson · seat and hands", "mp4", 96_200_000, 0, ""],
        ["lesson", "Lesson · lateral work", "mp4", 141_800_000, 2, "Gigapixel"],
        ["lesson", "Lesson · first jump", "mp4", 88_500_000, 6, ""],
      ]
      let files = seed.map(([gallery, name, ext, bytes, ago, status], i) => ({ id: i + 1, gallery, name, ext, bytes, date: new Date(now - ago * day), status }))
      const TOTAL = 3_000_000_000
      const st = { tab: "cloud", selecting: false, selected: new Set(), open: null }
      let toastTimer = null,
        lastFocus = null
      const fmtBytes = (b) => {
        if (b <= 0) return "0 B"
        const units = ["byte", "kilobyte", "megabyte", "gigabyte", "terabyte"]
        const i = Math.min(units.length - 1, Math.floor(Math.log10(b) / 3))
        return new Intl.NumberFormat("en", { style: "unit", unit: units[i], unitDisplay: "short", maximumFractionDigits: 2 }).format(b / 1000 ** i)
      }
      const dayKey = (d) => d.toISOString().slice(0, 10)
      const header = (d) => {
        const diff = Math.round((new Date(dayKey(now)) - new Date(dayKey(d))) / day)
        return diff === 0 ? "Today" : diff === 1 ? "Yesterday" : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      }
      const shade = (id) => `linear-gradient(135deg, oklch(${38 + (id % 4) * 6}% 0.05 ${150 + id * 23}), oklch(24% 0.03 ${200 + id * 11}))`
      const visible = () => files.filter((f) => f.gallery === st.tab)
      function toast(text) {
        q("toast").textContent = text
        q("toast").hidden = false
        clearTimeout(toastTimer)
        toastTimer = setTimeout(() => (q("toast").hidden = true), 2600)
      }
      function draw() {
        const list = visible()
        const groups = new Map()
        ;[...list].sort((a, b) => b.date - a.date).forEach((f) => {
          const k = dayKey(f.date)
          if (!groups.has(k)) groups.set(k, [])
          groups.get(k).push(f)
        })
        q("list").innerHTML = list.length
          ? [...groups.values()]
              .map(
                (g) =>
                  `<section class="pc-group"><h4>${header(g[0].date)}</h4><ul class="pc-grid">${g
                    .map((f) => {
                      const locked = f.status === "validating"
                      const sel = st.selected.has(f.id)
                      return `<li><button type="button" class="pc-card${sel ? " is-selected" : ""}" data-pc-file="${f.id}" ${locked ? 'aria-disabled="true"' : ""} aria-label="${f.name}${st.selecting ? (sel ? ", selected" : ", not selected") : ""}${locked ? ", validating" : ""}" style="--thumb:${shade(f.id)}">
                        ${st.selecting && !locked ? `<span class="pc-check" aria-hidden="true">${sel ? icon("check") : ""}</span>` : ""}
                        ${f.status && !locked ? `<span class="pc-badge">${f.status}</span>` : ""}
                        ${locked ? '<span class="pc-lock" aria-hidden="true"><i></i></span>' : `<span class="pc-play" aria-hidden="true"></span>`}
                      </button></li>`
                    })
                    .join("")}</ul></section>`,
              )
              .join("")
          : '<div class="pc-empty"><p>Please upload files from Pivo Track app</p><p>Once you upload, it will appear here.</p></div>'
        // storage across both galleries
        const used = files.reduce((a, f) => a + f.bytes, 0),
          pct = Math.round((used / TOTAL) * 10000) / 100
        q("usage").textContent = `${fmtBytes(used)} / ${fmtBytes(TOTAL)}`
        q("bar").style.width = Math.min(100, pct) + "%"
        q("bar").className = pct >= 90 ? "is-red" : pct >= 80 ? "is-yellow" : ""
        root.querySelectorAll("[data-pc-tab]").forEach((b) => {
          const on = b.dataset.pcTab === st.tab
          b.setAttribute(b.getAttribute("role") === "tab" ? "aria-selected" : "aria-current", String(on))
        })
        const selectable = list.filter((f) => f.status !== "validating")
        const n = st.selected.size
        q("select").textContent = st.selecting ? "Cancel" : "Select"
        q("select").hidden = list.length === 0
        q("all-wrap").hidden = !st.selecting
        q("actions").hidden = !st.selecting
        q("all").checked = st.selecting && n > 0 && n === selectable.length
        root.querySelector('[data-pc-act="share"]').disabled = n < 1
        root.querySelector('[data-pc-act="download"]').disabled = n !== 1 // Download is single-file only
        root.querySelector('[data-pc-act="delete"]').disabled = n < 1
      }
      function modal(html) {
        lastFocus = document.activeElement
        q("modal").innerHTML = `<div class="pc-dialog" role="dialog" aria-modal="true" aria-labelledby="pc-dialog-title">${html}</div>`
        q("modal").hidden = false
        q("modal").querySelector("button:not([disabled])")?.focus()
      }
      function closeModal() {
        q("modal").hidden = true
        q("modal").innerHTML = ""
        st.open = null
        if (lastFocus?.isConnected) lastFocus.focus()
        else root.querySelector("[data-pc-file]")?.focus()
      }
      function openViewer(id) {
        const list = [...visible()].sort((a, b) => b.date - a.date).filter((f) => f.status !== "validating")
        const i = list.findIndex((f) => f.id === id)
        if (i < 0) return
        const f = list[i]
        st.open = id
        const wasOpen = !q("modal").hidden
        const html = `<div class="pc-viewer"><header class="pc-vhead"><button type="button" class="pc-icon" data-pc-close aria-label="Back">‹</button><h4 id="pc-dialog-title">${f.name}.${f.ext}</h4></header>
          <div class="pc-vbody"><div class="pc-player" style="--thumb:${shade(f.id)}"><span class="pc-play" aria-hidden="true"></span><p>Sample video · no media</p>
            <button type="button" class="pc-nav prev" data-pc-step="-1" aria-label="Previous" ${i === 0 ? "disabled" : ""}>‹</button><button type="button" class="pc-nav next" data-pc-step="1" aria-label="Next" ${i === list.length - 1 ? "disabled" : ""}>›</button></div>
            <div class="pc-info"><div class="pc-itabs"><span>Video Annotation</span><span class="is-on">Info</span></div><p class="pc-iname">${f.name}.${f.ext}</p>
            <dl><div><dt>File type</dt><dd>${f.ext}</dd></div><div><dt>File size</dt><dd>${fmtBytes(f.bytes)}</dd></div><div><dt>Last modified</dt><dd>${f.date.toLocaleDateString()}</dd></div></dl></div></div></div>`
        if (wasOpen) {
          q("modal").innerHTML = `<div class="pc-dialog is-viewer" role="dialog" aria-modal="true" aria-labelledby="pc-dialog-title">${html}</div>`
          q("modal").querySelector("[data-pc-close]").focus()
        } else {
          modal(html)
          q("modal").querySelector(".pc-dialog").classList.add("is-viewer")
        }
      }
      function step(dir) {
        const list = [...visible()].sort((a, b) => b.date - a.date).filter((f) => f.status !== "validating")
        const i = list.findIndex((f) => f.id === st.open)
        const next = list[i + dir]
        if (next) openViewer(next.id)
      }
      root.addEventListener("click", (e) => {
        const tab = e.target.closest("[data-pc-tab]")
        if (tab) {
          st.tab = tab.dataset.pcTab
          st.selected.clear()
          st.selecting = false
          return draw()
        }
        const card = e.target.closest("[data-pc-file]")
        if (card) {
          const f = files.find((x) => x.id === +card.dataset.pcFile)
          if (f.status === "validating") return
          if (st.selecting) {
            if (st.selected.has(f.id)) st.selected.delete(f.id)
            else st.selected.add(f.id)
            draw()
            root.querySelector(`[data-pc-file="${f.id}"]`)?.focus()
          } else openViewer(f.id)
          return
        }
        if (e.target.closest('[data-pc="select"]')) {
          st.selecting = !st.selecting
          st.selected.clear() // leaving select mode clears the selection
          return draw()
        }
        const act = e.target.closest("[data-pc-act]")
        if (act && !act.disabled) {
          const n = st.selected.size
          if (act.dataset.pcAct === "delete")
            modal(`<h4 id="pc-dialog-title">Delete ${n} files</h4><p>I understand that deleting is permanent and can't be undone.</p><p class="pc-note">Demo: only the sample list changes.</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>Close</button><button type="button" class="button pc-danger" data-pc-confirm="delete">Delete</button></div>`)
          else if (act.dataset.pcAct === "share")
            modal(`<h4 id="pc-dialog-title">Share ${n} files</h4><p class="pc-link">https://example.invalid/share/sample</p><p class="pc-note">Sample link · the real one expires after 30 days. Nothing is created or copied here.</p><div class="pc-dbtns"><button type="button" class="button button-outline" data-pc-close>Cancel</button><button type="button" class="button button-primary" data-pc-confirm="copy">Copy Link</button></div>`)
          else toast("Download starts for a single file · demo, nothing is downloaded")
          return
        }
        const confirm = e.target.closest("[data-pc-confirm]")
        if (confirm) {
          if (confirm.dataset.pcConfirm === "delete") {
            files = files.filter((f) => !st.selected.has(f.id))
            st.selected.clear()
            st.selecting = false // deleting clears the selection and leaves select mode
            closeModal()
            draw()
            q("select").focus()
          } else {
            closeModal()
            toast("Link Copied! · demo, clipboard untouched")
          }
          return
        }
        if (e.target.closest("[data-pc-close]")) return closeModal()
        const nav = e.target.closest("[data-pc-step]")
        if (nav && !nav.disabled) step(+nav.dataset.pcStep)
      })
      q("all").addEventListener("change", (e) => {
        st.selected = new Set(e.target.checked ? visible().filter((f) => f.status !== "validating").map((f) => f.id) : [])
        draw()
      })
      root.addEventListener("keydown", (e) => {
        if (q("modal").hidden) return
        if (e.key === "Escape") return e.preventDefault(), closeModal()
        if (st.open != null && (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")) step(-1)
        if (st.open != null && (e.key === "ArrowRight" || e.key === "d" || e.key === "D")) step(1)
      })
      draw()
      return () => clearTimeout(toastTimer)
    },
  }
  // Gleamstral · request builder. Mirrors src/gleamstral/chat.gleam and client.gleam: setters clamp
  // (temperature 0.0…1.5, top_p 0.0…1.0, max_tokens ≥ 0, where 0 is sent as null), complete_request builds
  // POST https://api.mistral.ai/v1/chat/completions with body_encoder's fields in order, and nothing is sent:
  // your HTTP client sends it. handle_response maps 200 → decoded Response (or "Failed to decode response"),
  // 401 → Unauthorized, 429 → RateLimitExceeded, anything else → Unknown(message). Replies are sample data.
  demos.gleamstral = {
    glyph: "code",
    render() {
      const models = [
        ["MistralLarge", "mistral-large-latest"], ["MistralMedium", "mistral-medium-latest"], ["MistralSmall", "mistral-small-latest"],
        ["Ministral3B", "ministral-3b-latest"], ["Ministral8B", "ministral-8b-latest"], ["PixtralLarge", "pixtral-large-latest"],
        ["Pixtral", "pixtral-12b-2409"], ["MistralNemo", "open-mistral-nemo"], ["MistralSaba", "mistral-saba-latest"],
      ]
      const formats = [["Text", "Text"], ["JsonObject", "JsonObject"], ["JsonSchema", "JsonSchema"]]
      const replies = [["200", "200 OK"], ["200bad", "200 · missing field"], ["401", "401"], ["429", "429"], ["503", "503"]]
      return demoShell(
        "gleamstral",
        "Gleamstral chat request builder",
        `<div class="gs">
          <div class="gs-controls">
            <label class="kt-field"><span>Model</span><select data-gs="model">${models.map(([c, s]) => `<option value="${c}|${s}"${c === "MistralSmall" ? " selected" : ""}>model.${c}</option>`).join("")}</select></label>
            <label class="gs-range"><span>set_temperature <output data-gs="t-out"></output></span><input type="range" min="-0.5" max="2" step="0.1" value="0.7" data-gs="t" aria-label="Temperature"></label>
            <label class="gs-range"><span>set_top_p <output data-gs="p-out"></output></span><input type="range" min="-0.2" max="1.2" step="0.05" value="1" data-gs="p" aria-label="Top p"></label>
            <label class="gs-range"><span>set_max_tokens <output data-gs="m-out"></output></span><input type="range" min="-50" max="300" step="10" value="100" data-gs="m" aria-label="Maximum tokens"></label>
            <div class="gs-format"><span class="illo-kicker">Response format</span><div class="tl-seg" role="group" aria-label="Response format">${formats.map(([v, l]) => `<button type="button" data-gs-format="${v}" aria-pressed="${v === "JsonSchema"}">${l}</button>`).join("")}</div></div>
          </div>
          <div class="gs-panel gs-code"><p class="illo-kicker">Your Gleam</p><pre data-gs="code"></pre></div>
          <div class="gs-panel gs-req"><p class="illo-kicker">complete_request → Request(String) · built, not sent</p><pre data-gs="req"></pre><p class="gs-note">Body shown formatted; <code>json.to_string</code> sends it compact.</p></div>
          <div class="gs-panel gs-send"><p class="illo-kicker">Your HTTP client sends it · sample replies</p>
            <div class="tl-seg" role="group" aria-label="Sample HTTP reply">${replies.map(([v, l]) => `<button type="button" data-gs-reply="${v}" aria-pressed="${v === "200"}">${l}</button>`).join("")}</div>
            <p class="illo-kicker">Sample reply body</p><pre data-gs="raw"></pre>
            <p class="illo-kicker">chat.handle_response(response)</p><pre class="gs-decoded" data-gs="decoded" aria-live="polite"></pre>
          </div>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-gs="${k}"]`)
      const st = { format: "JsonSchema", reply: "200" }
      // Gleam prints floats with a decimal point (1.0, not 1)
      const F = (n) => ({ f: Math.round(n * 1000) / 1000 })
      const fmtF = (n) => (Number.isInteger(n) ? n.toFixed(1) : String(n))
      function toJson(v, ind = "") {
        const next = ind + "  "
        if (v === null) return "null"
        if (v && typeof v === "object" && "f" in v) return fmtF(v.f)
        if (typeof v === "string") return JSON.stringify(v)
        if (typeof v !== "object") return String(v)
        if (Array.isArray(v)) return v.length ? `[\n${v.map((x) => next + toJson(x, next)).join(",\n")}\n${ind}]` : "[]"
        const keys = Object.keys(v)
        return keys.length ? `{\n${keys.map((k) => `${next}${JSON.stringify(k)}: ${toJson(v[k], next)}`).join(",\n")}\n${ind}}` : "{}"
      }
      const bookSchema = {
        type: "object",
        properties: { name: { type: "string" }, authors: { type: "array", items: { type: "string" } } },
        required: ["name", "authors"],
      }
      function draw() {
        const [ctor, modelId] = q("model").value.split("|")
        const tRaw = +(+q("t").value).toFixed(2),
          pRaw = +(+q("p").value).toFixed(2),
          mRaw = +q("m").value
        const t = Math.min(1.5, Math.max(0, tRaw)), // float.clamp(temperature, 0.0, 1.5)
          p = Math.min(1, Math.max(0, pRaw)), // float.clamp(top_p, 0.0, 1.0)
          m = Math.max(0, mRaw) // int.max(max_tokens, 0)
        const note = (raw, val, extra = "") => (raw !== val ? `${fmtF(raw)} → ${fmtF(val)}${extra}` : fmtF(val))
        q("t-out").textContent = note(tRaw, t)
        q("p-out").textContent = note(pRaw, p)
        q("m-out").textContent = mRaw !== m ? `${mRaw} → ${m}` : String(m)
        const fmtCall =
          st.format === "Text" ? "" : st.format === "JsonObject" ? "\n  |> chat.set_response_format(chat.JsonObject)" : '\n  |> chat.set_response_format(\n    chat.JsonSchema(schema: book_schema, name: "book"),\n  )'
        const comment = (raw, val, lo) => (raw !== val ? `  // clamped to ${lo}` : "")
        q("code").textContent =
          `let chat_client =\n  chat.new(client)\n  |> chat.set_temperature(${fmtF(tRaw)})${comment(tRaw, t, "0.0…1.5")}\n  |> chat.set_top_p(${fmtF(pRaw)})${comment(pRaw, p, "0.0…1.0")}\n  |> chat.set_max_tokens(${mRaw})${mRaw !== m ? "  // int.max(_, 0)" : m === 0 ? "  // 0 → sent as null" : ""}${fmtCall}\n\nchat_client\n|> chat.complete_request(model.${ctor}, messages)\n|> httpc.send  // your client, your choice`
        const body = {
          model: modelId,
          temperature: F(t),
          top_p: F(p),
          max_tokens: m === 0 ? null : m,
          stream: false,
          stop: [],
          random_seed: null,
          messages: [
            { role: "system", content: "Extract the book informations" },
            { role: "user", content: "I recently read To Kill a Mockingbird by Harper Lee." },
          ],
          response_format:
            st.format === "Text"
              ? { type: "text" }
              : st.format === "JsonObject"
                ? { type: "json_object" }
                : { type: "json_schema", json_schema: { name: "book", schema: bookSchema, strict: true } },
          tools: [],
          tool_choice: "auto",
          presence_penalty: F(0),
          frequency_penalty: F(0),
          n: 1,
          prediction: { type: "content", content: "" },
          safe_prompt: false,
        }
        q("req").textContent =
          "POST https://api.mistral.ai/v1/chat/completions\nauthorization: Bearer <your-api-key>\ncontent-type: application/json\n\n" + toJson(body)
        // Sample replies and what handle_response turns them into
        const content = st.format === "Text" ? "To Kill a Mockingbird was written by Harper Lee." : '{"name":"To Kill a Mockingbird","authors":["Harper Lee"]}'
        const okBody = (withToolCalls) => ({
          id: "sample-0001",
          object: "chat.completion",
          created: 1700000000,
          model: modelId,
          choices: [{ index: 0, message: withToolCalls ? { role: "assistant", content, tool_calls: null } : { role: "assistant", content }, finish_reason: "stop" }],
          usage: { prompt_tokens: 31, completion_tokens: 17, total_tokens: 48 },
        })
        let raw, decoded
        if (st.reply === "200") {
          raw = toJson(okBody(true))
          decoded = `Ok(Response(\n  id: "sample-0001",\n  object: "chat.completion",\n  created: 1700000000,\n  model: "${modelId}",\n  choices: [\n    ChatCompletionChoice(\n      index: 0,\n      message: AssistantMessage(${JSON.stringify(content)}, None, False),\n      finish_reason: Stop,\n    ),\n  ],\n  usage: Usage(prompt_tokens: 31, completion_tokens: 17, total_tokens: 48),\n))`
        } else if (st.reply === "200bad") {
          raw = toJson(okBody(false))
          decoded = 'Error(Unknown("Failed to decode response"))\n// assistant messages need a "tool_calls" field (it may be null)'
        } else if (st.reply === "401") {
          raw = toJson({ message: "Unauthorized" })
          decoded = "Error(Unauthorized)"
        } else if (st.reply === "429") {
          raw = toJson({ message: "Requests rate limit exceeded" })
          decoded = "Error(RateLimitExceeded)"
        } else {
          raw = toJson({ message: "Service unavailable" })
          decoded = 'Error(Unknown("Service unavailable"))\n// any other status: the body\'s "message" field'
        }
        q("raw").textContent = `HTTP ${st.reply === "200bad" ? "200" : st.reply} · sample, nothing was sent\n${raw}`
        q("decoded").textContent = decoded
        q("decoded").classList.toggle("is-error", decoded.startsWith("Error"))
        root.querySelectorAll("[data-gs-format]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gsFormat === st.format)))
        root.querySelectorAll("[data-gs-reply]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.gsReply === st.reply)))
      }
      ;["model", "t", "p", "m"].forEach((k) => q(k).addEventListener("input", draw))
      root.querySelectorAll("[data-gs-format]").forEach((b) => b.addEventListener("click", () => ((st.format = b.dataset.gsFormat), draw())))
      root.querySelectorAll("[data-gs-reply]").forEach((b) => b.addEventListener("click", () => ((st.reply = b.dataset.gsReply), draw())))
      draw()
    },
  }
  // Beamo · 3D viewer measurement. Re-implements audited behaviour of the 3D tour ruler and viewer:
  // toolbar Select / Measure / Build objects (keys 1·2·3); Measure adds points with a dashed live preview,
  // snaps to existing points (~30 px) or locks to a world axis within 10°, closes when you click the first
  // point (3+ points), Escape or Finish keeps a line of 2+ points, Backspace removes the last point, and lines
  // stay until Clear all. Build objects places a box in 4 clicks (corner, edge, depth, height) and labels
  // s: area and v: volume. Orbit and first-person cameras, a shared section box and click-to-inspect BIM
  // elements (orange highlight, IFC properties, off in first-person). Geometry is a synthetic sample room.
  demos.beamo = {
    glyph: "cube",
    render() {
      return demoShell(
        "beamo",
        "Beamo 3D measurement on a sample room",
        `<div class="bm">
          <div class="bm-toolbar">
            <div class="bm-seg" role="group" aria-label="Measurement tool">
              <button type="button" data-bm-mode="select" aria-pressed="false"><kbd>1</kbd>Select</button>
              <button type="button" data-bm-mode="distance" aria-pressed="true"><kbd>2</kbd>Measure</button>
              <button type="button" data-bm-mode="volume" aria-pressed="false"><kbd>3</kbd>Build objects</button>
            </div>
            <div class="bm-actions">
              <button type="button" data-bm="finish">Finish</button>
              <button type="button" data-bm="reset">Reset</button>
              <button type="button" data-bm="save" disabled title="Saving is not part of this demo">Save <span data-bm="count">0</span></button>
              <button type="button" data-bm="clear">Clear all</button>
            </div>
          </div>
          <div class="bm-view">
            <svg class="bm-svg" data-bm="svg" tabindex="0" role="application" aria-label="Sample room in 3D. Press ] or [ to move between snap targets and Enter to place a point or select. Arrow keys orbit; in first-person, W A S D move and Q E change eye height. Escape keeps the line, Backspace removes the last point."></svg>
            <p class="bm-hint" data-bm="hint" aria-live="polite"></p>
            <div class="bm-inspect" data-bm="inspect" hidden></div>
          </div>
          <div class="bm-side">
            <div class="bm-seg" role="group" aria-label="Camera"><button type="button" data-bm-cam="orbit" aria-pressed="true">Orbit</button><button type="button" data-bm-cam="fp" aria-pressed="false">First-person</button></div>
            <div class="bm-seg" role="group" aria-label="Units"><button type="button" data-bm-unit="m" aria-pressed="true">m</button><button type="button" data-bm-unit="ft" aria-pressed="false">ft</button></div>
            <div class="bm-seg bm-kbd" role="group" aria-label="Keyboard targets"><button type="button" data-bm="prev" aria-label="Previous target">‹</button><button type="button" data-bm="next" aria-label="Next target">›</button><button type="button" data-bm="place">Place point</button></div>
            <label class="bm-clip"><input type="checkbox" data-bm="clip"> Section box</label>
            <div class="bm-sliders" data-bm="sliders" hidden>
              <label>X max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="0"></label>
              <label>Y max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="1"></label>
              <label>Z max <input type="range" min="0.2" max="1" step="0.005" value="1" data-bm-axis="2"></label>
            </div>
          </div>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-bm="${k}"]`)
      const svg = q("svg")
      const NS = "http://www.w3.org/2000/svg"
      // ── Vector helpers
      const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
      const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
      const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s]
      const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
      const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
      const len = (a) => Math.hypot(a[0], a[1], a[2])
      const norm = (a) => mul(a, 1 / (len(a) || 1))
      // ── Synthetic room (metres): 6 × 4 × 2.8 with BIM-like elements
      const W = 6,
        D = 4,
        H = 2.8
      const quad = (a, b, c, d) => [a, b, c, d]
      const elements = [
        { id: 1, type: "IfcSlab", name: "Floor slab", obj: "Concrete slab", tag: "S-01", pre: "FLOOR", faces: [quad([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])], n: [0, 0, 1] },
        { id: 2, type: "IfcWall", name: "Wall north", obj: "Partition 120", tag: "W-01", pre: "STANDARD", faces: [quad([0, D, 0], [W, D, 0], [W, D, H], [0, D, H])], n: [0, -1, 0] },
        { id: 3, type: "IfcWall", name: "Wall south", obj: "Partition 120", tag: "W-02", pre: "STANDARD", faces: [quad([0, 0, 0], [0, 0, H], [W, 0, H], [W, 0, 0])], n: [0, 1, 0] },
        { id: 4, type: "IfcWall", name: "Wall west", obj: "Partition 120", tag: "W-03", pre: "STANDARD", faces: [quad([0, 0, 0], [0, D, 0], [0, D, H], [0, 0, H])], n: [1, 0, 0] },
        { id: 5, type: "IfcWall", name: "Wall east", obj: "Partition 120", tag: "W-04", pre: "STANDARD", faces: [quad([W, 0, 0], [W, 0, H], [W, D, H], [W, D, 0])], n: [-1, 0, 0] },
        { id: 6, type: "IfcDoor", name: "Door 01", obj: "Single swing 900", tag: "D-01", pre: "DOOR", faces: [quad([0.01, 1.2, 0], [0.01, 2.1, 0], [0.01, 2.1, 2.1], [0.01, 1.2, 2.1])], n: [1, 0, 0] },
        { id: 7, type: "IfcWindow", name: "Window 01", obj: "Fixed 2000×1100", tag: "WN-01", pre: "WINDOW", faces: [quad([2, D - 0.01, 0.9], [4, D - 0.01, 0.9], [4, D - 0.01, 2], [2, D - 0.01, 2])], n: [0, -1, 0] },
        {
          id: 8, type: "IfcColumn", name: "Column C1", obj: "Concrete 400×400", tag: "C-01", pre: "COLUMN",
          faces: [
            quad([4.6, 1, 0], [5, 1, 0], [5, 1, H], [4.6, 1, H]),
            quad([5, 1, 0], [5, 1.4, 0], [5, 1.4, H], [5, 1, H]),
            quad([5, 1.4, 0], [4.6, 1.4, 0], [4.6, 1.4, H], [5, 1.4, H]),
            quad([4.6, 1.4, 0], [4.6, 1, 0], [4.6, 1, H], [4.6, 1.4, H]),
          ],
        },
      ]
      elements.forEach((e) => (e.guid = "SAMPLE" + String(e.id).padStart(4, "0") + "x" + e.tag.replace("-", "")))
      // Splat-like capture dots scattered over the surfaces (purely decorative sample density)
      let seed = 7
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
      const dots = []
      for (let i = 0; i < 260; i++) {
        const s = rnd()
        let p
        if (s < 0.4) p = [rnd() * W, rnd() * D, 0]
        else if (s < 0.6) p = [rnd() * W, D, rnd() * H]
        else if (s < 0.8) p = [0, rnd() * D, rnd() * H]
        else p = [W, rnd() * D, rnd() * H]
        dots.push({ p, g: 0.35 + rnd() * 0.4 })
      }
      // ── State
      const st = {
        mode: "distance", cam: "orbit", unit: "m", clip: false, box: [1, 1, 1],
        orbit: { t: [W / 2, D / 2, 0.8], d: 9.5, az: -2.2, pol: 1.05 },
        fp: { pos: [1.2, 0.8, 1.6], yaw: 0.75, pitch: -0.12 },
        lines: [], current: [], boxes: [], building: [], hover: null, snap: null, guide: null,
        selected: null, picked: null, target: -1,
      }
      let vw = 800,
        vh = 450,
        frame = 0
      // ── Camera
      function camera() {
        let pos, fwd
        if (st.cam === "orbit") {
          const o = st.orbit
          pos = add(o.t, [o.d * Math.sin(o.pol) * Math.cos(o.az), o.d * Math.sin(o.pol) * Math.sin(o.az), o.d * Math.cos(o.pol)])
          fwd = norm(sub(o.t, pos))
        } else {
          const f = st.fp
          pos = f.pos
          fwd = [Math.cos(f.pitch) * Math.cos(f.yaw), Math.cos(f.pitch) * Math.sin(f.yaw), Math.sin(f.pitch)]
        }
        const right = norm(cross(fwd, [0, 0, 1]))
        const up = cross(right, fwd)
        const focal = vh / 2 / Math.tan((st.cam === "orbit" ? 40 : 70) * Math.PI / 360)
        return { pos, fwd, right, up, focal }
      }
      const NEAR = 0.05
      const toCam = (c, p) => {
        const v = sub(p, c.pos)
        return [dot(v, c.right), dot(v, c.up), dot(v, c.fwd)]
      }
      const proj = (c, v) => [vw / 2 + (c.focal * v[0]) / v[2], vh / 2 - (c.focal * v[1]) / v[2]]
      function ray(c, sx, sy) {
        return norm(add(add(c.fwd, mul(c.right, (sx - vw / 2) / c.focal)), mul(c.up, -(sy - vh / 2) / c.focal)))
      }
      // ── Clipping: section box (world) then near plane (camera)
      const limits = () => [W * st.box[0], D * st.box[1], H * st.box[2]]
      function clipPoly(poly, inside, cut) {
        let out = []
        for (let i = 0; i < poly.length; i++) {
          const a = poly[i],
            b = poly[(i + 1) % poly.length],
            ia = inside(a),
            ib = inside(b)
          if (ia) out.push(a)
          if (ia !== ib) out.push(cut(a, b))
        }
        return out
      }
      function sectionPoly(poly) {
        if (!st.clip) return poly
        const L = limits()
        for (let k = 0; k < 3; k++) {
          poly = clipPoly(poly, (p) => p[k] <= L[k] + 1e-6, (a, b) => {
            const t = (L[k] - a[k]) / (b[k] - a[k])
            return add(a, mul(sub(b, a), t))
          })
          if (!poly.length) return poly
        }
        return poly
      }
      const insideSection = (p) => !st.clip || limits().every((l, k) => p[k] <= l + 1e-6)
      function screenPoly(c, poly) {
        const cp = clipPoly(poly.map((p) => toCam(c, p)), (v) => v[2] > NEAR, (a, b) => {
          const t = (NEAR - a[2]) / (b[2] - a[2])
          return add(a, mul(sub(b, a), t))
        })
        return cp.length < 3 ? null : { pts: cp.map((v) => proj(c, v)), depth: cp.reduce((s, v) => s + v[2], 0) / cp.length }
      }
      function screenSeg(c, a, b) {
        let va = toCam(c, a),
          vb = toCam(c, b)
        if (va[2] <= NEAR && vb[2] <= NEAR) return null
        if (va[2] <= NEAR) va = add(va, mul(sub(vb, va), (NEAR - va[2]) / (vb[2] - va[2])))
        if (vb[2] <= NEAR) vb = add(vb, mul(sub(va, vb), (NEAR - vb[2]) / (va[2] - vb[2])))
        return [proj(c, va), proj(c, vb)]
      }
      // Walls facing the orbit camera are cut away so the room stays readable
      function visibleElement(c, e) {
        if (st.cam !== "orbit" || e.type !== "IfcWall") return true
        return dot(e.n, sub(c.pos, e.faces[0][0])) > 0
      }
      // ── Picking: ray against element faces
      function hit(c, sx, sy) {
        const dir = ray(c, sx, sy)
        let best = null
        for (const e of elements) {
          if (!visibleElement(c, e)) continue
          for (const f of e.faces) {
            const nrm = norm(cross(sub(f[1], f[0]), sub(f[3], f[0])))
            const den = dot(nrm, dir)
            if (Math.abs(den) < 1e-6) continue
            const t = dot(nrm, sub(f[0], c.pos)) / den
            if (t <= NEAR || (best && t >= best.t)) continue
            const p = add(c.pos, mul(dir, t))
            const u = sub(f[1], f[0]),
              v = sub(f[3], f[0]),
              w = sub(p, f[0])
            const a = dot(w, u) / dot(u, u),
              b = dot(w, v) / dot(v, v)
            if (a < -1e-6 || a > 1 + 1e-6 || b < -1e-6 || b > 1 + 1e-6 || !insideSection(p)) continue
            best = { t, p, e }
          }
        }
        return best
      }
      // ── Formatting (in-scene labels)
      function fmtLen(m) {
        if (st.unit === "m") return m.toFixed(2) + " m"
        const feet = m * 3.28084,
          ft = Math.floor(feet)
        return `${ft}' ${Math.floor((feet - ft) * 12)}"`
      }
      const fmtArea = (m2) => (st.unit === "m" ? `s: ${m2.toFixed(2)} m²` : `s: ${(m2 * 10.7639).toFixed(2)} ft²`)
      const fmtVol = (m3) => (st.unit === "m" ? `v: ${m3.toFixed(2)} m³` : `v: ${(m3 * 35.31467).toFixed(2)} ft³`)
      // ── Snapping: existing points within ~30 px, else world-axis lock within 10°
      function snapPoint(c, p, sx, sy) {
        st.guide = null
        const radius = Math.max(24, vh * 0.027 * 1.2)
        const all = [...st.lines.flatMap((l) => l.pts), ...st.current]
        for (const s of all) {
          const v = toCam(c, s)
          if (v[2] <= NEAR) continue
          const [x, y] = proj(c, v)
          if (Math.hypot(x - sx, y - sy) < radius) return { p: s, kind: "point" }
        }
        const last = st.current[st.current.length - 1]
        if (last) {
          const d = sub(p, last),
            L = len(d)
          if (L > 0.05) {
            const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
            for (const a of axes) {
              const cos = Math.abs(dot(d, a)) / L
              if (cos > Math.cos((10 * Math.PI) / 180)) {
                const s = add(last, mul(a, dot(d, a)))
                st.guide = [add(last, mul(a, -20)), add(last, mul(a, 20))]
                return { p: s, kind: "axis" }
              }
            }
          }
        }
        return { p, kind: null }
      }
      // ── Box building: corner → edge (horizontal) → depth (perpendicular) → height (vertical)
      const BOX_PROMPTS = ["Box: click the first corner.", "Click the end of the first edge.", "Click the depth.", "Click the height."]
      function boxCandidate(c, sx, sy) {
        const b = st.building,
          dir = ray(c, sx, sy)
        if (b.length === 0) {
          const h = hit(c, sx, sy)
          return h ? h.p : null
        }
        if (b.length === 1 || b.length === 2) {
          const z = b[0][2]
          if (Math.abs(dir[2]) < 1e-6) return null
          const t = (z - c.pos[2]) / dir[2]
          if (t <= 0) return null
          const p = add(c.pos, mul(dir, t))
          if (b.length === 1) return p
          const e = norm(sub(b[1], b[0])),
            perp = [-e[1], e[0], 0]
          return add(b[1], mul(perp, dot(sub(p, b[1]), perp)))
        }
        // height: closest point on the vertical line through the third corner to the pointer ray
        const base = b[2],
          up = [0, 0, 1],
          w0 = sub(base, c.pos)
        const a = dot(up, up),
          bb = dot(up, dir),
          cc = dot(dir, dir),
          d = dot(up, w0),
          e2 = dot(dir, w0)
        const den = a * cc - bb * bb
        if (Math.abs(den) < 1e-6) return null
        const s = (bb * e2 - cc * d) / den
        return add(base, mul(up, Math.max(0, s)))
      }
      function boxGeometry(b) {
        const [p0, p1, p2] = b
        const h = b[3] ? b[3][2] - p2[2] : 0
        const e = sub(p1, p0),
          dvec = sub(p2, p1)
        const base = [p0, p1, add(p1, dvec), add(p0, dvec)]
        const top = base.map((p) => add(p, [0, 0, h]))
        return { base, top, area: len(e) * len(dvec), volume: len(e) * len(dvec) * h, h }
      }
      // ── Keyboard targets: snap points (room, door, window, column corners) or, in Select, items
      const anchors = [
        ...[[0, 0], [W, 0], [W, D], [0, D]].map(([x, y]) => [x, y, 0]),
        ...[[0, 0], [W, 0], [W, D], [0, D]].map(([x, y]) => [x, y, H]),
        [2, D, 0.9], [4, D, 0.9], [4, D, 2], [2, D, 2],
        [0, 1.2, 0], [0, 2.1, 0], [0, 2.1, 2.1], [0, 1.2, 2.1],
        [4.6, 1, 0], [5, 1, 0], [5, 1.4, 0], [4.6, 1.4, 0], [4.6, 1, H], [5, 1.4, H],
      ]
      function targets() {
        if (st.mode !== "select")
          return [...anchors.filter((p) => insideSection(p)), ...st.current.slice(0, 1)].map((p) => ({ kind: "point", p }))
        const items = [
          ...st.lines.map((l, i) => ({ kind: "line", key: "l" + i, p: l.pts[0], label: "Measurement " + (i + 1) })),
          ...st.boxes.map((b, i) => ({ kind: "box", key: "b" + i, p: b[0], label: "Box " + (i + 1) })),
        ]
        if (st.cam === "orbit")
          for (const e of elements) items.push({ kind: "element", id: e.id, p: e.faces[0][0].map((v, k) => e.faces[0].reduce((a, q2) => a + q2[k], 0) / 4), label: e.name })
        return items
      }
      function moveTarget(step) {
        const list = targets()
        if (!list.length) return
        st.target = st.target < 0 ? (step > 0 ? 0 : list.length - 1) : (st.target + step + list.length) % list.length
        schedule()
      }
      function placeTarget() {
        const list = targets(),
          t = list[st.target]
        if (!t) return moveTarget(1)
        if (st.mode === "distance") {
          if (st.current.length >= 3 && t.p === st.current[0]) {
            st.lines.push({ pts: st.current, closed: true })
            st.current = []
          } else st.current = [...st.current, t.p]
        } else if (st.mode === "volume") {
          const b = st.building,
            p = t.p
          let next
          if (b.length === 0) next = p
          else if (b.length === 1) next = [p[0], p[1], b[0][2]]
          else if (b.length === 2) {
            const e = norm(sub(b[1], b[0])),
              perp = [-e[1], e[0], 0]
            next = add(b[1], mul(perp, dot(sub([p[0], p[1], b[0][2]], b[1]), perp)))
          } else next = [b[2][0], b[2][1], Math.max(b[2][2] + 0.1, p[2])]
          st.building = [...b, next]
          if (st.building.length === 4) {
            st.boxes.push(st.building)
            st.building = []
          }
        } else if (t.kind === "element") {
          st.picked = t.id
          st.selected = null
        } else {
          st.selected = t.key
          st.picked = null
        }
        schedule()
      }
      // ── Draw
      function el(tag, attrs, parent) {
        const n = document.createElementNS(NS, tag)
        for (const k in attrs) n.setAttribute(k, attrs[k])
        parent.appendChild(n)
        return n
      }
      function label(g, at, text, cls = "") {
        const t = el("text", { x: at[0], y: at[1] - 10, class: "bm-label " + cls, "text-anchor": "middle" }, g)
        t.textContent = text
      }
      function draw() {
        frame = 0
        const c = camera()
        svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`)
        svg.replaceChildren()
        const world = el("g", {}, svg)
        // faces, painter-sorted
        const faces = []
        for (const e of elements) {
          if (!visibleElement(c, e)) continue
          for (const f of e.faces) {
            const s = screenPoly(c, sectionPoly(f))
            if (s) faces.push({ ...s, e })
          }
        }
        faces.sort((a, b) => b.depth - a.depth)
        for (const f of faces) {
          const picked = st.picked === f.e.id
          el("polygon", { points: f.pts.map((p) => p.join(",")).join(" "), class: `bm-face t-${f.e.type}${picked ? " is-picked" : ""}` }, world)
        }
        // capture dots
        for (const d of dots) {
          if (!insideSection(d.p)) continue
          const v = toCam(c, d.p)
          if (v[2] <= NEAR) continue
          const [x, y] = proj(c, v)
          el("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: Math.max(0.6, Math.min(2.4, 14 / v[2])).toFixed(2), class: "bm-dot", "fill-opacity": d.g }, world)
        }
        // section box outline
        if (st.clip) {
          const L = limits()
          const corners = [[0, 0, 0], [L[0], 0, 0], [L[0], L[1], 0], [0, L[1], 0]]
          const ring = (z) => corners.map((p) => [p[0], p[1], z])
          const lo = ring(0),
            hi = ring(L[2])
          const segs = [...lo.map((p, i) => [p, lo[(i + 1) % 4]]), ...hi.map((p, i) => [p, hi[(i + 1) % 4]]), ...lo.map((p, i) => [p, hi[i]])]
          for (const [a, b] of segs) {
            const s = screenSeg(c, a, b)
            if (s) el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-section" }, world)
          }
        }
        const ink = el("g", {}, svg)
        if (st.guide) {
          const s = screenSeg(c, st.guide[0], st.guide[1])
          if (s) el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-guide" }, ink)
        }
        const drawLine = (pts, opts = {}) => {
          for (let i = 0; i < pts.length - 1; i++) {
            const s = screenSeg(c, pts[i], pts[i + 1])
            if (!s) continue
            el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-seg-line" + (opts.cls ? " " + opts.cls : "") }, ink)
            if (!opts.noLabel) label(ink, [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2], fmtLen(len(sub(pts[i + 1], pts[i]))), opts.cls || "")
          }
          for (const p of pts) {
            const v = toCam(c, p)
            if (v[2] <= NEAR) continue
            const [x, y] = proj(c, v)
            el("circle", { cx: x, cy: y, r: 4.5, class: "bm-pt" + (opts.cls ? " " + opts.cls : "") }, ink)
          }
        }
        st.lines.forEach((l, i) => drawLine(l.closed ? [...l.pts, l.pts[0]] : l.pts, { cls: st.selected === "l" + i ? "is-selected" : "" }))
        const drawBox = (b, cls = "") => {
          const g = boxGeometry(b)
          const ring = (r) => [...r, r[0]]
          drawLine(ring(g.base), { noLabel: true, cls })
          if (g.h > 0) {
            drawLine(ring(g.top), { noLabel: true, cls })
            g.base.forEach((p, i) => drawLine([p, g.top[i]], { noLabel: true, cls }))
          }
          const center = g.top.reduce((a, p) => add(a, mul(p, 0.25)), [0, 0, 0])
          const v = toCam(c, center)
          if (v[2] > NEAR) {
            const [x, y] = proj(c, v)
            label(ink, [x, y], fmtArea(g.area), cls)
            if (g.h > 0) label(ink, [x, y + 20], fmtVol(g.volume), cls)
          }
        }
        st.boxes.forEach((b, i) => drawBox(b, st.selected === "b" + i ? "is-selected" : ""))
        // in-progress geometry + live dashed preview
        if (st.mode === "distance" && st.current.length) {
          drawLine(st.current)
          if (st.hover) {
            const s = screenSeg(c, st.current[st.current.length - 1], st.hover)
            if (s) {
              el("line", { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], class: "bm-preview" }, ink)
              label(ink, [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2], fmtLen(len(sub(st.hover, st.current[st.current.length - 1]))), "is-live")
            }
          }
        }
        if (st.mode === "volume" && st.building.length) {
          const preview = st.hover ? [...st.building, st.hover] : st.building
          if (preview.length >= 3) drawBox(preview.length === 4 ? preview : [...preview], "is-live")
          else drawLine(preview, { cls: "is-live" })
        }
        if (st.hover && st.mode !== "select") {
          const v = toCam(c, st.hover)
          if (v[2] > NEAR) {
            const [x, y] = proj(c, v)
            el("circle", { cx: x, cy: y, r: st.snap === "point" ? 9 : 6, class: "bm-cursor" + (st.snap ? " is-snapped" : "") }, ink)
          }
        }
        const tList = targets()
        if (st.target >= tList.length) st.target = tList.length ? tList.length - 1 : -1
        const tgt = tList[st.target]
        if (tgt) {
          const v = toCam(c, tgt.p)
          if (v[2] > NEAR) {
            const [x, y] = proj(c, v)
            el("circle", { cx: x, cy: y, r: 11, class: "bm-target" }, ink)
            if (tgt.label) label(ink, [x, y - 8], tgt.label, "is-live")
          }
        }
        q("place").textContent = st.mode === "select" ? "Select item" : "Place point"
        // toolbar + hint state
        root.querySelectorAll("[data-bm-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmMode === st.mode)))
        root.querySelectorAll("[data-bm-cam]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmCam === st.cam)))
        root.querySelectorAll("[data-bm-unit]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.bmUnit === st.unit)))
        q("count").textContent = st.lines.length + st.boxes.length
        q("clear").textContent = st.selected ? "Delete" : "Clear all"
        q("sliders").hidden = !st.clip
        q("hint").textContent =
          st.mode === "distance"
            ? st.current.length
              ? `${st.current.length} point${st.current.length > 1 ? "s" : ""} · Esc or Finish keeps it · Backspace removes the last point`
              : "Click a surface, or press ] then Enter to place a point."
            : st.mode === "volume"
              ? BOX_PROMPTS[st.building.length]
              : st.cam === "fp"
                ? "Picking is off in first-person · click the floor to glide there."
                : "Click a measurement or a building element."
        const e = elements.find((x) => x.id === st.picked)
        q("inspect").hidden = !e
        if (e)
          q("inspect").innerHTML = `<p class="bm-ifc">${e.type}</p><dl><div><dt>Name</dt><dd>${e.name}</dd></div><div><dt>GlobalId</dt><dd>${e.guid}</dd></div><div><dt>ObjectType</dt><dd>${e.obj}</dd></div><div><dt>Tag</dt><dd>${e.tag}</dd></div><div><dt>PredefinedType</dt><dd>${e.pre}</dd></div></dl>`
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(draw)
      }
      // ── Actions
      function finish() {
        if (st.mode === "distance") {
          if (st.current.length >= 2) st.lines.push({ pts: st.current, closed: false })
          st.current = []
        } else if (st.mode === "volume") {
          if (st.building.length >= 3) st.boxes.push([...st.building])
          st.building = []
        }
        schedule()
      }
      function setMode(m) {
        finish()
        st.target = -1
        st.mode = m
        st.selected = null
        schedule()
      }
      function localXY(ev) {
        const r = svg.getBoundingClientRect()
        return [((ev.clientX - r.left) / r.width) * vw, ((ev.clientY - r.top) / r.height) * vh]
      }
      function onClick(sx, sy) {
        const c = camera()
        if (st.mode === "distance") {
          const h = hit(c, sx, sy)
          if (!h) return
          const { p } = snapPoint(c, h.p, sx, sy)
          if (st.current.length >= 3 && p === st.current[0]) {
            st.lines.push({ pts: st.current, closed: true }) // clicking the first point closes the shape
            st.current = []
          } else st.current = [...st.current, p]
        } else if (st.mode === "volume") {
          const p = boxCandidate(c, sx, sy)
          if (!p) return
          st.building = [...st.building, p]
          if (st.building.length === 4) {
            st.boxes.push(st.building)
            st.building = []
          }
        } else if (st.cam === "fp") {
          const h = hit(c, sx, sy)
          if (h && h.e.type === "IfcSlab") glide([h.p[0], h.p[1]])
        } else {
          st.selected = pickMeasurement(c, sx, sy)
          if (!st.selected) {
            const h = hit(c, sx, sy)
            st.picked = h ? h.e.id : null
          } else st.picked = null
        }
        schedule()
      }
      function pickMeasurement(c, sx, sy) {
        const near = (a, b) => {
          const s = screenSeg(c, a, b)
          if (!s) return false
          const [p, r] = s,
            dx = r[0] - p[0],
            dy = r[1] - p[1],
            L2 = dx * dx + dy * dy || 1
          const t = Math.max(0, Math.min(1, ((sx - p[0]) * dx + (sy - p[1]) * dy) / L2))
          return Math.hypot(p[0] + t * dx - sx, p[1] + t * dy - sy) < 8
        }
        for (let i = st.lines.length - 1; i >= 0; i--) {
          const pts = st.lines[i].closed ? [...st.lines[i].pts, st.lines[i].pts[0]] : st.lines[i].pts
          for (let k = 0; k < pts.length - 1; k++) if (near(pts[k], pts[k + 1])) return "l" + i
        }
        for (let i = st.boxes.length - 1; i >= 0; i--) {
          const g = boxGeometry(st.boxes[i])
          const ring = [...g.top, g.top[0]]
          for (let k = 0; k < 4; k++) if (near(ring[k], ring[k + 1]) || near(g.base[k], g.base[(k + 1) % 4])) return "b" + i
        }
        return null
      }
      let glideFrame = 0
      function glide(to) {
        cancelAnimationFrame(glideFrame)
        const from = [...st.fp.pos],
          target = [to[0], to[1], from[2]]
        if (!motionEnabled()) {
          st.fp.pos = target
          return schedule()
        }
        const t0 = performance.now()
        const tick = (now) => {
          const k = Math.min(1, (now - t0) / 550),
            e = 1 - Math.pow(1 - k, 3)
          st.fp.pos = add(from, mul(sub(target, from), e))
          draw()
          if (k < 1) glideFrame = requestAnimationFrame(tick)
        }
        glideFrame = requestAnimationFrame(tick)
      }
      // ── Pointer: drag rotates (orbit) or looks (first-person); a press under 4 px is a click
      let drag = null
      svg.addEventListener("pointerdown", (ev) => {
        drag = { x: ev.clientX, y: ev.clientY, moved: false }
      })
      svg.addEventListener("pointermove", (ev) => {
        const [sx, sy] = localXY(ev)
        if (drag && (drag.moved || Math.hypot(ev.clientX - drag.x, ev.clientY - drag.y) > 4)) {
          if (!drag.moved) svg.setPointerCapture?.(ev.pointerId)
          drag.moved = true
          const dx = ev.movementX || 0,
            dy = ev.movementY || 0
          if (st.cam === "orbit") {
            st.orbit.az -= dx * 0.008 // grab-the-world feel
            st.orbit.pol = Math.min(Math.PI / 2 + 0.35, Math.max(0.1, st.orbit.pol - dy * 0.006))
          } else {
            st.fp.yaw -= dx * 0.005
            st.fp.pitch = Math.min(1.2, Math.max(-1.2, st.fp.pitch - dy * 0.004))
          }
          st.hover = null
          return schedule()
        }
        const c = camera()
        if (st.mode === "distance") {
          const h = hit(c, sx, sy)
          if (h) {
            const s = snapPoint(c, h.p, sx, sy)
            st.hover = s.p
            st.snap = s.kind
          } else st.hover = null
        } else if (st.mode === "volume") {
          st.hover = boxCandidate(c, sx, sy)
          st.snap = null
          st.guide = null
        } else st.hover = null
        schedule()
      })
      svg.addEventListener("pointerup", (ev) => {
        if (drag && !drag.moved) onClick(...localXY(ev))
        drag = null
      })
      svg.addEventListener("pointerleave", () => {
        st.hover = null
        st.guide = null
        schedule()
      })
      // ── Keyboard: 1/2/3 tools, Esc keeps, Backspace removes; arrows orbit; WASD/QE first-person
      svg.addEventListener("keydown", (ev) => {
        const k = ev.key
        if (k === "1" || k === "2" || k === "3") return setMode(["select", "distance", "volume"][+k - 1])
        if (k === "]" || k === "n" || k === "N") return ev.preventDefault(), moveTarget(1)
        if (k === "[" || k === "p" || k === "P") return ev.preventDefault(), moveTarget(-1)
        if (k === "Enter" || k === " ") return ev.preventDefault(), placeTarget()
        if (k === "Escape") return ev.preventDefault(), finish()
        if (k === "Backspace") {
          ev.preventDefault()
          if (st.mode === "distance") st.current = st.current.slice(0, -1)
          if (st.mode === "volume") st.building = st.building.slice(0, -1)
          return schedule()
        }
        const step = ev.shiftKey ? 0.3 : 0.1
        if (st.cam === "orbit") {
          const map = { ArrowLeft: [0.12, 0], ArrowRight: [-0.12, 0], ArrowUp: [0, -0.08], ArrowDown: [0, 0.08] }
          if (!map[k]) return
          ev.preventDefault()
          st.orbit.az += map[k][0]
          st.orbit.pol = Math.min(Math.PI / 2 + 0.35, Math.max(0.1, st.orbit.pol + map[k][1]))
          return schedule()
        }
        const f = st.fp,
          fwd = [Math.cos(f.yaw), Math.sin(f.yaw), 0],
          right = [Math.sin(f.yaw), -Math.cos(f.yaw), 0]
        const moves = { w: fwd, ArrowUp: fwd, s: mul(fwd, -1), ArrowDown: mul(fwd, -1), d: right, ArrowRight: right, a: mul(right, -1), ArrowLeft: mul(right, -1) }
        const key = k.length === 1 ? k.toLowerCase() : k
        if (moves[key]) {
          ev.preventDefault()
          const n = add(f.pos, mul(moves[key], step * (ev.shiftKey ? 3 : 1) * 2))
          f.pos = [Math.min(W - 0.2, Math.max(0.2, n[0])), Math.min(D - 0.2, Math.max(0.2, n[1])), f.pos[2]]
        } else if (key === "q" || key === "e") {
          ev.preventDefault()
          f.pos = [f.pos[0], f.pos[1], Math.min(2.6, Math.max(0.4, f.pos[2] + (key === "e" ? 0.1 : -0.1)))]
        } else return
        schedule()
      })
      // ── Controls
      root.querySelectorAll("[data-bm-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.bmMode)))
      root.querySelectorAll("[data-bm-cam]").forEach((b) =>
        b.addEventListener("click", () => {
          st.cam = b.dataset.bmCam // instant switch, like the source
          if (st.cam === "fp") st.picked = null
          schedule()
        }),
      )
      root.querySelectorAll("[data-bm-unit]").forEach((b) => b.addEventListener("click", () => ((st.unit = b.dataset.bmUnit), schedule())))
      q("finish").addEventListener("click", finish)
      q("prev").addEventListener("click", () => moveTarget(-1))
      q("next").addEventListener("click", () => moveTarget(1))
      q("place").addEventListener("click", placeTarget)
      q("reset").addEventListener("click", () => ((st.current = []), (st.building = []), schedule()))
      q("clear").addEventListener("click", () => {
        if (st.selected) {
          const i = +st.selected.slice(1)
          if (st.selected[0] === "l") st.lines.splice(i, 1)
          else st.boxes.splice(i, 1)
          st.selected = null
        } else {
          st.lines = []
          st.boxes = []
          st.current = []
          st.building = []
        }
        schedule()
      })
      q("clip").addEventListener("change", (e) => ((st.clip = e.target.checked), schedule()))
      root.querySelectorAll("[data-bm-axis]").forEach((s) => s.addEventListener("input", () => ((st.box[+s.dataset.bmAxis] = +s.value), schedule())))
      // ── Size
      const ro = new ResizeObserver(([entry]) => {
        vw = Math.max(280, Math.round(entry.contentRect.width))
        vh = Math.max(240, Math.round(entry.contentRect.height))
        draw()
      })
      ro.observe(svg)
      // A first sample measurement so the result is visible before interacting
      st.lines.push({ pts: [[0.6, 3.4, 0], [3.6, 3.4, 0], [3.6, 3.4, 2]], closed: false })
      draw()
      return () => {
        ro.disconnect()
        cancelAnimationFrame(frame)
        cancelAnimationFrame(glideFrame)
      }
    },
  }

  // Pivo Coaches · coach finder. Mirrors the real filter pills, sort, header and card structure;
  // coaches are fictional, filtering runs locally (the product filters server-side).
  demos.coaches = {
    glyph: "people",
    render() {
      const disciplines = [
        ["", "Discipline"],
        ["dressage", "Dressage"],
        ["show_jumping", "Show Jumping"],
        ["eventing", "Eventing"],
        ["hunter_equitation", "Hunter / Equitation"],
        ["western", "Western"],
        ["general_riding_horsemanship", "General Riding / Horsemanship"],
        ["working_equitation", "Working Equitation"],
        ["other", "Other"],
      ]
      const languages = ["English", "French", "German", "Korean", "Dutch", "Spanish"]
      return demoShell(
        "coaches",
        "Pivo Coaches filters and results",
        `<div class="cf">
          <div class="cf-pills" role="group" aria-label="Filters">
            <label class="cf-select">${icon("compass")}<span class="sr-only">Discipline</span><select data-cf="discipline">${disciplines.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label>
            <div class="cf-combo"><button type="button" class="cf-pill" data-cf="lang-toggle" aria-expanded="false" aria-controls="cf-lang">${icon("globe")}<span data-cf="lang-label">Language</span></button>
              <div class="cf-pop" id="cf-lang" hidden><p class="illo-kicker">Language</p>${languages.map((l) => `<label class="cf-check"><input type="checkbox" value="${l}" data-cf="lang">${l}</label>`).join("")}</div></div>
            <button type="button" class="cf-pill" data-cf="certified" aria-pressed="false">Pivo Certified</button>
            <button type="button" class="cf-pill" data-cf="accept" aria-pressed="true">Accept New Students</button>
          </div>
          <div class="cf-head"><p class="cf-count" data-cf="count" aria-live="polite"></p><label class="cf-sort"><span>Sort by:</span><select data-cf="sort"><option value="random">Relevance</option><option value="popular">Popularity</option><option value="asc">Oldest first</option><option value="desc">Newest first</option></select></label></div>
          <section class="cf-profile" data-cf="profile" tabindex="-1" aria-label="Coach profile" hidden></section>
          <ul class="cf-grid" data-cf="grid"></ul>
          <p class="cf-empty" data-cf="empty" hidden>No coaches found matching your criteria.</p>
          <div class="cf-more-row"><button type="button" class="button button-outline" data-cf="more" hidden>Load more coaches</button><p class="cf-loading" data-cf="loading" aria-live="polite"></p></div>
        </div>`,
      )
    },
    mount(root) {
      // Fictional coaches. Fields follow the real CoachListItem shape that the card renders.
      const coaches = [
        ["Mara", "Lyon", "France", "dressage", ["French", "English"], true, true, 41, 1],
        ["Theo", "Hamburg", "Germany", "show_jumping", ["German", "English"], false, true, 18, 2],
        ["Hana", "Seoul", "South Korea", "dressage", ["Korean", "English"], true, false, 27, 3],
        ["Pieter", "Utrecht", "Netherlands", "eventing", ["Dutch", "German"], true, true, 33, 4],
        ["Sofia", "Seville", "Spain", "working_equitation", ["Spanish"], false, true, 12, 5],
        ["Jun", "Busan", "South Korea", "show_jumping", ["Korean"], false, true, 9, 6],
        ["Clara", "Bordeaux", "France", "general_riding_horsemanship", ["French"], true, true, 22, 7],
        ["Lukas", "Munich", "Germany", "dressage", ["German"], false, false, 15, 8],
        ["Inès", "Madrid", "Spain", "western", ["Spanish", "English"], true, true, 30, 9],
      ].map(([name, city, country, discipline, langs, pivoCertified, acceptStudents, likeCount, order]) => ({
        name, city, country, discipline, langs, pivoCertified, acceptStudents, likeCount, order,
      }))
      const labels = Object.fromEntries([...root.querySelectorAll('[data-cf="discipline"] option')].map((o) => [o.value, o.textContent]))
      const relevance = [4, 1, 7, 2, 9, 5, 3, 8, 6] // stable "seeded" order, like the product's random sort with a seed
      const q = (k) => root.querySelector(`[data-cf="${k}"]`)
      const PAGE = 6 // the product loads 6 per page (infinite scroll); here a button loads the next page
      const state = { discipline: "", langs: [], certified: false, accept: true, sort: "random", pages: 1, open: null }
      let loadTimer = null
      const pop = q("lang-toggle").nextElementSibling
      function draw() {
        let list = coaches.filter(
          (c) =>
            (!state.discipline || c.discipline === state.discipline) &&
            (!state.langs.length || state.langs.some((l) => c.langs.includes(l))) &&
            (!state.certified || c.pivoCertified) &&
            (!state.accept || c.acceptStudents),
        )
        if (state.sort === "random") list.sort((a, b) => relevance.indexOf(a.order) - relevance.indexOf(b.order))
        if (state.sort === "popular") list.sort((a, b) => b.likeCount - a.likeCount)
        if (state.sort === "asc") list.sort((a, b) => a.order - b.order)
        if (state.sort === "desc") list.sort((a, b) => b.order - a.order)
        const shown = list.slice(0, PAGE * state.pages)
        q("count").textContent = `Found ${list.length} ${list.length === 1 ? "Coach" : "Coaches"}`
        q("more").hidden = shown.length >= list.length
        q("loading").textContent = ""
        q("grid").innerHTML = shown
          .map(
            (c) => `<li class="cf-card"><div class="cf-photo" aria-hidden="true"><span>${c.name[0]}</span></div>
              <div class="cf-badges">${c.pivoCertified ? '<span class="cf-badge red">Pivo Certified</span>' : ""}${c.acceptStudents ? '<span class="cf-badge">Accepting Students</span>' : ""}</div>
              <div class="cf-info"><strong>${c.name}</strong><span class="cf-loc">${c.city}, ${c.country}</span><span class="cf-bio">Sample profile · ${labels[c.discipline]} · ${c.langs.join(", ")}</span><button type="button" class="cf-more" data-coach="${c.order}" aria-expanded="${state.open === c.order}" aria-controls="cf-profile-panel">See More</button></div></li>`,
          )
          .join("")
        q("empty").hidden = list.length > 0
        q("grid").hidden = list.length === 0
        const n = state.langs.length
        q("lang-label").textContent = n === 0 ? "Language" : n <= 2 ? state.langs.join(", ") : `${n} selected`
        q("lang-toggle").classList.toggle("is-on", n > 0)
        q("discipline").closest(".cf-select").classList.toggle("is-on", Boolean(state.discipline))
        q("certified").setAttribute("aria-pressed", String(state.certified))
        q("accept").setAttribute("aria-pressed", String(state.accept))
      }
      const refilter = (fn) => {
        fn()
        state.pages = 1
        closeProfile(false)
        draw()
      }
      q("discipline").addEventListener("change", (e) => refilter(() => (state.discipline = e.target.value)))
      q("sort").addEventListener("change", (e) => refilter(() => (state.sort = e.target.value)))
      q("certified").addEventListener("click", () => refilter(() => (state.certified = !state.certified)))
      q("accept").addEventListener("click", () => refilter(() => (state.accept = !state.accept)))
      // Load the next page; focus moves to the first newly shown coach
      q("more").addEventListener("click", () => {
        const first = PAGE * state.pages
        const show = () => {
          state.pages += 1
          draw()
          root.querySelectorAll(".cf-more")[first]?.focus()
        }
        clearTimeout(loadTimer)
        if (motionEnabled()) {
          q("loading").textContent = "Loading more coaches..."
          loadTimer = setTimeout(show, 400)
        } else show()
      })
      // See More opens a sample profile built from the same fictional record
      function openProfile(order) {
        const c = coaches.find((x) => x.order === order)
        if (!c) return
        state.open = order
        const p = q("profile")
        p.id = "cf-profile-panel"
        p.innerHTML = `<div class="cf-profile-head"><div class="cf-photo small" aria-hidden="true"><span>${c.name[0]}</span></div><div><p class="illo-kicker">Sample profile</p><h4>${c.name}</h4><p class="cf-loc">${c.city}, ${c.country}</p></div><button type="button" class="demo-reset" data-cf="close">Close</button></div>
          <dl class="cf-facts"><div><dt>Discipline</dt><dd>${labels[c.discipline]}</dd></div><div><dt>Languages</dt><dd>${c.langs.join(", ")}</dd></div><div><dt>Pivo Certified</dt><dd>${c.pivoCertified ? "Yes" : "No"}</dd></div><div><dt>New students</dt><dd>${c.acceptStudents ? "Accepting" : "Not accepting"}</dd></div></dl>
          <p class="cf-note">In the product, See More opens this coach's page. Fictional coach · no request is made.</p>`
        p.hidden = false
        draw()
        p.querySelector('[data-cf="close"]').addEventListener("click", () => closeProfile(true))
        p.focus()
      }
      function closeProfile(restore) {
        const order = state.open
        state.open = null
        q("profile").hidden = true
        q("profile").innerHTML = ""
        if (restore) {
          draw()
          root.querySelector(`.cf-more[data-coach="${order}"]`)?.focus()
        }
      }
      q("grid").addEventListener("click", (e) => {
        const b = e.target.closest(".cf-more")
        if (b) openProfile(+b.dataset.coach)
      })
      const setPop = (open) => {
        pop.hidden = !open
        q("lang-toggle").setAttribute("aria-expanded", String(open))
      }
      q("lang-toggle").addEventListener("click", () => setPop(pop.hidden))
      root.querySelectorAll('[data-cf="lang"]').forEach((box) =>
        box.addEventListener("change", () => {
          state.langs = [...root.querySelectorAll('[data-cf="lang"]:checked')].map((b) => b.value)
          draw()
        }),
      )
      const outside = (e) => {
        if (!pop.hidden && !e.target.closest(".cf-combo")) setPop(false)
      }
      const esc = (e) => {
        if (e.key !== "Escape") return
        if (!pop.hidden) {
          setPop(false)
          q("lang-toggle").focus()
        } else if (state.open != null && root.contains(document.activeElement)) closeProfile(true)
      }
      document.addEventListener("click", outside)
      document.addEventListener("keydown", esc)
      draw()
      return () => {
        clearTimeout(loadTimer)
        document.removeEventListener("click", outside)
        document.removeEventListener("keydown", esc)
      }
    },
  }

  // Kaltoe Timer · workday scrubber. Re-implements the documented WorkCalculator / DisplayState /
  // LabelAppearance rules (defaults: 8h work, 1h break, lunch 11:30–12:30 with 10 min early leave,
  // 12h weekly overtime cap, 22:00 cutoff, family day −2h, earliest start 07:00). Times are sample data.
  demos.kaltoe = {
    glyph: "ring",
    render() {
      return demoShell(
        "kaltoe",
        "Kaltoe Timer workday",
        `<div class="kt-demo">
          <div class="kt-bar-preview" aria-hidden="true">
            <div class="kt-menubar"><span class="kt-label" data-kt="label"></span></div>
            <p class="kt-caption" data-kt="caption"></p>
          </div>
          <div class="kt-controls">
            <div class="kt-row"><label class="kt-field"><span>Clock-in</span><select data-kt="in"><option value="480">08:00</option><option value="540" selected>09:00</option><option value="600">10:00</option><option value="-1">Not clocked in</option></select></label>
            <label class="kt-field"><span>Week's overtime so far</span><select data-kt="week"><option value="0">0:00</option><option value="360">6:00</option><option value="690" >11:30</option></select></label></div>
            <div class="kt-row kt-toggles"><button type="button" class="cf-pill" data-kt="family" aria-pressed="false">Family day</button><button type="button" class="cf-pill" data-kt="out" aria-pressed="false">Clock out now</button>
              <span class="kt-seg" role="group" aria-label="Label style"><button type="button" data-kt-style="ring" aria-pressed="true">Ring</button><button type="button" data-kt-style="track" aria-pressed="false">Track</button></span></div>
            <dl class="kt-read" aria-live="polite"><div><dt>State</dt><dd data-kt="state"></dd></div><div><dt>Leave time</dt><dd data-kt="leave"></dd></div><div><dt>Fill</dt><dd data-kt="fill"></dd></div><div><dt>Day</dt><dd data-kt="day"></dd></div></dl>
          </div>
          <div class="kt-scrub"><label for="kt-time" class="kt-field"><span>Time of day</span><output data-kt="now"></output></label>
            <input id="kt-time" type="range" min="420" max="1395" step="5" value="645" data-kt="time">
            <div class="kt-marks" aria-hidden="true" data-kt="marks"></div></div>
        </div>`,
      )
    },
    mount(root) {
      const R = { work: 480, brk: 60, cap: 720, cutoff: 1320, lunchStart: 690, lunchEnd: 750, early: 10, family: 120, earliest: 420 }
      const stops = [[0x25, 0x8e, 0xf7], [0x14, 0xcc, 0xb6], [0x51, 0xcc, 0x29], [0xf2, 0x9b, 0x0c]] // dark-bar spectrum
      const q = (k) => root.querySelector(`[data-kt="${k}"]`)
      const st = { clockOut: null, family: false, style: "ring" }
      const pad = (n) => String(n).padStart(2, "0")
      const clock = (m) => pad(Math.floor(m / 60)) + ":" + pad(m % 60)
      const hm = (m) => {
        const v = Math.max(0, Math.floor(m))
        return Math.floor(v / 60) + ":" + pad(v % 60)
      }
      const signed = (m) => (m < 0 ? "-" : "+") + hm(Math.abs(m))
      const clamp = (v) => Math.min(1, Math.max(0, v))
      function spectrum(p) {
        const x = clamp(p) * 3,
          i = Math.min(2, Math.floor(x)),
          t = x - i
        const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * t))
        return `rgb(${c.join(",")})`
      }
      function compute(now) {
        const clockIn = +q("in").value
        if (clockIn < 0 || now < clockIn) return { phase: "idle", text: "--:--", glyph: "clock", state: "Not clocked in", fill: 0, day: 0 }
        const start = Math.max(clockIn, R.earliest),
          target = Math.max(0, R.work - (st.family ? R.family : 0))
        const overlap = Math.max(0, Math.min(start + target, R.lunchEnd) - Math.max(start, R.lunchStart))
        const brk = target > R.work / 2 ? R.brk : Math.min(R.brk, overlap)
        const leave = start + target + brk
        const out = st.clockOut != null && now >= st.clockOut ? st.clockOut : null
        const at = out ?? now
        const day = leave > start ? clamp((at - start) / (leave - start)) : 0
        const base = { leave, day }
        if (out != null) {
          const net = Math.max(0, out - start - R.brk)
          return { ...base, phase: "settled", text: signed(net - target), glyph: "check", state: "Settled · clocked out", fill: day }
        }
        const left = leave - now
        if (left > 0) {
          const lunch = leave > R.lunchEnd
          const lunchGo = R.lunchStart - R.early
          let state, glyph, fill, to
          if (lunch && now < lunchGo) {
            ;[state, glyph, to] = ["To lunch", "fork", lunchGo]
            fill = (now - start) / (lunchGo - start)
          } else if (lunch && now < R.lunchEnd) {
            const from = Math.max(start, lunchGo)
            ;[state, glyph, to] = ["On break", "cup", R.lunchEnd]
            fill = (now - from) / (R.lunchEnd - from)
          } else {
            const from = lunch ? Math.max(start, R.lunchEnd) : start
            ;[state, glyph, to] = ["Counting to leave", left <= 30 ? "walk" : "clock", leave]
            fill = (now - from) / (leave - from)
          }
          return { ...base, phase: "working", text: hm(to - now), glyph, state, fill: clamp(fill) }
        }
        const daily = now - leave,
          weekly = +q("week").value + daily
        const atLimit = weekly >= R.cap || now >= R.cutoff
        const fresh = daily < 1
        return {
          ...base,
          phase: atLimit ? "atLimit" : "overtime",
          text: fresh ? "자유!" : signed(daily),
          glyph: fresh ? "walk" : "flame",
          state: atLimit ? (now >= R.cutoff ? "At limit · 22:00 cutoff" : "At limit · weekly cap") : fresh ? "Overtime · “자유!” (free!)" : "Overtime",
          fill: 1,
        }
      }
      function draw() {
        const now = +q("time").value,
          s = compute(now)
        const color =
          s.phase === "working" ? spectrum(s.day) : s.phase === "overtime" ? "#ff9500" : s.phase === "atLimit" ? "#ff3b30" : "#a0a0a8"
        const fill = Math.round(s.fill * 200) / 200 // the app quantises to 1/200
        const tint = s.phase === "overtime" || s.phase === "atLimit" ? color : "var(--fg)"
        const circ = 2 * Math.PI * 8
        const ring =
          s.phase === "idle"
            ? `<circle cx="11" cy="11" r="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="1.5 2.5"/>`
            : `<circle cx="11" cy="11" r="8" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="2.5"/><circle cx="11" cy="11" r="8" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${(circ * fill).toFixed(2)} ${circ.toFixed(2)}" transform="rotate(-90 11 11)"/>`
        q("label").className = "kt-label is-" + st.style + " is-" + s.phase
        q("label").style.setProperty("--kt-color", color)
        q("label").style.setProperty("--kt-fill", fill)
        q("label").innerHTML =
          st.style === "ring"
            ? `<span class="kd-ring"><svg viewBox="0 0 22 22">${ring}</svg><span class="kt-glyph" style="color:${tint}">${icon(s.glyph)}</span></span><span class="kt-text">${s.text}</span>`
            : `<span class="kt-track"><i></i><span class="kt-glyph">${icon(s.glyph)}</span><span class="kt-text">${s.text}</span></span>`
        q("caption").textContent =
          s.phase === "idle" ? "Idle: neutral, dashed." : s.phase === "working" ? "Length = this phase. Color = the whole day." : s.phase === "settled" ? "Settled: neutral, solid." : s.phase === "atLimit" ? "At limit: red." : "Overtime: orange, counting up."
        q("state").textContent = s.state
        q("leave").textContent = s.leave != null ? clock(s.leave) : "—"
        q("fill").textContent = Math.round(fill * 100) + "%"
        q("day").textContent = Math.round((s.day || 0) * 100) + "%"
        q("now").textContent = clock(now)
        q("time").setAttribute("aria-valuetext", clock(now) + " · " + s.state)
        q("family").setAttribute("aria-pressed", String(st.family))
        q("out").setAttribute("aria-pressed", String(st.clockOut != null))
        q("out").textContent = st.clockOut != null ? "Clocked out " + clock(st.clockOut) : "Clock out now"
        root.querySelectorAll("[data-kt-style]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ktStyle === st.style)))
        const span = 1395 - 420,
          pct = (m) => ((m - 420) / span) * 100
        q("marks").innerHTML = [
          [680, "11:20"],
          [750, "12:30"],
          s.leave != null ? [s.leave, "Leave"] : null,
          [1320, "22:00"],
        ]
          .filter(Boolean)
          .map(([m, l]) => `<span style="left:${pct(m)}%">${l}</span>`)
          .join("")
      }
      q("time").addEventListener("input", draw)
      q("in").addEventListener("change", () => ((st.clockOut = null), draw()))
      q("week").addEventListener("change", draw)
      q("family").addEventListener("click", () => ((st.family = !st.family), draw()))
      q("out").addEventListener("click", () => {
        st.clockOut = st.clockOut != null ? null : +q("time").value
        draw()
      })
      root.querySelectorAll("[data-kt-style]").forEach((b) => b.addEventListener("click", () => ((st.style = b.dataset.ktStyle), draw())))
      draw()
    },
  }

  // Translater · tone + refinement. Re-implements the documented behaviour: three tones (Casual default),
  // toggle chips Softer/Direct/Shorter/Playful with a cap of 3 (other chips disable, no message),
  // every change regenerates the whole result, a failed refinement restores the previous result and shows
  // "Adjustment failed: Translation failed.", and the Breakdown reads from the same completed result.
  // Output is pre-written sample text composed by simple rules — never a live translation.
  demos.translater = {
    glyph: "chips",
    render() {
      const tones = [["friends", "Friends"], ["casual", "Casual"], ["professional", "Professional"]]
      const chips = ["Softer", "Direct", "Shorter", "Playful"]
      return demoShell(
        "translater",
        "Translater tone and refinement",
        `<div class="tl">
          <div class="tl-source"><p class="illo-kicker">English → Korean</p><p class="tl-input">How are you doing today?</p></div>
          <div class="tl-controls">
            <div class="tl-seg" role="group" aria-label="Tone">${tones.map(([v, l]) => `<button type="button" data-tl-tone="${v}" aria-pressed="${v === "casual"}">${l}</button>`).join("")}</div>
            <div class="tl-refine" role="group" aria-label="Refine"><span class="illo-kicker">Refine</span>${chips.map((c) => `<button type="button" class="tl-chip" data-tl-chip="${c}" aria-pressed="false">${c}</button>`).join("")}</div>
            <label class="tl-fail"><input type="checkbox" data-tl="fail"> Simulate a failed adjustment</label>
          </div>
          <div class="tl-result" data-tl="result" aria-live="polite"><p class="illo-kicker">Result · pre-written sample</p><p class="tl-main" lang="ko" data-tl="main"></p><p class="tl-gloss" data-tl="gloss"></p><p class="tl-error" role="alert" data-tl="error" hidden></p></div>
          <div class="tl-learn"><p class="illo-kicker">Breakdown <span>· from the same result, no second request</span></p><ul data-tl="rows"></ul></div>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-tl="${k}"]`)
      const st = { tone: "casual", chips: [], open: -1 }
      let busy = null
      function compose({ tone, chips }) {
        const has = (c) => chips.includes(c)
        const soft = has("Softer"),
          direct = has("Direct")
        const q1 = direct ? "잘" : "어떻게"
        let verb, grammar, en
        if (tone === "friends") {
          verb = soft ? "지내고 있어" : "지내"
          grammar = soft ? "-고 있어: ongoing state, casual speech (반말)." : "-어: plain casual speech (반말) between friends."
        } else if (tone === "casual") {
          verb = soft ? "지내세요" : "지내요"
          grammar = soft ? "-시-: honorific, then polite -어요 (해요체)." : "-어요: polite everyday ending (해요체)."
        } else {
          verb = soft ? "지내고 계신가요" : "지내십니까"
          grammar = soft ? "-고 계시다 + -ㄴ가요: honorific, gently asked." : "-십니까: formal honorific question (하십시오체)."
        }
        const end = has("Playful") ? (tone === "friends" ? "? ㅎㅎ" : tone === "casual" ? "~?" : "? :)") : "?"
        const today = has("Shorter") ? "" : "오늘 "
        const main = `${today}${q1} ${verb}${end}`
        en = (direct ? "Doing well" : "How are you doing") + (has("Shorter") ? "" : " today") + "?"
        const rows = []
        if (!has("Shorter")) rows.push({ phrase: "오늘", gloss: "today", base: "오늘", grammar: "Time noun, no particle needed." })
        rows.push({
          phrase: `${q1} ${verb}`,
          gloss: direct ? "doing well?" : "how are you doing?",
          base: soft && tone !== "friends" ? "지내시다 (honorific of 지내다)" : "지내다 · to get along",
          grammar,
        })
        return { main, en, rows }
      }
      function draw(result) {
        q("main").textContent = result.main
        q("gloss").textContent = "≈ “" + result.en + "”"
        q("rows").innerHTML = result.rows
          .map(
            (r, i) =>
              `<li><button type="button" class="tl-row" aria-expanded="${st.open === i}" data-tl-row="${i}"><span lang="ko">${r.phrase}</span> → ${r.gloss}</button>${
                st.open === i
                  ? `<dl class="tl-facts"><div><dt>In this sentence</dt><dd>${r.gloss}</dd></div><div><dt>Base form</dt><dd lang="ko">${r.base}</dd></div><div><dt>Grammar</dt><dd>${r.grammar}</dd></div></dl>`
                  : ""
              }</li>`,
          )
          .join("")
        syncControls()
      }
      // Controls reflect the requested state immediately; the cap of 3 is enforced in state, not only in the DOM.
      function syncControls() {
        root.querySelectorAll("[data-tl-tone]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tlTone === st.tone)))
        const full = st.chips.length >= 3
        root.querySelectorAll("[data-tl-chip]").forEach((b) => {
          const on = st.chips.includes(b.dataset.tlChip)
          b.setAttribute("aria-pressed", String(on))
          b.disabled = full && !on // at the cap, unpressed chips disable; pressed ones stay removable
        })
      }
      let current = compose(st)
      // Last completed run: what a failed adjustment rolls back to.
      let committed = { tone: st.tone, chips: [...st.chips], result: current }
      let pendingRefinement = false
      function run(next, isRefinement) {
        Object.assign(st, next) // a newer request supersedes the one in flight, like a re-run in the app
        pendingRefinement = pendingRefinement || isRefinement
        q("error").hidden = true
        syncControls()
        const settle = () => {
          busy = null
          q("result").classList.remove("is-busy")
          if (pendingRefinement && q("fail").checked) {
            // snapshot restored: text, breakdown and the last completed refinement set
            st.tone = committed.tone
            st.chips = [...committed.chips]
            current = committed.result
            q("error").textContent = "Adjustment failed: Translation failed."
            q("error").hidden = false
          } else {
            current = compose(st)
            committed = { tone: st.tone, chips: [...st.chips], result: current }
          }
          pendingRefinement = false
          st.open = Math.min(st.open, current.rows.length - 1)
          draw(current)
        }
        clearTimeout(busy)
        if (motionEnabled()) {
          q("result").classList.add("is-busy")
          busy = setTimeout(settle, 450)
        } else settle()
      }
      root.querySelectorAll("[data-tl-tone]").forEach((b) =>
        b.addEventListener("click", () => {
          if (b.dataset.tlTone !== st.tone) run({ tone: b.dataset.tlTone }, false)
        }),
      )
      root.querySelectorAll("[data-tl-chip]").forEach((b) =>
        b.addEventListener("click", () => {
          const c = b.dataset.tlChip
          const on = st.chips.includes(c)
          if (!on && st.chips.length >= 3) return // cap of 3, checked against current state synchronously
          run({ chips: on ? st.chips.filter((x) => x !== c) : [...st.chips, c] }, true)
        }),
      )
      q("rows").addEventListener("click", (e) => {
        const b = e.target.closest("[data-tl-row]")
        if (!b) return
        const i = +b.dataset.tlRow
        st.open = st.open === i ? -1 : i // one row open at a time
        draw(current)
        root.querySelector(`[data-tl-row="${i}"]`)?.focus()
      })
      draw(current)
      return () => clearTimeout(busy)
    },
  }

  // Neoharness · one chat turn. Follows the documented event order: user message → "agent is thinking…" →
  // reasoning ("Thought for X.XXs") → tool rows (name, args, → result) → streamed reply → stats bar
  // (ctx · cache · tk/s · out · calls) → turn end. Stop cancels and drops the partial bubble; a heartbeat
  // turn whose only call is end_task(skipped) is dropped. Messages, results and numbers are sample data.
  demos.neoharness = {
    glyph: "chat",
    render() {
      return demoShell(
        "neoharness",
        "Neoharness chat turn",
        `<div class="nh-demo">
          <div class="nh-chat" data-nh="chat" aria-live="polite"></div>
          <div class="nh-stats" data-nh="stats" aria-label="Turn stats"></div>
          <div class="nh-actions">
            <button type="button" class="button button-primary" data-nh="send">Send sample message</button>
            <button type="button" class="button button-outline" data-nh="step" hidden>Next step</button>
            <button type="button" class="button button-outline" data-nh="beat">Heartbeat tick</button>
            <span class="nh-fact">Tool loop limit · 120 calls per turn</span>
          </div>
        </div>`,
      )
    },
    mount(root) {
      const q = (k) => root.querySelector(`[data-nh="${k}"]`)
      const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;")
      let timer = null,
        steps = [],
        i = 0,
        running = false
      const userTurn = [
        { at: "user", text: "We picked the train for Busan. Remember that, please." },
        { at: "thinking" },
        { at: "reason", text: "Thought for 1.24s" },
        { at: "tool", name: "recall", args: '{"query":"Busan trip"}', result: '1 memory · "Busan trip: transport undecided"' },
        { at: "tool", name: "memory", args: '{"action":"update","content":"Busan trip: going by train"}', result: '{"ok":true}' },
        { at: "reply", text: "Noted — the Busan trip is now by train. I updated the earlier memory instead of adding a duplicate." },
        { at: "end", status: "ok" },
      ]
      const beatTurn = [
        { at: "user", text: '[heartbeat] morning check. Decide whether to act; if nothing needs doing, call end_task(status: "skipped").', system: true },
        { at: "thinking" },
        { at: "tool", name: "end_task", args: '{"status":"skipped"}', result: '{"ok":true}' },
        { at: "end", status: "skipped" },
      ]
      function stats(live, done) {
        q("stats").className = "nh-stats" + (live ? " live" : "")
        q("stats").innerHTML = done
          ? "<span>ctx <b>12.3k</b></span><span>cache <b>64%</b></span><span>tk/s <b>41.2</b></span><span>out <b>96</b></span><span>calls <b>3</b></span>"
          : live
            ? "<span>ctx <b>12.3k</b></span><span>cache <b>64%</b></span><span>tk/s <b>—</b></span><span>out <b>0</b></span>"
            : ""
      }
      function bubble() {
        return q("chat").querySelector(".nh-pending")
      }
      function apply(s) {
        const chat = q("chat")
        if (s.at === "user") {
          chat.insertAdjacentHTML("beforeend", `<div class="nh-msg user${s.system ? " sys" : ""}"><p>${esc(s.text)}</p></div>`)
          stats(true, false)
        } else if (s.at === "thinking") {
          chat.insertAdjacentHTML("beforeend", '<div class="nh-msg agent nh-pending"><p class="nh-think">agent is thinking…</p></div>')
        } else if (s.at === "reason") {
          bubble().querySelector(".nh-think").textContent = s.text
        } else if (s.at === "tool") {
          bubble().insertAdjacentHTML(
            "beforeend",
            `<details class="nh-tool"><summary><i class="nh-dot done" aria-hidden="true"></i><b>${s.name}</b><code>${esc(s.args)}</code><span>→ ${esc(s.result).slice(0, 90)}</span></summary><pre>${esc(s.args)}\n→ ${esc(s.result)}</pre></details>`,
          )
        } else if (s.at === "reply") {
          bubble().insertAdjacentHTML("beforeend", `<p class="nh-reply">${esc(s.text)}</p>`)
          stats(true, true)
        } else if (s.at === "end") {
          const b = bubble()
          if (s.status === "skipped") {
            chat.querySelector(".nh-msg.sys")?.remove()
            b?.remove()
            chat.insertAdjacentHTML("beforeend", '<p class="nh-note">Heartbeat skipped · the whole turn is dropped</p>')
            stats(false, false)
          } else {
            b?.classList.remove("nh-pending")
            stats(false, true)
          }
          finish()
        }
      }
      function finish() {
        running = false
        clearTimeout(timer)
        q("send").textContent = "Send sample message"
        q("send").disabled = false
        q("beat").disabled = false
        q("step").hidden = true
      }
      function start(list) {
        q("chat").innerHTML = ""
        stats(false, false)
        steps = list
        i = 0
        running = true
        q("send").textContent = "Stop"
        q("send").title = "Cancel the current turn"
        q("beat").disabled = true
        q("step").hidden = false
        advance(true)
      }
      function advance(auto) {
        if (!running) return
        apply(steps[i++])
        if (running && auto && motionEnabled()) timer = setTimeout(() => advance(true), 900)
      }
      q("send").addEventListener("click", () => {
        if (running) {
          // Stop: cancel the turn; the partial bubble is dropped
          bubble()?.remove()
          q("chat").insertAdjacentHTML("beforeend", '<p class="nh-note">Turn cancelled · partial reply dropped</p>')
          stats(false, false)
          finish()
          q("send").focus()
        } else start(userTurn)
      })
      q("beat").addEventListener("click", () => start(beatTurn))
      q("step").addEventListener("click", () => {
        clearTimeout(timer)
        advance(false)
      })
      return () => clearTimeout(timer)
    },
  }
  function renderVisual() {
    const v = visuals[currentProject][currentVisual]
    let html
    if (v.demo) html = demos[v.demo].render(currentVisual)
    else if (v.illo) html = illustration(v.illo, currentVisual)
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
    $("visual-stage").dataset.project = currentProject
    $("visual-stage").dataset.view = currentVisual
    $("visual-stage").dataset.kind = v.demo ? "demo" : v.illo ? "illustration" : "capture"
    $("visual-stage").innerHTML = html
    $("visual-caption").textContent = v.source || ""
    $("visual-caption").hidden = !v.source
    if (v.demo && v.capture) {
      const im = imageAssets[v.capture]
      $("visual-stage")
        .querySelector(".demo-bar [data-demo-reset]")
        ?.insertAdjacentHTML(
          "beforebegin",
          `<button type="button" class="demo-reset demo-capture" data-image="${v.capture}" aria-haspopup="dialog" aria-controls="image-dialog" data-focus-id="demo-capture">View real capture<span class="sr-only">: ${im.title}</span></button>`,
        )
    }
    if (v.demo) mountDemo(v.demo, $("visual-stage").querySelector(".demo"), currentVisual)
    else {
      demoCleanup?.()
      demoCleanup = null
    }
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
    else if (b.dataset.filter) {
      const filter = b.dataset.filter
      const ids = projectOrder.filter((id) => filter === "all" || projects[id].category === filter)
      const id = ids.includes(currentProject) ? currentProject : ids[0]
      go(workPath(id, id === currentProject ? currentVisual : undefined, "overview", filter))
    } else if (b.dataset.image) openImage(b.dataset.image)
    else if (b.dataset.related)
      go(workPath(b.dataset.related, undefined, "role", projects[b.dataset.related].category))
    else if (b.dataset.dialog) showDialog(b.dataset.dialog)
    else if (b.id === "previous-project" || b.id === "next-project") {
      const ids = visibleProjects(),
        direction = b.id === "next-project" ? 1 : -1
      go(workPath(ids[(ids.indexOf(currentProject) + direction + ids.length) % ids.length], undefined, "overview"))
    } else if (b.id === "surprise") {
      const choices = [...projectOrder, "playground"]
      const id = choices[Math.floor(Math.random() * choices.length)]
      if (id === "playground") go("playground")
      else {
        shareProject(id)
        go(workPath(id, undefined, "overview", projects[id].category))
      }
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
      /^#(?:home|work|about|playground|studio)(?:[/?]|$)/.test(b.getAttribute("href") || "")
    ) {
      e.preventDefault()
      go(b.getAttribute("href").slice(1))
    }
  })
  document.querySelector(".skip").addEventListener("click", (e) => {
    e.preventDefault()
    $("main").focus({ preventScroll: true })
  })

  // User-triggered requests only. Classification and scores come from the API.
  const examples = {
    inbox:
      "A translation is close, but too formal. AI would revise the draft while keeping the previous version available. The person can compare both versions before using either one.",
    access:
      "An AI agent is asked to change a shared file. The request may affect other people. Should the agent apply the change, prepare it for approval, or ask a person to review its scope first?",
    refund:
      "A carrier offer has a suggested price based on matching pricing rules. AI could fill a draft, suggest a price for confirmation, or ask a person to review it before the offer changes.",
  }
  const controls = ["ambiguity", "consequences", "reversibility"].map($)
  const aiNames = { automate: "Automate", assist: "Assist", human_review: "Human review" }
  const categoryMeanings = {
    automate:
      "A candidate for automatic execution within explicit limits, with ways to monitor, correct and override it.",
    assist: "AI can prepare or suggest the next step while a person confirms what happens.",
    human_review: "Keep a person responsible for reviewing the situation before anything is carried out.",
  }
  let aiRevision = 0,
    aiController = null,
    aiTimeout = null
  function syncInputs() {
    document
      .querySelectorAll("[data-example]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.example === $("scenario").value)))
    controls.forEach((input, i) => {
      const label = (i === 2 ? ["Hard to undo", "Partly reversible", "Easy to undo"] : ["Low", "Medium", "High"])[
        Number(input.value)
      ]
      $(input.id + "-label").textContent = label
      input.setAttribute("aria-valuetext", label)
    })
    $("character-count").textContent = $("situation").value.length.toLocaleString("en-US") + " / 1,200"
  }
  function resetEvaluation() {
    document
      .querySelectorAll("#evaluation-result, #evaluation-result *")
      .forEach((el) => el.getAnimations().forEach((a) => a.cancel()))
    $("evaluation-result").removeAttribute("data-result")
    aiRevision++
    aiController?.abort()
    aiController = null
    clearTimeout(aiTimeout)
    aiTimeout = null
    $("evaluation-result").setAttribute("aria-busy", "false")
    $("evaluate-situation").disabled = false
    $("evaluate-situation").innerHTML = 'Evaluate situation <span aria-hidden="true">↗</span>'
    $("cancel-evaluation").hidden = true
    $("ai-bars").hidden = true
    $("ai-bars").replaceChildren()
    $("ai-note").hidden = true
    $("category-reading").hidden = true
    $("ai-choice").textContent = "Ready when you are."
    $("ai-status").textContent = "Evaluate your current situation to see a classification and probabilities."
    $("situation-error").hidden = true
    $("situation").removeAttribute("aria-invalid")
  }
  function fillExample(id) {
    if (!Object.hasOwn(examples, id)) return
    resetEvaluation()
    $("situation").value = examples[id]
    $("scenario").value = id
    const values = { inbox: [0, 0, 2], access: [1, 2, 0], refund: [1, 1, 1] }[id]
    controls.forEach((input, i) => (input.value = values[i]))
    syncInputs()
    animateIn($("situation"), true)
  }
  document
    .querySelectorAll("[data-example]")
    .forEach((button) => button.addEventListener("click", () => fillExample(button.dataset.example)))
  $("scenario").addEventListener("change", () => {
    if ($("scenario").value) fillExample($("scenario").value)
  })
  $("clear-situation").addEventListener("click", () => {
    resetEvaluation()
    $("situation").value = ""
    $("scenario").value = ""
    syncInputs()
    $("situation").focus({ preventScroll: true })
  })
  $("situation").addEventListener("input", () => {
    resetEvaluation()
    $("scenario").value = ""
    syncInputs()
  })
  controls.forEach((input) =>
    input.addEventListener("input", () => {
      resetEvaluation()
      syncInputs()
    }),
  )
  $("cancel-evaluation").addEventListener("click", () => {
    resetEvaluation()
    $("ai-status").textContent = "Request cancelled. You can edit the situation or evaluate again."
    $("evaluate-situation").focus({ preventScroll: true })
  })
  function decisionEndpoint() {
    return "/api/decision"
  }

  function revealDecision(choice) {
    const panel = $("evaluation-result")
    panel.dataset.result = choice
    if (!motionEnabled()) return
    playAnimation(
      panel,
      [
        { boxShadow: "0 0 0 0 oklch(85% .12 170 / 0)", transform: "translateY(5px)" },
        { boxShadow: "0 0 40px 2px oklch(85% .12 170 / .16)", transform: "translateY(0)", offset: 0.45 },
        { boxShadow: "0 0 0 0 oklch(85% .12 170 / 0)", transform: "translateY(0)" },
      ],
      { duration: 1000, easing: "ease-out" },
    )
    playAnimation(
      $("ai-choice"),
      [
        { opacity: 0, transform: "translateY(12px)", filter: "blur(5px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
      ],
      { duration: 600, easing: "cubic-bezier(.16,1,.3,1)" },
    )
    document
      .querySelectorAll("#ai-bars .ai-track i")
      .forEach((bar, i) =>
        playAnimation(bar, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
          duration: 750,
          delay: i * 90,
          easing: "cubic-bezier(.16,1,.3,1)",
          fill: "backwards",
        }),
      )
    playAnimation(
      $("category-reading"),
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 450, delay: 250, easing: "ease-out", fill: "backwards" },
    )
  }

  function validateDecision(result) {
    if (
      !result ||
      !Object.hasOwn(aiNames, result.choice) ||
      !Array.isArray(result.probabilities) ||
      result.probabilities.length !== 3
    )
      throw new Error("The response could not be read. Please try again.")
    const values = Object.keys(aiNames).map((value) => {
      const entries = result.probabilities.filter((p) => p && p.value === value)
      if (
        entries.length !== 1 ||
        !Number.isFinite(entries[0].probability) ||
        entries[0].probability < 0 ||
        entries[0].probability > 1
      )
        throw new Error("The response contained invalid probabilities. Please try again.")
      return entries[0]
    })
    return values
  }
  $("decision-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    if (aiController) return
    const situation = $("situation").value.trim(),
      values = controls.map((c) => Number(c.value))
    if (situation.length < 10 || situation.length > 1200) {
      $("situation-error").textContent = "Enter between 10 and 1,200 characters, excluding surrounding spaces."
      $("situation-error").hidden = false
      $("situation").setAttribute("aria-invalid", "true")
      $("situation").focus({ preventScroll: true })
      return
    }
    if (values.some((v) => !Number.isInteger(v) || v < 0 || v > 2)) return
    resetEvaluation()
    const revision = ++aiRevision,
      controller = new AbortController()
    aiController = controller
    let timedOut = false
    aiTimeout = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 25000)
    $("evaluate-situation").disabled = true
    $("evaluate-situation").textContent = "Evaluating…"
    $("cancel-evaluation").hidden = false
    $("evaluation-result").setAttribute("aria-busy", "true")
    $("ai-choice").textContent = "Evaluating your situation…"
    $("ai-status").textContent = "Waiting for OpenAI’s response. You can cancel or edit your input."
    try {
      const response = await fetch(decisionEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ situation, ambiguity: values[0], consequences: values[1], reversibility: values[2] }),
      })
      let result
      try {
        result = await response.json()
      } catch {
        throw new Error("The evaluation is unavailable right now. Please try again.")
      }
      if (revision !== aiRevision) return
      if (timedOut) throw new DOMException("Timed out", "AbortError")
      if (!response.ok) {
        const fallback = {
          422: "This situation could not be evaluated. Try rephrasing it.",
          429: "The evaluation limit has been reached. Please try again later.",
          503: "The evaluation is temporarily unavailable. Please try again later.",
        }
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : fallback[response.status] || "The evaluation failed. Please try again.",
        )
      }
      const probabilities = validateDecision(result)
      $("ai-choice").textContent = aiNames[result.choice]
      $("ai-status").textContent = "OpenAI’s classification for this situation and these constraints."
      $("ai-bars").replaceChildren()
      for (const p of probabilities) {
        const row = document.createElement("div")
        row.className = "ai-bar-row"
        row.dataset.selected = String(p.value === result.choice)
        const label = document.createElement("span")
        label.textContent = aiNames[p.value]
        const track = document.createElement("span")
        track.className = "ai-track"
        track.setAttribute("aria-hidden", "true")
        const bar = document.createElement("i")
        bar.style.width = p.probability * 100 + "%"
        track.append(bar)
        const score = document.createElement("span")
        score.textContent = (p.probability * 100).toFixed(1) + "%"
        row.append(label, track, score)
        $("ai-bars").append(row)
      }
      $("ai-bars").hidden = false
      $("ai-note").hidden = false
      $("ai-note").textContent =
        "Model-estimated probabilities, not guarantees." +
        (result.cached ? " Previously evaluated for the same inputs." : "")
      $("category-meaning").textContent = categoryMeanings[result.choice]
      $("category-reading").hidden = false
      revealDecision(result.choice)
    } catch (error) {
      if (revision !== aiRevision) return
      $("ai-bars").hidden = true
      $("ai-note").hidden = true
      $("category-reading").hidden = true
      $("ai-choice").textContent = "No evaluation returned."
      $("ai-status").textContent =
        timedOut || error.name === "AbortError"
          ? "The request timed out after 25 seconds. Please try again."
          : error instanceof TypeError
            ? "Unable to connect. Check your connection and try again."
            : error.message
    } finally {
      if (revision === aiRevision) {
        clearTimeout(aiTimeout)
        aiTimeout = null
        aiController = null
        $("evaluation-result").setAttribute("aria-busy", "false")
        $("evaluate-situation").disabled = false
        $("evaluate-situation").textContent = $("ai-bars").hidden ? "Retry evaluation ↗" : "Evaluate again ↗"
        $("cancel-evaluation").hidden = true
      }
    }
  })

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
  syncInputs()
  renderRoute()
})()
