# GitHub Copilot Instructions for Personal Site

**ALWAYS follow these instructions first. Only search for additional context or run exploratory commands if the information here is incomplete or found to be incorrect.**

This repository contains Nathan Dryer's personal portfolio site built with React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion. These instructions provide everything you need to work effectively in the codebase from a fresh clone.

## Quick Start & Validation Workflow

**CRITICAL: Set appropriate timeouts for all commands. NEVER CANCEL builds or long-running commands.**

### 1. Essential Setup Commands

Run these commands in order from repository root:

```bash
# Verify Node.js version (Required: 20+)
node --version  # Must show v20+

# Install dependencies - NEVER CANCEL: Takes ~45 seconds, set 120+ second timeout
yarn install --frozen-lockfile

# Verify package manager guard works
yarn ci:guard:lockfile  # Prevents package-lock.json creation
```

### 2. Quality Gates Validation (Run Before Any Changes)

Run all quality checks to establish baseline:

```bash
# Format check - Takes ~2 seconds
yarn format:check

# Auto-fix formatting if needed
yarn format

# Lint check - Takes ~5 seconds, set 30+ second timeout
yarn lint

# TypeScript type check - Takes ~4 seconds, set 30+ second timeout
yarn tsc --noEmit

# Production build - NEVER CANCEL: Takes ~5 seconds, set 60+ second timeout
yarn build
```

### 3. Development Server Validation

Test that the application runs correctly:

```bash
# Start development server - starts in ~1 second
yarn start  # Runs on http://localhost:4000

# In separate terminal: Test preview server
yarn preview  # Serves built dist/ on http://localhost:4000 or 4001
```

### 4. Manual Validation Scenarios

**ALWAYS test these scenarios after making changes:**

#### Basic Functionality Test

1. Open http://localhost:4000 in browser
2. Verify page loads without console errors
3. Test theme toggle (light/dark mode switch in header)
4. Test command menu (Cmd/Ctrl+K or floating button)
5. Test timeline interaction (clicking timeline items)
6. Test skills filtering (clicking skill categories)
7. Verify responsive design works on mobile viewport

#### Content Validation

1. Navigate through all timeline entries
2. Verify all skill categories display correctly
3. Check that social links in command menu work
4. Confirm meta tags and SEO elements are present

#### Performance Check

1. Run `yarn build` and verify no errors
2. Test `yarn preview` loads quickly
3. Check browser dev tools for console errors
4. Verify animations respect reduced motion preferences

## Build System & Timing Expectations

### Command Timing Reference

Use these timeouts when running commands:

| Command             | Expected Time | Recommended Timeout | Notes                                 |
| ------------------- | ------------- | ------------------- | ------------------------------------- |
| `yarn install`      | ~40 seconds   | 120+ seconds        | NEVER CANCEL - Downloads dependencies |
| `yarn build`        | ~5 seconds    | 60+ seconds         | NEVER CANCEL - Vite production build  |
| `yarn lint`         | ~4 seconds    | 30+ seconds         | ESLint on src/                        |
| `yarn tsc --noEmit` | ~3.5 seconds  | 30+ seconds         | TypeScript type check                 |
| `yarn format`       | ~1.5 seconds  | 15+ seconds         | Prettier write                        |
| `yarn start`        | ~1 second     | 15+ seconds         | Dev server startup                    |
| `yarn preview`      | ~1 second     | 15+ seconds         | Preview server startup                |

### No Unit Tests Required

- The project has NO unit tests (by design for simplicity)
- `yarn test` will show "No test files found" - this is EXPECTED
- Quality gates are: format check, lint, type check, and build success

## Development Workflow

### Required Package Manager

- **ALWAYS use Yarn v1**: `yarn add`, `yarn install`, `yarn remove`
- **NEVER create package-lock.json**: Project has guards to prevent this
- **Node 20+ required**: Check with `node --version`

### Essential Scripts (Yarn only)

```bash
yarn start          # Development server at http://localhost:4000
yarn build          # Production build to dist/
yarn preview        # Preview production build at http://localhost:4000
yarn format         # Auto-fix Prettier formatting
yarn format:check   # Check Prettier formatting
yarn lint           # ESLint check on src/
yarn lint:fix       # ESLint auto-fix
yarn tsc --noEmit   # TypeScript type check only
```

### Before Committing Changes

Run this validation sequence:

```bash
yarn format         # Fix formatting
yarn lint           # Check for lint errors
yarn tsc --noEmit   # Verify TypeScript types
yarn build          # Ensure production build works
# Manual test in browser at http://localhost:4000
```

