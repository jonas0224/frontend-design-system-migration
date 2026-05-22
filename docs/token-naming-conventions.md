# Token Naming Conventions

## Naming Structure
- Reference tokens: `--ref-{category}-{name}-{scale}`
  - Example: `--ref-color-neutral-100`, `--ref-space-4`
- Semantic tokens: `--color-{role}` or `--text-{role}`
  - Example: `--color-background`, `--color-brand`, `--color-error`

## Rules
- Keep raw values in `--ref-*` only.
- Use semantic tokens in components; never hardcode hex values in UI primitives.
- Prefer role-based names over usage-specific names.
  - Good: `--color-surface-elevated`
  - Avoid: `--color-card-blue`
- Keep scale increments consistent (`1,2,3,4,6,8,10,12` for spacing).
- Use lowercase and hyphen-separated names only.

## Theme Strategy
- **Reference tokens** (`tokens-ref.css`): import in any app; values are stable scales.
- **Semantic tokens** (`tokens-semantics.css`): default light/dark for the design-system playground only.
- **Host themes**: consuming apps set `data-theme="your-app"` on `<html>` and map `--color-*` to local CSS variables (see `portfolio-personal` → `design-system-bridge.css`).
- Do **not** import `tokens-semantics.css` in host apps — it applies blue defaults and OS dark-mode overrides that fight your palette.
- Playground dark mode uses `[data-theme="dark"]`; automatic OS fallback only applies when `data-theme` is unset.

## Adoption Guidance
- New components should consume semantic tokens first.
- Add new reference tokens only when no existing token fits.
- If a token is added, document both reference and semantic mapping in the same PR.
