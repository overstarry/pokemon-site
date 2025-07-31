'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  Pokemon,
  PokemonError,
  UsePokemonReturn
} from '@/types/pokemon';
import {
  fetchPokemonListWithDetails,
  searchPokemon,
  PokemonApiError
} from '@/lib/api';
import { DEFAULT_CONFIG } from '@/constants/pokemon';

// Pokemon list Hook
export function usePokemon(
  limit: number = DEFAULT_CONFIG.POKEMON_GRID_LIMIT,
  searchTerm: string = ''
): UsePokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PokemonError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Pokemon[];

      if (searchTerm.trim()) {
        // If there's a search term, perform search
        data = await searchPokemon(searchTerm);
      } else {
        // Otherwise get normal list
        data = await fetchPokemonListWithDetails(limit);
      }

      setPokemon(data);
    } catch (err) {
      const error = err instanceof PokemonApiError
        ? err
        : new PokemonApiError('Failed to fetch Pokemon data');
      setError(error);
      console.error('Error in usePokemon:', err);
    } finally {
      setLoading(false);
    }
  }, [limit, searchTerm]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    pokemon,
    loading,
    error,
    refetch,
  };
}

// Search Hook (with debouncing)
export function usePokemonSearch(initialLimit: number = DEFAULT_CONFIG.POKEMON_GRID_LIMIT) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [limit, setLimit] = useState(initialLimit);

  // Debounce handling
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEFAULT_CONFIG.SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const pokemonData = usePokemon(limit, debouncedSearchTerm);

  return {
    ...pokemonData,
    searchTerm,
    setSearchTerm,
    limit,
    setLimit,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
}
