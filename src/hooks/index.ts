// 统一导出所有 Pokemon 相关的 hooks

export { usePokemon, usePokemonSearch } from './usePokemon';
export { usePokemonDetail } from './usePokemonDetail';
export { useRandomPokemon } from './useRandomPokemon';

// 重新导出类型
export type {
  UsePokemonReturn,
  UsePokemonDetailReturn,
  UseRandomPokemonReturn,
} from '@/types/pokemon';
