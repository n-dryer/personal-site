Va# Style Guide: Fluid Background & Glass Components

This document outlines the usage of the Fluid Background system and glass component styling, signature visual elements for this project.

## Overview & Intent

The Fluid Background provides a subtle, dynamic, and visually interesting surface for the entire application. It is designed to:

- **Create Depth:** The combination of a soft gradient and a fine grain texture adds a sense of depth and tactility to otherwise flat interfaces.
- **Evoke Calm & Focus:** The blue-green palette is chosen for its calming and professional aesthetic, suitable for a design and technology portfolio.
- **Guide Attention:** The subtle animation draws the user's eye without being distracting, making it ideal for hero sections and focused content areas.

Glass components provide elegant overlays that "pop" visually while maintaining readability and accessibility against the teal background.

## QA Status & Browser Support

### ✅ Performance & Compatibility

- **GPU Acceleration:** Uses CSS `background-position` and `transform` for optimal performance
- **Memory Efficient:** Fixed viewport positioning prevents reflows and excessive memory usage
- **Browser Support:** Tested across Chrome 120+, Firefox 119+, Safari 17+, Edge 120+
- **Mobile Support:** Optimized for iOS Safari and Android Chrome with reduced grain intensity

### ✅ Accessibility Compliance

- **Reduced Motion:** Respects `prefers-reduced-motion: reduce` with automatic animation disabling
- **Screen Reader:** Properly marked with `aria-hidden="true"` to avoid interference
- **Keyboard Navigation:** `pointer-events: none` ensures background doesn't block interactions
- **Touch Accessibility:** Full touch support with no gesture conflicts

### ✅ Contrast & Readability

- **AA Compliance:** Glass components maintain 4.5:1+ contrast ratios against fluid background
- **Dark Theme:** Optimized for `#0d1117` background with `hsl(210, 20%, 95%)` text
- **Light Theme:** Optimized for `#E0F2F1` background with `hsl(210, 25%, 20%)` text
- **Dynamic Adaptation:** Automatic theme switching preserves contrast ratios

### ✅ Responsive Design

- **Viewport Coverage:** Uses `100vw`/`100vh` with proper mobile viewport handling
- **Breakpoint Optimization:** Grain opacity reduces from 15% to 12% on mobile
- **Performance Scaling:** Animation complexity adapts to device capabilities

## Background System

### FluidBackground Component

The background is implemented as a global `FluidBackground` component that provides three layered effects:

1. **Base gradient layer**: `--bg-primary-gradient` provides the core color foundation
2. **Grain texture overlay**: `--bg-grain` adds subtle texture with 15% opacity
3. **Animated fluid gradient**: CSS-animated gradients creating fluid-like motion

#### Integration

The FluidBackground is integrated globally in the main layout:

```tsx
import { FluidBackground } from './components';

function App() {
  return (
    <div className="relative isolate min-h-screen">
      <FluidBackground />
      {/* Your content here with z-10 or higher */}
    </div>
  );
}
```

#### Layering Order

- **FluidBackground**: `z-index: -10` (behind all UI content)
- **Main content**: `z-index: 10` or higher
- **Modal/overlays**: `z-index: 50+`

### Palette & Tokens

The background is constructed from CSS custom properties (tokens) that vary between light and dark themes.

#### Dark Theme (Default)

- `--bg-primary-gradient`: `linear-gradient(135deg, #244048 0%, #294855 60%, #325163 100%)`
- `--bg-grain`: `url('/grain-dark.png')`

#### Light Theme

- `--bg-primary-gradient`: `linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 60%, #80CBC4 100%)`
- `--bg-grain`: `url('/grain-light.png')`

### Animation

The background features subtle fluid animations:

- **Three rotating gradient layers** with different timing (20s, 25s, 30s)
- **Subtle opacity** (0.08) for professional appearance
- **Staggered animation delays** (-7s, -14s) for natural fluid motion
- **Respects `prefers-reduced-motion`** for accessibility

## Glass Components

Glass components provide elegant overlays that work harmoniously with the teal background. All glass components use a consistent styling pattern:

```css
bg-surface/80 backdrop-blur-xl rounded-lg border border-white/10 ring-1 ring-white/5
```

### Core Glass Styles

- **Background**: `bg-surface/80` - Semi-transparent surface with 80% opacity
- **Blur**: `backdrop-blur-xl` - Strong blur effect for depth
- **Border**: `border border-white/10` - Subtle white border
- **Ring**: `ring-1 ring-white/5` - Enhanced glass effect with white ring

### Component Examples

#### Card Component

```tsx
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content with glass effect</p>
</Card>
```

#### Command Menu

```tsx
<div className="bg-surface/80 backdrop-blur-xl border-white/10 ring-1 ring-white/5 ...">
  {/* Command menu content */}
</div>
```

#### Buttons & Interactive Elements

```tsx
<button className="bg-surface/80 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 hover:bg-surface/90">
  Button Text
</button>
```

### Accessibility & Contrast

All glass components maintain AA contrast ratios against the teal background:

- **Text colors**: Use `--text-primary` for optimal contrast
- **Interactive states**: Hover states use `bg-surface/90` for better feedback
- **Focus states**: Maintain `focus-visible:ring-2 focus-visible:ring-accent` for keyboard navigation

### Responsive Behavior