## Project Structure & Key Files

```
src/
  App.tsx                # Main application component
  main.tsx               # App bootstrap
  components/            # Reusable UI components
    Timeline/            # Interactive timeline (key feature)
    Skills/              # Skills showcase with filtering
    CommandMenu/         # Cmd+K navigation palette
    ThemeToggle/         # Light/dark mode toggle
    ui/                  # Base UI components (Card, Badge, etc.)
  content/               # Static data files
    experience.ts        # Timeline/work history data
    skills.ts            # Skills data with categories
    user.ts              # Personal info and social links
  hooks/                 # Custom React hooks
  layouts/               # Layout components
  styles/                # Global styles and design tokens
    tokens.css           # CSS custom properties for theming
    global.css           # Global styles and Tailwind imports
  types/                 # TypeScript type definitions
```

### Key Configuration Files

- `package.json` - Scripts and dependencies
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript configuration with path aliases
- `tailwind.config.js` - Tailwind CSS configuration with design tokens
- `.github/workflows/ci.yml` - CI pipeline (format, lint, type-check, build, smoke test)

## Troubleshooting

### Common Issues & Solutions

**Package-lock.json created accidentally:**

```bash
rm package-lock.json
yarn install
yarn ci:guard:lockfile  # Verify guard works
```

**Formatting errors:**

```bash
yarn format             # Auto-fix all formatting
yarn format:check       # Verify formatting is correct
```

**TypeScript errors:**

```bash
yarn tsc --noEmit       # Shows detailed type errors
# Fix type errors in src/ files, then re-run
```

**Build failures:**

```bash
yarn lint:fix           # Fix auto-fixable lint errors
yarn tsc --noEmit       # Check for type errors
yarn build              # Try build again
```

**Development server issues:**

```bash
# Kill any existing processes on port 4000
lsof -ti:4000 | xargs kill -9
yarn start              # Restart dev server
```

**Node version issues:**

```bash
node --version          # Must be v20+
# Use nvm or volta to switch to Node 20+
```

## CI Pipeline Validation

The CI pipeline runs these steps (match them locally):

1. `yarn ci:guard:lockfile` - Prevent npm lockfile
2. `yarn install --frozen-lockfile` - Install dependencies
3. `yarn format:check` - Check formatting
4. `yarn lint` - Lint code
5. `yarn tsc --noEmit` - Type check
6. `yarn build` - Production build
7. E2E smoke test - Validate key endpoints and meta tags

Match this workflow locally before committing.

## Repository Standards

### Tech Stack & Constraints

- **React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion**
- **Package Manager**: Yarn v1 only (never npm or pnpm)
- **Node Version**: 20+ (see .nvmrc file)
- **ESM only**: Use ES modules, avoid CommonJS `require()`
- **TypeScript strict mode**: No `any` types, prefer `unknown` for unknown data

### Branch Naming & Git Workflow

- UI features: `ui/feature-name` (e.g., `ui/skills`, `ui/timeline`)
- Performance: `perf/optimization-name`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/update-description`

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

## Code Patterns & Conventions

### React Components (Follow These Patterns)

```typescript
// ✅ Preferred: Named function component with TypeScript
type ComponentProps = {
  /** JSDoc for props */
  data: DataType[];
  onAction?: () => void;
};

const ComponentName = ({ data, onAction }: ComponentProps) => {
  // Component logic here
  return <div>Content</div>;
};

// ✅ Export with React.memo for performance when appropriate
export const Component = React.memo(ComponentName);
```

### Import/Export Patterns (Always Use These)

```typescript
// ✅ Path aliases (configured in tsconfig.json)
import { Component } from '@/components';
import { useTheme } from '@/hooks';
import { userData } from '@/content/user';

// ✅ Named exports (not default exports)
export const MyComponent = () => { ... };

// ✅ Barrel exports in index.ts files
export { Component } from './Component';
export { AnotherComponent } from './AnotherComponent';
```

### TypeScript Patterns (Enforce Strict Typing)

- **Strict typing**: Define explicit types, avoid `any`
- **Props interfaces**: Use type aliases for component props
- **Import types**: Use `import type` for type-only imports
- **Null safety**: Handle undefined/null cases explicitly

```typescript
// ✅ Good
type UserProps = {
  userData: UserData;
  onSelect?: (id: string) => void;
};

