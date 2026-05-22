# Workflow Plan

## Goal
Build and migrate to a reusable design system with consistent tokens, primitives, documentation, and adoption workflow.

## Delivery Workflow
1. Define scope and migration targets.
2. Build design tokens and foundational primitives.
3. Document components and usage patterns.
4. Add quality gates (lint, test, visual checks).
5. Migrate priority screens/components incrementally.
6. Measure adoption and refine standards.

## Working Agreements
- Small PRs (single milestone or tightly related changes).
- Every merged PR updates checklist status.
- Keep a "Definition of Done" for each milestone.
- Avoid broad rewrites; migrate iteratively by feature/screen.

## Milestones
- M1: Project foundation and tooling. **Done**
- M2: Design tokens (color, spacing, typography, radius, shadow, motion). **Done**
- M3: Core primitives (Button, Input, Textarea, Select, Card, Badge, Modal). **Done**
- M4: Documentation and Storybook usage examples. **Done**
- M5: Testing and visual regression workflow. **Done**
- M6: Initial migration of highest-impact UI surfaces. **Done**
- M7: Rollout metrics, cleanup, and handoff docs. **Done**

## Progress log
- 2026-05-07: Library MVP complete (tokens, primitives, Storybook, CI, playground).
- 2026-05-20: Portfolio adoption complete (CTAs, cards, host bridge, case-study sections). TRADEOFFS.md + roadmap shipped.

## Risks and Mitigation
- Scope creep -> lock MVP primitives first.
- Inconsistent adoption -> publish migration guide and codemods where possible.
- Regression risk -> visual tests + snapshot review in PR.
- Slow delivery -> focus on highest-impact components first.
