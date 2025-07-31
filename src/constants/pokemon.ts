import type { PokemonTypeName, StatName } from '@/types/pokemon';

// Pokemon type color mapping
export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

// Pokemon type English translations
export const TYPE_TRANSLATIONS: Record<PokemonTypeName, string> = {
  normal: 'Normal',
  fire: 'Fire',
  water: 'Water',
  electric: 'Electric',
  grass: 'Grass',
  ice: 'Ice',
  fighting: 'Fighting',
  poison: 'Poison',
  ground: 'Ground',
  flying: 'Flying',
  psychic: 'Psychic',
  bug: 'Bug',
  rock: 'Rock',
  ghost: 'Ghost',
  dragon: 'Dragon',
  dark: 'Dark',
  steel: 'Steel',
  fairy: 'Fairy',
};

// Pokemon type gradient colors (for richer visual effects)
export const TYPE_GRADIENTS: Record<PokemonTypeName, string> = {
  normal: 'from-gray-400 to-gray-500',
  fire: 'from-red-400 to-red-600',
  water: 'from-blue-400 to-blue-600',
  electric: 'from-yellow-300 to-yellow-500',
  grass: 'from-green-400 to-green-600',
  ice: 'from-blue-200 to-blue-400',
  fighting: 'from-red-600 to-red-800',
  poison: 'from-purple-400 to-purple-600',
  ground: 'from-yellow-500 to-yellow-700',
  flying: 'from-indigo-300 to-indigo-500',
  psychic: 'from-pink-400 to-pink-600',
  bug: 'from-green-300 to-green-500',
  rock: 'from-yellow-700 to-yellow-900',
  ghost: 'from-purple-600 to-purple-800',
  dragon: 'from-indigo-600 to-indigo-800',
  dark: 'from-gray-700 to-gray-900',
  steel: 'from-gray-400 to-gray-600',
  fairy: 'from-pink-200 to-pink-400',
};

// Stat translations
export const STAT_TRANSLATIONS: Record<StatName, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

// Stat colors (based on value ranges)
export const STAT_COLORS = {
  low: 'from-red-400 to-red-500',      // 0-50
  medium: 'from-yellow-400 to-orange-500', // 51-100
  high: 'from-green-400 to-green-500',     // 101-150
  veryHigh: 'from-blue-400 to-purple-500', // 151+
};

// API related constants
export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  ENDPOINTS: {
    POKEMON: '/pokemon',
    SPECIES: '/pokemon-species',
    TYPE: '/type',
  },
  LIMITS: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 151,
    RANDOM_RANGE: 1010, // Current total Pokemon count
  },
} as const;

// Default configuration
export const DEFAULT_CONFIG = {
  POKEMON_GRID_LIMIT: 20,
  SEARCH_DEBOUNCE_MS: 300,
  IMAGE_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  DETAIL_IMAGE_SIZE: '320px',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FETCH_POKEMON_FAILED: 'Failed to fetch Pokemon data',
  POKEMON_NOT_FOUND: 'Pokemon not found',
  NETWORK_ERROR: 'Network connection failed, please check your network settings',
  RANDOM_POKEMON_FAILED: 'Failed to fetch random Pokemon, please try again',
  SEARCH_FAILED: 'Search failed, please try again',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  POKEMON_LOADED: 'Pokemon data loaded successfully',
  SEARCH_COMPLETED: 'Search completed',
} as const;

// Animation configuration
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;
