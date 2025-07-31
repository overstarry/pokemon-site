import type {
  Pokemon,
  PokemonDetail,
  PokemonSpeciesDetail,
  PokemonListResponse,
  PokemonError,
  PokemonApiResponse
} from '@/types/pokemon';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants/pokemon';

// 基础 API 调用函数
async function apiCall<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // 根据状态码提供更具体的错误信息
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = '未找到指定的宝可梦';
      } else if (response.status === 400) {
        errorMessage = '请求参数无效';
      } else if (response.status >= 500) {
        errorMessage = '服务器错误，请稍后重试';
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof PokemonApiError) {
      throw error;
    }

    throw new PokemonApiError(
      error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR
    );
  }
}

// 自定义错误类
export class PokemonApiError extends Error implements PokemonError {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PokemonApiError';
    this.status = status;
  }
}

// 获取 Pokemon 列表
export async function fetchPokemonList(
  limit: number = API_CONFIG.LIMITS.DEFAULT_LIMIT,
  offset: number = 0
): Promise<PokemonListResponse> {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}?limit=${limit}&offset=${offset}`;
  return apiCall<PokemonListResponse>(url);
}

// 获取单个 Pokemon 的基本信息
export async function fetchPokemonBasic(identifier: string | number): Promise<Pokemon> {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}/${identifier}`;
  const data = await apiCall<PokemonApiResponse>(url);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
    types: data.types,
    height: data.height,
    weight: data.weight,
  };
}

// 获取单个 Pokemon 的详细信息
export async function fetchPokemonDetail(identifier: string | number): Promise<PokemonDetail> {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}/${identifier}`;
  const data = await apiCall<PokemonApiResponse>(url);

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    sprites: data.sprites,
    types: data.types,
    stats: data.stats,
    abilities: data.abilities,
    species: data.species,
  };
}

// 获取 Pokemon 物种信息
export async function fetchPokemonSpecies(url: string): Promise<PokemonSpeciesDetail> {
  return apiCall<PokemonSpeciesDetail>(url);
}

// Get detailed information for multiple Pokemon (for list pages)
export async function fetchPokemonListWithDetails(
  limit: number = API_CONFIG.LIMITS.DEFAULT_LIMIT,
  offset: number = 0
): Promise<Pokemon[]> {
  try {
    // First get Pokemon list
    const listResponse = await fetchPokemonList(limit, offset);

    // Get detailed information for each Pokemon in parallel
    const pokemonDetails = await Promise.all(
      listResponse.results.map(async (pokemon) => {
        try {
          return await fetchPokemonBasic(pokemon.name);
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}:`, error);
          // Return basic info to avoid entire list failure
          return {
            id: 0,
            name: pokemon.name,
            url: pokemon.url,
            sprites: {
              front_default: '',
              other: {
                'official-artwork': {
                  front_default: ''
                }
              }
            },
            types: [],
          };
        }
      })
    );

    // Filter out failed Pokemon (id is 0)
    return pokemonDetails.filter(pokemon => pokemon.id > 0);
  } catch (error) {
    console.error('Failed to fetch Pokemon list with details:', error);
    throw new PokemonApiError(ERROR_MESSAGES.FETCH_POKEMON_FAILED);
  }
}

// Get random Pokemon
export async function fetchRandomPokemon(): Promise<Pokemon> {
  try {
    const randomId = Math.floor(Math.random() * API_CONFIG.LIMITS.RANDOM_RANGE) + 1;
    return await fetchPokemonBasic(randomId);
  } catch (error) {
    console.error('Failed to fetch random Pokemon:', error);
    throw new PokemonApiError(ERROR_MESSAGES.RANDOM_POKEMON_FAILED);
  }
}

// Search Pokemon (by name)
export async function searchPokemon(query: string): Promise<Pokemon[]> {
  try {
    if (!query.trim()) {
      return [];
    }

    // Clean and validate search query
    const cleanQuery = query.trim().toLowerCase()
      .replace(/\s+/g, '-')  // Convert spaces to hyphens
      .replace(/[^a-z0-9\-]/g, ''); // Remove other special characters

    // Validate if query is valid (at least one character)
    if (!cleanQuery || cleanQuery.length === 0) {
      return [];
    }

    // Try direct search by name or ID
    try {
      const pokemon = await fetchPokemonBasic(cleanQuery);
      return [pokemon];
    } catch {
      // If direct search fails, return empty array
      // In real applications, more complex search logic can be implemented
      return [];
    }
  } catch (error) {
    console.error('Search failed:', error);
    throw new PokemonApiError(ERROR_MESSAGES.SEARCH_FAILED);
  }
}

// 工具函数：获取 Pokemon 图片 URL（带备用方案）
export function getPokemonImageUrl(pokemon: Pokemon, useShiny: boolean = false): string {
  // 优先级顺序的图片源
  const imageSources = [];

  if (useShiny) {
    // 闪光版本
    if (pokemon.sprites.other?.['official-artwork']?.front_shiny) {
      imageSources.push(pokemon.sprites.other['official-artwork'].front_shiny);
    }
    if (pokemon.sprites.front_shiny) {
      imageSources.push(pokemon.sprites.front_shiny);
    }
  }

  // 普通版本
  if (pokemon.sprites.other?.['official-artwork']?.front_default) {
    imageSources.push(pokemon.sprites.other['official-artwork'].front_default);
  }
  if (pokemon.sprites.front_default) {
    imageSources.push(pokemon.sprites.front_default);
  }

  // Backup CDN image (using Pokemon ID)
  imageSources.push(`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id.toString().padStart(3, '0')}.png`);

  // Return the first available image URL
  return imageSources[0] || '';
}

// Get fallback image URL
export function getFallbackImageUrl(pokemonId: number): string {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId.toString().padStart(3, '0')}.png`;
}

// Utility function: Format Pokemon ID
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

// Utility function: Get Pokemon description (from species info)
export function getPokemonDescription(species: PokemonSpeciesDetail): string {
  const englishEntry = species.flavor_text_entries
    .find(entry => entry.language.name === 'en');

  return englishEntry?.flavor_text.replace(/\f/g, ' ') || 'No description available';
}
