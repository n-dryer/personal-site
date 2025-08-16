# Types Directory

This directory contains all TypeScript type definitions and interfaces used across the application.

## Purpose

Centralizing type definitions helps maintain consistency, improves code readability, and leverages TypeScript's static typing capabilities to catch errors early in the development process.

## Contents

- **`portfolio.ts`**: Defines the core data structures and types specific to the portfolio's content, such as `Experience`, `Skill`, `UserData`, `Project`, and various component prop types.
- **`react-scroll-parallax.d.ts`**: Contains TypeScript definitions for the `react-scroll-parallax` library, ensuring type safety when using this external module.
- **`index.ts`**: Serves as a barrel file, re-exporting all types from this directory for easy importing into other parts of the application.

## Usage

Import types as needed from the main barrel export or directly if preferred:

```tsx
import { UserData, Experience } from '@/types'; // Or the correct relative path

interface MyComponentProps {
  user: UserData;
  experiences: Experience[];
}
```
