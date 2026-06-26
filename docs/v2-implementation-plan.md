# v2 Implementation Plan

Concrete roadmap after the v1 MVP (library + portfolio adoption). Phases are ordered by risk reduction first, then distribution, then new consumers.

**Status:** Phase A complete (2026-06-26).

---

## Goals

1. **Correctness** — primitives behave the same in Storybook, playground, and host apps.
2. **Quality gates** — a11y and interaction tests fail CI on regressions; visual baselines optional but documented.
3. **Distribution** — replace manual vendoring with workspace package or automated drift checks.
4. **Adoption** — second consumer (`portfolio-content-management`) on forms primitives.
5. **Scale** — Table, extended form controls, and theme tooling as needed.

---

## Phase A — Correctness & test honesty

**Effort:** 1–2 days  
**Status:** complete

| Task | Done when |
|------|-----------|
| Default `.ds-btn-outline` / `.ds-btn-outline-sm` in `globals.css` | Outline variant has hover/focus in playground without host bridge |
| Remove `src/stories/` boilerplate | Storybook shows only `Primitives/*` |
| Storybook `a11y.test: "error"` | axe violations fail `npm run test:stories` |
| `play()` on Button, Input, Modal stories | Keyboard/a11y behavior asserted in browser tests |
| Update `visual-regression-workflow.md` | Docs match what CI actually enforces |
| Fix brand contrast + Progress `aria-label` | All primitive stories pass axe in CI |

**Out of scope for Phase A:** screenshot baselines, Chromatic, package extraction.

---

## Phase B — Component & utility hardening

**Effort:** 3–5 days  
**Depends on:** Phase A green in CI

### B1. Modal improvements

- [ ] Render via `createPortal` to `document.body`
- [ ] `titleId` / `descriptionId` from `useId()` (no title-collision)
- [ ] Optional `footer` slot; remove forced "Close" when custom actions provided
- [ ] Stabilize `onClose` in effects (ref) to avoid focus-trap re-runs

### B2. Button loading a11y

- [ ] Keep visible label in DOM (`sr-only` when loading) so accessible name stays "Save", not only "Loading"
- [ ] Story + unit test for loading label behavior

### B3. `tailwind-merge` in `cx`

- [ ] Add `tailwind-merge` to `utils.ts` for safe `className` overrides from hosts
- [ ] Document in migration guide

### B4. Promote link primitives

- [ ] Add `outline-link.tsx` (Next `Link` wrapper) to `components/ui/`
- [ ] Export `ButtonLink` + `OutlineLink` from barrel; Storybook stories
- [ ] Update portfolio to import from shared package (Phase C) or re-vendor once

### B5. Expand unit tests

- [ ] `Select`, `Textarea`, `Badge`, `Card`, `Progress`, `Spinner`
- [ ] Target: every primitive with non-trivial a11y or state logic

### B6. Host theme examples

- [ ] `next-app/src/styles/themes/playground.css` (default semantics, documented)
- [ ] `docs/examples/portfolio-bridge.css` (reference copy of portfolio overrides)
- [ ] Semantic token checklist in `migration-guide.md`

---

## Phase C — Distribution (stop manual vendoring)

**Effort:** 1–2 weeks  
**Depends on:** Phase B stable API

### Option C1 — npm workspaces (recommended)

```
personal/                          # monorepo root (optional)
  packages/
    ui/                            # react components + utils
    tokens/                        # tokens-ref.css
  apps/
    design-system-playground/      # current next-app shell
```

- [ ] `packages/ui` — `peerDependencies`: `react`, `react-dom`; no Next imports in core
- [ ] `packages/tokens` — CSS exports only
- [ ] Changesets for version bumps
- [ ] `portfolio-personal` + `portfolio-content-management` depend on `@personal/ui`

### Option C2 — Interim drift guard (if C1 deferred)

