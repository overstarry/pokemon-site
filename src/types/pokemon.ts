// Pokemon related TypeScript type definitions

// PokeAPI raw response interfaces
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

// Basic Pokemon interface (for list display)
export interface Pokemon {
  id: number;
  name: string;
  url?: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  height?: number;
  weight?: number;
}

// Detailed Pokemon interface (for detail pages)
export interface PokemonDetail extends Pokemon {
  height: number;
  weight: number;
  base_experience: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  species: PokemonSpecies;
}

// Pokemon species information interface
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

// API response interfaces
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// Component Props interfaces
export interface PokemonGridProps {
  limit?: number;
  searchTerm?: string;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  showShiny?: boolean;
}

// Error types
export interface PokemonError {
  message: string;
  status?: number;
}

// Hook return types
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

// Constant types
export type PokemonTypeName =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export type StatName =
  | 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
