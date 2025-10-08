# Performance & Accessibility Audit Recommendations

**Audit Date**: October 7, 2025
**Environment**: Development server (localhost:4001)
**Tool**: Chrome DevTools Lighthouse

---

## Executive Summary

The site demonstrates excellent practices in SEO and best practices (both 100/100), with strong accessibility (96/100). However, performance on the dev server scored 53/100, primarily due to unoptimized assets and large bundle sizes. Many of these issues are dev-specific and will be resolved in production, but there are actionable optimizations to improve load times.

### Lighthouse Scores

- **Performance**: 53/100 ⚠️
- **Accessibility**: 96/100 ✓
- **Best Practices**: 100/100 ✓
- **SEO**: 100/100 ✓

### Core Web Vitals

- **FCP**: 14.6s (target: <1.8s) ⚠️
- **LCP**: 26.7s (target: <2.5s) ⚠️
- **TBT**: 160ms (target: <200ms) ⚠️
- **CLS**: 0.047 (target: <0.1) ✓
- **Speed Index**: 14.6s ⚠️

### Bundle Size

- **Total**: 1.9MB
- **JS**: 574KB (194KB gzipped)
- **CSS**: 39KB (8KB gzipped)
- **Fonts**: ~1.2MB

---

## High Priority Recommendations

### 1. Optimize Font Loading (Est. savings: 800KB+)

**Issue**: Currently loading 9 font weights (100-900) for both Geist Sans and Geist Mono, totaling ~1.2MB.

**Solution**:

```typescript
// In your font imports, limit to essential weights
// Current: 100, 200, 300, 400, 500, 600, 700, 800, 900
// Recommended: 400 (regular), 500 (medium), 700 (bold)

// Update font imports to:
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-mono/400.css';
import '@fontsource/instrument-serif/400.css';
```

**Files to modify**:

- `src/main.tsx` or wherever fonts are imported

**Impact**: Reduce font payload from 1.2MB to ~300KB

---

### 2. Implement Code Splitting (Est. savings: 890KB unused JS)

**Issue**: Single 574KB JS bundle with significant unused code.

**Solution A - Route-based splitting** (if using React Router):

```typescript
// Lazy load major sections
import { lazy, Suspense } from 'react';

const Timeline = lazy(() => import('./components/Timeline'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));

// Wrap in Suspense with fallback
<Suspense fallback={<LoadingSpinner />}>
  <Timeline />
</Suspense>
```

**Solution B - Component-based splitting**:

```typescript
// For heavy components like Framer Motion animations
const AnimatedBackground = lazy(() => import('./components/GradientBackground'));

// For command menu (only loads when opened)
const CommandMenu = lazy(() => import('./components/CommandMenu'));
```

**Files to modify**:

- `src/App.tsx` - Main component imports
- `src/components/index.ts` - Consider splitting barrel exports

**Impact**: Initial bundle reduction of 40-60%, faster FCP/LCP

---

### 3. Optimize Framer Motion Usage

**Issue**: Framer Motion is heavy (~60KB) and used extensively.

**Solution A - Lazy load animations**:

```typescript
// Only import when motion is not reduced
import { useReducedMotion } from './hooks/useReducedMotion';
import { lazy, Suspense } from 'react';

const AnimatedComponent = lazy(() =>
  import('./components/AnimatedComponent')
);

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <StaticComponent />;
  }

  return (
    <Suspense fallback={<StaticComponent />}>
      <AnimatedComponent />
    </Suspense>
  );
}
```

**Solution B - Use lighter alternatives**:

```typescript
// For simple fades/slides, use CSS transitions instead
// Replace Framer Motion's motion.div with CSS-based animations

// Before:
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// After:
<div className="animate-fade-in">
```

**Files to modify**:

- `src/components/Timeline/TimelineMetro.tsx`
- `src/components/Skills/SkillsMatrix.tsx`
- Any component using `motion` primitives

**Impact**: 50-100KB bundle reduction, faster initial load

---

### 4. Optimize Image Assets

