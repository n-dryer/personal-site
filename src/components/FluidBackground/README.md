# `FluidBackground` Component

A full-screen background component that renders a multi-layered, static gradient with a grain texture. It is designed to be used as a base layer for the main application layout.

## Responsibilities

- **Renders a Gradient Layer:** Displays a smooth, static gradient using the `--bg-primary-gradient` CSS variable defined in `src/styles/tokens.css`.
- **Renders a Grain Layer:** Overlays a subtle, repeating grain texture to add depth and a tactile feel to the background.
- **Fixed Positioning:** The component remains fixed in the background, ensuring it does not scroll with the page content.

## Usage

The `FluidBackground` component is intended to be placed at the top level of the main application layout to serve as the background for all other content.

```tsx
// src/layouts/Layout.tsx
import React from 'react';
import { FluidBackground } from '../components/FluidBackground';

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <FluidBackground />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
```

## Props

The `FluidBackground` component does not accept any props.

## Styling

The component's styling is managed by `FluidBackground.css` and `src/styles/tokens.css`. It uses a combination of fixed positioning and z-index layering to create the multi-layered effect.
