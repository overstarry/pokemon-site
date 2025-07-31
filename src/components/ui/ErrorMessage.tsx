import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  variant?: 'default' | 'card' | 'inline';
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

const errorVariants = {
  default: 'text-center py-12',
  card: 'bg-red-500/10 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm',
  inline: 'text-left py-4',
};

export function ErrorMessage({
  title = 'Something went wrong',
  message,
  variant = 'default',
  showRetry = true,
  onRetry,
  className,
}: ErrorMessageProps) {
  return (
    <div className={cn(errorVariants[variant], className)}>
      <div className="text-6xl mb-4">😢</div>

      {title && (
        <h3 className="text-xl font-bold text-red-400 mb-2">
          {title}
        </h3>
      )}

      <p className="text-red-300 mb-4 leading-relaxed">
        {message}
      </p>

      {showRetry && onRetry && (
        <Button
          variant="danger"
          size="sm"
          onClick={onRetry}
        >
          Retry
        </Button>
      )}
    </div>
  );
}

// Simplified error alert component
export interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ErrorAlert({ message, onClose, className }: ErrorAlertProps) {
  return (
    <div className={cn(
      'bg-red-500/10 border border-red-500/20 rounded-lg p-4 backdrop-blur-sm',
      'flex items-center justify-between',
      className
    )}>
      <div className="flex items-center space-x-3">
        <div className="text-red-400">⚠️</div>
        <p className="text-red-300 text-sm">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
