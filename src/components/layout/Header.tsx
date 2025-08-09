'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/pokemon', label: 'Database' },
  { href: '/daily', label: 'Daily' },
  { href: '/random', label: 'Random' },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      'bg-white/95 backdrop-blur-sm border-b border-border shadow-sm',
      'dark:bg-background/95 dark:border-border',
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold text-foreground hover:text-secondary transition-colors duration-200 tracking-tight"
          >
            PokeVerse
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-medium text-sm transition-colors duration-200 py-2 px-3 rounded-md relative',
                    isActive
                      ? 'text-secondary bg-accent'
                      : 'text-muted-foreground hover:text-foreground hover:bg-subtle'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-subtle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'py-3 px-4 rounded-md font-medium transition-colors duration-200',
                      isActive
                        ? 'text-secondary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-subtle'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
