'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui';
import { StaggeredContainer } from '@/components/ui/AnimatedContainer';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { GenerationFilter, filterPokemonByGeneration, countPokemonByGeneration, type Generation } from './GenerationFilter';
import type { Pokemon } from '@/types/pokemon';

interface TypePokemonGridProps {
  primaryPokemon: Pokemon[];
  secondaryPokemon: Pokemon[];
  typeName: string;
}

export function TypePokemonGrid({ primaryPokemon, secondaryPokemon, typeName }: TypePokemonGridProps) {
  const [selectedGeneration, setSelectedGeneration] = useState<Generation>('all');
  
  // Filter Pokémon by selected generation
  const filteredPrimary = useMemo(() => 
    filterPokemonByGeneration(primaryPokemon, selectedGeneration), 
    [primaryPokemon, selectedGeneration]
  );
  
  const filteredSecondary = useMemo(() => 
    filterPokemonByGeneration(secondaryPokemon, selectedGeneration), 
    [secondaryPokemon, selectedGeneration]
  );
  
  // Calculate generation counts for all Pokémon
  const generationCounts = useMemo(() => {
    const allPokemon = [...primaryPokemon, ...secondaryPokemon];
    return countPokemonByGeneration(allPokemon);
  }, [primaryPokemon, secondaryPokemon]);
  
  const totalCount = filteredPrimary.length + filteredSecondary.length;
  const totalAllGenerations = primaryPokemon.length + secondaryPokemon.length;

  return (
    <div className="space-y-8">
      {/* Generation Filter */}
      {totalAllGenerations > 0 && (
        <div className="max-w-md mx-auto">
          <GenerationFilter
            selectedGeneration={selectedGeneration}
            onGenerationChange={setSelectedGeneration}
            generationCounts={generationCounts}
          />
        </div>
      )}
      {/* Statistics Card */}
      {totalCount > 0 && (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-foreground">{totalCount}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{primaryPokemon.length}</div>
                <div className="text-sm text-muted-foreground">Primary</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">{secondaryPokemon.length}</div>
                <div className="text-sm text-muted-foreground">Secondary</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Primary Type Pokemon */}
      {filteredPrimary.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Primary {typeName} Type
            </h2>
            <p className="text-muted-foreground">
              Pokémon where {typeName} is their first type
            </p>
          </div>
          
          <StaggeredContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPrimary.map((pokemon) => (
                <PokemonCard key={`primary-${pokemon.id}`} pokemon={pokemon} />
              ))}
            </div>
          </StaggeredContainer>
        </div>
      )}

      {/* Secondary Type Pokemon */}
      {filteredSecondary.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Secondary {typeName} Type
            </h2>
            <p className="text-muted-foreground">
              Pokémon where {typeName} is their second type
            </p>
          </div>
          
          <StaggeredContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSecondary.map((pokemon) => (
                <PokemonCard key={`secondary-${pokemon.id}`} pokemon={pokemon} />
              ))}
            </div>
          </StaggeredContainer>
        </div>
      )}

      {/* Empty State */}
      {totalCount === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No {typeName} type Pokémon found. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}