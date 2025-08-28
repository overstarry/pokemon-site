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
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      if (searchTerm.trim()) {
        // If there's a search term, perform search
        const data = await searchPokemon(searchTerm);
        setPokemon(data);
        setTotal(data.length);
        setCurrentPage(1); // Reset to first page for search
      } else {
        // Otherwise get normal list with pagination
        const offset = (page - 1) * limit;
        const result = await fetchPokemonListWithDetails(limit, offset);
        setPokemon(result.pokemon);
        setTotal(result.total);
        setCurrentPage(page);
      }
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
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const goToPage = useCallback((page: number) => {
    fetchData(page);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1); // Always start from page 1 when dependencies change
  }, [fetchData]);

  const totalPages = Math.ceil(total / limit);

  return {
    pokemon,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    refetch,
    goToPage,
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
