'use client';

import { useState, useEffect, useCallback } from 'react';
import type { 
  Pokemon, 
  PokemonError, 
  UseRandomPokemonReturn 
} from '@/types/pokemon';
import { 
  fetchRandomPokemon,
  PokemonApiError 
} from '@/lib/api';

// 随机 Pokemon Hook
export function useRandomPokemon(autoFetch: boolean = true): UseRandomPokemonReturn {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PokemonError | null>(null);

  const fetchRandomPokemonData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchRandomPokemon();
      setPokemon(data);
    } catch (err) {
      const error = err instanceof PokemonApiError 
        ? err 
        : new PokemonApiError('获取随机宝可梦失败');
      setError(error);
      setPokemon(null);
      console.error('Error in useRandomPokemon:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 自动获取（如果启用）
  useEffect(() => {
    if (autoFetch) {
      fetchRandomPokemonData();
    }
  }, [autoFetch, fetchRandomPokemonData]);

  return {
    pokemon,
    loading,
    error,
    fetchRandomPokemon: fetchRandomPokemonData,
  };
}
