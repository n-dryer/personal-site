# Hooks Directory

This directory contains custom React hooks used throughout the application.

## Purpose

Custom hooks allow for the extraction and reuse of component logic. They help keep components clean and focused on rendering, while complex stateful logic or side effects are encapsulated within the hooks.

## Available Hooks

- `useCommandMenu.ts`: Manages the state and keyboard shortcuts for the command menu.
- `useIntersectionObserver.ts`: A generic hook for observing element visibility changes.
- `useReducedMotion.ts`: Detects the user's preference for reduced motion to disable or adjust animations accordingly.
- `useTheme.ts`: Manages the application's theme (light/dark mode), including persistence to localStorage and system preference detection.
- `useTimelineObserver.ts`: Specifically manages the active state of timeline cards based on their visibility.
- `useViewTransitions.ts`: Provides a wrapper for the View Transitions API with a graceful fallback for unsupported browsers, enabling smooth UI state changes.

## Usage

Import hooks directly into your components:

```tsx
import { useTheme, useReducedMotion } from '@/hooks'; // Or the correct relative path

const MyComponent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  // ...
};
```

## Testing

Each hook should ideally have a corresponding test file (e.g., `useMyHook.test.ts`) co-located within this directory to ensure its functionality and robustness.
