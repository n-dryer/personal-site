# Footer Component

This directory contains the `Footer` component, its tests, and related files.

## Purpose

The `Footer` component displays copyright information and social media links at the bottom of each page.

## Usage

```tsx
import { Footer } from '@/components/Footer'; // Or the correct relative path
import { useCommandMenu } from '@/hooks';
import { userData } from '@/data.mock'; // Or your actual data source

const FooterExample = () => {
  const { toggleCommandMenu } = useCommandMenu();

  return <Footer userData={userData} toggleCommandMenu={toggleCommandMenu} />;
};
```

## Props

- `userData`: `UserData` - An object containing user information, including `fullName` and `socialLinks`, used to populate the footer content.
- `toggleCommandMenu`: `() => void` _(optional)_ - Handler that toggles the global command menu. When provided, the footer renders a dedicated menu button in the mobile navigation rail so keyboardless users can open the modal.
