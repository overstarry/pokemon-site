import React from 'react';
import { Card, CardContent } from '@/components/ui';

// Generation ranges based on Pokédex numbers
const GENERATION_RANGES = [
  { gen: 1, name: 'Generation I', start: 1, end: 151, region: 'Kanto' },
  { gen: 2, name: 'Generation II', start: 152, end: 251, region: 'Johto' },
  { gen: 3, name: 'Generation III', start: 252, end: 386, region: 'Hoenn' },
  { gen: 4, name: 'Generation IV', start: 387, end: 493, region: 'Sinnoh' },
  { gen: 5, name: 'Generation V', start: 494, end: 649, region: 'Unova' },
  { gen: 6, name: 'Generation VI', start: 650, end: 721, region: 'Kalos' },
  { gen: 7, name: 'Generation VII', start: 722, end: 809, region: 'Alola' },
  { gen: 8, name: 'Generation VIII', start: 810, end: 905, region: 'Galar' },
  { gen: 9, name: 'Generation IX', start: 906, end: 1025, region: 'Paldea' },
] as const;

export type Generation = typeof GENERATION_RANGES[number]['gen'] | 'all';

interface GenerationFilterProps {
  selectedGeneration: Generation;
  onGenerationChange: (generation: Generation) => void;
  generationCounts: Record<number, number>;
}

export function GenerationFilter({ 
  selectedGeneration, 
  onGenerationChange, 
  generationCounts 
}: GenerationFilterProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Filter by Generation
        </h3>
        
        <div className="space-y-2">
          {/* All Generations Option */}
          <button
            onClick={() => onGenerationChange('all')}
            className={`
              w-full text-left px-3 py-2 rounded-lg transition-colors
              ${selectedGeneration === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary/50 text-foreground'
              }
            `}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">All Generations</span>
              <span className="text-sm opacity-75">
                {Object.values(generationCounts).reduce((sum, count) => sum + count, 0)}
              </span>
            </div>
          </button>

          {/* Individual Generation Options */}
          {GENERATION_RANGES.map((genInfo) => {
            const count = generationCounts[genInfo.gen] || 0;
            if (count === 0) return null;

            return (
              <button
                key={genInfo.gen}
                onClick={() => onGenerationChange(genInfo.gen)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-colors
                  ${selectedGeneration === genInfo.gen 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-secondary/50 text-foreground'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{genInfo.name}</div>
                    <div className="text-sm opacity-75">{genInfo.region}</div>
                  </div>
                  <span className="text-sm opacity-75">{count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Utility function to get generation from Pokémon ID
export function getPokemonGeneration(pokemonId: number): number {
  for (const genInfo of GENERATION_RANGES) {
    if (pokemonId >= genInfo.start && pokemonId <= genInfo.end) {
      return genInfo.gen;
    }
  }
  return 1; // Default to Generation I for unknown IDs
}

// Utility function to filter Pokémon by generation
export function filterPokemonByGeneration<T extends { id: number }>(
  pokemon: T[], 
  generation: Generation
): T[] {
  if (generation === 'all') return pokemon;
  
  const genInfo = GENERATION_RANGES.find(g => g.gen === generation);
  if (!genInfo) return pokemon;
  
  return pokemon.filter(p => p.id >= genInfo.start && p.id <= genInfo.end);
}

// Utility function to count Pokémon by generation
export function countPokemonByGeneration<T extends { id: number }>(
  pokemon: T[]
): Record<number, number> {
  const counts: Record<number, number> = {};
  
  for (const genInfo of GENERATION_RANGES) {
    counts[genInfo.gen] = pokemon.filter(
      p => p.id >= genInfo.start && p.id <= genInfo.end
    ).length;
  }
  
  return counts;
}