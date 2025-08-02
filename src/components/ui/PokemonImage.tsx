'use client';

import { useState, useEffect } from 'react';
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

  // 监听src prop的变化，更新内部状态
  useEffect(() => {
    setImgSrc(src);
    setHasError(false); // 重置错误状态
  }, [src]);

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
          <div className="text-sm">Image failed to load</div>
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
