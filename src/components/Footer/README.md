# Footer Component

This directory contains the `Footer` component, its tests, and related files.

## Purpose

The `Footer` component displays copyright information and social media links at the bottom of each page.

## Usage

```tsx
import { Footer } from '@/components/Footer'; // Or the correct relative path
import { userData } from '@/data.mock'; // Or your actual data source

<Footer userData={userData} />;
```

## Props

- `userData`: `UserData` - An object containing user information, including `fullName` and `socialLinks`, used to populate the footer content.
