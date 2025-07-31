import React from 'react';
import { cn } from '@/lib/utils';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  loading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  loading = false,
  className,
  placeholder = 'Search Pokémon...',
  ...props
}: SearchInputProps) {
  const hasValue = value && String(value).length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-3 pl-12 pr-12 rounded-full',
            'bg-white/20 backdrop-blur-sm border border-white/30',
            'text-white placeholder-white/60',
            'focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent',
            'transition-all duration-300',
            className
          )}
          {...props}
        />

        {/* Search icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
          ) : (
            <span className="text-white/60">🔍</span>
          )}
        </div>

        {/* 清除按钮 */}
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search suggestions or result count can be added here */}
    </div>
  );
}
