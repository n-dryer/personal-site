# FloatingCommandButton Component

This directory contains the `FloatingCommandButton` component, its tests, and related files.

## Purpose

The `FloatingCommandButton` component provides a fixed-position button, typically used to open a command menu or palette, offering users quick access to various actions and navigation options.

## Usage

```tsx
import { FloatingCommandButton } from '@/components/FloatingCommandButton'; // Or the correct relative path

const MyPage = () => {
  const handleToggleMenu = () => {
    /* ... */
  };
  return <FloatingCommandButton toggleCommandMenu={handleToggleMenu} />;
};
```

## Props

- `toggleCommandMenu`: `() => void` - A callback function that is executed when the button is clicked, typically used to open or close a command menu.
