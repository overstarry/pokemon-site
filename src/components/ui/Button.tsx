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
  primary: 'bg-yellow-400 hover:bg-yellow-500 text-gray-800 shadow-lg hover:shadow-xl',
  secondary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl',
  outline: 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm',
  ghost: 'bg-transparent hover:bg-white/10 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl',
};

const buttonSizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
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
    // 基础样式
    'inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed',
    // 变体样式
    buttonVariants[variant],
    // 尺寸样式
    buttonSizes[size],
    // 加载状态
    loading && 'cursor-wait',
    className
  );

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn(buttonClassName, (children as React.ReactElement).props?.className),
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
