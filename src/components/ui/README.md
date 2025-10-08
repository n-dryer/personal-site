# UI Components

This directory contains reusable UI components that follow the design system's glass styling.

## Glass Styling Pattern

All overlay and card components use a consistent glass styling pattern for optimal integration with the GradientBackground:

```css
bg-resume-card/90 backdrop-blur-xl rounded-2xl border border-resume-card-border ring-1 ring-resume-ring/40
```

### Core Glass Properties

- **Background**: `bg-resume-card/90` - Semi-transparent glass shell
- **Blur**: `backdrop-blur-xl` - Strong blur to separate content from the shader
- **Border**: `border-resume-card-border` - Frosted edge with subtle contrast
- **Ring**: `ring-1 ring-resume-ring/40` - Depth accent that reads in both themes

### Hover States

- **Default hover**: `hover:bg-resume-overlay/40` - Slightly more opaque on hover
- **Enhanced hover**: `hover:shadow-2xl hover:border-resume-accent/40` - For important interactive elements

### Focus States

All interactive elements maintain proper focus indicators:

```css
focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
```

## Component Usage

### Card

Basic card component with glass styling:

```tsx
import { Card } from './components/ui';

<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>;
```

### Badge

Status and category badges:

```tsx
import { Badge } from './components/ui';

<Badge variant="expert">Expert</Badge>
<Badge variant="tech">React</Badge>
```

### DatePill

Date display component:

```tsx
import { DatePill } from './components/ui';

<DatePill date="Jan 2024" isActive={true} />;
```

### RadialIndicator

Progress/percentage indicator:

```tsx
import { RadialIndicator } from './components/ui';

<RadialIndicator value={85} label="Skill Level" />;
```

### ErrorFallback

Error boundary fallback component:

```tsx
import { ErrorFallback } from './components/ui';

<ErrorBoundary fallback={<ErrorFallback message="Something went wrong" />} />;
```

## Accessibility

All components maintain WCAG AA contrast ratios against the application background:

- Text pulls from `--resume-text-*` tokens for consistent contrast
- Interactive elements preserve focus-visible rings tied to `--resume-accent`
- Color variants maintain accessibility standards across light/dark modes

## Responsive Design

Components are designed mobile-first:

- Touch targets meet minimum 44px size
- Glass effects scale appropriately on smaller screens
- Text remains readable at all viewport sizes

## Theme Integration

Components automatically adapt to light/dark themes through CSS custom properties:

- `--resume-card` - Glass surface color
- `--resume-text-primary` / `--resume-text-secondary` - Text hierarchy
- `--resume-accent` / `--resume-accent-light` - Accent + hover states
- `--resume-ring` - Focus and halo color for glass elements
