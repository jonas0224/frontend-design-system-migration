# Storybook Test Workflow

## Objective

Catch behavioral and accessibility regressions in Storybook component states before merge.

**What CI enforces today**

- Stories render in Vitest browser mode (Chromium via Playwright).
- `play()` functions run for key primitives (Button, Input, Modal).
- axe a11y checks run with `test: "error"` — violations fail the build.

**What CI does not enforce yet**

- Pixel/screenshot diffs (see [v2 Phase E](./v2-implementation-plan.md#phase-e--visual-regression-optional-but-valuable)).
- Chromatic uploads (addon installed; workflow not wired).

## Local command

From `next-app/`:

```sh
npm run test:stories
```

## CI enforcement

The CI workflow runs `npm run test:stories` after unit tests and before build.

## Recommended PR process

1. Update or create stories for any UI change.
2. Add or extend `play()` when behavior changes (keyboard, focus, form state).
3. Run `npm run test:stories` locally.
4. Verify CI passes on the pull request.
5. Review a11y panel in Storybook for new variants.

## Adding interaction tests

Use `storybook/test` in `*.stories.tsx`:

```tsx
import { expect, userEvent, within } from "storybook/test";

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Continue" }));
    await expect(canvas.getByRole("button")).toBeEnabled();
  },
};
```

For portaled UI (e.g. Modal), query `within(document.body)`.

## Troubleshooting

- If story tests fail intermittently, re-run once to validate flake vs real issue.
- If a selector is brittle, prefer `getByRole` / `getByLabelText` over CSS selectors.
- Keep stories focused: one variant or state per story when testing edge cases.
- Modal stories that start closed need a `play()` step to open before asserting dialog content.

## Future: screenshot baselines

When Phase E lands, this doc will add `npm run test:visual` and baseline update instructions.
