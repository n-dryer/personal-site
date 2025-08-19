# Nathan Dryer - Personal Portfolio

[![CI](https://github.com/n-dryer/personal-site/actions/workflows/ci.yml/badge.svg)](https://github.com/n-dryer/personal-site/actions/workflows/ci.yml)

React portfolio site.

**Live Site:** [https://nathandryer.com](https://nathandryer.com)

## Tech

React 19 | TypeScript | Vite | Tailwind CSS | Framer Motion | Yarn | Prettier

## Main Features

- Interactive Timeline: desktop vertical tablist with detail panel and mobile single-column fallback
- Skills Showcase: categorized skills with proficiency badges
- Ship Log: recent updates and milestones
- Command Menu: quick command palette (Cmd/Ctrl+K or floating button) for navigation and social links
- Theme Toggle: light/dark mode with token-driven contrast
- Responsive Design: mobile-first, accessible, performant

## Run Locally

1. `git clone https://github.com/n-dryer/personal-site.git`
1. `cd personal-site && yarn install`
1. `yarn start` (Vite dev server at <http://localhost:4000>)

**Quality gates (no heavy test suites):**

- CI runs format check (Prettier), lint (ESLint), type-check (tsc), and build (Vite).
- CI performs a minimal E2E smoke (curl-based) against a temporary `vite preview` server to validate key meta tags and endpoints.
- CI uploads the built `dist/` as an artifact for safe preview without publishing.
- Unit tests run locally only with `yarn test` (Vitest + Testing Library) - not included in CI for performance.

> Note: This project uses Yarn (v1). Please do not commit `package-lock.json`. Use `yarn` for all install and script commands.

## Build & Preview

- Build production bundle: `yarn build` (outputs to `dist/`)
- Preview production bundle: `yarn preview` (serves `dist/` on `http://localhost:4000`)

## Project Structure

```text
public/                  # static assets and index.html
src/
  App.tsx                # main application component
  __mocks__/             # test mock data
  components/            # UI components (Header, Timeline, Skills, etc.)
  content/               # content data (experience.ts, skills.ts, user.ts)
  hooks/                 # custom React hooks
  layouts/               # application layout components
  setupTests.ts          # test environment setup
  styles/                # global styles & design tokens (tokens.css, global.css)
  types/                 # TypeScript type definitions
  main.tsx               # app bootstrap
```

## CI & Artifact Preview

- Every push/PR runs CI (format check, lint, type-check via `yarn tsc --noEmit`, build, minimal E2E curl smoke) and uploads the built `dist/` as an artifact.
- To preview the artifact locally:

```bash
# 1) Download the artifact from the GitHub Actions run
# 2) Unzip it to get the dist/ contents locally
npx serve -s dist -l 4000
# open http://localhost:4000
```

### CI logs & artifacts

- View workflow runs and logs under the **Actions** tab.
- Download the `dist/` artifact from the run summary to preview the exact build produced by CI.

## Deploy (when ready)

- Not auto-deploying yet; prefer GitHub Pages via `.github/workflows/deploy-pages.yml` when enabled.
- Vite `base` must match hosting:
  - Custom domain/user site: `base: '/'`
  - Project pages (`https://<user>.github.io/<repo>/`): `base: '/<repo>/'` (note trailing slash)

## Branching & PRs

- Trunk-based flow. Create small, focused PRs into `main`.
- Branch names:
  - UI improvements: `ui/<feature>` (e.g., `ui/vertical-timeline`, `ui/skills`, `ui/command-menu`)
  - Non-UI/performance: `perf/optimizations`
- Use conventional commits (feat, fix, chore, docs).
- Baseline snapshot is kept as a tag: `checkpoint/baseline-2025-08-15`.

## Content Schema (Skills & Timeline)

- Skills are grouped into categories: Languages & Runtimes; Frameworks & Libraries; AI/ML & Tooling; Infra & DevOps; Design & UX. Each skill has a depth badge: Expert/Proficient/Familiar (legacy Advanced -> Proficient, Intermediate -> Familiar).
- Timeline entries standardize: role (`title`), `company`, `date`, succinct achievements and technologies.

Update guidelines are documented in `src/components/Skills/README.md` and `src/components/Timeline/README.md`.

## Scripts

| Command                  | Purpose                                   |
| ------------------------ | ----------------------------------------- |
| `yarn start`             | Vite dev server (<http://localhost:4000>) |
| `yarn build`             | Production build to `dist/`               |
| `yarn preview`           | Serves `dist/` at <http://localhost:4000> |
| `yarn lint`              | ESLint on `src/`                          |
| `yarn lint:fix`          | ESLint on `src/` with auto-fix            |
| `yarn test`              | Run unit tests with Vitest                |
| `yarn tsc --noEmit`      | TypeScript type-check                     |
| `yarn format`            | Prettier write                            |
| `yarn format:check`      | Prettier check                            |
| `yarn ci:guard:lockfile` | Prevent package-lock.json creation        |

## Formatting & Editor setup

- Formatter: Prettier (pinned). Run formatting with:

```bash
yarn format
```

- Check formatting (optional):

```bash
yarn format:check
```

- Shared config files for editors and AI code tools:
  - `.prettierrc`: pins formatting rules (singleQuote, trailingComma, printWidth)
  - `.editorconfig`: cross-editor settings (LF line endings, UTF-8, 2-space indents)
  - Node version: `.nvmrc` (v20) and `engines.node: ">=20"` in `package.json`

## Agents & Automation

- See `AGENTS.md` for agent/editor guidance (planning, branching, scripts, CI expectations).
- See `.cursorrules` for additional editor/agent conventions and guardrails.
