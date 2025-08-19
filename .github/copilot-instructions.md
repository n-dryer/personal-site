# GitHub Copilot Custom Instructions

This file provides project-specific guidance for GitHub Copilot to generate code that follows the established patterns, conventions, and constraints of the personal-site repository.

## Project Overview

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion
**Package Manager:** Yarn v1 only (never use npm or pnpm)
**Node Version:** 20+ (see .nvmrc)
**Architecture:** Component-based SPA with content-driven data

## Core Constraints

### Package Management

- **Always use Yarn v1**: `yarn add`, `yarn install`, `yarn remove`
- **Never create package-lock.json**: Only yarn.lock is permitted
- **Guard against npm**: Project has guards to prevent package-lock.json creation

### Development Environment

- **Node 20+**: Required for all development (see package.json engines)
- **ESM only**: Use ES modules, avoid CommonJS `require()`
- **TypeScript strict mode**: No `any` types, prefer `unknown` for unknown data
- **Vite for bundling**: Use Vite-specific features and conventions

## Code Patterns & Conventions

### React Components

```typescript
// ✅ Preferred: Named function component with TypeScript
type ComponentProps = {
  /** JSDoc for props */
  data: DataType[];
  onAction?: () => void;
};

const ComponentName = ({ data, onAction }: ComponentProps) => {
  // Component logic
  return <div>Content</div>;
};

// ✅ Export with React.memo for performance when appropriate
export const Component = React.memo(ComponentName);
```

### TypeScript Patterns

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

### Import/Export Patterns

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

### Directory Structure

```
src/
  components/          # Reusable UI components
    ComponentName/     # Component directory
      index.ts         # Barrel export
      ComponentName.tsx
      ComponentName.test.tsx
      README.md        # Component documentation
  content/            # Static data (skills.ts, experience.ts, user.ts)
  hooks/              # Custom React hooks
  layouts/            # Layout components
  styles/             # Global styles and design tokens
  types/              # TypeScript type definitions
```

## Styling Guidelines

### Tailwind CSS

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

### CSS Custom Properties

- **Use design tokens**: Reference variables from `src/styles/tokens.css`
- **Spacing**: `var(--space-{size})` for consistent spacing
- **Colors**: Use semantic color tokens (e.g., `text-primary`, `surface`, `accent`)

## Animation & Interactions

### Framer Motion

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

## Testing Strategy

### Minimal Testing Approach

- **Unit tests**: Only for critical business logic
- **Component tests**: Focus on behavior, not implementation details
- **Fast execution**: Keep tests under 2 seconds total runtime
- **Vitest**: Use Vitest for test runner, jsdom for DOM environment

```typescript
// ✅ Good: Behavior-focused test
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';

test('renders skills with filtering', () => {
  render(<Skills skillsData={mockSkills} />);
  expect(screen.getByText('Languages & Runtimes')).toBeInTheDocument();
});
```

## Performance Guidelines

### React Optimization

- **React.memo**: Use for components that receive stable props
- **useCallback**: Memoize event handlers passed to child components
- **useMemo**: Memoize expensive computations
- **Lazy loading**: Use React.lazy for code splitting when appropriate

### Bundle Optimization

- **Tree shaking**: Import only what you need from libraries
- **Code splitting**: Split routes and heavy components
- **Asset optimization**: Optimize images and use appropriate formats

## Accessibility Standards

### ARIA & Semantics

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

## Content Management

### Data Structure

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

### Content Schema

- **Skills**: Categorized with proficiency levels (Expert/Proficient/Familiar)
- **Experience**: Timeline entries with achievements and technologies
- **User data**: Personal info and social links

## Development Workflow

### Scripts (use yarn only)

```bash
yarn start          # Development server
yarn build          # Production build
yarn preview        # Preview production build
yarn lint           # ESLint check
yarn lint:fix       # ESLint auto-fix
yarn format         # Prettier formatting
yarn format:check   # Check formatting
yarn test           # Run tests
yarn tsc --noEmit   # TypeScript check
```

### Quality Gates

1. **Format**: Prettier (2 spaces, single quotes, trailing commas)
2. **Lint**: ESLint with React, TypeScript, Tailwind, a11y rules
3. **Type check**: TypeScript strict mode
4. **Build**: Vite production build must succeed
5. **Tests**: All tests must pass (kept minimal and fast)

## Git & Branching

### Branch Naming

- UI features: `ui/feature-name` (e.g., `ui/skills`, `ui/timeline`)
- Performance: `perf/optimization-name`
- Bug fixes: `fix/issue-description`
- Documentation: `docs/update-description`

### Commit Messages

- **Conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`
- **Scope**: Include component/area when relevant
- **Description**: Clear, concise description of change

## Error Handling

### React Error Boundaries

- **Use react-error-boundary**: Wrap components that might throw
- **Graceful degradation**: Provide fallback UI for errors
- **User feedback**: Show meaningful error messages

### TypeScript Error Prevention

- **Strict null checks**: Handle undefined/null explicitly
- **Type guards**: Use type predicates for runtime safety
- **Exhaustive checking**: Use discriminated unions with never type

## Browser Support

### Modern Browsers

- **ES2020+**: Use modern JavaScript features
- **CSS Grid & Flexbox**: Modern layout methods
- **CSS Custom Properties**: For theming and design tokens
- **Intersection Observer**: For scroll-based animations

### Progressive Enhancement

- **Core functionality**: Works without JavaScript
- **Enhanced experience**: Animations and interactions with JS
- **Responsive design**: Mobile-first, accessible on all devices

## Security Considerations

### Content Security

- **No secrets in code**: All environment variables properly handled
- **Static site**: No server-side vulnerabilities
- **Dependency scanning**: Regular updates and security audits

### User Privacy

- **No tracking**: Minimal external dependencies
- **Local storage**: Only for theme preferences
- **Performance**: Optimized loading and rendering

---

When generating code, prioritize:

1. **Type safety** over convenience
2. **Accessibility** over visual appeal
3. **Performance** over feature richness
4. **Maintainability** over cleverness
5. **Consistency** with existing patterns

Always check existing components for patterns before creating new approaches.
