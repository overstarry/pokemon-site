import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { PokemonImage } from '@/components/ui/PokemonImage';
import { TYPE_TRANSLATIONS, DEFAULT_CONFIG } from '@/constants/pokemon';
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
      <Card className="bg-card border-border hover:border-secondary/50 transition-all duration-200 overflow-hidden">
        <CardContent className="p-6">
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
          <div className="text-muted-foreground text-xs font-mono mb-2 text-center">
            {formatPokemonId(pokemon.id)}
          </div>

          {/* Pokemon Name */}
          <h3 className="text-foreground font-semibold text-lg mb-4 capitalize text-center tracking-tight">
            {pokemon.name}
          </h3>

          {/* Type tags */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={cn(
                  'text-xs font-medium py-1.5 px-3 rounded-full border',
                  'bg-subtle text-muted-foreground border-border',
                  'group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-secondary/30',
                  'transition-colors duration-200'
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
