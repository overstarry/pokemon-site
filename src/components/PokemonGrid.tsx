'use client';

import React from 'react';
import { LoadingGrid, ErrorMessage } from '@/components/ui';
import { StaggeredContainer } from '@/components/ui/AnimatedContainer';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { usePokemon } from '@/hooks';
import type { PokemonGridProps } from '@/types/pokemon';

export default function PokemonGrid({ limit = 20, searchTerm = '' }: PokemonGridProps) {
  const { pokemon, loading, error, refetch } = usePokemon(limit, searchTerm);

  if (loading) {
    return <LoadingGrid count={limit} />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.message}
        onRetry={refetch}
      />
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-white/80 text-xl">
          {searchTerm ? `No Pokémon found containing "${searchTerm}"` : 'No Pokémon data available'}
        </p>
      </div>
    );
  }

  return (
    <StaggeredContainer
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      staggerDelay={50}
      animation="scale-in"
    >
      {pokemon.map((poke) => (
        <PokemonCard
          key={poke.id}
          pokemon={poke}
        />
      ))}
    </StaggeredContainer>
  );
}
