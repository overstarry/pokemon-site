// Unified export for all Pokemon related hooks

export { usePokemon, usePokemonSearch } from './usePokemon';
export { usePokemonDetail } from './usePokemonDetail';
export { useRandomPokemon } from './useRandomPokemon';
export { useDailyPokemon } from './useDailyPokemon';

// Re-export types
export type {
  UsePokemonReturn,
  UsePokemonDetailReturn,
  UseRandomPokemonReturn,
  UseDailyPokemonReturn,
} from '@/types/pokemon';
