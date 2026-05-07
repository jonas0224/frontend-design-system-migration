# Migration Guide (Legacy -> New Primitives)

## Goal
Replace ad-hoc UI implementations with shared primitives from `next-app/src/components/ui`.

## Step-by-Step Flow
1. Pick one screen/feature with repeated UI patterns.
2. Inventory old UI elements (buttons, inputs, cards, modals, badges).
3. Replace one primitive type at a time.
4. Validate visual state and accessibility behavior in Storybook and app.
5. Run quality checks (`lint`, `test:unit`, `test:stories`, `build`).
6. Merge in small PRs and record migration progress in checklist.

## Mapping Table
- Legacy button classes -> `Button` (`variant`, `size`, `loading`)
- Legacy text input/textarea markup -> `Input` / `Textarea`
- Native select wrappers -> `Select`
- Custom containers -> `Card` + `CardHeader` + `CardContent` + `CardFooter`
- Status pill styles -> `Badge`
- Custom dialog overlays -> `Modal`

## Example Migration Pattern
- Before:
  - Inline class-heavy `<button>` and `<input>` with duplicated styles.
- After:
  - `Button`, `Input`, and `Card` composition using token-based styles.

## Acceptance Criteria Per Migrated Screen
- No hardcoded hex colors for migrated components.
- All form controls have accessible labels.
- Error states use semantic tokens and proper aria attributes.
- Keyboard interaction works (including modal focus behavior).
- Storybook stories exist for any new variant added.

## Rollout Strategy
- Start with highest-traffic/highest-change screens.
- Keep old and new patterns side-by-side only during transition.
- Remove dead legacy styles once migration is complete for that area.
