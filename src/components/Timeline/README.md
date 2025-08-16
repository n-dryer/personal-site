# Timeline Component

This directory contains the `Timeline` component, its tests, and related files.

## Purpose

Displays professional experiences with consistent layout, spacing, and accessibility. On small screens, items stack in a single column; on larger screens, they align in a two-column alternating layout with a center rail.

## Data Schema

Uses `Experience` from `src/types`:

- `title`, `company`, `location`, `date`, `achievements`, `technologies`.

## Usage

```tsx
import { Timeline } from '@/components/Timeline';
import { experienceData } from '@/__mocks__/data.mock';

<Timeline experienceData={experienceData} />;
```

## Accessibility

- Expand/collapse buttons have `aria-expanded`, `aria-controls`, and descriptive labels.
- Keyboard support: Enter/Space toggles; Escape collapses; Arrow keys move focus.
