import React from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  style?: React.CSSProperties;
};

const baseClasses =
  'relative bg-surface/80 backdrop-blur-xl rounded-lg shadow-lg border border-white/10 ring-1 ring-white/5';
const hoverClasses =
  'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/50';
const clickableClasses =
  'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';

/**
 * Card component providing consistent card styling across the application.
 * Used by Skills Matrix, Timeline, ShipLog, and other card-based layouts.
 */
export const Card = React.memo<CardProps>(
  ({ children, className = '', hover = true, onClick, role, tabIndex, style, ...props }) => {
    const isClickable = Boolean(onClick);

    const classes = [
      baseClasses,
      hover ? hoverClasses : '',
      isClickable ? clickableClasses : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cardProps = {
      className: classes,
      onClick,
      role: role || (isClickable ? 'button' : undefined),
      tabIndex: isClickable ? (tabIndex ?? 0) : tabIndex,
      style: {
        minHeight: isClickable ? '44px' : undefined,
        ...style,
      },
      ...props,
    };

    if (isClickable) {
      return (
        <motion.div
          {...cardProps}
          whileHover={hover ? { y: -2 } : undefined}
          whileTap={{ scale: 0.98 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick?.();
            }
          }}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div {...cardProps} whileHover={hover ? { y: -2 } : undefined}>
        {children}
      </motion.div>
    );
  },
);

Card.displayName = 'Card';
