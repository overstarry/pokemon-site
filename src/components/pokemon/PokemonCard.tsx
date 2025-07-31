import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { PokemonImage } from '@/components/ui/PokemonImage';
import { TYPE_COLORS, TYPE_TRANSLATIONS, DEFAULT_CONFIG } from '@/constants/pokemon';
import { getPokemonImageUrl, formatPokemonId } from '@/lib/api';
import type { Pokemon } from '@/types/pokemon';
import { cn } from '@/lib/utils';

export interface PokemonCardProps {
  pokemon: Pokemon;
  showShiny?: boolean;
  className?: string;
}

export function PokemonCard({ pokemon, showShiny = false, className }: PokemonCardProps) {
  const imageUrl = getPokemonImageUrl(pokemon, showShiny);

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className={cn('group block', className)}
    >
      <Card variant="pokemon" className="p-6 text-center group-hover:glow transition-all duration-300">
        <CardContent className="p-0">
          {/* Pokemon 图片 */}
          <div className="relative w-full h-48 mb-4">
            <PokemonImage
              src={imageUrl}
              alt={pokemon.name}
              pokemonId={pokemon.id}
              fill
              className="group-hover:scale-110 transition-transform duration-300"
              sizes={DEFAULT_CONFIG.IMAGE_SIZES}
            />
          </div>

          {/* Pokemon 编号 */}
          <div className="text-white/60 text-sm font-mono mb-1">
            {formatPokemonId(pokemon.id)}
          </div>

          {/* Pokemon 名称 */}
          <h3 className="text-white font-bold text-lg mb-3 capitalize">
            {pokemon.name}
          </h3>

          {/* Type tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={cn(
                  'text-white text-xs font-bold py-1 px-3 rounded-full',
                  TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || 'bg-gray-400'
                )}
              >
                {TYPE_TRANSLATIONS[type.type.name as keyof typeof TYPE_TRANSLATIONS] || type.type.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
