# Header Component

This directory contains the `Header` component, its tests, and related files.

## Purpose

The `Header` component is the main hero section of the portfolio. It displays the user's name, bioline, a command prompt-style interface for navigation/actions, and a theme toggle button.

## Usage

```tsx
import { Header } from '@/components/Header'; // Or the correct relative path
import { userData } from '@/data.mock'; // Or your actual data source

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleTheme = () => setDarkMode((p) => !p);
  const toggleCommandMenu = () => {
    /* ... */
  };

  return (
    <Header
      userData={userData}
      toggleCommandMenu={toggleCommandMenu}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
    />
  );
};
```

## Props

- `userData`: `UserData` - An object containing the user's full name and bioline.
- `toggleCommandMenu`: `() => void` - Callback function to open/close the command menu.
- `darkMode`: `boolean` - Current state of dark mode.
- `toggleTheme`: `() => void` - Callback function to toggle the theme.
