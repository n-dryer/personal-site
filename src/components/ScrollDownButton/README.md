# ScrollDownButton Component

This directory contains the `ScrollDownButton` component, its tests, and related files.

## Purpose

The `ScrollDownButton` component provides a button that initially prompts the user to scroll down to view more content (e.g., the timeline section).
It appears with an animation and then disappears after the first scroll event or when clicked, and remains hidden thereafter.

## Usage

```tsx
import { ScrollDownButton } from '@/components/ScrollDownButton'; // Or the correct relative path

<ScrollDownButton />;
```

## Props

This component does not accept any props. It manages its own visibility based on scroll events and relies on DOM element IDs (e.g., scrolling to `#timeline`) for its primary action.
