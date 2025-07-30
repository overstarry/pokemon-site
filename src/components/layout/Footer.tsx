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
          {/* Logo 和描述 */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              🌟 PokéDex
            </div>
            <p className="text-white/60 text-sm">
              探索神奇的宝可梦世界，发现你最喜爱的宝可梦伙伴
            </p>
          </div>

          {/* 快速链接 */}
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <div className="space-y-2">
              <Link 
                href="/" 
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                首页
              </Link>
              <Link 
                href="/pokemon" 
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                宝可梦图鉴
              </Link>
              <Link 
                href="/random" 
                className="block text-white/60 hover:text-white transition-colors text-sm"
              >
                随机宝可梦
              </Link>
            </div>
          </div>

          {/* 技术信息 */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-semibold mb-4">技术栈</h3>
            <div className="space-y-2 text-sm text-white/60">
              <div>Next.js 15</div>
              <div>React 19</div>
              <div>TypeScript</div>
              <div>Tailwind CSS</div>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} PokéDex. 使用 Next.js 和 React 构建
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>数据来源于</span>
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
