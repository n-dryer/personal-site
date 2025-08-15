# Nathan Dryer - Personal Portfolio

React portfolio site.

**Live Site:** [https://nathandryer.com](https://nathandryer.com)

## Tech

React 19 | TypeScript | Vite | Tailwind CSS | Framer Motion | Jest (minimal) | Playwright (smoke + a11y) | Yarn

## Run Locally

1. `git clone https://github.com/n-dryer/personal-site.git`
2. `cd personal-site && yarn install`
3. `yarn start` (Vite dev server on `http://localhost:4000`)

**Tests:**
- **Unit**: `yarn test` (Jest) — minimal interaction tests (`ThemeToggle`, `CommandMenu`, `FloatingCommandButton`)
- **E2E**: `yarn test:e2e` (Playwright) — desktop smoke + a11y (contrast, target-size)

> Note: This project uses Yarn (v1). Please do not commit `package-lock.json`. Use `yarn` for all install and script commands.

## Build & Preview

- Build production bundle: `yarn build` (outputs to `dist/`)
- Preview production bundle: `yarn preview` (serves `dist/` on `http://localhost:4000`)

## Deploy (GitHub Pages)

Uses `gh-pages` and Vite output.

1. **Setup:** already configured. Ensure `homepage` in `package.json` points to your domain.
2. **Deploy:** `yarn deploy` (publishes `dist/` to `gh-pages` branch)

### Base URL

- If deploying to a custom domain (for example, `https://nathandryer.com`), Vite's default `base: '/'` is correct.
- If deploying under a repository subpath (for example, `https://<user>.github.io/personal-site/`), set `base: '/personal-site/'` in `vite.config.ts` so assets resolve correctly.

## Branching & Releases

- Baseline snapshot: `baseline/2025-08-15` (tag: `baseline-2025-08-15`)
- First feature: `feat/vite-migration-react19` → PR into `main`
- Use conventional commits (feat, fix, chore, docs) and small PRs

## Content Schema (Skills & Timeline)

- Skills are grouped into categories: Languages & Runtimes; Frameworks & Libraries; AI/ML & Tooling; Infra & DevOps; Design & UX. Each skill has a depth badge: Expert/Proficient/Familiar (legacy Advanced -> Proficient, Intermediate -> Familiar).
- Timeline entries standardize: role (`title`), `company`, `date`, succinct achievements and technologies.

Update guidelines are documented in `src/components/Skills/README.md` and `src/components/Timeline/README.md`.
