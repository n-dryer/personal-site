# CommandMenu Component

This directory contains the `CommandMenu` component, its tests, and related files.

## Purpose

The `CommandMenu` component provides a modal dialog that offers users a quick way to navigate the site, access contact information, or download resources. It is typically triggered by a button or a keyboard shortcut (e.g., Cmd+K or Ctrl+K).

## Usage

```tsx
import { CommandMenu } from '@/components/CommandMenu'; // Or the correct relative path

const App = () => {
  const [isCommandMenuOpen, setCommandMenuOpen] = useState(false);
  // ...
  return (
    <>
      {/* ... other components ... */}
      <CommandMenu isOpen={isCommandMenuOpen} setIsOpen={setCommandMenuOpen} />
    </>
  );
};
```

## Props

- `isOpen`: `boolean` - Controls the visibility of the command menu.
- `setIsOpen`: `(open: boolean) => void` - Callback function to update the visibility state of the command menu.
