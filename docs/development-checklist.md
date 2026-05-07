# Development Checklist

Use this as the single source of truth for execution status.

Legend:
- [ ] Not started
- [~] In progress
- [x] Completed

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
- [ ] Identify top-priority migration targets.
- [ ] Migrate first high-impact screen.
- [ ] Migrate second high-impact screen.
- [ ] Track defects/regressions and fixes.
- [ ] Track adoption progress (% migrated or list completed).

## 7) Handoff
- [ ] Finalize contributing docs.
- [ ] Finalize architecture decisions and tradeoffs.
- [ ] Define v2 roadmap (advanced components + automation).
