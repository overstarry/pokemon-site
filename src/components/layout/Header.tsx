'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  className?: string;
}

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/pokemon', label: 'Pokédex' },
  { href: '/random', label: 'Random' },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={cn(
      'bg-white/10 backdrop-blur-md border-b border-white/20',
      className
    )}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-4xl font-bold text-white drop-shadow-lg hover:text-yellow-300 transition-colors duration-300"
          >
            🌟 PokéDex
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors duration-300',
                    isActive
                      ? 'text-yellow-300'
                      : 'text-white hover:text-yellow-300'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white hover:text-yellow-300 transition-colors">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 pt-4 border-t border-white/20">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'py-2 px-4 rounded-lg font-medium transition-colors duration-300',
                    isActive
                      ? 'text-yellow-300 bg-white/10'
                      : 'text-white hover:text-yellow-300 hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