// ❌ Avoid
const Component = (props: any) => { ... }
```

## Styling Guidelines

### Tailwind CSS (Required Approach)

- **Utility-first**: Use Tailwind classes, avoid custom CSS unless necessary
- **Design tokens**: Use CSS custom properties from `src/styles/tokens.css`
- **Responsive design**: Mobile-first approach with responsive modifiers
- **Dark mode**: Support via `dark:` classes and design tokens

```typescript
// ✅ Good: Utility classes with design tokens
<div className="bg-surface text-text-primary rounded-lg p-[var(--space-4)]">

// ✅ Good: Responsive and dark mode
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 dark:bg-surface-dark">
```

### CSS Custom Properties (Design Tokens)

- **Use design tokens**: Reference variables from `src/styles/tokens.css`
- **Spacing**: `var(--space-{size})` for consistent spacing
- **Colors**: Use semantic color tokens (e.g., `text-primary`, `surface`, `accent`)

### Framer Motion (Animation Standard)

- **Preference**: Use Framer Motion for animations over CSS transitions
- **Performance**: Use `layout` animations for smooth transitions
- **Accessibility**: Respect `prefers-reduced-motion` via `useReducedMotion` hook

```typescript
// ✅ Good: Framer Motion with accessibility
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Component = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
    >
      Content
    </motion.div>
  );
};
```

## Content Management

### Data Structure (Strongly Typed)

- **Type safety**: All content data is strongly typed
- **Static imports**: Content loaded as ES modules, not JSON
- **Validation**: TypeScript ensures content matches expected schema

```typescript
// ✅ Content files follow strict typing
export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    tier: 'Expert',
    category: 'frameworks_libraries',
    evidence: 'Led 5+ production apps',
  },
];
```

### Content Schema (Update These Files)

- **Skills** (`src/content/skills.ts`): Categorized with proficiency levels (Expert/Proficient/Familiar)
- **Experience** (`src/content/experience.ts`): Timeline entries with achievements and technologies
- **User data** (`src/content/user.ts`): Personal info and social links

When updating content:

1. Edit the appropriate file in `src/content/`
2. Follow existing TypeScript types
3. Run `yarn tsc --noEmit` to verify types
4. Test in browser to verify display

## Component-Specific Guidelines

### Timeline Component (`src/components/Timeline/`)

- Desktop: Vertical tablist with detail panel
- Mobile: Single-column fallback
- Data source: `src/content/experience.ts`
- Key files: `TimelineMetro.tsx`, `TimelineCard.tsx`

### Skills Component (`src/components/Skills/`)

- Categorized skills with proficiency badges
- Data source: `src/content/skills.ts`
- Filtering by category
- Key file: `SkillsMatrix.tsx`

### Command Menu (`src/components/CommandMenu/`)

- Cmd/Ctrl+K navigation palette
- Quick access to sections and social links
- Uses `cmdk` library
- Key file: `CommandMenu.tsx`

### Theme System (`src/components/ThemeToggle/`)

- Light/dark mode toggle
- Uses CSS custom properties from `src/styles/tokens.css`
- Persists preference in localStorage

## Performance & Accessibility

### React Optimization

- **React.memo**: Use for components that receive stable props
- **useCallback**: Memoize event handlers passed to child components
- **useMemo**: Memoize expensive computations
- **Lazy loading**: Use React.lazy for code splitting when appropriate

### Accessibility Standards

- **Semantic HTML**: Use proper HTML elements (nav, main, section, article)
- **ARIA labels**: Provide descriptive labels for interactive elements
- **Focus management**: Ensure keyboard navigation works correctly
- **Screen readers**: Test with screen reader announcements

```typescript
// ✅ Good: Accessible component
<button
  onClick={handleClick}
  aria-label={`Toggle ${category} filter`}
  aria-pressed={isActive}
  className="focus-visible:outline focus-visible:outline-2"
>
  {category}
</button>
```

## Error Handling

### React Error Boundaries

- **Use react-error-boundary**: Wrap components that might throw
- **Graceful degradation**: Provide fallback UI for errors
- **User feedback**: Show meaningful error messages

### TypeScript Error Prevention

- **Strict null checks**: Handle undefined/null explicitly
- **Type guards**: Use type predicates for runtime safety
- **Exhaustive checking**: Use discriminated unions with never type

## Security & Privacy Standards

- **No secrets in code**: All environment variables properly handled
- **Static site**: No server-side vulnerabilities
- **Dependency scanning**: Regular updates and security audits
- **No tracking**: Minimal external dependencies
- **Local storage**: Only for theme preferences

## Code Quality Priorities

When generating code, prioritize:

1. **Type safety** over convenience
2. **Accessibility** over visual appeal
3. **Performance** over feature richness
4. **Maintainability** over cleverness
5. **Consistency** with existing patterns

Always check existing components for patterns before creating new approaches.
