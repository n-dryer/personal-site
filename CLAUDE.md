# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio site for Nathan Dryer built with React 19, TypeScript, Vite, Tailwind CSS, and Framer Motion. It features an interactive and filterable skills showcase, an interactive timeline that dynamically responds to skill selections, a command menu, and theme toggle with a focus on accessibility and performance.

**Live Site**: https://nathandryer.com

## Development Commands

```bash
# Development
yarn start                  # Start Vite dev server on http://localhost:4000
yarn build                  # Production build to dist/
yarn preview                # Preview production build on http://localhost:4000

# Quality Checks
yarn lint                   # ESLint on src/
yarn lint:fix               # ESLint with auto-fix
yarn tsc                    # TypeScript type-check (runs: tsc -p tsconfig.json)
yarn format                 # Prettier write
yarn format:check           # Prettier check
yarn test                   # Run unit tests with Vitest (uses jsdom environment)

# CI Commands
yarn ci:guard:lockfile      # Prevent package-lock.json creation
npx chrome-devtools-mcp@latest # Start Chrome DevTools MCP server
```

**Important**: This project uses Yarn v1 exclusively. Never commit `package-lock.json`.

## Architecture & Key Concepts

### Design System: Token-Driven Styling

The site uses a comprehensive design token system in `src/styles/tokens.css` with two themes:

- **Light mode** (`aurora-light`): Cosmic Comet theme with deep purples and electric blues
- **Dark mode** (`aurora-dark`): Enhanced contrast for readability

All colors, spacing, typography, and motion values are defined as CSS custom properties and referenced in `tailwind.config.js`. When styling components:

1. Prefer using Tailwind classes that reference tokens (e.g., `text-resume-text-primary`)
2. For complex gradients or effects, use CSS custom properties directly
3. The gradient background uses `@paper-design/shaders-react` (GrainGradient shader) with exact CSS fallback

### Component Structure

Components follow a barrel export pattern via `src/components/index.ts`. Each component directory typically includes:

- `ComponentName.tsx` - Main component file
- `ComponentName.test.tsx` - Unit tests (optional, tests kept minimal)
- `index.ts` - Barrel export
- `README.md` - Component-specific documentation

Import components from the barrel: `import { Header, Footer } from '@/components'`

**Note**: Skills and Timeline components are NOT exported from the barrel to enable code splitting via lazy loading in `App.tsx`.

TypeScript baseUrl is set to `src`, enabling path-based imports:
- Relative imports: `hooks/useTheme`, `content/skills`, `types`, etc.
- Alias imports: `@/components` for the components directory (configured in tsconfig.json and vite.config.ts)

### Timeline Component (Metro Map Style)

The timeline (`src/components/Timeline/TimelineMetro.tsx`) is a central feature with these characteristics:

- **Metro map visual**: Central vertical gradient thread with alternating cards
- **Date pills**: Display year-only format (e.g., "2021–2022" or "2023–Present") to prevent wrapping on mobile
- **Active detection**: Uses `useTimelineObserver` hook with IntersectionObserver
- **KPI extraction**: Automatic parsing of metrics from achievements via `src/utils/kpiExtractor.ts`
- **Responsive**: Single-column layout optimized for readability; central thread hidden on mobile (<640px)
- **Accessibility**: Semantic HTML with radiogroup/radio ARIA patterns, keyboard navigation, and reduced motion support

Full date information appears in card headers. See `src/components/Timeline/README.md` for details.

### Skills Component

Skills (`src/components/Skills/SkillsMatrix.tsx`) displays categorized skills with:

- Five categories: Languages & Runtimes, Frameworks & Libraries, AI/ML & Tooling, Infra & DevOps, Design & UX
- Three proficiency tiers: Expert, Proficient, Familiar (legacy: Advanced → Proficient, Intermediate → Familiar)
- Schema defined in `src/types` with fields: `name`, `category`, `tier`, optional `evidence`, and `experienceIds` to link to relevant timeline entries
- Interactive 'pill cloud' design with tooltips showing proficiency details
- **Bidirectional linking**: Skills link to timeline entries via `experienceIds`, and timeline entries link to skills via `skillIds` (defined in Experience type)

### Command Menu

The command menu (`src/components/CommandMenu/CommandMenu.tsx`) is a quick navigation palette:

- Triggered by Cmd/Ctrl+K or the FloatingCommandButton
- Uses `cmdk` library and `focus-trap-react`
- State managed by `useCommandMenu` hook
- Provides navigation shortcuts and social links

### Custom Hooks

Key hooks in `src/hooks/`:

- `useTheme` - Dark/light mode management with localStorage persistence; applies theme to `<html>` via `data-theme` attribute (`aurora-light` or `aurora-dark`)
- `useCommandMenu` - Command menu open/close state
- `useTimelineObserver` - IntersectionObserver for timeline active state detection
- `useReducedMotion` - Respects user's motion preferences via `prefers-reduced-motion` media query
- `useViewTransitions` - View Transitions API support (when available)

### Content Management

Content is stored in `src/content/`:

- `experience.ts` - Timeline/work experience data
- `skills.ts` - Skills matrix data
- `user.ts` - Personal/contact information

These files export typed data consumed by components.

## Code Style & Conventions

### TypeScript

- Strict mode enabled (`strict: true`)
- Avoid `any`; prefer `unknown` for truly unknown types
- Add explicit types when inference is unclear
- No top-level await or CommonJS `require()`

### React Patterns

