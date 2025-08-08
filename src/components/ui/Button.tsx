import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md',
  secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-sm hover:shadow-md',
  outline: 'bg-transparent hover:bg-accent text-foreground border border-border hover:border-secondary/50',
  ghost: 'bg-transparent hover:bg-subtle text-foreground',
  danger: 'bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md',
};

const buttonSizes = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-2.5 px-4 text-sm',
  lg: 'py-3 px-6 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  asChild = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cn(
    // Base styles - Minimalist approach
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    // Variant styles
    buttonVariants[variant],
    // Size styles
    buttonSizes[size],
    // Loading state
    loading && 'cursor-wait',
    className
  );

  if (asChild) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(buttonClassName, child.props.className),
    });
  }

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
}
