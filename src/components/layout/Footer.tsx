import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'bg-subtle border-t border-border py-12',
      'dark:bg-background',
      className
    )}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <div className="text-xl font-semibold text-foreground mb-3">
              Pokédex
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Explore the amazing world of Pokémon and discover your favorite companions
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-foreground font-medium mb-4">Navigation</h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                href="/pokemon"
                className="block text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                Pokédex
              </Link>
              <Link
                href="/daily"
                className="block text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                Daily
              </Link>
              <Link
                href="/random"
                className="block text-muted-foreground hover:text-secondary transition-colors text-sm"
              >
                Random
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="text-center md:text-right">
            <h3 className="text-foreground font-medium mb-4">Resources</h3>
            <div className="space-y-3 text-sm">
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-secondary transition-colors"
              >
                PokéAPI
              </a>
              <a
                href="mailto:pokemon@jasminides.com"
                className="block text-muted-foreground hover:text-secondary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {currentYear} Pokédex. Built with Next.js and React
            </p>

            <p className="text-muted-foreground text-sm">
              Data powered by{' '}
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                PokéAPI
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
