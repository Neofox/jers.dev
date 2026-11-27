export const chapters = [
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

const koreanCareer = {
  "3i": {
    date: "2025년 9월 — 현재",
    company: "쓰리아이 (3i)",
    role: "프론트엔드 개발자 · AX 엔지니어",
    description: "Beamo 디지털 트윈 뷰어를 개발합니다. Vue 3 기반 핵심 웹 앱 네 개의 프론트엔드를 단독으로 맡아 유지보수하고 기능을 확장합니다. CS·QA 인트라넷과 공개 승마 코치 검색 서비스를 구축했고, MCP 연동과 함께 전사 Claude 도입을 맡고 있습니다.",
  },
  enhans: {
    date: "2024년 3월 — 2025년 9월",
    company: "인핸스 (Enhans)",
    role: "프론트엔드 개발자",
    description: "React와 Next.js로 AI 제품과 SaaS 프로토타입을 설계부터 배포까지 개발했습니다. AIAP, Enhans Model, Select LLM, ACT-1, Synergy와 Chrome 확장 프로그램을 담당했습니다.",
  },
  wcoding: {
    date: "2023년 3월 — 11월",
    role: "풀스택 웹 개발 강사",
    description: "HTML, CSS, JavaScript, PHP, MySQL을 가르쳤습니다. 교육과정과 실습 프로젝트를 설계하고, 수강생의 작업을 검토하며 멘토링했습니다.",
  },
  redspher: {
    date: "2021년 2월 — 2023년 3월",
    role: "풀스택 개발자 · 팀 리드",
    description: "개발팀을 이끌며 React, TypeScript, Node.js로 운송 주문, 운송사 입찰, 실시간 채팅을 지원하는 물류 포털을 만들었습니다. PM·PO와 일정을 조율하고 개발자를 멘토링했으며, Supplier Portal의 개발과 팀 운영을 함께 맡았습니다.",
  },
  flash: {
    date: "2017년 2월 — 2021년 2월",
    role: "풀스택 개발자",
    description: "기존 PHP 코드를 리팩터링하고 테스트와 배포를 맡았습니다. Node.js 마이크로서비스를 개발하며 React로 점진적으로 전환했습니다. Flash Europe International과 Redspher에서 Rubiwin과 Supplier Portal 개발에 참여했습니다.",
  },
  opcoding: {
    date: "2015년 11월 — 2017년 2월",
    role: "풀스택 웹 개발자",
    description: "룩셈부르크 테니스 연맹의 대회 운영에 필요한 Laravel REST API를 개발했습니다. 물류 서비스에서는 Symfony와 PostgreSQL로 인증, 위치, 파일을 처리하는 마이크로서비스를 만들었습니다.",
  },
  olkypay: {
    date: "2015년 3월 — 11월",
    role: "웹 개발자",
    description: "Symfony와 MariaDB를 사용해 인터넷 뱅킹·결제 서비스의 프론트엔드와 백엔드를 개발했습니다.",
  },
}

export function careerChapters(locale) {
  return locale === "ko" ? chapters.map(chapter => ({ ...chapter, ...koreanCareer[chapter.id] })) : chapters
}
