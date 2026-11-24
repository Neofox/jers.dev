import { icon } from "../scripts/icons.js"
import { demoShell, motionEnabled } from "./shared.js"

// Pivo Coaches · coach finder. Mirrors the real filter pills, sort, header and card structure;
// coaches are fictional, filtering runs locally (the product filters server-side).
function markup() {
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
      <label class="cf-search">Search sample coaches
        <input type="search" data-cf="search" placeholder="Name, location, discipline or language">
      </label>
      <div class="cf-pills" role="group" aria-label="Filters">
        <label class="cf-select">${icon("compass")}<span class="sr-only">Discipline</span><select data-cf="discipline">${disciplines.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label>
        <div class="cf-combo"><button type="button" class="cf-pill" data-cf="lang-toggle" aria-expanded="false" aria-controls="cf-lang">${icon("globe")}<span data-cf="lang-label">Language</span></button>
          <div class="cf-pop" id="cf-lang" hidden><p class="illo-kicker">Language</p>${languages.map((l) => `<label class="cf-check"><input type="checkbox" value="${l}" data-cf="lang">${l}</label>`).join("")}</div></div>
        <button type="button" class="cf-pill" data-cf="certified" aria-pressed="false">Pivo Certified</button>
        <button type="button" class="cf-pill" data-cf="accept" aria-pressed="true">Accept New Students</button>
      </div>
      <div class="cf-head"><p class="cf-count" data-cf="count" aria-live="polite"></p><label class="cf-sort"><span>Sort by:</span><select data-cf="sort"><option value="random">Relevance</option><option value="popular">Popularity</option><option value="asc">Oldest first</option><option value="desc">Newest first</option></select></label></div>
      <section class="cf-profile" data-cf="profile" id="cf-profile-panel" tabindex="-1" aria-label="Coach profile" hidden></section>
      <ul class="cf-grid" data-cf="grid"></ul>
      <p class="cf-empty" data-cf="empty" hidden>No coaches found matching your criteria.</p>
      <div class="cf-more-row"><button type="button" class="button button-outline" data-cf="more" hidden>Load more coaches</button><p class="cf-loading" data-cf="loading" aria-live="polite"></p></div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
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
  const state = { terms: [], discipline: "", langs: [], certified: false, accept: true, sort: "random", pages: 1, open: null }
  let loadTimer = null
  const pop = q("lang-toggle").nextElementSibling
  const normalize = (value) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()
  function matchesSearch(coach) {
    const text = normalize([coach.name, coach.city, coach.country, labels[coach.discipline], ...coach.langs].join(" "))
    return state.terms.every((term) => text.includes(term))
  }
  function draw() {
    let list = coaches.filter(
      (c) =>
        matchesSearch(c) &&
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
    clearTimeout(loadTimer)
    state.pages = 1
    closeProfile(false)
    draw()
  }
  q("search").addEventListener("input", (e) => refilter(() => {
    state.terms = normalize(e.target.value).split(/\s+/).filter(Boolean)
  }))
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
    box.addEventListener("change", () => refilter(() => {
      state.langs = [...root.querySelectorAll('[data-cf="lang"]:checked')].map((b) => b.value)
    })),
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
}
