# Development Checklist

Use this as the single source of truth for execution status.

Legend:
- [ ] Not started
- [~] In progress
- [x] Completed

## Status summary (2026-05-20)

| Phase | Status |
|-------|--------|
| **1–5 Library MVP** | **Complete** |
| **6 Adoption (portfolio-personal)** | **Complete** |
| **7 Handoff** | **Complete** |

---

## 1) Foundation
- [x] Initialize Next.js + TypeScript project structure.
- [x] Add Tailwind CSS and base style setup.
- [x] Configure ESLint + formatting scripts.
- [x] Add Storybook with working sample story.
- [x] Add CI workflow (lint/unit/storybook/build checks wired).

## 2) Token System
- [x] Define base token files (color, type, spacing, radius, shadow, motion).
- [x] Add semantic token aliases (success, warning, error, info, brand).
- [x] Implement light/dark theme strategy.
- [x] Document token naming conventions.
- [x] Split `tokens-ref.css` / `tokens-semantics.css` for host theming.

## 3) Primitive Components
- [x] Build `Button` (variants, sizes, disabled/loading states).
- [x] Build `Input` and `Textarea` (labels, descriptions, errors).
- [x] Build `Select`.
- [x] Build `Card` and `Badge`.
- [x] Build `Modal` with keyboard/focus management.

## 4) Documentation
- [x] Add Storybook docs for each primitive.
- [x] Add examples for common composition patterns.
- [x] Add accessibility notes and usage guidelines.
- [x] Add migration guide (legacy -> new primitives).

## 5) Quality and Tests
- [x] Add unit tests for primitive behavior.
- [x] Add visual regression workflow for Storybook stories.
- [x] Add pre-merge quality checks and scripts.

## 6) Migration Rollout
- [x] Identify top-priority migration targets.
- [x] Migrate outline CTAs (hero, contact, nav, featured, roadmap, project links).
- [x] Migrate Card (roadmap tiles, featured blurbs, case-study sections).
- [x] Host theme bridge + `data-theme="portfolio"`.
- [x] Track adoption progress.

## 7) Handoff
- [x] Finalize architecture tradeoffs ([TRADEOFFS.md](./TRADEOFFS.md)).
- [x] Update README with adoption summary.
- [x] Mark shipped on portfolio roadmap.
- [x] Define v2 roadmap (see TRADEOFFS.md — Badge, CMS forms, npm package).
