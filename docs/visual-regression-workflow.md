# Visual Regression Workflow

## Objective
Catch unintended visual changes in Storybook component states before merge.

## Local Command
From `next-app/`:

```sh
npm run test:stories
```

This runs Storybook-integrated tests through Vitest browser mode.

## CI Enforcement
The CI workflow runs `npm run test:stories` after unit tests and before build.

## Recommended PR Process
1. Update/create stories for any UI change.
2. Run `npm run test:stories` locally.
3. Verify CI passes on pull request.
4. Review visual diffs and a11y notes before merge.

## Troubleshooting
- If story tests fail intermittently, re-run once to validate flake vs real issue.
- If a selector/state is brittle, prefer stable story args and deterministic fixtures.
- Keep stories focused and explicit for each variant/state.
