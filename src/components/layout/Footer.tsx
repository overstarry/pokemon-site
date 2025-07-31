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
      'bg-gray-900/50 backdrop-blur-md py-8 border-t border-white/20',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              🌟 PokéDex
            </div>
            <p className="text-white/60 text-sm">
              Explore the amazing world of Pokémon and discover your favorite companions
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                href="/pokemon"
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                Pokédex
              </Link>
              <Link
                href="/random"
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                Random
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:pokemon@jasminides.com"
                className="block text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                📧 Email
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} PokéDex. Built with Next.js and React
            </p>

            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>Data from</span>
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                PokéAPI
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
