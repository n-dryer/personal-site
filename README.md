# Nathan Dryer - Personal Portfolio

[![CI](https://github.com/n-dryer/personal-site/actions/workflows/ci.yml/badge.svg)](https://github.com/n-dryer/personal-site/actions/workflows/ci.yml)

React portfolio site.

**Live Site:** [https://nathandryer.com](https://nathandryer.com)

## Tech

React 19 | TypeScript | Vite | Tailwind CSS | Framer Motion | Yarn | Prettier

## Run Locally

1. `git clone https://github.com/n-dryer/personal-site.git`
2. `cd personal-site && yarn install`
3. `yarn start` (Vite dev server on `http://localhost:4000`)

**Quality gates (no heavy test suites):**

- CI runs format check (Prettier), lint (ESLint), type-check (tsc), and build (Vite).
- CI performs a minimal E2E smoke (curl-based) against a temporary `vite preview` server to validate key meta tags and endpoints.
- CI uploads the built `dist/` as an artifact for safe preview without publishing.

> Note: This project uses Yarn (v1). Please do not commit `package-lock.json`. Use `yarn` for all install and script commands.

## Build & Preview

- Build production bundle: `yarn build` (outputs to `dist/`)
- Preview production bundle: `yarn preview` (serves `dist/` on `http://localhost:4000`)

## CI & Artifact Preview

- Every push/PR runs CI (format check, lint, type-check, build, minimal E2E curl smoke) and uploads the built `dist/` as an artifact.
- To preview the artifact locally:

```bash
# 1) Download the artifact from the GitHub Actions run
# 2) Unzip it to get the dist/ contents locally
npx serve -s dist -l 4000
# open http://localhost:4000
```

## Deploy (when ready)

- This project is not auto-deploying yet. When ready, prefer GitHub Actions Pages (`.github/workflows/deploy-pages.yml`).
- Ensure `vite.config.ts` `base` is `/` for custom domains (current setup), or set it to your repo subpath if deploying under `https://<user>.github.io/<repo>/`.

## Branching & Releases

- Baseline snapshot: `baseline/2025-08-15` (tag: `baseline-2025-08-15`)
- First feature: `feat/vite-migration-react19` → PR into `main`
- Use conventional commits (feat, fix, chore, docs) and small PRs

## Content Schema (Skills & Timeline)

- Skills are grouped into categories: Languages & Runtimes; Frameworks & Libraries; AI/ML & Tooling; Infra & DevOps; Design & UX. Each skill has a depth badge: Expert/Proficient/Familiar (legacy Advanced -> Proficient, Intermediate -> Familiar).
- Timeline entries standardize: role (`title`), `company`, `date`, succinct achievements and technologies.

Update guidelines are documented in `src/components/Skills/README.md` and `src/components/Timeline/README.md`.

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
