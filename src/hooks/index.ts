// Unified export for all Pokemon related hooks

export { usePokemon, usePokemonSearch } from './usePokemon';
export { usePokemonDetail } from './usePokemonDetail';
export { useRandomPokemon } from './useRandomPokemon';

// Re-export types
export type {
  UsePokemonReturn,
  UsePokemonDetailReturn,
  UseRandomPokemonReturn,
} from '@/types/pokemon';