- [ ] `scripts/check-vendor-drift.sh` — diff vendored files vs source
- [ ] CI job on changes to `next-app/src/components/ui/`
- [ ] Document vendoring list in `adoption-plan.md` (already partial)

**Decision gate:** If only 2 consumers and low churn, C2 is enough for 3–6 months. If CMS + dashboard adopt, do C1.

---

## Phase D — Second consumer (CMS)

**Effort:** 1 week  
**Target:** `portfolio-content-management`

| Surface | Primitives |
|---------|------------|
| Admin login | `Input`, `Button` |
| Content forms | `Input`, `Textarea`, `Select`, `Button` |
| Status / drafts | `Badge` |
| Loading states | `Skeleton`, `Spinner` |

- [ ] Host theme: `data-theme="cms"` + `design-system-bridge.css`
- [ ] Do not import `tokens-semantics.css` (same rule as portfolio)
- [ ] Migration log section in `adoption-plan.md`
- [ ] E2E or story coverage for login + one edit form

**Out of scope:** POS (`shadcn/ui` stays per TRADEOFFS.md).

---

## Phase E — Visual regression (optional but valuable)

**Effort:** 2–3 days  
**Depends on:** Phase A play tests stable

Pick one:

| Tool | Pros | Cons |
|------|------|------|
| **Chromatic** | Hosted diffs, PR integration | Account, cost |
| **Playwright screenshots** | Self-hosted, full control | Baseline maintenance in repo |
| **Storybook test-runner snapshots** | Already on Storybook 10 | Less polished diff UX |

- [ ] Baseline stories: Button (all variants), Input (default + error), Card, Badge, Modal (open)
- [ ] CI upload or commit baselines
- [ ] Document update/approve flow in `visual-regression-workflow.md`

---

## Phase F — Advanced primitives

**Effort:** ongoing  
**Priority order:**

1. **Table** — sortable header, row actions (CMS lists)
2. **Checkbox / Switch** — admin toggles
3. **Field** — compose label + control + hint + error (reduce duplication across Input/Textarea/Select)
4. **Combobox / Datepicker** — only when native `Select` blocks a real workflow

Each primitive ships with: Storybook autodocs, `play()` where interactive, unit tests, token-only styles.

---

## Phase G — Portfolio v2 polish

- [ ] `Badge` for impact pills on project cards
- [ ] Re-sync after package extraction (remove duplicate `src/ui/` if using workspace)
- [ ] Optional README screenshots/GIF (manual, per adoption-plan)

---

## CI matrix (target end state)

```sh
npm run lint
npm run test:unit
npm run test:stories    # play + a11y error
npm run format:check
npm run build
# Phase C2+
./scripts/check-vendor-drift.sh
# Phase E (optional)
npm run test:visual
```

---

## Risk register

| Risk | Mitigation |
|------|------------|
| Vendoring drift | C1 package or C2 drift script |
| a11y regressions | `a11y.test: "error"` + play tests |
| Host theme fights OS dark mode | Never import `tokens-semantics.css` in hosts; use `data-theme` |
| Scope creep on primitives | Ship Table/Combobox only with a named consumer screen |
| Turbopack CSS `@import` issues | Single bridge file per host (documented in TRADEOFFS) |

---

## Definition of done (v2)

- [ ] Phase A–B complete; CI green
- [ ] Distribution: workspace package **or** drift script enforced
- [ ] CMS on `Input` / `Button` / at least one form flow
- [ ] `TRADEOFFS.md` and `adoption-plan.md` updated
- [ ] No hardcoded hex in primitives; host bridges documented with examples

---

## Related docs

- [`workflow-plan.md`](./workflow-plan.md) — v1 delivery history
- [`adoption-plan.md`](./adoption-plan.md) — consumer tracking
- [`TRADEOFFS.md`](./TRADEOFFS.md) — architecture decisions
- [`visual-regression-workflow.md`](./visual-regression-workflow.md) — test commands
- [`migration-guide.md`](./migration-guide.md) — host theming steps
