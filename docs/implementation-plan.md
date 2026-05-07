# Implementation Plan

## Project Scope (MVP)
- Framework: Next.js + TypeScript.
- Styling baseline: Tailwind CSS + tokenized CSS variables.
- Component docs: Storybook.
- Quality: ESLint, unit tests, visual regression-ready setup.

## Phase Breakdown

## Phase 1 - Foundation
- Initialize app structure and strict TypeScript config.
- Add linting/formatting scripts and CI baseline.
- Set up Storybook and project-level conventions.

## Phase 2 - Token System
- Define semantic tokens:
  - Color: background/surface/text/border/brand/status.
  - Typography: font family, scale, weight, line-height.
  - Spacing and sizing scale.
  - Radius, shadow, motion tokens.
- Add dark/light theme strategy.

## Phase 3 - Primitive Components
- Create v1 primitives:
  - `Button`
  - `Input`
  - `Textarea`
  - `Select`
  - `Card`
  - `Badge`
  - `Modal`
- Include accessibility defaults and keyboard interactions.

## Phase 4 - Documentation
- Storybook docs page for each primitive:
  - props
  - variants
  - accessibility notes
  - do/don't usage
- Add migration examples from legacy UI to new primitives.

## Phase 5 - Quality Gates
- Add unit tests for behaviors and variants.
- Add visual snapshot workflow for component stories.
- Add CI checks: install, lint, test, build.

## Phase 6 - Migration
- Prioritize top 20% components causing 80% inconsistency.
- Migrate incrementally by screen or feature area.
- Track before/after component usage in checklist.

## Phase 7 - Adoption and Handoff
- Publish contributor guidelines.
- Track migration progress and remaining debt.
- Finalize roadmap for advanced components (table, datepicker, combobox).
