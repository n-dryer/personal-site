import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-resume-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'border-resume-accent/70 hover:bg-resume-accent/90 bg-resume-accent text-resume-text-primary shadow-lg hover:shadow-xl',
        outline:
          'hover:border-resume-accent/40 hover:bg-resume-card/80 border-resume-card-border bg-transparent text-resume-text-primary',
        secondary:
          'hover:border-resume-accent/30 hover:bg-resume-card/85 border-resume-card-border bg-resume-card text-resume-text-primary shadow-md',
        ghost:
          'hover:bg-resume-overlay/40 border-transparent bg-transparent text-resume-text-secondary hover:text-resume-accent',
        destructive:
          'border-transparent bg-red-500 text-white shadow-lg hover:bg-red-500/90 focus-visible:ring-red-400',
        link:
          'border-transparent bg-transparent text-resume-accent underline-offset-4 hover:underline focus-visible:ring-0 focus-visible:ring-offset-0',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-11 w-11',
        'icon-sm': 'h-9 w-9',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants };
