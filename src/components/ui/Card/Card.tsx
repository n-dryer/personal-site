import * as React from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '@/utils/cn';

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    hover?: boolean;
    clickable?: boolean;
  };

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hover = true,
      clickable,
      onClick,
      role,
      tabIndex,
      style,
      whileHover,
      whileTap,
      ...props
    },
    ref,
  ) => {
    const isInteractive = clickable ?? Boolean(onClick);
    const resolvedWhileHover = whileHover ?? (hover ? { y: -2 } : undefined);
    const resolvedWhileTap = whileTap ?? (isInteractive ? { scale: 0.98 } : undefined);

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl border border-resume-card-border bg-resume-card text-resume-text-primary shadow-xl ring-1 ring-resume-ring/40 backdrop-blur-xl transition-colors',
          hover && 'transition-all duration-300',
          isInteractive &&
            'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-resume-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
          className,
        )}
        onClick={onClick}
        role={role ?? (isInteractive ? 'button' : undefined)}
        tabIndex={isInteractive ? tabIndex ?? 0 : tabIndex}
        style={{ minHeight: isInteractive ? '44px' : undefined, ...style }}
        whileHover={resolvedWhileHover}
        whileTap={resolvedWhileTap}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-2', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-tight text-resume-text-primary', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-resume-text-secondary', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between gap-2', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
