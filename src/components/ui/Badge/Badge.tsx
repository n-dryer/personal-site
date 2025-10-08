import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border font-medium transition-colors duration-200 shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-resume-card text-resume-text-primary',
        expert:
          'border-resume-accent/50 bg-resume-accent/20 text-resume-accent-light shadow-resume-accent/10',
        proficient:
          'border-resume-text-primary/40 bg-resume-text-primary/15 text-resume-text-primary shadow-black/5',
        familiar:
          'border-resume-text-secondary/40 bg-resume-text-secondary/15 text-resume-text-secondary shadow-black/5',
        tech: 'border-transparent bg-white/10 text-resume-text-primary backdrop-blur-sm shadow-lg shadow-black/10',
        kpi: 'border-accent-electric/50 bg-accent-electric/20 text-accent-electric shadow-accent-electric/20',
        date: 'bg-resume-card/70 border-resume-card-border text-resume-text-secondary backdrop-blur-md hover:text-resume-accent data-[active=true]:border-resume-accent data-[active=true]:bg-resume-accent data-[active=true]:text-resume-text-primary data-[active=true]:shadow-lg',
      },
      size: {
        xs: 'px-2 py-0.5 text-[10px] leading-none',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
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
