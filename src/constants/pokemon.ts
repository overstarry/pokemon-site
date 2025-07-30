import type { PokemonTypeName, StatName } from '@/types/pokemon';

// Pokemon 属性颜色映射
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

// Pokemon 属性中文翻译
export const TYPE_TRANSLATIONS: Record<PokemonTypeName, string> = {
  normal: '一般',
  fire: '火',
  water: '水',
  electric: '电',
  grass: '草',
  ice: '冰',
  fighting: '格斗',
  poison: '毒',
  ground: '地面',
  flying: '飞行',
  psychic: '超能力',
  bug: '虫',
  rock: '岩石',
  ghost: '幽灵',
  dragon: '龙',
  dark: '恶',
  steel: '钢',
  fairy: '妖精',
};

// Pokemon 属性渐变色（用于更丰富的视觉效果）
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

// 种族值中文翻译
export const STAT_TRANSLATIONS: Record<StatName, string> = {
  hp: 'HP',
  attack: '攻击',
  defense: '防御',
  'special-attack': '特攻',
  'special-defense': '特防',
  speed: '速度',
};

// 种族值颜色（根据数值范围）
export const STAT_COLORS = {
  low: 'from-red-400 to-red-500',      // 0-50
  medium: 'from-yellow-400 to-orange-500', // 51-100
  high: 'from-green-400 to-green-500',     // 101-150
  veryHigh: 'from-blue-400 to-purple-500', // 151+
};

// API 相关常量
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
    RANDOM_RANGE: 1010, // 当前宝可梦总数
  },
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  POKEMON_GRID_LIMIT: 20,
  SEARCH_DEBOUNCE_MS: 300,
  IMAGE_SIZES: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  DETAIL_IMAGE_SIZE: '320px',
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  FETCH_POKEMON_FAILED: '获取宝可梦数据失败',
  POKEMON_NOT_FOUND: '宝可梦不存在',
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  RANDOM_POKEMON_FAILED: '获取随机宝可梦失败，请重试',
  SEARCH_FAILED: '搜索失败，请重试',
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  POKEMON_LOADED: '宝可梦数据加载成功',
  SEARCH_COMPLETED: '搜索完成',
} as const;

// 动画配置
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

// 响应式断点
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;
