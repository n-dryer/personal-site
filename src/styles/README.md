# Styles Directory

This directory contains global stylesheets and design token definitions for the application.

## Purpose

- **`tokens.css`**: Defines all design tokens (colors, fonts, spacing, radii, elevation, motion parameters) as CSS custom properties. This is the single source of truth for the visual design language.
- **`global.css`**: Imports `tokens.css` and applies base Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`). It also includes global element defaults (e.g., for `body`), custom component layers, utility overrides (like scrollbar styling), and responsive/motion preferences.

## Usage

- `tokens.css` is imported by `global.css`.
- `global.css` is imported once at the root of the application (in `src/main.tsx`) to apply global styles and make Tailwind utilities available.
- CSS custom properties defined in `tokens.css` are consumed by Tailwind CSS via `tailwind.config.js`.

## Organization

- Keep token definitions in `tokens.css`.
- Global styles and Tailwind setup in `global.css`.
- Component-specific CSS should use Tailwind utilities when possible. For complex styling needs, consider extending the design tokens or using CSS-in-JS patterns.
