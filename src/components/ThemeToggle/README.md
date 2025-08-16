# ThemeToggle Component

This directory contains the `ThemeToggle` component, its tests, and related files.

## Purpose

The `ThemeToggle` component is a button that allows users to switch between light and dark themes for the application. It displays a sun icon for light mode and a moon icon for dark mode, with smooth animations and respects user's reduced motion preferences.

## Usage

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'; // Or the correct relative path

const MyComponent = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const handleToggleTheme = () => setDarkMode((prev) => !prev);

  return <ThemeToggle darkMode={darkMode} toggleTheme={handleToggleTheme} />;
};
```

## Props

- `darkMode`: `boolean` - Indicates whether dark mode is currently active.
- `toggleTheme`: `() => void` - A callback function that is executed when the button is clicked, responsible for changing the theme state.
