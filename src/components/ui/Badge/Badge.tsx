import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'border-resume-card-border bg-resume-card text-resume-text-primary',
        expert: 'border-resume-accent/40 bg-resume-accent/15 text-resume-accent',
        proficient:
          'border-resume-text-primary/30 bg-resume-text-primary/10 text-resume-text-primary',
        familiar:
          'border-resume-text-secondary/30 bg-resume-text-secondary/10 text-resume-text-secondary',
        tech: 'border-resume-accent-light/30 bg-resume-accent-light/10 text-resume-accent-light',
        kpi: 'border-resume-accent/40 bg-resume-accent/15 text-resume-accent',
        date: 'bg-resume-card/70 border-resume-card-border text-resume-text-secondary backdrop-blur-md data-[active=true]:border-resume-accent data-[active=true]:bg-resume-accent data-[active=true]:text-resume-text-primary data-[active=true]:shadow-lg',
      },
      size: {
        xs: 'px-2 py-0.5 text-[10px] leading-none',
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
    );
  },
);

Badge.displayName = 'Badge';

export { badgeVariants };
