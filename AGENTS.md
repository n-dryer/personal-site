# AGENTS.md

## Overview

Automated code agents (e.g., Jules, Copilot) assist routine development tasks. This guide defines how agents should plan, code, validate, and contribute so efforts align with this repo’s standards and workflow.

## Main Features & UI (preserve these)

- Interactive Timeline: chronological work history and achievements
- Skills Showcase: categorized with proficiency badges
- Ship Log: placeholder component (planned feed for recent updates)
- Command Menu: Cmd/Ctrl+K palette for navigation/social
- Theme Toggle: light/dark modes (contrast tokens)
- Responsive Design: mobile-friendly, accessible, performant

Agents must use idiomatic React + TypeScript patterns and respect the existing folder structure.

## Task & Code Execution Workflow

1) Plan

- Generate a concise step-by-step plan before code changes.
- If a non-trivial or risky refactor, propose first; wait for approval.
- Reference the plan/task in PR descriptions.

1) Branch & PR (Trunk-based)

- Base off latest `main`.
- Small, focused PRs only; conventional commits (feat, fix, chore, docs).
- Branch naming:
  - UI improvements: `ui/<feature>` (e.g., `ui/skills`, `ui/command-menu`, `ui/vertical-timeline`)
  - Non-UI/perf: `perf/<feature>` — current branch in use: `perf/optimizations`
- Baseline snapshot/tag: `checkpoint/baseline-2025-08-15`

1) Code Standards (order matters)

- Format → Lint → Type-check → Build
- Keep changes minimal and readable; match repo idioms (React function components, named exports, clear prop types).

## Scripts (Yarn v1 only)

- `yarn start` — dev server (<http://localhost:4000>)
- `yarn build` — production build to `dist/`
- `yarn preview` — serves `dist/` (<http://localhost:4000>)
- `yarn lint` — ESLint on `src/`
- `yarn tsc --noEmit` — TypeScript type-check only
- `yarn format` — Prettier write
- `yarn format:check` — Prettier check

Notes:

- Yarn v1 project; do not commit `package-lock.json`.
- Node v20 is required/preferred (`.nvmrc`, engines in package.json).

## Quality Gates & CI

CI (GitHub Actions) runs on push/PR:

- Prettier check
- ESLint
- TypeScript type-check (`yarn tsc --noEmit`)
- Vite production build
- Minimal smoke test (curl) against a temporary preview server (validates key endpoints/meta)
- Uploads `dist/` artifact for preview on every run

Keep CI lightweight; no heavy/slow suites. Add only fast, deterministic checks.

## Build, Preview & Artifact

- Local build: `yarn build` (outputs to `dist/`)
- Local preview (artifact or local build):

  ```bash
  npx serve -s dist -l 4000
  # open http://localhost:4000
  ```

- CI artifact preview: download and serve `dist/` as above.

## Deploy

- Not auto-deploying yet; prefer GitHub Pages via `.github/workflows/deploy-pages.yml` when enabled.
- Vite base must match hosting:
  - Custom domain/user site: `base: '/'`
  - Project pages (`https://<user>.github.io/<repo>/`): `base: '/<repo>/'` (trailing slash)

## Project Structure

```
public/                  # static assets and index.html
src/
  components/            # UI components (Header, Timeline, Skills, etc.)
  content/               # data files (experience.ts, skills.ts, user.ts)
  hooks/                 # custom React hooks
  layouts/               # shared layout wrapper(s)
  styles/                # global styles & design tokens (tokens.css, global.css)
  main.tsx               # app bootstrap
```

## Content Schema (for agents updating content)

- **Skills**: grouped into Languages & Runtimes, Frameworks & Libraries, AI/ML & Tooling, Infra & DevOps, Design & UX. Depth: Expert, Proficient, Familiar (legacy: Advanced→Proficient, Intermediate→Familiar). Source: `src/content/skills.ts`
- **Timeline**: entries include `title`, `company`, `date`, succinct achievements, and technologies. Source: `src/content/experience.ts`
- **User**: personal details and social links. Source: `src/content/user.ts`
- See: `src/components/Skills/README.md`, `src/components/Timeline/README.md` for UI notes.

## Editor & Agent Rules

- See `.cursorrules` for editor/agent expectations (formatting, CI, file handling).
- Respect `.editorconfig` and Prettier.
- Use Yarn-only workflows (guard exists to prevent `package-lock.json`).

## Security & Privacy

- Never commit secrets or credentials.
- Minimize dependencies; justify new ones.
- Keep code and content safe for public distribution.

## Checklist (before opening a PR)

- [ ] `yarn format:check` passes
- [ ] `yarn lint` passes
- [ ] `yarn tsc --noEmit` passes
- [ ] `yarn build` succeeds
- [ ] Manual sanity check in `yarn preview` (UI changes only)
- [ ] PR includes plan summary and impact/risk notes

_Last updated: 2025-08-16_
