import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'elevated';
  hover?: boolean;
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-card border border-border shadow-sm',
  subtle: 'bg-subtle border border-border/50',
  elevated: 'bg-card border border-border shadow-lg',
};

export function Card({
  variant = 'default',
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // Base styles - Minimalist approach
        'rounded-xl transition-all duration-200 ease-out',
        // Variant styles
        cardVariants[variant],
        // Subtle hover effects
        hover && 'hover:shadow-md hover:border-secondary/30 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('p-6 pb-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn('p-6 pt-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}
