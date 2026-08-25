# Ripple Swim Co.

This project converts the Ripple Swim Co. marketing site into a standalone Angular application with lazy-loaded routes, SSR prerendering, and shared components that can support future product growth.

## Stack

- Angular standalone components
- Angular Router with `loadComponent` lazy routes
- SCSS design tokens in `src/styles/_tokens.scss`
- Angular SSR with prerendered marketing pages
- Reactive Forms for the contact workflow

## Routes

- `/`
- `/about`
- `/classes`
- `/pricing`
- `/contact`

Future top-level feature areas are reserved under `src/app/features/scheduling` and `src/app/features/payments`.

## Development

Install dependencies and run the app:

```bash
npm install
npm start
```

## Build

Create a production build:

```bash
npm run build
```

The production build uses bundle budgets to guard against regressions and prerenders the marketing routes for fast delivery and SEO.

## Environments

Environment placeholders live in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

`apiBaseUrl` and future payment-provider values are intentionally placeholders only.

## Deployment Note

This Angular app can still be built and deployed as static files while it remains a marketing site plus `mailto:` contact flow. Once real scheduling and payment features are added, the app will need a real backend/API and hosting that supports server-side capabilities rather than a static-only host such as GitHub Pages.
