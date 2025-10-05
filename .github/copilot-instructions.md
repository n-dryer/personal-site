# Personal Site - GitHub Copilot Coding Agent Instructions

**ALWAYS follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

Personal portfolio site built with React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. Interactive timeline, skills showcase, command menu (Cmd/Ctrl+K), theme toggle, and glass morphism design.

## Working Effectively

### Bootstrap and Setup

Run these commands in exact order to set up the repository:

```bash
# Verify Node version (must be v20+)
node --version  # Should show v20.x.x

# Install dependencies (takes ~30 seconds)
yarn install --frozen-lockfile

# Verify installation worked
yarn --version  # Should show 1.22.22
```

**CRITICAL**: Always use `yarn` commands - NEVER use `npm`. Project has guards against package-lock.json creation.

### Build and Quality Gates

Run the complete quality pipeline before making changes:

```bash
# Format code (takes ~2 seconds)
yarn format

# Check formatting (takes ~2 seconds)
yarn format:check

# Lint code (takes ~4 seconds)
yarn lint

# Type check (takes ~3 seconds)
yarn tsc --noEmit

# Production build (takes ~4 seconds)
yarn build

# Test command (takes ~1 second, but currently no tests exist)
yarn test  # NOTE: Will exit with code 1 - no test files exist in src/
```

All commands are fast (under 5 seconds). No extended timeouts needed.

### Run Development Environment

```bash
# Start development server
yarn start
# Opens http://localhost:4000 automatically

# In separate terminal, preview production build
yarn build && yarn preview
# Serves dist/ at http://localhost:4000
```

## Manual Validation

Always manually validate changes by running through these scenarios:

### Core Application Testing

After making changes, start the preview server and test:

```bash
yarn build && yarn preview
```

1. **Home Page Load**: Visit http://localhost:4000
   - Page loads with interactive timeline
   - Skills matrix renders with categories
   - Theme toggle works (light/dark mode)
   - Fluid background with grain texture visible

2. **Interactive Features**:
   - Press `Cmd/Ctrl+K` to open command menu
   - Test timeline scrolling and card highlighting
   - Click skills categories to filter
   - Test mobile responsiveness (timeline switches to single column)

3. **Key Endpoints**:
   ```bash
   curl -sSf http://localhost:4000 >/dev/null  # Root responds
   curl -sSf http://localhost:4000/robots.txt  # SEO files
   curl -sSf http://localhost:4000/sitemap.xml
   curl -sSf http://localhost:4000/manifest.json
   ```

### Content and Meta Validation

Check these essential meta tags exist:

```bash
curl -s http://localhost:4000 | grep 'Nathan Dryer'
curl -s http://localhost:4000 | grep 'theme-color'
curl -s http://localhost:4000 | grep 'og:image'
```

## CI Pipeline

CI runs the same quality gates on every push/PR:

- Prettier format check
- ESLint linting
- TypeScript type checking (`yarn tsc --noEmit`)
- Vite production build
- E2E smoke tests (curl-based endpoint validation)
- Uploads `dist/` artifact for preview

**Always run the complete pipeline locally before committing**:

```bash
yarn format:check && yarn lint && yarn tsc --noEmit && yarn build
```

## Key Repository Locations

### Primary Development Areas

```
src/
├── components/           # React UI components
│   ├── Timeline/        # Interactive metro-style timeline
│   ├── Skills/          # Skills matrix with filtering
│   ├── CommandMenu/     # Cmd/Ctrl+K command palette
│   ├── Header/          # Navigation and theme toggle
│   └── ui/              # Reusable UI components
├── content/             # Static data files
│   ├── experience.ts    # Timeline/work history data
│   ├── skills.ts        # Skills and proficiency data
│   └── user.ts          # Personal info and social links
├── hooks/               # Custom React hooks
├── styles/              # Global CSS and design tokens
│   ├── tokens.css       # CSS custom properties
│   └── global.css       # Global styles
└── types/               # TypeScript type definitions
```

### Configuration Files

```
.nvmrc                   # Node v20 requirement
package.json            # Yarn v1, scripts, dependencies
tsconfig.json           # TypeScript config with path aliases
vite.config.ts          # Vite bundler configuration
tailwind.config.js      # Tailwind CSS configuration
eslint.config.js        # ESLint rules and plugins
.prettierrc             # Code formatting rules
```

### Important Documentation

- `README.md` - Project overview and basic setup
- `AGENTS.md` - Detailed agent workflow and conventions
- `src/components/Timeline/README.md` - Timeline component docs
- `src/components/Skills/README.md` - Skills component docs

## Technology Stack Details

**Frontend**: React 19 with TypeScript in strict mode
**Bundling**: Vite with SWC for fast builds  
**Styling**: Tailwind CSS with custom design tokens
**Animations**: Framer Motion with reduced motion support
**Testing**: Vitest + Testing Library (minimal test approach)
**Linting**: ESLint with React, TypeScript, a11y, Tailwind rules
**Formatting**: Prettier with consistent code style

## Common Development Tasks

### Adding New Components

1. Create component directory: `src/components/ComponentName/`
2. Add main file: `ComponentName.tsx`
3. Add barrel export: `index.ts`
4. Add documentation: `README.md`
5. Update `src/components/index.ts` with export

### Updating Content

- **Skills**: Edit `src/content/skills.ts` with new skills/categories
- **Experience**: Edit `src/content/experience.ts` with work history
- **Personal Info**: Edit `src/content/user.ts` with contact details

### Code Quality Checklist

Always run before committing changes:

- [ ] `yarn format:check` passes
- [ ] `yarn lint` passes
- [ ] `yarn tsc --noEmit` passes
- [ ] `yarn build` succeeds
- [ ] Manual testing in `yarn preview`
- [ ] Interactive features still work (timeline, command menu, skills)

## Validation Timing

- **Initial setup**: ~30 seconds (yarn install)
- **Quality gates**: ~10 seconds total (format + lint + typecheck + build)
- **Development server**: Instant startup at localhost:4000
- **Preview build**: ~4 seconds to build + serve

## Troubleshooting

### Common Issues

- **Build fails**: Check TypeScript errors with `yarn tsc --noEmit`
- **Linting errors**: Run `yarn lint:fix` for auto-fixes
- **Format issues**: Run `yarn format` to fix formatting
- **Missing dependencies**: Run `yarn install --frozen-lockfile`
- **Wrong Node version**: Check `.nvmrc` and use Node v20+

### Emergency Reset

```bash
rm -rf node_modules yarn.lock
yarn install --frozen-lockfile
yarn build
```

### Preview CI Artifacts

Download `dist/` artifact from GitHub Actions runs:

```bash
# After downloading and extracting dist/ locally:
npx serve -s dist -l 4000
# Open http://localhost:4000
```

Always reference this file first for build, test, and validation procedures before searching or running other commands.
