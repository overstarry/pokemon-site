import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'solid' | 'gradient' | 'pokemon' | 'elevated';
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-card/80 backdrop-blur-sm border border-border/50 shadow-md',
  glass: 'bg-card/20 backdrop-blur-md border border-border/30 shadow-lg',
  solid: 'bg-card shadow-lg border border-border',
  gradient: 'bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/30 shadow-lg',
  pokemon: 'bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 shadow-pokemon',
  elevated: 'bg-card shadow-2xl border border-border/50 shadow-primary/10',
};

export function Card({
  variant = 'default',
  hover = true,
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // 基础样式
        'rounded-2xl transition-all duration-300 ease-out',
        // 变体样式
        cardVariants[variant],
        // Hover 效果
        hover && 'hover:shadow-xl hover:scale-[1.02] transform cursor-pointer',
        // 发光效果
        glow && 'shadow-glow',
        // 特殊hover效果
        hover && variant === 'pokemon' && 'hover:shadow-pokemon hover:shadow-lg',
        hover && variant === 'glass' && 'hover:bg-card/30 hover:border-border/50',
        hover && variant === 'elevated' && 'hover:shadow-3xl hover:-translate-y-1',
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
      className={cn('p-6 pb-0', className)}
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
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}
