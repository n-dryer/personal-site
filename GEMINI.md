## Project Overview

This is a personal portfolio website for Nathan Dryer, built with React, Vite, TypeScript, and Tailwind CSS. The site features an interactive timeline, a skills showcase, a command menu for quick navigation, and a light/dark theme toggle. The project is designed to be responsive, accessible, and performant.

## Building and Running

### Prerequisites

- Node.js (version 20 or higher)
- Yarn (version 1)

### Key Commands

- **Installation:**
  ```bash
  yarn install
  ```

- **Running the development server:**
  ```bash
  yarn start
  ```
  This will start the Vite development server at `http://localhost:4000`.

- **Building for production:**
  ```bash
  yarn build
  ```
  This will create a production-ready build in the `dist/` directory.

- **Previewing the production build:**
  ```bash
  yarn preview
  ```
  This will serve the `dist/` directory at `http://localhost:4000`.

- **Running tests:**
  ```bash
  yarn test
  ```

- **Linting:**
  ```bash
  yarn lint
  ```

- **Type-checking:**
  ```bash
  yarn tsc --noEmit
  ```

- **Formatting:**
  ```bash
  yarn format
  ```

## Development Conventions

- **Package Manager:** This project uses Yarn v1. Do not use `npm` or commit `package-lock.json`.
- **Branching:** The project follows a trunk-based development workflow. Create small, focused pull requests into the `main` branch.
- **Commits:** Use conventional commit messages (e.g., `feat:`, `fix:`, `chore:`, `docs:`).
- **Styling:** Tailwind CSS is used for styling.
- **Code Quality:** The project uses ESLint for linting, Prettier for formatting, and TypeScript for type-checking. Continuous integration (CI) runs these checks on every push and pull request.
