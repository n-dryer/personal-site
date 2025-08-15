# Components Directory

This directory contains reusable UI components.

## Structure

Each component resides in its own subdirectory, which typically includes:

- `ComponentName.tsx`: The component source file.
- `ComponentName.test.tsx`: Unit and integration tests for the component.
- `index.ts`: A barrel file re-exporting the component.
- `README.md`: Documentation specific to the component, its props, and usage examples.

This directory utilizes a barrel export (`index.ts`) for convenient imports.

## Component Types

Currently, components are organized directly under this directory. Future organization might involve subdirectories like `common/` (for highly reusable, generic components), `layout/` (for structural components), and `features/` (for feature-specific components) as the application grows and if adherence to the stricter prescribed structure in `CODING_STANDARDS.md` is prioritized.

## Usage

Components can be imported from the main barrel file:

```typescript
import { MyComponent, AnotherComponent } from '@/components';
```

Or import directly from the specific component directory.
