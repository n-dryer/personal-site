# GEMINI.md

## Overview

This guide provides specific instructions for Google Gemini when working on the personal-site repository. For comprehensive agent guidelines, workflows, and project structure, refer to `AGENTS.md`. This document focuses on Gemini-specific patterns, preferences, and optimizations.

## Gemini-Specific Preferences

### Code Generation Style

- **Verbose explanations**: Provide detailed JSDoc comments for complex functions
- **Step-by-step reasoning**: Break down complex changes into clear, logical steps
- **Context awareness**: Reference existing patterns when suggesting similar implementations
- **Safety-first**: Prefer explicit type checking over implicit assumptions

### React Component Patterns

```typescript
// ✅ Gemini preferred: Explicit prop destructuring with defaults
type ComponentProps = {
  data: DataType[];
  onAction?: () => void;
  className?: string;
};

const ComponentName = ({
  data,
  onAction,
  className = ''
}: ComponentProps) => {
  // Explicit early return for empty data
  if (!data.length) {
    return <div className="text-gray-500">No data available</div>;
  }

  // Clear separation of concerns
  const handleAction = useCallback(() => {
    onAction?.();
  }, [onAction]);

  return (
    <div className={`base-styles ${className}`}>
      {data.map((item, index) => (
      {data.map((item) => (
        <div key={item.id}>
          {/* Component content */}
        </div>
      ))}
    </div>
  );
};
```

### Error Handling Preferences

- **Graceful degradation**: Always provide fallback UI states
- **Explicit error boundaries**: Wrap components that might fail
- **User-friendly messages**: Avoid technical error details in UI

### Performance Optimizations

- **React.memo usage**: Apply to components with stable props
- **Callback memoization**: Use useCallback for event handlers passed to children
- **Computation memoization**: Use useMemo for expensive calculations
- **Bundle optimization**: Import only what's needed from libraries

## Referencing AGENTS.md

For the following topics, refer to the main `AGENTS.md` documentation:

- **Project structure and organization**
- **Git workflow and branching strategy**
- **CI/CD pipeline and quality gates**
- **Content schema and data management**
- **Security and privacy guidelines**
- **General coding standards and conventions**

## Gemini-Specific Workflow

### Planning Phase

1. **Analyze existing patterns** in the codebase before suggesting new approaches
2. **Identify reusable components** that can be enhanced rather than replaced
3. **Consider accessibility impact** of all UI changes
4. **Validate against design system** (tokens.css) before implementing custom styles

### Implementation Phase

1. **Start with TypeScript types** - define interfaces before implementation
2. **Build incrementally** - create basic structure, then add features
3. **Test early and often** - verify each step works before proceeding
4. **Document as you go** - add JSDoc comments during development

### Validation Phase

1. **Cross-browser testing considerations** - note potential compatibility issues
2. **Performance impact assessment** - identify any bundle size or runtime concerns
3. **Accessibility verification** - ensure keyboard navigation and screen reader support
4. **Mobile responsiveness check** - verify behavior across viewport sizes

## Gemini Advantage Areas

### Complex Refactoring

- Breaking down large components into smaller, focused pieces
- Identifying and extracting reusable logic into custom hooks
- Modernizing older React patterns to current best practices

### Type Safety Improvements

- Converting any types to proper TypeScript interfaces
- Adding missing error handling and null checks
- Implementing discriminated unions for complex state management

### Performance Analysis

- Identifying unnecessary re-renders and optimization opportunities
- Suggesting code splitting strategies for large components
- Recommending when to use React.lazy vs eager loading

### Documentation Enhancement

- Creating comprehensive JSDoc comments with examples
- Writing clear README files for complex components
- Explaining the reasoning behind architectural decisions

Remember: When in doubt, refer to `AGENTS.md` for the authoritative guidance on project standards and workflows.