**Issue**: Images not optimized or served in modern formats.

**Solution**:

```bash
# Convert images to WebP/AVIF
# Install sharp for image optimization
yarn add -D vite-plugin-image-optimizer

# Add to vite.config.ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
});
```

**Manual optimization**:

```bash
# For profile.jpg and other images
# Use tools like ImageOptim, Squoosh, or:
npx @squoosh/cli --webp auto public/profile.jpg
```

**Files to review**:

- `public/profile.jpg`
- `public/og-card.jpg`
- Any other image assets

**Impact**: 14KB+ savings, faster LCP

---

### 5. Remove Unused Dependencies

**Issue**: Bundle likely contains unused code from dependencies.

**Solution**:

```bash
# Analyze bundle composition
npx vite-bundle-visualizer

# Or use rollup-plugin-visualizer
yarn add -D rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({ open: true, gzipSize: true }),
  ],
});
```

**Common culprits to audit**:

- Lodash (use lodash-es or tree-shakeable imports)
- Moment.js (replace with date-fns or native Intl)
- Large UI libraries (ensure tree-shaking works)

**Files to modify**:

- `package.json` - Review dependencies
- Import statements - Use named imports for tree-shaking

**Impact**: Variable, potentially 100-200KB

---

## Medium Priority Recommendations

### 6. Fix Color Contrast Issues

**Issue**: Some text elements don't meet WCAG AA 4.5:1 contrast ratio.

**Solution**:

```css
/* Review and adjust colors in src/styles/tokens.css */
/* Use contrast checker: https://webaim.org/resources/contrastchecker/ */

/* Example fixes: */
:root[data-theme='aurora-light'] {
  /* If text is too light on backgrounds, darken: */
  --resume-text-secondary: hsl(var(--cosmic-purple-700)); /* Instead of 600 */

  /* Or increase background lightness */
  --resume-bg-card: hsl(var(--cosmic-purple-50) / 0.95);
}

:root[data-theme='aurora-dark'] {
  /* Ensure sufficient contrast in dark mode */
  --resume-text-secondary: hsl(var(--cosmic-purple-200)); /* Instead of 300 */
}
```

**Action items**:

1. Audit all text colors against their backgrounds
2. Use browser DevTools Contrast Ratio tool
3. Test with `body` text, links, and secondary text

**Files to modify**:

- `src/styles/tokens.css`

**Impact**: Improve accessibility score to 100/100

---

### 7. Fix Accessible Name Mismatches

**Issue**: Visible text labels don't match accessible names.

**Solution**:

```typescript
// Ensure aria-label matches visible text, or remove aria-label
// if visible text is sufficient

// Bad:
<button aria-label="Navigate">
  Go to Section
</button>

// Good:
<button aria-label="Go to Section">
  Go to Section
</button>

// Or just:
<button>
  Go to Section
</button>
```

**Files to audit**:

- `src/components/CommandMenu/CommandMenu.tsx`
- `src/components/FloatingCommandButton/FloatingCommandButton.tsx`
- `src/components/Timeline/TimelineMetro.tsx`

**Impact**: Improve screen reader experience

---

### 8. Defer Non-Critical CSS

**Issue**: Large CSS bundle blocks rendering.

**Solution**:

```typescript
// Split critical CSS from non-critical
// Inline critical above-the-fold styles

// In index.html, add critical CSS inline:
<style>
  /* Critical styles for header, hero, skeleton */
  body { margin: 0; font-family: system-ui; }
  .header { /* inline styles */ }
</style>

// Load full CSS asynchronously:
<link rel="preload" href="/assets/index.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
```

**Alternative - CSS code splitting**:

```typescript
// Use CSS modules or separate imports per component
// Vite will automatically split CSS by dynamic imports
const Timeline = lazy(() => import('./Timeline'));
```

**Files to modify**:

- `index.html`
- Component CSS organization

**Impact**: Faster FCP, better perceived performance

---

### 9. Optimize Third-Party Scripts

**Issue**: External font loading from Google Fonts in index.html.

