import type {
  Pokemon,
  PokemonDetail,
  PokemonSpeciesDetail,
  PokemonListResponse,
  PokemonError
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
  const data = await apiCall<any>(url);

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
  const data = await apiCall<any>(url);

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

// 获取多个 Pokemon 的详细信息（用于列表页）
export async function fetchPokemonListWithDetails(
  limit: number = API_CONFIG.LIMITS.DEFAULT_LIMIT,
  offset: number = 0
): Promise<Pokemon[]> {
  try {
    // 首先获取 Pokemon 列表
    const listResponse = await fetchPokemonList(limit, offset);

    // 并行获取每个 Pokemon 的详细信息
    const pokemonDetails = await Promise.all(
      listResponse.results.map(async (pokemon) => {
        try {
          return await fetchPokemonBasic(pokemon.name);
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}:`, error);
          // 返回基本信息，避免整个列表失败
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

    // 过滤掉获取失败的 Pokemon（id 为 0）
    return pokemonDetails.filter(pokemon => pokemon.id > 0);
  } catch (error) {
    console.error('Failed to fetch Pokemon list with details:', error);
    throw new PokemonApiError(ERROR_MESSAGES.FETCH_POKEMON_FAILED);
  }
}

// 获取随机 Pokemon
export async function fetchRandomPokemon(): Promise<Pokemon> {
  try {
    const randomId = Math.floor(Math.random() * API_CONFIG.LIMITS.RANDOM_RANGE) + 1;
    return await fetchPokemonBasic(randomId);
  } catch (error) {
    console.error('Failed to fetch random Pokemon:', error);
    throw new PokemonApiError(ERROR_MESSAGES.RANDOM_POKEMON_FAILED);
  }
}

// 搜索 Pokemon（通过名称）
export async function searchPokemon(query: string): Promise<Pokemon[]> {
  try {
    if (!query.trim()) {
      return [];
    }

    // 清理和验证搜索查询
    const cleanQuery = query.trim().toLowerCase()
      .replace(/\s+/g, '-')  // 将空格转换为连字符
      .replace(/[^a-z0-9\-]/g, ''); // 移除其他特殊字符

    // 验证查询是否有效（至少包含一个字符）
    if (!cleanQuery || cleanQuery.length === 0) {
      return [];
    }

    // 尝试直接通过名称或ID搜索
    try {
      const pokemon = await fetchPokemonBasic(cleanQuery);
      return [pokemon];
    } catch (error) {
      // 如果直接搜索失败，返回空数组
      // 在实际应用中，可以实现更复杂的搜索逻辑
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

  // 备用CDN图片（使用Pokemon ID）
  imageSources.push(`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id.toString().padStart(3, '0')}.png`);

  // 返回第一个可用的图片URL
  return imageSources[0] || '';
}

// 获取备用图片URL
export function getFallbackImageUrl(pokemonId: number): string {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonId.toString().padStart(3, '0')}.png`;
}

// 工具函数：格式化 Pokemon 编号
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

// 工具函数：获取 Pokemon 描述（从物种信息中）
export function getPokemonDescription(species: PokemonSpeciesDetail): string {
  const englishEntry = species.flavor_text_entries
    .find(entry => entry.language.name === 'en');

  return englishEntry?.flavor_text.replace(/\f/g, ' ') || '暂无描述';
}
