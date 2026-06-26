# Frontend Design System Migration

Design-system workspace built around **semantic tokens**, **React primitives**, and **Storybook**. Use it as a reference implementation when migrating legacy UI to shared components, or as a starting point for a token-driven Next.js UI kit.

**Status:** **Shipped** (v1) — library MVP (Phases 1–5) + portfolio adoption (Phase 6). **v2** in progress — see [`docs/v2-implementation-plan.md`](docs/v2-implementation-plan.md).

### Portfolio adoption (what shipped)

| Area | Primitives |
|------|------------|
| Hero, contact, nav, project links | `ButtonLink`, `OutlineLink` |
| Roadmap tiles, featured blurbs, case-study sections | `Card` |
| Theming | `design-system-bridge.css` + `data-theme="portfolio"` |

---

## Overview

| Area | What you’ll find |
|------|------------------|
| **Live exploration** | A [`ComponentPlayground`](next-app/src/components/playground/component-playground.tsx) on **`/`** to tweak props and preview primitives beside Storybook. |
| **Documentation** | [Storybook](https://storybook.js.org/) (`npm run storybook`, port **6006**) with autodocs and accessibility tooling. |
| **Tokens** | Reference scales plus semantic aliases, light/dark themes (`next-app/src/styles/tokens.css`, wired via Tailwind v4). |
| **Quality** | ESLint, Prettier, Vitest (unit + Storybook browser tests), GitHub Actions CI on **`next-app/`**. |

This repo optimizes for **clarity and repeatable workflows**: small PRs, stories/tests alongside UI changes, and docs under [`docs/`](docs/).

---

## Tech stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript**
- **Tailwind CSS** v4 (`globals.css` + `@theme`)
- **Storybook** 10 ([`next-app/.storybook`](next-app/.storybook))
- **Vitest** + Testing Library + Playwright (Storybook project)

CI runs on **Node 20** — see [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## Repository layout

| Path | Purpose |
|------|---------|
| [`next-app/`](next-app/) | Next.js app, UI primitives, playground, tokens, Storybook config |
| [`docs/`](docs/) | Workflow, migration, accessibility, tokens, visual regression |
| [`.github/workflows/`](.github/workflows/) | CI (lint, unit tests, Storybook tests, Prettier, build) |
| Root [`package.json`](package.json) | Proxies scripts into `next-app/` and runs `postinstall` there |

---

## UI primitives

Located in [`next-app/src/components/ui/`](next-app/src/components/ui/).

| Primitive | Notes |
|-----------|--------|
| **Button** | Variants (primary, secondary, ghost, danger), sizes, loading (spinner + accessible label), disabled |
| **Badge** | Semantic variants |
| **Card** | `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| **Input**, **Textarea**, **Select** | Labels, hints, errors, focus styling |
| **Modal** | Focus trap, Escape, overlay close option |
| **Spinner** | Sizes, optional screen-reader label, `tone` for contrast on solid buttons |
| **Progress** | Determinate / indeterminate, motion-aware |
| **Skeleton** | Pulse placeholders for loading layouts |

Re-export barrel: [`next-app/src/components/ui/index.ts`](next-app/src/components/ui/index.ts).

---

## Prerequisites

- **Node.js** 20+ (matches CI)
- **npm** (lockfile: `next-app/package-lock.json`)

---

## Getting started

**Recommended:** install once from the **repository root** — `postinstall` installs dependencies under `next-app/`.

```sh
npm install
npm run dev
```

- App: **http://localhost:3000** (playground at `/`)
- Storybook: `npm run storybook` → **http://localhost:6006**

### Work only inside the app

```sh
cd next-app
npm install
npm run dev
```

### Root scripts (delegate to `next-app/`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js dev server (webpack by default) |
| `npm run dev:turbo` | Dev with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test` / `npm run test:unit` | Unit tests |
| `npm run test:stories` | Storybook + Vitest browser tests |
| `npm run format` / `npm run format:check` | Prettier |
| `npm run storybook` | Storybook dev |
| `npm run build-storybook` | Static Storybook build |

### Common issues

**“Can’t resolve `tailwindcss`” or broken Tailwind**  
You likely ran Next from the wrong directory or skipped installs in `next-app/`. Use `npm install` at the repo root (or `cd next-app && npm install`), then `npm run dev` from the root **or** `npm run dev` inside `next-app/`.

**Dev server stuck on “Compiling / …”**

1. Stop the server (Ctrl+C).
2. From `next-app/`: `rm -rf .next && npm run dev`.
3. Default dev uses **webpack** (`next dev --webpack`) because Turbopack can hang on some setups. Try **`npm run dev:turbo`** if you prefer Turbopack.

**Unexpected Next.js version**  
From `next-app/`: `npx next --version`. If it isn’t **16.x**, reinstall deps in `next-app/` (`rm -rf node_modules && npm install`). Avoid relying on a globally installed `next`.

---

## Deployment

Typical setup: [**Vercel**](https://vercel.com/) (or similar) with **project root** set to **`next-app`**.

No runtime environment variables are required for the current scope.

**Suggested checks before merge or deploy** (also enforced in CI):

```sh
cd next-app   # or use root npm scripts
npm run lint && npm run test:unit && npm run test:stories && npm run format:check && npm run build
```

---

## Documentation

| Doc | Topic |
|-----|--------|
| [`docs/workflow-plan.md`](docs/workflow-plan.md) | Delivery workflow |
| [`docs/implementation-plan.md`](docs/implementation-plan.md) | Implementation notes |
| [`docs/development-checklist.md`](docs/development-checklist.md) | Checklist / status |
| [`docs/token-naming-conventions.md`](docs/token-naming-conventions.md) | Token naming |
| [`docs/accessibility-guidelines.md`](docs/accessibility-guidelines.md) | Accessibility |
| [`docs/migration-guide.md`](docs/migration-guide.md) | Migrating consuming apps |
| [`docs/visual-regression-workflow.md`](docs/visual-regression-workflow.md) | Storybook interaction + a11y tests |
| [`docs/v2-implementation-plan.md`](docs/v2-implementation-plan.md) | v2 roadmap (distribution, CMS, visual baselines) |
| [`docs/TRADEOFFS.md`](docs/TRADEOFFS.md) | Architecture decisions |
| [`docs/adoption-plan.md`](docs/adoption-plan.md) | Portfolio vendoring + migration log |

App-specific notes: [`next-app/README.md`](next-app/README.md).

---

## Contributing

1. Use [`docs/development-checklist.md`](docs/development-checklist.md) to pick scoped work.
2. Ship UI changes with **Storybook stories** and **tests** where behavior matters.
3. Keep PRs small and reviewable.
4. Ensure CI passes (lint, unit tests, Storybook tests, Prettier, build).

---

## License

No `LICENSE` file is checked into this repository yet; add one if you intend to open-source or share externally.
