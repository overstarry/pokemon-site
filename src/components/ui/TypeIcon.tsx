import React from 'react';
import Image from 'next/image';
import { TYPE_COLORS, TYPE_GRADIENTS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import type { PokemonTypeName } from '@/types/pokemon';
import { cn } from '@/lib/utils';

export interface TypeIconProps {
  type: PokemonTypeName;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'badge';
  className?: string;
  showLabel?: boolean;
}

// 图标文件名映射
const TYPE_ICON_FILES: Record<PokemonTypeName, string> = {
  normal: 'Icon_Normal.webp',
  fighting: 'Icon_Fighting.webp',
  flying: 'Icon_Flying.webp',
  poison: 'Icon_Poison.webp',
  ground: 'Icon_Ground.webp',
  rock: 'Icon_Rock.webp',
  bug: 'Icon_Bug.webp',
  ghost: 'Icon_Ghost.webp',
  steel: 'Icon_Steel.webp',
  fire: 'Icon_Fire.webp',
  water: 'Icon_Water.webp',
  grass: 'Icon_Grass.webp',
  electric: 'Icon_Electric.webp',
  psychic: 'Icon_Psychic.webp',
  ice: 'Icon_Ice.webp',
  dragon: 'Icon_Dragon.webp',
  dark: 'Icon_Dark.webp',
  fairy: 'Icon_Fairy.webp',
};

const sizeClasses = {
  sm: 'w-4 h-4 min-w-4 min-h-4',
  md: 'w-6 h-6 min-w-6 min-h-6',
  lg: 'w-8 h-8 min-w-8 min-h-8',
};

const badgeSizeClasses = {
  sm: 'text-xs px-2 py-1 min-h-6',
  md: 'text-sm px-3 py-1.5 min-h-8',
  lg: 'text-base px-4 py-2 min-h-10',
};

export function TypeIcon({ 
  type, 
  size = 'md', 
  variant = 'icon',
  className,
  showLabel = false 
}: TypeIconProps) {
  const iconFile = TYPE_ICON_FILES[type];
  const typeColor = TYPE_COLORS[type] || 'bg-gray-400';
  const typeGradient = TYPE_GRADIENTS[type] || 'from-gray-400 to-gray-500';
  const typeName = TYPE_TRANSLATIONS[type] || type;

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 24 : 32;
  
  const iconElement = (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
        sizeClasses[size],
        variant === 'icon' ? 'shadow-sm' : ''
      )}
      title={typeName}
    >
      <Image
        src={`/types/${iconFile}`}
        alt={`${typeName} type icon`}
        width={iconSize}
        height={iconSize}
        className="w-full h-full object-contain object-center"
      />
    </div>
  );

  if (variant === 'badge') {
    return (
      <div className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full font-medium text-white whitespace-nowrap',
        `bg-gradient-to-r ${typeGradient}`,
        badgeSizeClasses[size],
        className
      )}>
        <div className="flex-shrink-0">
          {iconElement}
        </div>
        {showLabel && (
          <span className="text-center flex-shrink-0 leading-none">
            {typeName}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      {iconElement}
    </div>
  );
}