# ShipLog Component

This directory contains the `ShipLog` component, its tests, and related files.

## Purpose

The `ShipLog` component is intended to display a professional journey or a log of significant events/projects. Currently, it shows a "Coming Soon" message as the interactive timeline feature is under development.

## Usage

```tsx
import { ShipLog } from '@/components/ShipLog'; // Or the correct relative path
import { userData } from '@/data.mock'; // Or your actual data source

<ShipLog userData={userData} />;
```

## Props

- `userData`: `UserData` - An object containing user information. (Currently unused but kept for future compatibility).
