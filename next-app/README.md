# next-app

Production app for the Frontend Design System Migration project.

## Scripts

- `npm run dev` - start Next.js locally (webpack — avoids Turbopack hangs)
- `npm run dev:turbo` - dev with Turbopack (faster when it works on your machine)
- `npm run storybook` - run Storybook
- `npm run lint` - run ESLint
- `npm run test:unit` - run unit tests
- `npm run test:stories` - run Storybook visual tests
- `npm run format:check` - validate formatting
- `npm run build` - run production build

## Deployment

This app is deployable on Vercel with zero runtime environment variables required for the current feature set.

Before deploying:

1. Run quality checks locally:
   - `npm run lint`
   - `npm run test:unit`
   - `npm run test:stories`
   - `npm run build`
2. Ensure CI is green.
3. Deploy `next-app` as the project root in your hosting platform.

## Notes

- UI primitives live in `src/components/ui`.
- Tokens and theme aliases live in `src/styles/tokens.css`.
