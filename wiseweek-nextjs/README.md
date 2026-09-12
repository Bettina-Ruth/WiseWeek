# WiseWeek — Next.js conversion

This is the WiseWeek HTML prototype converted into a proper Next.js 16 + TypeScript
application. All UI, layout, colors, typography, spacing, and interactions are carried
over from the prototype as closely as possible — this is a **conversion**, not a
redesign.

## Verified working

- `npm install` — succeeds cleanly (427 packages)
- `npx tsc --noEmit` — zero type errors across the entire app
- `npx next build` — compiles successfully and prerenders all 11 routes as static pages

(The very first build attempt in the sandbox this was built in failed only because that
sandbox has no internet access to fonts.googleapis.com — `next/font/google` needs to
download font files at build time. That's an environment restriction, not a bug: once
run with normal internet access, `next/font/google` fetches the fonts and builds fine.
This was confirmed by temporarily swapping to system fonts, rebuilding successfully, then
restoring the real Google Fonts setup.)

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19 + TypeScript**
- **Tailwind CSS** — mapped 1:1 to the prototype's CSS custom properties
- **Framer Motion** — check-off pop animation, anti-procrastination modal, toasts
- **Lucide React** — all icons (nav, buttons, calendar chevrons, etc.)
- **Recharts** — trend charts (Area) and the Life Balance Wheel (Radar)

No backend, database, or auth provider — this keeps the same mock-data approach as the
HTML prototype, per the brief ("keep mock data for now").

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The landing page, auth screen, and all 8 app pages
(Dashboard, Weekly Planner, Analytics, Reflection, Calendar, Settings, Profile, Help)
are live and interactive on mock data — no database needed.

```bash
npm run build   # production build
npm run typecheck
```

## How the prototype's vanilla JS was converted to React

| Prototype pattern | Next.js equivalent |
|---|---|
| Global JS variables (`weekTasks`, `selectedDay`, `dayMood`, …) | `WiseWeekContext` (`context/WiseWeekContext.tsx`) — a single provider holding all app state via `useState`/`useCallback`, exposed through the `useWiseWeek()` hook |
| Manual `innerHTML` rewrites on every interaction | React state + JSX — each component re-renders itself from props/context, no manual DOM writes anywhere |
| `window.prompt()` / custom "input modal" overlay | `ModalContext` (`context/ModalContext.tsx`) — a promise-based `promptInput(title, default)` any component can call |
| Anti-procrastination popup (was already an in-page overlay in the last HTML version) | `AntiProcContext` (`context/AntiProcContext.tsx`) — same on-demand overlay, animated with Framer Motion |
| `showToast()` appending a div to `document.body` | Toasts live in `WiseWeekContext` state; `components/ui/ToastContainer.tsx` renders them with Framer Motion enter/exit |
| Native HTML5 drag-and-drop (`draggable`, `dragstart`/`drop` listeners) | Same native HTML5 DnD APIs, wired through React's `onDragStart`/`onDragOver`/`onDrop` props instead of `addEventListener` |
| `setInterval` for the focus timer and deadline reminders | `useEffect` + `setInterval`, cleaned up on unmount, inside the context |
| Hand-rolled SVG line/radar charts | Recharts (`AreaChart`, `RadarChart`) |
| `<select>` styling hacks for tier/energy/category | Native `<select>` + Tailwind classes bound to `--menu-bg`/`--menu-text` tokens, unchanged from the prototype's contrast fix |

## What's intentionally simplified vs. the HTML prototype

This is a large, feature-dense prototype (auth flow, calendar, drag-and-drop planner,
deadlines/reminders, analytics with a habit tracker, journal-style reflection). Everything
listed in the feature history is implemented and working, but a few things are simplified
compared to the exact prototype behavior, in the interest of idiomatic React/Next.js code
rather than a line-by-line port:

- **Routing**: each page is a real Next.js route (`/dashboard`, `/planner`, etc.) instead
  of one big HTML file with `display:none` toggling. Clicking a spine icon uses
  `next/link`, not a JS function that hides/shows divs.
