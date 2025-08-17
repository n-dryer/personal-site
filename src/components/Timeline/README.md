# Timeline Component

This directory contains the `Timeline` component, its tests, and related files.

## Purpose

Displays professional experiences using a responsive master-detail layout. On large screens a vertical tablist on the left controls a detail panel on the right. On small screens the tablist stacks above the panel.

## Data Schema

Uses `Experience` from `src/types` (optional `slug` is generated from start year and company if missing):

- `title`, `company`, `location`, `date`, `achievements`, `technologies`, `slug?`.

## Usage

```tsx
import { Timeline } from '@/components/Timeline';
import { experienceData } from '@/__mocks__/data.mock';

<Timeline experienceData={experienceData} />;
```

## Accessibility

- Left column is an ARIA `tablist` with vertical orientation.
- Arrow Up/Down, Home/End navigate between tabs; selection updates the `tabpanel`.
- Selected tab updates the URL hash (`#exp={slug}`) and dispatches a `CustomEvent('exp-change')`.
