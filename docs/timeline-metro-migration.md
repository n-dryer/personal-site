# Timeline Metro Map Migration Guide

## Overview

This document outlines the metro map style timeline, which features a central vertical thread and alternating cards.

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

- **Central Vertical Thread**: 4px amber line connecting all experiences
- **Timeline Dots**: 48px circular icons with company/role icons
- **Alternating Cards**: Left/right positioning for visual balance
- **Active Highlighting**: Animated amber glow for current card in view
- **Connection Lines**: Visual links from cards to central thread

### Responsive Behavior

- **Desktop (>768px)**: Alternating left/right card layout
- **Tablet/Mobile (≤768px)**: Single column layout with left-aligned thread
- **Extra Small (≤480px)**: Optimized spacing and sizing

### Accessibility Features

- **ARIA Labels**: Complete labeling for screen readers
- **Keyboard Navigation**: Tab-accessible card interactions
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Visible focus indicators
- **Semantic Structure**: Proper heading hierarchy

## 🔧 Technical Architecture

### Component Hierarchy

```text
TimelineMetro
│   ├── TimelineCard (Individual Cards)
│   └── useTimelineObserver (Active Detection)
```

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
- [ ] Achievements accordion works
- [ ] Smooth scrolling on card click

#### Mobile Experience

- [ ] Single column layout below 768px
- [ ] Thread repositions to left side
- [ ] Cards stack vertically
- [ ] Touch interactions work properly
- [ ] Responsive spacing adjusts correctly

#### Accessibility

- [ ] Screen reader announcements work
- [ ] Keyboard navigation functions
- [ ] Focus indicators are visible
- [ ] ARIA labels are descriptive
- [ ] Reduced motion is respected

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
2. Verify CSS custom property updates in media queries
3. Check for JavaScript errors on mobile browsers

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