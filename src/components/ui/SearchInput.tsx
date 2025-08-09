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
            'bg-muted/10 backdrop-blur-sm border border-border',
            'text-foreground placeholder-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'transition-all duration-300',
            className
          )}
          {...props}
        />

        {/* Search icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {loading ? (
            <div className="w-4 h-4 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
          ) : (
            <span className="text-muted-foreground">🔍</span>
          )}
        </div>

        {/* Clear button */}
        {hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search suggestions or result count can be added here */}
    </div>
  );
}
