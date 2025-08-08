import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  backgroundVariant?: 'default' | 'gradient' | 'solid';
}

const backgroundVariants = {
  default: 'min-h-screen bg-background',
  gradient: 'min-h-screen bg-gradient-to-br from-subtle to-background dark:from-background dark:to-subtle',
  solid: 'min-h-screen bg-background',
};

export function PageLayout({
  children,
  className,
  showHeader = true,
  showFooter = true,
  backgroundVariant = 'default',
}: PageLayoutProps) {
  return (
    <div className={cn(backgroundVariants[backgroundVariant], className)}>
      {showHeader && <Header />}

      <main className="flex-1">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}

// Page container component
export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  className,
  size = 'lg',
}: PageContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-6 py-12',
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  );
}

// Page title component
export interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn('text-center mb-16', className)}>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
