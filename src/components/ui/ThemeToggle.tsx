'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'system') {
      return '🖥️';
    }
    return actualTheme === 'dark' ? '🌙' : '☀️';
  };

  const getLabel = () => {
    if (theme === 'system') {
      return 'System';
    }
    return actualTheme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn('gap-2', className)}
      title={`Current theme: ${getLabel()}`}
    >
      <span className="text-lg">{getIcon()}</span>
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  );
}
