# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/resume website for Jerome, built with Next.js. Multilingual (English, French, Korean) with dark mode support. Deployed on Vercel.

## Commands

Package manager is **Bun**.

- `bun dev` — Start dev server (Turbopack)
- `bun run build` — Production build (Turbopack)
- `bun run lint` — ESLint
- `bun start` — Serve production build

There is also an experimental `new-design-app/` (Vite + React + GSAP) which is untracked and separate from the main site.

## Architecture

### Routing & i18n

- **Next.js App Router** with dynamic `[lng]` segment for language routing (`/en/`, `/fr/`, `/ko/`)
- `middleware.ts` at the root handles language detection (Accept-Language header, cookie) and redirects to the correct locale prefix
- i18n uses `i18next` + `react-i18next` configured in `app/i18n/`
- Translation files live in `app/i18n/locales/{en,fr,ko}/translation.json`
- Fallback language is English; settings are in `app/i18n/settings.ts`

### Component Structure

- `app/components/` — Main section components (Header, AboutMe, Skills, Experiences, Education, Projects, etc.)
- `app/components/Utils/` — Reusable building blocks (Block, Badge, TimelineElement, ProgressBar, etc.)
- `app/components/ui/` — UI primitives (cookie banner, theme toggle)
- `app/components/lib/` — Component utilities (`cn()` helper using clsx + tailwind-merge, custom icons)

### Layout

- `app/layout.tsx` — Root layout with Vercel Analytics & Speed Insights
- `app/provider.tsx` — ThemeProvider (next-themes for dark/light mode)
- `app/[lng]/page.tsx` — Main page composing all section components in a responsive grid

### Types

- `types/` directory has interfaces: `ProjectType`, `ExperienceType`, `Language`, `Education`

### Styling

- **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`)
- Dark mode via `next-themes` with system preference detection
- Custom background SVGs for light/dark in `public/assets/`
- Prettier sorts Tailwind classes (`prettier-plugin-tailwindcss`)

## Code Conventions

- No semicolons (Prettier config)
- Print width: 120
- Path aliases: `@/*` maps to project root, `@/components/*` maps to `app/components/`
- TypeScript strict mode enabled
- Console logs stripped in production builds (next.config.ts)
- Server components are async; client components use `"use client"` directive
