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

// Pokemon 列表 Hook
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
        // 如果有搜索词，执行搜索
        data = await searchPokemon(searchTerm);
      } else {
        // 否则获取普通列表
        data = await fetchPokemonListWithDetails(limit);
      }
      
      setPokemon(data);
    } catch (err) {
      const error = err instanceof PokemonApiError 
        ? err 
        : new PokemonApiError('获取宝可梦数据失败');
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

// 搜索 Hook（带防抖）
export function usePokemonSearch(initialLimit: number = DEFAULT_CONFIG.POKEMON_GRID_LIMIT) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [limit, setLimit] = useState(initialLimit);

  // 防抖处理
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
