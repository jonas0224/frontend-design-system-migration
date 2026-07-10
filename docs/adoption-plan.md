# Adoption Plan

**Source of truth** for which repos consume [frontend-design-system-migration](https://github.com/jonas0224/frontend-design-system-migration).

**Distribution today:** vendored copy of `next-app/src/components/ui/*` + host `design-system-bridge.css` per app.  
**Future:** npm workspace package — see [v2-implementation-plan.md](v2-implementation-plan.md) Phase C.

---

## Consumer matrix

| Repo | Status | Theme | Notes |
| ---- | ------ | ----- | ----- |
| [portfolio-personal](https://github.com/jonas0224/portfolio-personal) | **Done** | `data-theme="portfolio"` | Buttons, cards, outline links |
| [realtime-operations-dashboard](https://github.com/jonas0224/realtime-operations-dashboard) | **Done** | `data-theme="ops"` | Button, Badge, Card, Spinner |
| [portfolio-content-management](https://github.com/jonas0224/portfolio-content-management) | **Done** | `data-theme="cms"` | Login, publish, content forms |
| [flashcut](https://github.com/jonas0224/flashcut) | **Partial** | `data-theme="flashcut"` | Lobby/login on primitives; in-game UI keeps `fc-*` |
| [pos-inventory-system](https://github.com/jonas0224/pos-inventory-system) | **Separate stack** | — | **shadcn/ui** — see [why](#archive-room-pos) |

### Archive Room (POS)

POS is a production shop product (tablet POS, shadcn/Radix). Migrating it would be a full UI rebrand with little operator benefit. **Rule:** showcase/portfolio apps use the design system; POS keeps shadcn unless you plan an explicit visual rebrand.

---

## Host theme pattern (every consumer)

1. `html[data-theme="your-app"]` on layout root.
2. Single import: `design-system-bridge.css` (reference scales + semantic token map).
3. Do **not** import `tokens-semantics.css` (avoids OS dark-mode fighting host theme).
4. Primitives from `components/ui/` vendored from this repo.

See [migration-guide.md](migration-guide.md).

---

## Vendoring checklist (new app)

Copy from `next-app/src/components/ui/`:

| File | When |
| ---- | ---- |
| `utils.ts` | Always |
| `button.tsx` | CTAs |
| `badge.tsx` | Status pills |
| `card.tsx` | Panels / tiles |
| `spinner.tsx` | With `Button loading` |
| `input.tsx`, `textarea.tsx`, `select.tsx` | Forms |

Merge `styles/tokens-ref.css` into `styles/design-system-bridge.css`. Add `[data-theme="your-app"]` semantic colors.

After changes: `npm run lint` && `npm run build`.

---

## Migration logs

### portfolio-personal — Done (2026-05-20)

Vendored into `next-app/src/ui/`. `ButtonLink`, `OutlineLink`, `Card`, `design-system-bridge.css`.

### realtime-operations-dashboard — Done (2026-06-26)

`Button`, `Badge`, `Card`, `Spinner` on dashboard + simulator toolbar.

### portfolio-content-management — Done (2026-06-26)

| Surface | Primitives |
| ------- | ---------- |
| Login | `Input`, `Button`, `Card` |
| Publish | `Input`, `Button`, `Card` |
| Content create/edit | `Input`, `Select`, `Textarea`, `Button`, `Card` |
| Sign out | `Button` |

Legacy `--foreground` / `--surface` aliases remain in bridge for unmigrated nav pages.

### flashcut — Partial (2026-06-26)

| Surface | Primitives |
| ------- | ---------- |
| Home lobby | `Input`, `Button`, `Card` |
| Team login | `Input`, `Button`, `Card` |
| In-game (choices, countdown, reveal) | Keep `fc-*` game CSS |

**Remaining:** host dashboard, join flow, results pages (`fc-btn-cta` → `Button` when touched).

---

## Rollout order

1. ~~portfolio-personal~~ ✓  
2. ~~realtime-operations-dashboard~~ ✓  
3. ~~portfolio-content-management~~ ✓  
4. **flashcut** — finish lobby/admin surfaces  
5. **Phase C** — `@personal/ui` package to replace manual vendoring  

---

## Definition of done (per consumer)

- [ ] Token bridge + `data-theme` on `<html>`
- [ ] Forms and CTAs use shared primitives (not `ui-classes` / `fc-btn-*` on migrated surfaces)
- [ ] `npm run build` green
- [ ] Row updated in consumer matrix above
