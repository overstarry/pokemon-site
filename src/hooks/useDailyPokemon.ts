'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  Pokemon,
  PokemonError,
  UseDailyPokemonReturn
} from '@/types/pokemon';
import {
  fetchPokemonBasic,
  PokemonApiError
} from '@/lib/api';
import {
  getTodaysPokemonId,
  getCurrentDateString
} from '@/lib/daily';

/**
 * Daily Pokemon Hook
 * Get fixed Pokemon based on current date and user identifier
 */
export function useDailyPokemon(): UseDailyPokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PokemonError | null>(null);
  const [dateString] = useState(() => getCurrentDateString());
  const [pokemonId] = useState(() => getTodaysPokemonId());

  const fetchDailyPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchPokemonBasic(pokemonId);
      setPokemon(data);
    } catch (err) {
      const error = err instanceof PokemonApiError
        ? err
        : new PokemonApiError('Failed to fetch daily Pokemon');
      setError(error);
      setPokemon(null);
      console.error('Error in useDailyPokemon:', err);
    } finally {
      setLoading(false);
    }
  }, [pokemonId]);

  const refetch = useCallback(() => {
    fetchDailyPokemon();
  }, [fetchDailyPokemon]);

  // Automatically fetch daily Pokemon
  useEffect(() => {
    fetchDailyPokemon();
  }, [fetchDailyPokemon]);

  return {
    pokemon,
    loading,
    error,
    dateString,
    pokemonId,
    refetch,
  };
}
