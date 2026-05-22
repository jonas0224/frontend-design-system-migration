# Adoption Plan (Phase 6)

**Status: complete** for `portfolio-personal` (2026-05-20).

## Consumers

| # | Repo | Status |
|---|------|--------|
| 1 | `portfolio-personal` | **Done** — buttons, cards, host bridge |
| 2 | `portfolio-content-management` | Planned v2 (login/forms) |
| — | `pos-inventory-system` | Out of scope (shadcn/ui) |

## Portfolio host theme

1. `html[data-theme="portfolio"]` on layout root.
2. Single import: `design-system-bridge.css` (ref scales + semantic map + `.ds-*` helpers).
3. Do not import `tokens-semantics.css` (avoids blue OS dark-mode overrides).

## Migration log (portfolio-personal)

| Target | Primitives | Location |
|--------|------------|----------|
| Contact + hero CTAs | `ButtonLink` | `contact-section.tsx`, `hero-section.tsx` |
| Nav resume | `ButtonLink` | `site-header.tsx`, `mobile-menu.tsx` |
| Featured / roadmap links | `OutlineLink` | `featured-projects-section.tsx`, `roadmap-section.tsx` |
| Project detail links | `ButtonLink`, `OutlineLink` | `app/projects/[slug]/page.tsx` |
| Roadmap tiles | `Card` | `roadmap-section.tsx` |
| Featured description | `Card` | `featured-projects-section.tsx` |
| Case-study sections | `Card` via `CaseStudySection` | `case-study-section.tsx`, project page |

## Vendoring (until npm package)

Copy from `frontend-design-system-migration/next-app/src/` into `portfolio-personal/next-app/src/ui/`:

- `components/ui/utils.ts`, `spinner.tsx`, `button.tsx`, `card.tsx`
- Merge token ref scales into `styles/design-system-bridge.css`

Portfolio-only:

- `src/ui/outline-link.tsx`
- `src/components/case-study-section.tsx`

After changes: `npm run lint` && `npm run build` in `portfolio-personal/next-app`.

## Definition of done

- [x] Token bridge on portfolio site
- [x] CTAs and cards migrated
- [x] Tradeoffs documented
- [x] Roadmap updated
- [ ] Optional: capture screenshots/GIF for README (manual)
