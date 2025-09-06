# UI Components

This directory contains reusable UI components that follow the design system's glass styling.

## Glass Styling Pattern

All overlay and card components use a consistent glass styling pattern for optimal integration with the FluidBackground:

```css
bg-surface/80 backdrop-blur-xl rounded-lg border border-white/10 ring-1 ring-white/5
```

### Core Glass Properties

- **Background**: `bg-surface/80` - Semi-transparent surface (80% opacity)
- **Blur**: `backdrop-blur-xl` - Strong backdrop blur for depth
- **Border**: `border-white/10` - Subtle white border
- **Ring**: `ring-1 ring-white/5` - Enhanced glass effect

### Hover States

- **Default hover**: `hover:bg-surface/90` - Slightly more opaque on hover
- **Enhanced hover**: `hover:shadow-xl hover:border-accent/50` - For important interactive elements

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

- Text uses `--text-primary` for optimal contrast
- Interactive elements have proper focus indicators
- Color variants maintain accessibility standards

## Responsive Design

Components are designed mobile-first:

- Touch targets meet minimum 44px size
- Glass effects scale appropriately on smaller screens
- Text remains readable at all viewport sizes

## Theme Integration

Components automatically adapt to light/dark themes through CSS custom properties:

- `--surface` - Background color
- `--text-primary` - Primary text color
- `--text-secondary` - Secondary text color
- `--accent` - Accent color for highlights</contents>
  </xai:function_call">ـ<xai:function_call name="todo_write">
  <parameter name="merge">true
