import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export type IndicatorVariant = 'expert' | 'proficient' | 'familiar' | 'custom';

type RadialIndicatorProps = {
  /** Value to display (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Indicator variant affecting color */
  variant?: IndicatorVariant;
  /** Custom color (overrides variant) */
  color?: string;
  /** Label for accessibility */
  label: string;
  /** Size in pixels (optional override) */
  size?: number;
  /** Whether to animate on first view */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
};

// Variant color mappings
const VARIANT_COLORS: Record<IndicatorVariant, string> = {
  expert: 'var(--resume-accent)',
  proficient: 'var(--text-primary)',
  familiar: 'var(--text-secondary)',
  custom: 'var(--resume-accent)', // Default fallback
};

/**
 * RadialIndicator displays progress/proficiency as an animated circular indicator.
 * Uses conic-gradient for performance and provides semantic markup for accessibility.
 * Generic component that can be used beyond skills (progress bars, loading indicators, etc.)
 */
export const RadialIndicator = React.memo<RadialIndicatorProps>(
  ({
    value,
    max = 100,
    variant = 'custom',
    color,
    label,
    size = 64,
    animate = true,
    className = '',
  }) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: true,
    });

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const indicatorColor = color || VARIANT_COLORS[variant];

    // Trigger animation when in view
    useEffect(() => {
      if (inView && animate && !hasAnimated && !shouldReduceMotion) {
        setHasAnimated(true);
      }
    }, [inView, animate, hasAnimated, shouldReduceMotion]);

    // CSS custom properties for the indicator
    const indicatorStyle: React.CSSProperties = {
      '--indicator-size': `${size}px`,
      '--indicator-percentage': `${percentage}%`,
      '--indicator-color': indicatorColor,
      '--indicator-fill': `conic-gradient(from 0deg, ${indicatorColor} ${percentage}%, var(--bg-surface-alt) ${percentage}%)`,
    } as React.CSSProperties;

    // Browser fallback for unsupported conic-gradient
    const supportsConicGradient =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('background', 'conic-gradient(red, blue)');

    if (!supportsConicGradient) {
      // Fallback to simple circular progress bar
      return (
        <div
          ref={ref}
          className={`radial-indicator-fallback ${className}`}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            border: `6px solid var(--bg-surface-alt)`,
            borderTopColor: percentage > 25 ? indicatorColor : 'var(--bg-surface-alt)',
            borderRightColor: percentage > 50 ? indicatorColor : 'var(--bg-surface-alt)',
            borderBottomColor: percentage > 75 ? indicatorColor : 'var(--bg-surface-alt)',
            borderLeftColor: percentage > 90 ? indicatorColor : 'var(--bg-surface-alt)',
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`${label}: ${percentage.toFixed(0)}%`}
        >
          <span className="sr-only">{percentage.toFixed(0)}%</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`radial-indicator ${className} focus:ring-accent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={indicatorStyle}
        data-animate={hasAnimated}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${percentage.toFixed(0)}%`}
        aria-describedby={`indicator-desc-${label.replace(/\s+/g, '-').toLowerCase()}`}
        tabIndex={0}
        onKeyDown={(e) => {
          // Announce current value on Enter/Space
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const announcement = `${label}: ${percentage.toFixed(0)} percent`;
            // Create temporary announcement for screen readers
            const announcer = document.createElement('div');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            announcer.textContent = announcement;
            document.body.appendChild(announcer);
            setTimeout(() => document.body.removeChild(announcer), 1000);
          }
        }}
      >
        <span className="relative z-10 text-xs font-bold text-text-primary">
          {variant !== 'custom' ? variant.charAt(0).toUpperCase() : `${value}`}
        </span>
        <span id={`indicator-desc-${label.replace(/\s+/g, '-').toLowerCase()}`} className="sr-only">
          Progress indicator showing {percentage.toFixed(0)}% completion
        </span>
      </div>
    );
  },
);

RadialIndicator.displayName = 'RadialIndicator';
