'use client';

import React from 'react';
import { LoadingGrid, ErrorMessage, Pagination } from '@/components/ui';
import { StaggeredContainer } from '@/components/ui/AnimatedContainer';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { usePokemon } from '@/hooks';
import type { PokemonGridProps } from '@/types/pokemon';

export default function PokemonGrid({ limit = 20, searchTerm = '' }: PokemonGridProps) {
  const { 
    pokemon, 
    loading, 
    error, 
    total, 
    currentPage, 
    totalPages, 
    refetch, 
    goToPage 
  } = usePokemon(limit, searchTerm);

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
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg">
          {searchTerm ? `No Pokémon found containing "${searchTerm}"` : 'No Pokémon data available'}
        </p>
      </div>
    );
  }

  const showingStart = searchTerm.trim() ? 1 : (currentPage - 1) * limit + 1;
  const showingEnd = searchTerm.trim() ? pokemon.length : Math.min(currentPage * limit, total);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {pokemon.map((poke, index) => (
          <div 
            key={poke.id} 
            className="w-full flex animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'both'
            }}
          >
            <PokemonCard
              pokemon={poke}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Show pagination only if not searching */}
      {!searchTerm.trim() && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          showingStart={showingStart}
          showingEnd={showingEnd}
          totalItems={total}
          className="mt-12"
        />
      )}
    </div>
  );
}
