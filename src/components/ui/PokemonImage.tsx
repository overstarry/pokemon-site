'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getFallbackImageUrl } from '@/lib/api';
import { cn } from '@/lib/utils';

export interface PokemonImageProps {
  src: string;
  alt: string;
  pokemonId: number;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function PokemonImage({
  src,
  alt,
  pokemonId,
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: PokemonImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // 尝试使用备用图片源
      const fallbackSrc = getFallbackImageUrl(pokemonId);
      if (imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        return;
      }
    }
    setHasError(true);
  };

  if (hasError) {
    // 显示占位符
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🔍</div>
          <div className="text-sm">图片加载失败</div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={cn('object-contain', className)}
      onError={handleError}
      priority={priority}
      sizes={sizes}
      {...(fill ? { fill: true } : { width, height })}
    />
  );
}