- **Reflection "AI" insights**: same as the prototype — a deterministic function
  (`lib/reflection.ts`) that reads your actual entered data (completion rates, mood,
  category hours, time leaks) and generates observations from it. This is **not** a live
  call to an LLM in either version; wiring that up would need a server route and an
  Anthropic API key.
- **Auth**: login/signup/forgot/verify are fully interactive UI with simulated delays
  (`setTimeout`), same as the prototype. There's no real backend, session, or database —
  submitting always proceeds to the dashboard.
- **Deadline reminders**: checked every 5 seconds via `setInterval`, firing an in-app
  toast — same mechanism and same caveat as the prototype: this only works while the tab
  is open, since there's no service worker or push notification backend.

## Project structure

```
wiseweek-next/
├── app/
│   ├── layout.tsx                 → root layout: fonts, providers, toast container
│   ├── page.tsx                   → "/" — renders the landing page
│   ├── globals.css                → design tokens (light/dark CSS variables)
│   ├── login/
│   │   └── page.tsx                → "/login" — auth screen (login/signup/forgot/verify)
│   └── (app)/                     → route group sharing the app shell (Spine nav)
│       ├── layout.tsx              → app shell wrapper
│       ├── dashboard/page.tsx
│       ├── planner/page.tsx
│       ├── analytics/page.tsx
│       ├── reflection/page.tsx
│       ├── calendar/page.tsx
│       ├── settings/page.tsx
│       ├── profile/page.tsx
│       └── help/page.tsx
├── components/
│   ├── layout/
│   │   ├── Spine.tsx                → left nav: week strip + page icons
│   │   └── Topbar.tsx                → page title, search, mini-timer, theme, avatar
│   ├── landing/
│   │   ├── LandingPage.tsx
│   │   └── FaqAccordion.tsx
│   ├── auth/
│   │   └── AuthCard.tsx              → login/signup/forgot/verify panels
│   ├── dashboard/
│   │   ├── RealityStrip.tsx
│   │   ├── DayTasksCard.tsx
│   │   ├── DayTaskRow.tsx
│   │   ├── MoodCard.tsx
│   │   ├── EnergyCard.tsx
│   │   ├── TimerCard.tsx
│   │   └── FutureMessageCard.tsx
│   ├── planner/
│   │   ├── DayColumn.tsx             → drag/drop target, add-task
│   │   ├── PlannerTaskCard.tsx       → gradient card, dropdowns, deadline picker
│   │   ├── LastWeekCarryover.tsx
│   │   └── FutureMessageComposer.tsx
│   ├── analytics/
│   │   ├── TrendChart.tsx            → Recharts area chart + range toggle
│   │   ├── BalanceWheel.tsx          → Recharts radar chart
│   │   ├── WeekOverviewCard.tsx
│   │   ├── HabitSummaryCard.tsx
│   │   └── TimeLeaksCard.tsx
│   └── ui/
│       └── ToastContainer.tsx
├── context/
│   ├── WiseWeekContext.tsx           → all app state + actions (the heart of the app)
│   ├── ModalContext.tsx              → promise-based input modal (replaces window.prompt)
│   └── AntiProcContext.tsx           → anti-procrastination overlay/game
├── lib/
│   ├── mock-data.ts                  → seed data (tasks, categories, messages, …)
│   ├── date-utils.ts                 → real "today" calculation, week range, formatting
│   ├── task-colors.ts                → priority/energy gradient + reality-check rating
│   ├── analytics-utils.ts            → category-hours, tier-hours, dominating category
│   ├── anti-procrastination.ts       → keyword-matched tiny-step generator
│   └── reflection.ts                 → insight generation from real entered data
├── types/
│   └── index.ts                      → Task, FutureMessage, TimeLeak, HabitGoal, …
├── tailwind.config.ts                 → design tokens mapped to Tailwind utilities
├── package.json
└── tsconfig.json
```
