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

// Pokemon 详情 Hook
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
      
      // 获取 Pokemon 基本信息
      const pokemonData = await fetchPokemonDetail(id);
      setPokemon(pokemonData);
      
      // 获取 Pokemon 物种信息
      try {
        const speciesData = await fetchPokemonSpecies(pokemonData.species.url);
        setSpecies(speciesData);
      } catch (speciesError) {
        console.warn('Failed to fetch species data:', speciesError);
        // 物种信息获取失败不影响主要数据显示
        setSpecies(null);
      }
      
    } catch (err) {
      const error = err instanceof PokemonApiError 
        ? err 
        : new PokemonApiError('获取宝可梦详情失败');
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
