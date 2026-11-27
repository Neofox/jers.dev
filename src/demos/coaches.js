import { uiText } from "./demo-locale.js"
import { icon } from "../scripts/icons.js"
import { demoShell, motionEnabled } from "./shared.js"

// Pivo Coaches · coach finder. Mirrors the real filter pills, sort, header and card structure;
// coaches are fictional, filtering runs locally (the product filters server-side).
function markup() {
  const disciplines = [
    ["", uiText("Discipline", "승마 종목")],
    ["dressage", uiText("Dressage", "마장마술")],
    ["show_jumping", uiText("Show Jumping", "장애물 비월")],
    ["eventing", uiText("Eventing", "종합마술")],
    ["hunter_equitation", uiText("Hunter / Equitation", "헌터 / 에퀴테이션")],
    ["western", uiText("Western", "웨스턴 승마")],
    ["general_riding_horsemanship", uiText("General Riding / Horsemanship", "일반 승마 / 말 다루기")],
    ["working_equitation", uiText("Working Equitation", "워킹 에퀴테이션")],
    ["other", uiText("Other", "기타")],
  ]
  const languages = [uiText("English", "영어"), uiText("French", "프랑스어"), uiText("German", "독일어"), uiText("Korean", "한국어"), uiText("Dutch", "네덜란드어"), uiText("Spanish", "스페인어")]
  return demoShell(
    "coaches",
    uiText("Pivo Coaches filters and results", "Pivo Coaches 코치 검색과 필터"),
    `<div class="cf">
      <label class="cf-search">${uiText("Search sample coaches", "예시 코치 검색")}
        <input type="search" data-cf="search" placeholder="${uiText("Name, location, discipline or language", "이름, 지역, 종목 또는 언어")}">
      </label>
      <div class="cf-pills" role="group" aria-label="${uiText("Filters", "검색 조건")}">
        <label class="cf-select">${icon("compass")}<span class="sr-only">${uiText("Discipline", "승마 종목")}</span><select data-cf="discipline">${disciplines.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></label>
        <div class="cf-combo"><button type="button" class="cf-pill" data-cf="lang-toggle" aria-expanded="false" aria-controls="cf-lang">${icon("globe")}<span data-cf="lang-label">${uiText("Language", "언어")}</span></button>
          <div class="cf-pop" id="cf-lang" hidden><p class="illo-kicker">${uiText("Language", "언어")}</p>${languages.map((l) => `<label class="cf-check"><input type="checkbox" value="${l}" data-cf="lang">${l}</label>`).join("")}</div></div>
        <button type="button" class="cf-pill" data-cf="certified" aria-pressed="false">${uiText("Pivo Certified", "Pivo 인증")}</button>
        <button type="button" class="cf-pill" data-cf="accept" aria-pressed="true">${uiText("Accept New Students", "신규 수강생 모집 중")}</button>
      </div>
      <div class="cf-head"><p class="cf-count" data-cf="count" aria-live="polite"></p><label class="cf-sort"><span>${uiText("Sort by:", "정렬 기준")}</span><select data-cf="sort"><option value="random">${uiText("Relevance", "관련도순")}</option><option value="popular">${uiText("Popularity", "인기순")}</option><option value="asc">${uiText("Oldest first", "과거 등록순")}</option><option value="desc">${uiText("Newest first", "최근 등록순")}</option></select></label></div>
      <section class="cf-profile" data-cf="profile" id="cf-profile-panel" tabindex="-1" aria-label="${uiText("Coach profile", "코치 프로필")}" hidden></section>
      <ul class="cf-grid" data-cf="grid"></ul>
      <p class="cf-empty" data-cf="empty" hidden>${uiText("No coaches found matching your criteria.", "조건에 맞는 코치가 없습니다.")}</p>
      <div class="cf-more-row"><button type="button" class="button button-outline" data-cf="more" hidden>${uiText("Load more coaches", "코치 더 보기")}</button><p class="cf-loading" data-cf="loading" aria-live="polite"></p></div>
    </div>`,
  )
}