**Current**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?..." />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?..."
  media="print"
  onload="this.media='all'"
/>
```

**Recommendation**:
Since you're already using `@fontsource` packages, remove Google Fonts CDN entirely and rely on self-hosted fonts:

```html
<!-- Remove these lines from index.html -->
```

**Files to modify**:

- `index.html` - Remove Google Fonts links
- Ensure `@fontsource` imports cover all needed fonts

**Impact**: Remove external dependency, faster DNS/connection time

---

### 10. Implement Resource Hints

**Issue**: Missing preload hints for critical resources.

**Solution**:

```html
<!-- Add to index.html <head> -->
<!-- Preload critical JS/CSS -->
<link rel="modulepreload" href="/src/main.tsx" />

<!-- Preload fonts (if kept) -->
<link
  rel="preload"
  href="/assets/geist-sans-latin-400-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>

<!-- Preconnect to external domains (if any) -->
<link rel="dns-prefetch" href="https://api.example.com" />
```

**Files to modify**:

- `index.html`

**Impact**: Faster resource discovery, improved FCP

---

## Low Priority Recommendations

### 11. Add Service Worker for Caching

**Issue**: No offline support or caching strategy.

**Solution**:

```bash
# Add Vite PWA plugin
yarn add -D vite-plugin-pwa

# Configure in vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ],
});
```

**Impact**: Repeat visit performance, offline support

---

### 12. Monitor Performance in Production

**Action items**:

1. Set up Real User Monitoring (RUM) with Web Vitals
2. Add performance budgets to CI/CD
3. Regular Lighthouse CI checks

**Implementation**:

```typescript
// Add to src/main.tsx
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

---

## Production Deployment Checklist

The following are **already handled** by your build process (verified):

- ✓ JS/CSS minification
- ✓ Gzip compression via vite-plugin-compression
- ✓ Tree shaking
- ✓ Asset hashing for cache busting

**Server configuration needed**:

```nginx
# Example Nginx config for GitHub Pages or CDN
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# Enable Brotli if available (better than gzip)
brotli on;
brotli_types text/css application/javascript image/svg+xml;
```

---

## Implementation Priority

### Phase 1 - Quick Wins (1-2 hours)

1. Reduce font weights (#1)
2. Remove Google Fonts CDN (#9)
3. Fix color contrast (#6)
4. Fix accessible names (#7)

**Expected impact**: Performance +10-15 points, Accessibility 100/100

### Phase 2 - Code Optimization (3-4 hours)

1. Implement code splitting (#2)
2. Lazy load Framer Motion (#3)
3. Optimize images (#4)

**Expected impact**: Performance +15-20 points, FCP/LCP improvement

### Phase 3 - Advanced (4-6 hours)

1. Bundle analysis and tree shaking (#5)
2. Critical CSS extraction (#8)
3. Service worker implementation (#11)

**Expected impact**: Performance 85-95/100, production-ready

---

## Testing & Validation

After each optimization:

```bash
# 1. Build production bundle
yarn build

# 2. Serve locally
yarn preview

# 3. Run Lighthouse audit
npx lighthouse http://localhost:4173 --output=html --view

# 4. Check bundle size
du -sh dist/
ls -lh dist/assets/*.js dist/assets/*.css
```

**Target metrics**:

- Performance: 85-95/100
- FCP: <1.8s
- LCP: <2.5s
- TBT: <200ms
- Bundle size: <400KB (JS + CSS, gzipped)

---

## Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Bundle Size Analysis](https://github.com/btd/rollup-plugin-visualizer)

---

## Notes

- **Dev server performance**: The 53 score is expected for development. Production builds typically score 30-40 points higher due to minification, compression, and optimizations.
- **Font loading**: Consider switching to variable fonts to reduce the number of files while maintaining flexibility.
- **Third-party dependencies**: Regularly audit with `npx depcheck` to identify unused dependencies.
- **Build analysis**: Use `npx vite-bundle-visualizer` after Phase 2 to identify remaining optimization opportunities.
