import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

// Spinner loader
function SpinnerLoader({ size, className }: { size: string; className?: string }) {
  return (
    <div className={cn('animate-spin rounded-full border-b-2 border-foreground', size, className)} />
  );
}

// Dots loader
function DotsLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-foreground rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// Pulse loader
function PulseLoader({ size, className }: { size: string; className?: string }) {
  return (
    <div className={cn('bg-muted rounded-full animate-pulse', size, className)} />
  );
}

// Skeleton loader
function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="w-full h-48 bg-muted rounded-lg animate-pulse" />
      <div className="h-4 bg-muted rounded animate-pulse" />
      <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
    </div>
  );
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function Loading({
  variant = 'spinner',
  size = 'md',
  text,
  className,
}: LoadingProps) {
  const sizeClass = sizeClasses[size];

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader className={className} />;
      case 'pulse':
        return <PulseLoader size={sizeClass} className={className} />;
      case 'skeleton':
        return <SkeletonLoader className={className} />;
      default:
        return <SpinnerLoader size={sizeClass} className={className} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <p className="text-foreground text-center animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

// Grid skeleton component
export interface LoadingGridProps {
  count?: number;
  className?: string;
}

export function LoadingGrid({ count = 8, className }: LoadingGridProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6', className)}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-muted/50 backdrop-blur-sm rounded-xl p-6 animate-pulse">
          <div className="w-full h-48 bg-muted rounded-lg mb-4" />
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