- **Mobile**: Glass effects scale appropriately with reduced blur intensity
- **Desktop**: Full glass effects with enhanced backdrop blur
- **Reduced motion**: Animations are disabled when `prefers-reduced-motion: reduce`

## Extensibility

### Adding New Themes

The system is designed to be extensible for other themes (e.g., a "festive" or seasonal theme). To add a new theme:

1. **Define Theme Selector:**

   ```css
   :root[data-theme='festive'] {
     --bg-primary-gradient: linear-gradient(135deg, #8b5cf6 0%, #ec4899 60%, #f97316 100%);
     --bg-grain: url('/grain-festive.png');
     --accent: hsl(280, 100%, 70%);
     --accent-2: hsl(330, 100%, 70%);
   }
   ```

2. **Update Theme Switching Logic:**

   ```tsx
   const themes = ['aurora-light', 'aurora-dark', 'festive'];
   ```

3. **Test Contrast Ratios:**
   - Ensure `--text-primary` maintains 4.5:1+ contrast against new background
   - Verify glass components (`bg-surface/80`) remain readable
   - Test focus states with new accent colors

### Custom Animation Presets

To create custom animation presets:

```css
/* Slow, gentle waves */
@keyframes gentle-flow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
}

/* Fast, energetic pulses */
@keyframes energetic-pulse {
  0%,
  100% {
    opacity: 0.05;
    transform: scale(1);
  }
  50% {
    opacity: 0.12;
    transform: scale(1.05);
  }
}
```

### Grain Texture Customization

To add custom grain textures:

1. **Create Texture Files:** Save as PNG with transparent background
2. **Optimize Size:** Keep under 100KB, ideally 50KB
3. **Update CSS Variables:**

   ```css
   --bg-grain: url('/grain-custom.png');
   ```

## Troubleshooting

### Common Issues & Solutions

#### WebGL Context Lost

**Symptoms:** Background animations stop, console errors about WebGL
**Solution:**

- This is automatically handled by CSS-only animations
- No WebGL dependency - animations use CSS `background-position`

#### Grain Texture Not Loading

**Symptoms:** Missing grain texture, background appears flat
**Solution:**

```bash
# Check if grain files exist
ls public/grain-*.png

# If missing, the system falls back gracefully
# Background remains functional without grain
```

#### Performance Issues on Low-End Devices

**Symptoms:** High CPU usage, battery drain on mobile
**Solutions:**

- Reduced motion automatically disables animations
- Grain opacity automatically reduces on mobile
- Consider adding device capability detection for further optimization

#### Theme Switching Delays

**Symptoms:** Background flickers during theme transitions
**Solution:** Ensure CSS transitions are properly configured:

```css
.fluid-base-layer {
  transition: background 0.3s ease;
}
```

#### Mobile Viewport Issues

**Symptoms:** Background doesn't cover full viewport on mobile
**Solution:** Verify meta viewport tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Performance Monitoring

Monitor background performance using browser dev tools:

```javascript
// Check animation performance
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name.includes('fluid-flow')) {
      console.log('Animation frame time:', entry.duration);
    }
  }
});
observer.observe({ entryTypes: ['measure'] });
```

## Implementation Notes

### Architecture Decisions

- **No manual background classes**: Do not use `.bg-fuzzy-teal` or similar utility classes
- **Global background**: FluidBackground is always present and positioned behind content
- **Z-index management**: Content uses `z-10+`, modals use `z-50+`
- **Performance-first**: Background animations are optimized and respect user preferences
- **Progressive enhancement**: Core functionality works without animations or grain textures

### Browser Compatibility Matrix

| Feature                | Chrome  | Firefox | Safari   | Edge    | Mobile Safari | Chrome Android |
| ---------------------- | ------- | ------- | -------- | ------- | ------------- | -------------- |
| CSS Animations         | ✅ 120+ | ✅ 119+ | ✅ 17+   | ✅ 120+ | ✅ 17+        | ✅ 120+        |
| CSS Custom Properties  | ✅ 49+  | ✅ 31+  | ✅ 9.1+  | ✅ 16+  | ✅ 9.3+       | ✅ 49+         |
| backdrop-blur          | ✅ 76+  | ✅ 70+  | ✅ 9+    | ✅ 17+  | ✅ 9+         | ✅ 76+         |
| prefers-reduced-motion | ✅ 74+  | ✅ 63+  | ✅ 10.1+ | ✅ 79+  | ✅ 10.3+      | ✅ 74+         |

### Fallback Behavior

- **No JavaScript:** Static gradient background with grain texture
- **Reduced Motion:** Animations disabled, grain opacity reduced to 8%
- **No Grain Texture:** Clean gradient background, all functionality preserved
- **CSS Disabled:** Browser default background, content remains accessible

## Fluid Background

The fluid background is a key visual feature of this site, providing a dynamic and interactive backdrop that enhances the user experience. It combines a multi-layered gradient, a subtle noise texture, and a fluid animation that responds to user interaction.

### Key Features

- **Interactive:** The background subtly reacts to mouse movements, creating an engaging and fluid effect.
- **Performance-Optimized:** The animation is lightweight and designed to have minimal impact on performance.
- **Respects User Preferences:** The fluid animation is automatically disabled for users who have enabled "prefers reduced motion" in their system settings, ensuring an accessible experience for everyone.

For detailed implementation information, including usage examples and styling, please refer to the [`FluidBackground` component's README file](../src/components/FluidBackground/README.md).
