'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-[color,background-color,border-color,transform,box-shadow,filter] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px] active:scale-[0.98] data-[loading=true]:cursor-wait',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
        outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'text-slate-900 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const content = isLoading && loadingText ? loadingText : children;
    const mergedDisabled = disabled || isLoading;

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          aria-busy={isLoading || undefined}
          data-loading={isLoading ? 'true' : undefined}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={mergedDisabled}
        aria-busy={isLoading || undefined}
        data-loading={isLoading ? 'true' : undefined}
        {...props}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {isLoading ? (
            <span className="spinner h-4 w-4 border-2 rounded-full" aria-hidden="true" />
          ) : null}
          <span>{content}</span>
        </span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 
