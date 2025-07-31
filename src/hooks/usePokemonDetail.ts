'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  PokemonDetail,
  PokemonSpeciesDetail,
  PokemonError,
  UsePokemonDetailReturn
} from '@/types/pokemon';
import {
  fetchPokemonDetail,
  fetchPokemonSpecies,
  PokemonApiError
} from '@/lib/api';

// Pokemon detail Hook
export function usePokemonDetail(id: string | number): UsePokemonDetailReturn {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpeciesDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PokemonError | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Get Pokemon basic information
      const pokemonData = await fetchPokemonDetail(id);
      setPokemon(pokemonData);

      // Get Pokemon species information
      try {
        const speciesData = await fetchPokemonSpecies(pokemonData.species.url);
        setSpecies(speciesData);
      } catch (speciesError) {
        console.warn('Failed to fetch species data:', speciesError);
        // Species info fetch failure doesn't affect main data display
        setSpecies(null);
      }

    } catch (err) {
      const error = err instanceof PokemonApiError
        ? err
        : new PokemonApiError('Failed to fetch Pokemon details');
      setError(error);
      setPokemon(null);
      setSpecies(null);
      console.error('Error in usePokemonDetail:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    pokemon,
    species,
    loading,
    error,
    refetch,
  };
}
