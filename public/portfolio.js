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
      name: "3i / Pivo",
      short: "Cloud, Meet, CS & Coaches",
      category: "professional",
      meta: "3i · 2025 — present",
      headline: "Building across the Pivo experience.",
      summary:
        "I built the full UI for Pivo Cloud and Meet, and delivered Pivo CS and Coaches end to end—connecting customer-facing experiences with the tools behind them.",
      role: "Senior Frontend Engineer · UI & end-to-end product delivery",
      stack: "Cloud & Meet: full UI · CS & Coaches: whole project",
      story: {
        overview: [
          "Four connected product experiences.",
          "Pivo helps people find a coach, meet remotely and revisit their videos. Behind those experiences, the CS app gives the team a structured way to investigate product issues.",
          "My work spans the customer journey and the internal tools that support it.",
        ],
        role: [
          "Clear ownership across four products.",
          "Cloud and Meet: I built the entire user interface for the video library and remote lesson experience.",
          "CS and Coaches: I built each project myself, taking responsibility for the whole product.",
        ],
        decisions: [
          "Different users. Different jobs.",
          "Cloud organizes uploaded and lesson videos. Meet brings coaches and students into a remote lesson. Coaches lets riders explore profiles and narrow their search.",
          "CS connects support reports to investigation: Zendesk import, device and app context, assignment, root causes and releases. The view here is an empty report form.",
        ],
      },
      chapters: [
        [
          "live",
          "Meet",
          "Full UI · Pivo Meet.",
          "The remote lesson experience, from joining a session to returning to a recording.",
        ],
        [
          "library",
          "Cloud",
          "Full UI · Pivo Cloud.",
          "A video library with separate Cloud and Lesson galleries, navigation and storage feedback.",
        ],
        [
          "coaches",
          "Coaches",
          "Whole project · Pivo Coaches.",
          "A public discovery experience for finding equestrian coaches, with search, filters and profiles.",
        ],
        [
          "cs",
          "CS",
          "Whole project · Pivo CS.",
          "An internal support workflow connecting reports, investigation context and delivery.",
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
      note: "Cloud, Coaches and CS: current product captures. Meet: recording view from Pivo’s public documentation.",
    },
    enhans: {
      name: "Enhans",
      short: "ACT-1 UI & Model Generator",
      category: "professional",
      meta: "Enhans · 2024 — 2025",
      headline: "Make AI something people can use.",
      summary:
        "I built the whole ACT-1 user interface and delivered Enhans AI Model Generator end to end. Two ways of turning AI capabilities into working products.",
      role: "Senior Web / Frontend Developer · Frontend leadership",
      stack: "ACT-1: full UI · Model Generator: whole project",
      story: {
        overview: [
          "From instructions to useful work.",
          "ACT is an AI assistant for carrying out tasks. My work was on ACT-1; the public demo shown here presents its current successor, ACT-2.",
          "Model Generator makes AI models available through a product experience, with public examples for video, image and text annotation.",
        ],
        role: [
          "Full UI ownership. End-to-end delivery.",
          "ACT-1: I worked on the entire user interface.",
          "AI Model Generator: I built the whole project. Alongside hands-on development, my Enhans role included frontend leadership across AI-powered applications.",
        ],
        decisions: [
          "Two different ways to use AI.",
          "An assistant interface is where people give an instruction and follow the work. A model product connects an input to a usable output.",
          "The Model Generator’s public examples show that contract concretely: a video URL becomes structured tags; image and text examples make the other input types understandable.",
        ],
      },
      chapters: [
        [
          "act",
          "ACT-1",
          "Full UI · ACT-1.",
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
      ],
      links: [
        ["Watch ACT-2 demo", "https://www.youtube.com/watch?v=RclYTBCA7D4"],
        ["Model Generator", "https://model.enhans.ai/"],
      ],
      sources: [
        ["ACT-2 · current product", "https://act-2.enhans.ai/en"],
        ["AI Model Generator", "https://model.enhans.ai/"],
      ],
      note: "My ACT contribution was ACT-1. ACT imagery and the linked demo show ACT-2, the current public version. Model Generator captures show its public product pages.",
    },
    rubiwin: {
      name: "Rubiwin & Supplier Portal",
      short: "Hands-on product leadership",
      category: "professional",
      meta: "Flash / Redspher · 2017 — 2023",
      headline: "A leader who kept building.",
      summary:
        "I worked on Rubiwin and Supplier Portal across development and team leadership. On Supplier Portal, I was both a developer and a team leader.",
      role: "Senior Web Developer → Team Lead Web Developer",
      stack: "Flash Global 2017–21 · Redspher 2021–23",
      story: {
        overview: [
          "Products for the carrier network.",
          "Rubiwin is a platform for transport companies. Carriers can upload pricing rules as a CSV, and the offer form can suggest a price using matching rules.",
          "Alongside Rubiwin, my work included Supplier Portal, where I combined hands-on development with team leadership.",
        ],
        role: [
          "Delivery, people, and hands-on work.",
          "At Redspher, I led a team of four in a larger IT department. I worked with business units to plan and deliver features, and onboarded and mentored internal and external developers.",
          "I stayed hands-on with React and Node. On Supplier Portal, my role included both development and team leadership.",
        ],
        decisions: [
          "A wider view of the application.",
          "Across my Flash and Redspher roles, I worked with React, Node/TypeScript and Node-RED. My broader application performance work included CQRS and Solr.",
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
          "I combined hands-on development with team leadership and collaboration with business teams.",
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
  projects["3i"].chapters.sort(
    (a, b) => ["live", "library", "coaches", "cs"].indexOf(a[0]) - ["live", "library", "coaches", "cs"].indexOf(b[0]),
  )
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
      date: "2025 — present",
      company: "3i",
      role: "Senior Frontend Engineer",
      description: "I built the entire UI for Pivo Cloud and Meet, and delivered Pivo CS and Coaches end to end.",
      project: "3i",
    },
    {
      id: "enhans",
      date: "2024 — 2025",
      company: "Enhans",
      role: "Senior Web / Frontend Developer",
      description:
        "I built the whole ACT-1 user interface and delivered Enhans AI Model Generator end to end, alongside frontend leadership.",
      project: "enhans",
    },
    {
      id: "wcoding",
      date: "2023 — 2024",
      company: "WCODING",
      role: "Fullstack Web Teacher",
      description: "I taught HTML, CSS, JavaScript, PHP and MySQL to beginners and experienced learners.",
    },
    {
      id: "redspher",
      date: "2021 — 2023",
      company: "Redspher",
      role: "Team Lead Web Developer",
      description:
        "I led a team of four, planned delivery with business units, and mentored internal and external developers. I stayed hands-on with React and Node, including development and leadership on Supplier Portal.",
      project: "rubiwin",
    },
    {
      id: "flash",
      date: "2017 — 2021",
      company: "Flash Global",
      role: "Senior Web Developer",
      description:
        "I worked across React, Node/TypeScript and Node-RED. My wider scope included application performance with CQRS and Solr. My Flash/Redspher work included Rubiwin and Supplier Portal.",
      project: "rubiwin",
    },
    {
      id: "opcoding",
      date: "2015 — 2017",
      company: "OpCoding",
      role: "Web Developer",
      description: "I worked as a web developer at OpCoding.",
    },
    {
      id: "olkypay",
      date: "2015",
      company: "Olkypay",
      role: "Junior Web Developer",
      description: "I worked on a Symfony payment application and server and webservice monitoring.",
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
    storyPage = 0,
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
      translater: ["inbox", "When should a draft change?"],
      neoharness: ["access", "When should an agent act?"],
      rubiwin: ["refund", "When should a price be applied?"],
      enhans: ["access", "Where should AI stop?"],
    }
    const entry = mapping[currentProject]
    $("case-approach").hidden = !entry
    if (!entry) return
    $("case-approach").href =
      "#" + examplePath(entry[0], workPath(currentProject, currentVisual, currentInspector, currentFilter, storyPage))
    $("case-approach").innerHTML =
      "<span>How I work · try a situation</span><strong>" + entry[1] + ' <span aria-hidden="true">↗</span></strong>'
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
      (route.hasOrigin ? "Back to " + origin.name : "Explore professional work") + ' <span aria-hidden="true">↗</span>'
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
      projectChanged = r.project !== currentProject,
      visualChanged = r.visual !== currentVisual
    const focused = document.activeElement,
      focusId = focused?.dataset.focusId,
      contentFocus = $("main").contains(focused)
    if ($("detail-dialog").open) $("detail-dialog").close()
    if ($("image-dialog").open) $("image-dialog").close()
    if (activeStage === "playground" && stageChanged) resetEvaluation()
    document.querySelectorAll(".stage").forEach((el) => (el.hidden = el.id !== "stage-" + r.stage))
    document.querySelectorAll(".dock a").forEach((a) => {
      if (a.hash.slice(1).split("/")[0] === r.stage) a.setAttribute("aria-current", "page")
      else a.removeAttribute("aria-current")
    })
    activeStage = r.stage
    document.body.dataset.stage = r.stage
    if (stageChanged) resetPortrait()
    currentFilter = r.filter
    if (r.stage === "work") {
      currentProject = r.project
      currentVisual = r.visual
      currentInspector = r.inspector
      storyPage = r.page
      shareProject(r.project)
      renderGallery()
      if (!stageChanged && (projectChanged || visualChanged)) animateIn($("visual-stage"))
    }
    if (r.stage === "about") renderChapter(r.chapter)
    if (r.stage === "playground") renderExample(r, stageChanged)
    if (stageChanged) {
      revealStage($("stage-" + r.stage))
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    if (contentFocus && stageChanged) {
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
      playground: "How I work",
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
  function getStoryPages(p, section) {
    if (section === "sources") {
      return [
        { heading: "Sources & product links", text: p.note },
        ...p.links.map((link) => ({ heading: "Explore the product", text: p.name, link })),
        ...p.sources.map((link) => ({ heading: "Source & context", text: p.note, link })),
      ]
    }
    const story = p.story[section],
      pages = story.slice(1).map((text) => ({ heading: story[0], text }))
    if (section === "overview") pages.unshift({ heading: p.headline, text: p.summary })
    return pages
  }
  function renderGallery() {
    const p = projects[currentProject],
      chapter = p.chapters.find((c) => c[0] === currentVisual),
      list = visibleProjects()
    $("work-title").textContent = "Work"
    $("work-collection-label").textContent =
      currentFilter === "professional" ? "Teams & products" : "Experiments & utilities"
    $("project-list").style.gridTemplateColumns = "repeat(" + list.length + ",minmax(0,1fr))"
    $("project-list").innerHTML = list
      .map(
        (id, i) =>
          `<button class="project-option" data-project="${id}" data-focus-id="project-${id}" aria-current="${id === currentProject}"><span class="index-number">${String(i + 1).padStart(2, "0")}</span><strong>${projects[id].name}</strong></button>`,
      )
      .join("")
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === currentFilter)))
    $("project-position").textContent =
      String(list.indexOf(currentProject) + 1).padStart(2, "0") + " / " + String(list.length).padStart(2, "0")
    $("visual-kind").textContent = chapter[1]
    $("inspector-meta").textContent = p.meta
    $("inspector-title").textContent = p.name
    $("inspector-role").innerHTML = p.role + "<span>" + p.stack + "</span>"
    $("inspector-tabs").innerHTML = [
      ["overview", "Context"],
      ["role", "My role"],
      ["decisions", "Product detail"],
      ["sources", "Sources"],
    ]
      .map(
        ([id, label]) =>
          `<button data-inspector="${id}" aria-pressed="${currentInspector === id}" data-focus-id="inspector-${id}">${label}</button>`,
      )
      .join("")
    const pages = getStoryPages(p, currentInspector)
    storyPage = Math.min(storyPage, pages.length - 1)
    const page = pages[storyPage]
    $("inspector-story").innerHTML =
      '<h4 data-focus-id="story-subheading">' +
      page.heading +
      "</h4><p>" +
      page.text +
      "</p>" +
      (page.link ? '<div class="story-source-link">' + ext(...page.link) + "</div>" : "")
    $("story-position").textContent = storyPage + 1 + " / " + pages.length
    $("story-previous").disabled = storyPage === 0
    $("story-next").disabled = storyPage === pages.length - 1
    renderCaseApproach()
    $("visual-chapters").hidden = p.chapters.length < 2
    $("visual-chapters").innerHTML = (p.chapters.length < 2 ? [] : p.chapters)
      .map(
        (c) =>
          `<button data-visual="${c[0]}" aria-pressed="${c[0] === currentVisual}" data-focus-id="visual-${currentProject}-${c[0]}">${c[1]}</button>`,
      )
      .join("")
    $("visual-annotation").innerHTML = "<strong>" + chapter[2] + "</strong> " + chapter[3]
    renderVisual()
  }
  function imageButton(key, extra = "") {
    const im = imageAssets[key]
    return `<button class="image-button ${extra}" data-image="${key}" aria-haspopup="dialog" aria-controls="image-dialog" aria-label="Enlarge ${im.title}" data-focus-id="enlarge-${key}"><img src="${im.src}" width="${im.w}" height="${im.h}" alt="${im.alt}"><span class="zoom-affordance" aria-hidden="true">↗ Enlarge</span></button>`
  }
  function diagram(label, title, body, footer) {
    return `<div class="product-overview"><p class="overview-label">${label}</p><p class="overview-word" data-focus-id="overview-heading">${title}</p>${body}<div class="overview-foot">${footer}</div></div>`
  }
  function renderVisual() {
    const id = currentProject,
      c = currentVisual
    let html = "",
      caption = ""
    if (id === "translater") {
      html = imageButton("translater")
      caption = "Translater · language, tone and reply context."
    } else if (id === "kaltoe-timer") {
      if (c === "popover") {
        html = imageButton("kaltoe")
        caption = "Kaltoe Timer · macOS popover · sample data."
      } else if (c === "label") {
        html =
          '<div class="multi-image">' +
          imageButton("ring") +
          imageButton("track") +
          '<p class="micro-explanation">The fill follows the current countdown.<br>The color follows the whole working day.</p></div>'
        caption = "Official ring and track label images, shown at their natural proportions."
      } else {
        html =
          '<div class="linux-image">' +
          imageButton("linux") +
          '<p class="micro-explanation">A countdown inside the icon.<br>The phase progress around it.</p></div>'
        caption = "KDE tray renderer examples from the public repository · synthetic data."
      }
    } else if (id === "3i") {
      const key = {
        live: "pivo-recording",
        library: "pivo-cloud-current",
        coaches: "pivo-coaches-current",
        cs: "pivo-cs-current",
      }[c]
      html = imageButton(key)
      caption =
        c === "live"
          ? "Pivo Meet · official recording view · Full UI"
          : "Pivo " + { library: "Cloud · Full UI", coaches: "Coaches · Whole project", cs: "CS · Whole project" }[c]
    } else if (id === "enhans") {
      const key = { act: "enhans-act-demo", model: "enhans-model-current", usecase: "enhans-model-usecase" }[c]
      html = imageButton(key)
      caption = c === "act" ? "ACT-2 public demo · My contribution: the ACT-1 UI" : "AI Model Generator · Whole project"
    } else if (id === "rubiwin") {
      if (c === "rubiwin") {
        html = imageButton("rubiwin-auction")
        caption = "Rubiwin support · product reference"
      } else if (c === "pricing") {
        html =
          '<div class="pricing-detail"><p class="eyebrow">Rubiwin / Pricing-grid detail</p><h4 data-focus-id="pricing-heading">Rules behind a suggested price.</h4>' +
          imageButton("rubiwin-pricing") +
          "<p>Carriers upload their pricing rules as a CSV. Matching rules can then inform the suggested price in the offer form.</p></div>"
        caption = "Rubiwin support · product reference · CSV upload detail"
      } else {
        html =
          '<div class="contribution-editorial"><p class="eyebrow">Supplier Portal / My contribution</p><h4 data-focus-id="supplier-contribution-heading">Build alongside<br>the team.</h4><dl class="contribution-lines"><div><dt>Developer</dt><dd>Hands-on product development with React and Node.</dd></div><div><dt>Team leader</dt><dd>Feature planning and delivery with business units; onboarding and mentoring developers.</dd></div></dl><p class="editorial-foot">Flash / Redspher · 2017–2023</p></div>'
        caption = "Supplier Portal · development & team leadership"
      }
    } else if (id === "neoharness") {
      const labels = {
          memory: ["Memory", "Persistent context"],
          tools: ["Tools", "Bounded calling"],
          schedules: ["Schedules", "Persistent work"],
          reliability: ["Reliability", "Supervised agents"],
        },
        l = labels[c]
      html = diagram(
        "Neoharness / System overview",
        l[1] + ".",
        '<div class="agent-system"><div class="agent-feature"><span class="' +
          (c === "memory" ? "lit" : "") +
          '">Memory</span><span class="' +
          (c === "tools" ? "lit" : "") +
          '">Tools + MCP</span></div><div class="agent-core">Independent<br>agent<small>ELIXIR / OTP</small></div><div class="agent-feature"><span class="' +
          (c === "schedules" ? "lit" : "") +
          '">Schedules</span><span class="' +
          (c === "reliability" ? "lit" : "") +
          '">Supervision</span></div></div>',
        "<span>LiveView · Telegram · Discord</span><span>Runtime architecture</span>",
      )
      caption = "Interactive system overview · select a concern to explore what supports continuity."
    } else {
      html =
        '<div class="contribution-editorial"><p class="eyebrow">Gleamstral / Library design</p><h4 data-focus-id="gleamstral-interface-heading">One coherent interface.<br>Your choice of transport.</h4><div class="library-boundary" role="img" aria-label="An application uses Gleamstral to prepare requests and handle responses, while an independent HTTP client transports them to Mistral."><div><strong>Your application</strong><span>A typed interface to Mistral</span></div><span class="boundary-arrow" aria-hidden="true">↕</span><div class="library-core"><strong>Gleamstral</strong><span>Prepare requests · Handle responses</span></div><span class="boundary-arrow" aria-hidden="true">↕</span><div><strong>Your HTTP client</strong><span>Transport stays independent</span></div></div></div>'
      caption = "Gleamstral · library interface and transport boundary"
    }

    $("visual-stage").dataset.project = id
    $("visual-stage").dataset.view = c
    $("visual-stage").classList.toggle("editorial", id === "gleamstral" || (id === "rubiwin" && c === "supplier"))
    $("visual-stage").innerHTML = html
    $("visual-caption").textContent = caption
  }
  function renderChapter(id) {
    const changed = id !== currentChapter
    currentChapter = id
    const c = chapters.find((c) => c.id === id)
    $("chapter-number").textContent = String(chapters.indexOf(c) + 1).padStart(2, "0")
    $("chapter-date").textContent = c.date
    $("chapter-title").textContent = c.company
    $("chapter-role").textContent = c.role
    $("chapter-description").textContent = c.description
    $("chapter-project").hidden = !c.project
    document
      .querySelectorAll("[data-chapter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.chapter === id)))
    if (changed) animateIn($("chapter-detail"), true)
  }
  $("chapter-list").innerHTML = chapters
    .map(
      (c) =>
        `<button class="chapter" data-chapter="${c.id}" aria-pressed="false" aria-controls="chapter-detail" data-focus-id="career-${c.id}"><time>${c.date}</time><strong>${c.company}</strong><span class="chapter-arrow" aria-hidden="true">↗</span></button>`,
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
        '<h2 id="dialog-title" data-focus-id="resume-heading">Experience, in detail.</h2><p>Choose your preferred language. Both PDFs open in a new tab.</p><div class="resume-choices"><a href="/assets/resume-en.pdf" target="_blank" rel="noopener noreferrer" type="application/pdf" hreflang="en" data-focus-id="resume-english"><span>EN</span><strong>English</strong><small>Open résumé PDF ↗</small></a><a href="/assets/resume-ko.pdf" target="_blank" rel="noopener noreferrer" type="application/pdf" hreflang="ko" lang="ko" data-focus-id="resume-korean"><span>KO</span><strong>한국어</strong><small>이력서 PDF 열기 ↗</small></a></div>'
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
    } else if (b.id === "story-previous" || b.id === "story-next")
      go(
        workPath(
          currentProject,
          currentVisual,
          currentInspector,
          currentFilter,
          storyPage + (b.id === "story-next" ? 1 : -1),
        ),
      )
    else if (b.dataset.visual) go(workPath(currentProject, b.dataset.visual))
    else if (b.dataset.inspector) go(workPath(currentProject, currentVisual, b.dataset.inspector))
    else if (b.dataset.filter) {
      const filter = b.dataset.filter
      const ids = projectOrder.filter((id) => filter === "all" || projects[id].category === filter)
      const id = ids.includes(currentProject) ? currentProject : ids[0]
      go(workPath(id, id === currentProject ? currentVisual : undefined, currentInspector, filter))
    } else if (b.dataset.image) openImage(b.dataset.image)
    else if (b.dataset.chapter) go("about/" + b.dataset.chapter)
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
    } else if (b.id === "chapter-project") {
      const c = chapters.find((c) => c.id === currentChapter)
      if (c.project) go(workPath(c.project, undefined, "role", projects[c.project].category))
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
