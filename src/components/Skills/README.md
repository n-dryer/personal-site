# Skills Component

This directory contains the `Skills` component, its tests, and related files.

## Purpose

The `Skills` component displays a categorized and filterable grid of skills with depth indicators.

## Schema

Skills use `Skill` from `src/types` with the following relevant fields:

- `name: string`
- `category: 'languages_runtimes' | 'frameworks_libraries' | 'ai_ml_tooling' | 'infra_devops' | 'design_ux'`
- `tier: 'Expert' | 'Proficient' | 'Familiar'` (legacy: `Advanced` -> `Proficient`, `Intermediate` -> `Familiar`)
- `evidence?: string`

## Usage

```tsx
import { Skills } from '@/components/Skills';
import { skillsData } from '@/__mocks__/data.mock';

<Skills skillsData={skillsData} />;
```

## Accessibility

- Depth badges include `aria-label`s and are keyboard-focusable.
- Tap targets are at least 44px.
