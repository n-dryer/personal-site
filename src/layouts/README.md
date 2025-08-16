# Layouts Directory

This directory contains global layout components for the application.

## Purpose

Layout components define the overall structure of the application, such as common headers, footers, sidebars, or main content areas. They help ensure a consistent look and feel across different parts of the site.

## Available Layouts

- `Layout.tsx`: The primary layout component for the application, providing a consistent wrapper for all pages/views. It typically includes the main structural elements and global styling providers.

## Usage

Layouts are typically used at the top level of the application, often wrapping routes or page components.

```tsx
import { Layout } from '@/layouts'; // Or the correct relative path

const App = () => {
  return <Layout>{/* Page content goes here */}</Layout>;
};
```

## Testing

Each layout component should have a corresponding test file (e.g., `Layout.test.tsx`) co-located within this directory. Tests should focus on ensuring its structural integrity, responsiveness, and correct rendering of children, rather than aiming for a strict percentage of line coverage.
