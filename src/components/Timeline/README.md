# Timeline Metro Map Migration Guide

## Overview

This document outlines the metro map style timeline, which features a central vertical thread and experience cards with year-only date pills.

**Design Philosophy**: Date pills display only years (e.g., "2021–2022" or "2023–Present") to optimize for mobile viewports where full date ranges ("Jan 2021 - Oct 2022") would wrap and create tall, difficult-to-scan pills. Full date information remains visible in the expanded card headers.

## ✅ Implementation Status

The metro timeline is the primary implementation for displaying professional experience.

## 🚀 Quick Start

The timeline is composed of the following key files:

```text
src/
├── utils/
│   └── kpiExtractor.ts              # Extracts KPIs from achievements
├── components/Timeline/
│   ├── TimelineCard.tsx             # Individual timeline card component
│   └── TimelineMetro.tsx            # Metro map timeline implementation
├── hooks/
│   └── useTimelineObserver.ts       # IntersectionObserver for active detection
```

## 🎨 Design Features

### Metro Map Visual Elements

- **Central Vertical Thread**: A gradient line connecting all experiences
- **Timeline Dots**: Circular icons with company/role icons
- **Alternating Cards**: Left/right positioning for visual balance on larger screens
- **Active Highlighting**: Enhanced styling for the current card in view

### Responsive Behavior

- **Mobile (<640px)**:
  - Date pills wrap horizontally with `flex-wrap` and `gap-2`
  - Pills centered with `justify-center` for balanced layout
  - Central thread hidden to reduce visual clutter
  - Single column card layout
  - Year-only display prevents pill wrapping

- **Tablet/Desktop (≥640px)**:
  - Date pills in vertical column layout
  - Central gradient thread visible
  - Cards maintain single column (optimized for readability)
  - Larger pill sizing (md) for better touch targets
  - Thread positioned with left/right alignment

### Accessibility Features

- **Semantic HTML**:
  - Timeline cards wrapped in `<ol role="list">` with `<li>` elements
  - Each card contains `<article>` element
  - Date pills grouped in `<div role="radiogroup" aria-label="Experience periods">`
  - Each pill has `role="radio"` and `aria-checked` state
  - Year ranges wrapped in `<time>` elements

- **Keyboard Navigation**:
  - Tab-accessible date pills with Enter/Space activation
  - Chronological focus order (oldest to newest)
  - Visible focus rings with 4.5:1 contrast ratio
  - Card interactions keyboard accessible

- **Screen Reader Support**:
  - ARIA labels provide context for all interactive elements
  - Time elements with human-readable labels (e.g., "2021 to 2022")
  - Article landmarks for each experience
  - Radiogroup semantics for pill selection state

- **Motion & Contrast**:
  - Respects `prefers-reduced-motion` for animations
  - Active state uses color + border (no layout shift)
  - All text meets WCAG AA contrast requirements

## 🔧 Technical Architecture

### Component Hierarchy

```text
TimelineMetro
│   ├── TimelineYearRail (Semantic date pill container)
│   │   └── DatePill (Year-only display)
│   ├── TimelineCard (Individual Cards)
│   └── useTimelineObserver (Active Detection)
```

### DatePill Component API

**Props:**

```typescript
type DatePillProps = {
  /** Full date string (e.g., "Jan 2021 - Oct 2022" or "Jan 2021 - Present") */
  date: string;
  /** Whether this date pill represents the currently active timeline item */
  isActive?: boolean;
  /** Accessible label for the button */
  'aria-label'?: string;
  /** Click handler for date pill interaction */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
```

**Date Parsing Logic:**

- Extracts first and last 4-digit year from date string
- Handles "Present" case-insensitively (e.g., "2023–Present")
- Collapses to single year if start === end (e.g., "2021")
- Uses en dash (–) not hyphen (-) for ranges
- Falls back to "Unknown" for malformed dates

**Examples:**

| Input | Output |
|-------|--------|
| `"Jan 2021 - Oct 2022"` | `"2021–2022"` |
| `"Jan 2021 - Dec 2021"` | `"2021"` |
| `"Jan 2023 - Present"` | `"2023–Present"` |
| `"Invalid"` | `"Unknown"` |

### State Management

- **Active Card**: Managed by IntersectionObserver
- **Animations**: Framer Motion with reduced motion support
- **Responsive**: CSS custom properties with breakpoint overrides

### Data Processing

- **KPI Extraction**: Automatic parsing of metrics from achievements
- **Slug Generation**: Year + company name for unique identifiers
- **Position Assignment**: Alternating left/right for visual flow

## 🧪 Testing

### Manual QA Checklist

#### Desktop Experience

- [ ] Cards alternate left/right correctly
- [ ] Central thread is centered and continuous
- [ ] Active card highlighting works on scroll
- [ ] Timeline dots show correct icons and states
- [ ] KPIs extract and display correctly
- [ ] Technology badges render properly
- [ ] Smooth scrolling on card click

#### Mobile Experience

- [ ] Date pills wrap horizontally below 640px
- [ ] Pills display year-only format (no wrapping)
- [ ] Central thread hidden on mobile
- [ ] Pills centered with balanced spacing
- [ ] Single column card layout
- [ ] Touch interactions work properly
- [ ] No horizontal scroll needed
- [ ] Full dates visible in card headers

#### Accessibility

- [ ] Screen reader announces radiogroup and radio states
- [ ] Keyboard navigation (Tab, Enter, Space) works
- [ ] Focus indicators visible with 4.5:1 contrast
- [ ] ARIA labels describe year ranges clearly
- [ ] Time elements present for all dates
- [ ] Semantic HTML structure valid
- [ ] Reduced motion is respected
- [ ] No layout shift on pill activation

### Automated Testing

```bash
# Run existing tests (should all pass)
yarn test

# Type checking
yarn tsc --noEmit

# Linting
yarn lint

# Build verification
yarn build
```

## 🐛 Troubleshooting

### Common Issues

#### Cards not highlighting correctly

1. Verify IntersectionObserver support in browser
2. Check CSS custom properties support
3. Test with reduced motion disabled

#### Mobile layout issues

1. Test on actual devices, not just browser dev tools
2. Verify Tailwind breakpoints (sm: 640px) working correctly
3. Check for JavaScript errors on mobile browsers
4. Ensure no horizontal scrolling at 320px viewport

#### Date pills wrapping or displaying incorrectly

1. Verify year extraction regex in DatePill component
2. Check for unusual date formats in experience data
3. Test with "Present" in various cases (present, PRESENT, Present)
4. Confirm Badge component has 'date' variant and 'xs' size

#### KPIs not extracting properly

1. Check achievement text format in experience data
2. Verify regex patterns in `kpiExtractor.ts`
3. Test with different achievement phrasings

## 🔮 Future Enhancements

### Near Term

- [ ] Performance optimization for large datasets
- [ ] Animation refinements based on user feedback
- [ ] Enhanced mobile gesture support
- [ ] Analytics dashboard for usage tracking

### Long Term

- [ ] Interactive timeline filtering
- [ ] Export timeline as PDF/image
- [ ] Integration with external data sources
- [ ] Collaborative timeline features

## 📞 Support

For questions or issues:

1. Check this documentation first
2. Review console errors and debug tools
3. Consult the team for complex problems

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
