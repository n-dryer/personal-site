import React from 'react';

export type BadgeVariant = 'expert' | 'proficient' | 'familiar' | 'tech' | 'default';
export type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  'aria-label'?: string;
  tabIndex?: number;
};

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  expert: 'bg-accent/20 text-accent border-accent/30',
  proficient: 'bg-text-primary/20 text-text-primary border-text-primary/30',
  familiar: 'bg-text-secondary/20 text-text-secondary border-text-secondary/30',
  tech: 'bg-text-secondary/10 text-text-secondary border-text-secondary/20',
  default: 'bg-surface text-text-primary border-text-primary/10',
};

const SIZE_STYLES: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

/**
 * Badge component for displaying labels, tags, and skill levels.
 * Unified component used across Skills Matrix, Timeline, and other components.
 */
export const Badge = React.memo<BadgeProps>(
  ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
    const variantClasses = VARIANT_STYLES[variant];
    const sizeClasses = SIZE_STYLES[size];

    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border font-medium transition-colors ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';