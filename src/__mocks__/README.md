# Mocks Directory

This directory contains mock data and mock implementations used for testing and development.

## Purpose

Mocking is essential for isolating components and functions during testing, and for providing placeholder data during development when real data sources might not be available or convenient to use.

## Contents

- **`data.mock.ts`**: Provides mock data for various parts of the application, such as user information (`userData`), professional experiences (`experienceData`), and skills (`skillsData`). This data is typed according to the definitions in `src/types/portfolio.ts`.

## Usage

Mock data can be imported into test files or development setups:

```tsx
// In a test file or a development setup
import { userData, experienceData } from '@/__mocks__/data.mock'; // Or the correct relative path

// Example usage in a test:
// render(<MyComponent user={userData} experiences={experienceData} />);
```

## Organization

- Mock files should be clearly named to indicate what they are mocking (e.g., `data.mock.ts`, `api.mock.ts`).
- If mocking specific modules, follow Jest's conventions by placing them in a `__mocks__` directory adjacent to the module being mocked, or globally in `src/__mocks__` for project-wide mocks.