export function mount(stage) {
  stage.innerHTML = markup()
  const root = stage.querySelector(".demo")
  // Fictional coaches. Fields follow the real CoachListItem shape that the card renders.
  const coaches = [
    ["Mara", uiText("Lyon", "리옹"), uiText("France", "프랑스"), "dressage", [uiText("French", "프랑스어"), uiText("English", "영어")], true, true, 41, 1],
    ["Theo", uiText("Hamburg", "함부르크"), uiText("Germany", "독일"), "show_jumping", [uiText("German", "독일어"), uiText("English", "영어")], false, true, 18, 2],
    ["Hana", uiText("Seoul", "서울"), uiText("South Korea", "대한민국"), "dressage", [uiText("Korean", "한국어"), uiText("English", "영어")], true, false, 27, 3],
    ["Pieter", uiText("Utrecht", "위트레흐트"), uiText("Netherlands", "네덜란드"), "eventing", [uiText("Dutch", "네덜란드어"), uiText("German", "독일어")], true, true, 33, 4],
    ["Sofia", uiText("Seville", "세비야"), uiText("Spain", "스페인"), "working_equitation", [uiText("Spanish", "스페인어")], false, true, 12, 5],
    ["Jun", uiText("Busan", "부산"), uiText("South Korea", "대한민국"), "show_jumping", [uiText("Korean", "한국어")], false, true, 9, 6],
    ["Clara", uiText("Bordeaux", "보르도"), uiText("France", "프랑스"), "general_riding_horsemanship", [uiText("French", "프랑스어")], true, true, 22, 7],
    ["Lukas", uiText("Munich", "뮌헨"), uiText("Germany", "독일"), "dressage", [uiText("German", "독일어")], false, false, 15, 8],
    ["Inès", uiText("Madrid", "마드리드"), uiText("Spain", "스페인"), "western", [uiText("Spanish", "스페인어"), uiText("English", "영어")], true, true, 30, 9],
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
  const location = (coach) => uiText(`${coach.city}, ${coach.country}`, `${coach.country} ${coach.city}`)
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
    q("count").textContent = uiText(`Found ${list.length} ${list.length === 1 ? "Coach" : "Coaches"}`, `검색된 코치 ${list.length}명`)
    q("more").hidden = shown.length >= list.length
    q("loading").textContent = ""
    q("grid").innerHTML = shown
      .map(
        (c) => `<li class="cf-card"><div class="cf-photo" aria-hidden="true"><span>${c.name[0]}</span></div>
          <div class="cf-badges">${c.pivoCertified ? `<span class="cf-badge red">${uiText("Pivo Certified", "Pivo 인증")}</span>` : ""}${c.acceptStudents ? `<span class="cf-badge">${uiText("Accepting Students", "수강생 모집 중")}</span>` : ""}</div>
          <div class="cf-info"><strong>${c.name}</strong><span class="cf-loc">${location(c)}</span><span class="cf-bio">${uiText("Sample profile ·", "예시 프로필 ·")} ${labels[c.discipline]} · ${c.langs.join(", ")}</span><button type="button" class="cf-more" data-coach="${c.order}" aria-expanded="${state.open === c.order}" aria-controls="cf-profile-panel">${uiText("See More", "자세히 보기")}</button></div></li>`,
      )
      .join("")
    q("empty").hidden = list.length > 0
    q("grid").hidden = list.length === 0
    const n = state.langs.length
    q("lang-label").textContent = n === 0 ? uiText("Language", "언어") : n <= 2 ? state.langs.join(", ") : uiText(`${n} selected`, `언어 ${n}개 선택`)
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
      q("loading").textContent = uiText("Loading more coaches...", "코치를 더 불러오는 중…")
      loadTimer = setTimeout(show, 400)
    } else show()
  })
  // See More opens a sample profile built from the same fictional record
  function openProfile(order) {
    const c = coaches.find((x) => x.order === order)
    if (!c) return
    state.open = order
    const p = q("profile")
    p.innerHTML = `<div class="cf-profile-head"><div class="cf-photo small" aria-hidden="true"><span>${c.name[0]}</span></div><div><p class="illo-kicker">${uiText("Sample profile", "예시 프로필")}</p><h4>${c.name}</h4><p class="cf-loc">${location(c)}</p></div><button type="button" class="demo-reset" data-cf="close">${uiText("Close", "닫기")}</button></div>
      <dl class="cf-facts"><div><dt>${uiText("Discipline", "승마 종목")}</dt><dd>${labels[c.discipline]}</dd></div><div><dt>${uiText("Languages", "수업 언어")}</dt><dd>${c.langs.join(", ")}</dd></div><div><dt>${uiText("Pivo Certified", "Pivo 인증")}</dt><dd>${c.pivoCertified ? uiText("Yes", "예") : uiText("No", "아니요")}</dd></div><div><dt>${uiText("New students", "신규 수강생")}</dt><dd>${c.acceptStudents ? uiText("Accepting", "모집 중") : uiText("Not accepting", "모집 마감")}</dd></div></dl>
      <p class="cf-note">${uiText("In the product, See More opens this coach's page. Fictional coach · no request is made.", "실제 서비스에서는 ‘자세히 보기’를 누르면 코치 페이지가 열립니다. 여기서는 가상 코치의 정보를 바로 보여 줍니다.")}</p>`
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