- Functional components with hooks
- Prefer explicit prop destructuring with default values
- Use early returns for empty states or edge cases
- Wrap error-prone sections in `<ErrorBoundary>` (from react-error-boundary)
- Use `React.memo`, `useCallback`, `useMemo` judiciously for performance

### Styling

- Tailwind-first approach using design tokens
- 2-space indentation (enforced by `.editorconfig`)
- Honor `.prettierrc` formatting rules
- Responsive design is mobile-first

### Accessibility

- Semantic HTML elements (`article`, `nav`, `section`, etc.)
- ARIA labels and roles where appropriate
- Keyboard navigation support (Tab, Enter, Space)
- Focus indicators with 4.5:1 contrast ratio
- Respect `prefers-reduced-motion`
- Tap targets ≥44px

## Git & CI Workflow

### Branching Strategy

- Trunk-based development; never commit directly to `main`
- Create feature branches: `feat/feature-name`, `fix/bug-name`, `ui/component-name`, `perf/optimization-name`
- Open PRs into `main`; enable Auto-merge (Squash only)
- Branches auto-delete after merge
- Use conventional commits (feat, fix, chore, docs)

### CI Pipeline

CI runs on all PRs and checks:

1. Lockfile guard (ensures no `package-lock.json`)
2. Yarn install
3. Format check (`yarn format:check`)
4. Lint (`yarn lint`)
5. Type-check (`yarn tsc --noEmit`)
6. Build (`yarn build`)
7. Minimal E2E smoke test (curl-based validation of meta tags)
8. Uploads `dist/` artifact for preview

**Required check**: "CI / quality-gates (pull_request)" - do not rename the job name `quality-gates` in `.github/workflows/ci.yml`

Unit tests (`yarn test`) run locally only, not in CI for performance reasons.

### Deployment

Deployment is manual via GitHub Actions workflow "Deploy (GitHub Pages)" or `yarn deploy` (if configured). Do not auto-deploy unless explicitly requested.

**Vite base path**: Currently set to `'/'` for custom domain. Only change if deploying to GitHub project pages (`https://<user>.github.io/<repo>/`), which requires `base: '/<repo>/'`.

## Testing Strategy

This project maintains minimal, fast tests focused on critical functionality:

- CSS design tokens validation
- Component rendering smoke tests (if added)

Do not introduce slow or heavy E2E test suites. Keep tests deterministic and quick.

## Performance Considerations

- **Build tooling**: Vite with SWC plugin (`@vitejs/plugin-react-swc`) for fast compilation
- **Font loading**: Optimized with `@fontsource` packages (Geist Sans, Geist Mono, Instrument Serif) for self-hosted fonts
- **Code splitting**: Skills and Timeline components lazy-loaded in `App.tsx` (not in barrel export)
- **Animations**: Framer Motion with `prefers-reduced-motion` support via `useReducedMotion` hook
- **Viewport optimization**: IntersectionObserver for timeline active state detection (no scroll listeners)
- **Background**: GrainGradient shader from `@paper-design/shaders-react` with CSS fallback for no-JS scenarios

## Security

- Never commit `.env*` files
- Use `process.env` for environment variables
- CodeQL scanning enabled; do not disable

## Additional Documentation

- `README.md` - Project overview, setup instructions, scripts
- `AGENTS.md` - Agent/editor guidance, Chrome DevTools MCP setup, environment info
- `.cursorrules` - Project-specific conventions and guardrails
- Component READMEs:
  - `src/components/Timeline/README.md` - Timeline metro map implementation, accessibility, date pill behavior
  - `src/components/Skills/README.md` - Skills schema, categories, tier system
  - `src/components/CommandMenu/README.md` - Command menu shortcuts and actions
  - `src/components/Footer/README.md` - Footer component usage
  - Additional READMEs in `src/hooks/`, `src/styles/`, `src/types/` for architectural details

## AI Agent Tools

This project leverages the Chrome DevTools MCP (Model Context Protocol) to enable AI agents (like Claude Code) to interact with and debug the application through a Chrome browser instance. This allows for advanced testing, UI inspection, and automated workflows.

### Starting the MCP Server

To start the MCP server, run the following command:

```bash
npx chrome-devtools-mcp@latest
```

To use a specific Chrome channel, use the `--channel` flag:

```bash
# Use Chrome Beta
npx chrome-devtools-mcp@latest --channel beta

# Use Chrome Canary
npx chrome-devtools-mcp@latest --channel canary
```

The server runs in the foreground by default. To run it in the background, append `&` to the command.

### Usage for AI Agents

AI agents connect to the MCP server as a client to send commands and receive browser events. This enables capabilities such as:

- Navigating pages
- Interacting with UI elements (clicking, typing, hovering)
- Taking snapshots of the page content
- Emulating network and CPU conditions
- Listing network requests and console messages
- Taking screenshots

This integration allows for a more dynamic and interactive development and testing experience when working with AI-powered coding assistants.

## When Making Changes

1. Read existing patterns in the codebase before suggesting new approaches
2. Propose risky or wide-reaching refactors before executing
3. Ensure CI passes before marking work complete
4. Keep changes small, scoped, and focused
5. Follow existing file structure and naming conventions
6. Prefer the simplest change that maintains stability

## Common Pitfalls to Avoid

- Do not use `npm` or `pnpm`; Yarn v1 only
- Do not commit build outputs (`dist/`, `build/`, `out/`)
- Do not rename CI job names or required checks
- Do not add heavy dependencies without justification
- Do not skip accessibility considerations (ARIA, keyboard nav, focus management)
- Do not ignore responsive design on mobile viewports
- Do not use `any` type in TypeScript
- Do not disable ESLint or Prettier rules without discussion
