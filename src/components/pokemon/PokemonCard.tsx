import React from 'react';
import Link from 'next/link';
import { Card, CardContent, TypeIcon } from '@/components/ui';
import { PokemonImage } from '@/components/ui/PokemonImage';
import { DEFAULT_CONFIG } from '@/constants/pokemon';
import { getPokemonImageUrl, formatPokemonId } from '@/lib/api';
import type { Pokemon, PokemonTypeName } from '@/types/pokemon';
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
      <Card className="bg-card border-border hover:border-secondary/50 transition-all duration-200 overflow-hidden h-80 min-h-80">
        <CardContent className="p-6 h-full flex flex-col relative">
          {/* Pokemon Image */}
          <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-subtle">
            <PokemonImage
              src={imageUrl}
              alt={`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - ${pokemon.types.map(t => t.type.name).join('/')} type Pokémon #${pokemon.id}`}
              pokemonId={pokemon.id}
              fill
              className="group-hover:scale-105 transition-transform duration-300 object-contain p-2"
              sizes={DEFAULT_CONFIG.IMAGE_SIZES}
            />
          </div>

          {/* Pokemon ID */}
          <div className="text-muted-foreground text-xs font-mono mb-3 text-center">
            {formatPokemonId(pokemon.id)}
          </div>

          {/* Pokemon Name - 给长名字更多空间 */}
          <h3 className="text-foreground font-semibold text-base mb-4 capitalize text-center tracking-tight min-h-[3rem] flex items-center justify-center px-2 leading-tight">
            {pokemon.name.replace(/-/g, ' ')}
          </h3>

          {/* Type icons - Push to bottom */}
          <div className="flex flex-wrap gap-2 justify-center mt-auto">
            {pokemon.types.map((type, index) => (
              <TypeIcon
                key={index}
                type={type.type.name as PokemonTypeName}
                variant="badge"
                size="sm"
                showLabel={true}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
