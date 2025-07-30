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
  default: 'min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900',
  gradient: 'min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900',
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

// 页面容器组件
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
      'container mx-auto px-4 py-8',
      containerSizes[size],
      className
    )}>
      {children}
    </div>
  );
}

// 页面标题组件
export interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/80 text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
