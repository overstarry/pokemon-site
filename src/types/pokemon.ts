// Pokemon 相关的 TypeScript 类型定义

// PokeAPI 原始响应接口
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: PokemonSpecies;
}

export interface PokemonSprites {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny?: string;
    };
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonSpecies {
  url: string;
}

// 基础 Pokemon 接口（用于列表显示）
export interface Pokemon {
  id: number;
  name: string;
  url?: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  height?: number;
  weight?: number;
}

// 详细 Pokemon 接口（用于详情页）
export interface PokemonDetail extends Pokemon {
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: PokemonSpecies;
}

// Pokemon 物种信息接口
export interface PokemonSpeciesDetail {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
}

// API 响应接口
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// 组件 Props 接口
export interface PokemonGridProps {
  limit?: number;
  searchTerm?: string;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  showShiny?: boolean;
}

// 错误类型
export interface PokemonError {
  message: string;
  status?: number;
}

// Hook 返回类型
export interface UsePokemonReturn {
  pokemon: Pokemon[];
  loading: boolean;
  error: PokemonError | null;
  refetch: () => void;
}

export interface UsePokemonDetailReturn {
  pokemon: PokemonDetail | null;
  species: PokemonSpeciesDetail | null;
  loading: boolean;
  error: PokemonError | null;
  refetch: () => void;
}

export interface UseRandomPokemonReturn {
  pokemon: Pokemon | null;
  loading: boolean;
  error: PokemonError | null;
  fetchRandomPokemon: () => void;
}

// 常量类型
export type PokemonTypeName =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export type StatName =
  | 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
