# Accessibility Notes and Usage Guidelines

## Primitive Accessibility Defaults
- `Button`
  - Uses native `<button>` semantics.
  - Supports disabled and loading states with `aria-busy`.
- `Input` / `Textarea` / `Select`
  - Label association via `htmlFor` and generated IDs.
  - Validation messaging surfaced with `aria-invalid` and `aria-describedby`.
- `Modal`
  - Uses `role="dialog"` and `aria-modal="true"`.
  - Supports Escape to close.
  - Traps keyboard focus while open.
  - Restores focus to the previously focused element on close.

## Authoring Guidelines
- Always provide `label` for form controls unless there is an equivalent accessible name.
- Use `error` prop for validation failures so assistive technologies can announce state changes.
- Avoid color-only status communication; pair with text labels.
- Ensure interactive elements are keyboard reachable and visible with focus styles.
- Keep motion subtle and respect reduced motion preferences when adding animations.

## Storybook Review Checklist
- Keyboard-only navigation works from first to last interactive element.
- Focus indicators are visible on all primitives.
- Error states are readable and associated to inputs.
- Color contrast is acceptable for text and status surfaces.
