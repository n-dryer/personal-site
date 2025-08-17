# Timeline Component

Displays professional experience in a master-detail timeline.

## Purpose

- **Desktop (`lg` and up):** vertical ARIA tablist on the left and detail panel on the right.
- **Mobile:** single column; tablist sits above the detail panel.
- Supports deep-linking via `#exp={slug}`.

## Data Schema

Consumes `Experience` from `src/types`:

- `title`, `company`, `location`, `date`, `description`, `achievements`, `technologies`, `icon` (unused here).

## Usage

```tsx
import { Timeline } from '@/components';
import { experienceData } from '@/content/experience';

<Timeline experienceData={experienceData} />;
```

## Accessibility

- Implements WAI-ARIA vertical tabs (`role="tablist"`, `tab`, `tabpanel`).
- Keyboard: Arrow Up/Down/Home/End move between tabs; Enter/Space activate.
- Tab and Shift+Tab move focus in and out of the tablist.
- Respects `prefers-reduced-motion` using Tailwind's `motion-reduce` utility.
