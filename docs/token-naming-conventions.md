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
- Default theme values are defined in `:root`.
- Dark theme uses `[data-theme="dark"]` overrides.
- Automatic fallback uses `@media (prefers-color-scheme: dark)` when no explicit `data-theme` is set.
- Future theme toggle should only switch `data-theme` on `<html>`.

## Adoption Guidance
- New components should consume semantic tokens first.
- Add new reference tokens only when no existing token fits.
- If a token is added, document both reference and semantic mapping in the same PR.
