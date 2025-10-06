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

### GradientBackground Component

The animated backdrop now uses the Paper Design `GrainGradient` shader to mirror the Next.js portfolio aesthetic.

1. **Shader gradient**: `@paper-design/shaders-react` renders the animated grain gradient with the comet-inspired palette.
2. **Color overlay**: A Tailwind overlay `bg-resume-overlay` ensures content contrast remains consistent across pages.

#### Integration

The `GradientBackground` component is registered in the global barrel and mounted at the top of the app structure:

```tsx
import { GradientBackground } from './components';

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <div className="absolute inset-0 -z-10 bg-resume-overlay" />
      {/* Page content lives here */}
    </main>
  );
}
```

#### Layering Order

- **GradientBackground**: `-z-10` (animated shader)
- **Overlay**: `-z-10` `bg-resume-overlay` (contrast pass)
- **Main content**: `z-10`
- **Modal/overlays**: `z-50+`

### Palette

The shader keeps a bluish contrast in both modes. Light mode now uses `colorBack` `hsl(212, 78%, 22%)` with color stops `hsl(204, 88%, 52%)`, `hsl(192, 82%, 56%)`, and `hsl(232, 70%, 52%)` so the gradient stands out over the off-white surface. Dark mode retains `colorBack` `hsl(220, 20%, 8%)` with stops `hsl(210, 100%, 45%)`, `hsl(200, 100%, 50%)`, and `hsl(220, 90%, 35%)`. Animation parameters remain `softness 0.85`, `intensity 0.6`, `noise 0`, `shape "corners"`, `speed 1`. The application boots in the dark variant (`data-theme="aurora-dark"`), with the theme toggle exposing the light palette.

## Glass Components

Glass components provide elegant overlays that stay readable against the shader field. Every glass surface follows the same recipe:

```css
bg-resume-card/90 backdrop-blur-xl rounded-2xl border border-resume-card-border ring-1 ring-resume-ring/40
```

### Core Glass Styles

- **Background**: `bg-resume-card/90` keeps content luminous without losing contrast
- **Blur**: `backdrop-blur-xl` separates foregrounds from the animated gradient
- **Border**: `border-resume-card-border` delivers the frosted edge
- **Ring**: `ring-resume-ring/40` provides a consistent halo/focus treatment

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
<div className="bg-resume-card/95 backdrop-blur-xl border border-resume-card-border ring-1 ring-resume-ring/40 ...">
  {/* Command menu content */}
</div>
```

#### Buttons & Interactive Elements

```tsx
<button className="bg-resume-card/90 backdrop-blur-xl border border-resume-card-border ring-1 ring-resume-ring/40 hover:bg-resume-overlay/40">
  Button Text
</button>
```

### Accessibility & Contrast

All glass components maintain AA contrast ratios against the gradient background:

- **Text colors**: Use `--resume-text-primary` for optimal contrast
- **Interactive states**: Hover states use `bg-resume-overlay/40` for better feedback
- **Focus states**: Maintain `focus-visible:ring-2 focus-visible:ring-resume-accent` for keyboard navigation

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
   - Ensure `--resume-text-primary` maintains 4.5:1+ contrast against new background
   - Verify glass components (`bg-resume-card/90`) remain readable
   - Test focus states with `focus-visible:ring-resume-accent`

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

- **No manual background classes**: Avoid applying static gradients directly to layouts
- **Global background**: `GradientBackground` remains mounted once at the app shell level
- **Z-index management**: Content uses `z-10+`, modals use `z-50+`
- **Performance-first**: Shader runs once per frame and avoids additional CSS animations
- **Progressive enhancement**: Content remains accessible even if WebGL is unavailable

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

## Gradient Background

The gradient background is a core visual element for the portfolio, providing a dynamic shader-driven field inspired by the Next.js glassmorphism demo. It layers the animated grain gradient with a translucent overlay to keep copy readable.

### Key Features

- **Shader-based animation:** `GrainGradient` handles motion and noise in WebGL for smooth performance.
- **Accessible contrast:** The overlay layer maintains contrast regardless of page content.
- **Graceful fallback:** If WebGL fails, the canvas quietly renders the static base color specified by `colorBack`.

For implementation details, refer to [`GradientBackground.tsx`](../src/components/GradientBackground.tsx).
