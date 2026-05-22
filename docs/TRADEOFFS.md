# Architecture tradeoffs

Decisions made during the design-system and portfolio adoption work.

## Semantic tokens + host bridge (not hardcoded app colors)

**Choice:** Primitives read `--color-brand`, `--color-surface`, etc. Each host app maps those once in a bridge file (e.g. `portfolio-personal` → `design-system-bridge.css`).

**Why:** Same `Button`/`Card` work in Storybook, portfolio, and future apps without forking components.

**Tradeoff:** One-time setup per host; not “zero config.” Acceptable for a personal monorepo.

## Vendoring vs npm package

**Choice:** Copy `src/ui/*` and token CSS into `portfolio-personal` instead of publishing `@org/design-system`.

**Why:** No publish/version overhead; portfolio deploy stays self-contained.

**Tradeoff:** Manual sync when primitives change. Mitigation: small surface (button, card, utils, spinner) and adoption-plan vendoring list.

## Single CSS entry on portfolio (Turbopack)

**Choice:** Merge reference scales + host theme into one `design-system-bridge.css`; avoid nested `@import` from `app/globals.css`.

**Why:** Tailwind v4 + Turbopack failed to resolve `../styles/tokens-ref.css` from `globals.css`.

**Tradeoff:** `tokens-ref.css` in portfolio is a sync reference, not a runtime import.

## `data-theme="portfolio"` on `<html>`

**Choice:** Explicit host theme attribute; do not import default `tokens-semantics.css` on portfolio.

**Why:** Default semantics use blue brand + `prefers-color-scheme: dark` overrides that fought the teal/navy palette.

## Portfolio-specific component classes (`.ds-card-portfolio`, `.ds-btn-outline`)

**Choice:** Bridge provides layout/hover parity classes instead of forking primitives.

**Why:** Legacy portfolio look (offset shadow, mono CTAs, navy tiles) without `variant="portfolio"` on every primitive.

**Tradeoff:** Some presentation lives in CSS, not only in React props.

## POS out of scope

**Choice:** `pos-inventory-system` stays on shadcn/ui.

**Why:** Production app with its own stack; migrating it would not improve the portfolio case study.

## v2 candidates

- npm workspace or private package for shared UI
- `Badge` for impact pills on portfolio
- CMS admin forms (`Input`, `Button`) as second consumer
- `Table` primitive + visual regression baselines in CI
