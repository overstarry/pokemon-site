import type {
  Pokemon,
  PokemonDetail,
  PokemonSpeciesDetail,
  PokemonListResponse,
  TypeDetailResponse,
  PokemonError,
  PokemonApiResponse
} from '@/types/pokemon';
import { API_CONFIG, ERROR_MESSAGES } from '@/constants/pokemon';

// Basic API call function
async function apiCall<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Provide more specific error messages based on status code
      let errorMessage = `HTTP error! status: ${response.status}`;
      if (response.status === 404) {
        errorMessage = 'Pokemon not found';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request parameters';
      } else if (response.status >= 500) {
        errorMessage = 'Server error, please try again later';
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

// Custom error class
export class PokemonApiError extends Error implements PokemonError {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PokemonApiError';
    this.status = status;
  }
}

// Get Pokemon list
export async function fetchPokemonList(
  limit: number = API_CONFIG.LIMITS.DEFAULT_LIMIT,
  offset: number = 0
): Promise<PokemonListResponse> {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}?limit=${limit}&offset=${offset}`;
  return apiCall<PokemonListResponse>(url);
}

// Get basic information for a single Pokemon
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

// Get detailed information for a single Pokemon
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

// Get Pokemon species information
export async function fetchPokemonSpecies(url: string): Promise<PokemonSpeciesDetail> {
  return apiCall<PokemonSpeciesDetail>(url);
}

// Get detailed information for multiple Pokemon (for list pages)
export async function fetchPokemonListWithDetails(
  limit: number = API_CONFIG.LIMITS.DEFAULT_LIMIT,
  offset: number = 0
): Promise<{ pokemon: Pokemon[]; total: number }> {
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
    const filteredPokemon = pokemonDetails.filter(pokemon => pokemon.id > 0);
    
    return {
      pokemon: filteredPokemon,
      total: listResponse.count
    };
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

// Utility function: Check if Pokemon has shiny version
export function hasShinyVersion(pokemon: Pokemon): boolean {
  return !!(
    pokemon.sprites.other?.['official-artwork']?.front_shiny ||
    pokemon.sprites.front_shiny
  );
}

// Utility function: Get Pokemon image URL (with fallback options)
export function getPokemonImageUrl(pokemon: Pokemon, useShiny: boolean = false): string {
  // Priority order of image sources
  const imageSources = [];

  if (useShiny && hasShinyVersion(pokemon)) {
    // Shiny version (only if available)
    if (pokemon.sprites.other?.['official-artwork']?.front_shiny) {
      imageSources.push(pokemon.sprites.other['official-artwork'].front_shiny);
    }
    if (pokemon.sprites.front_shiny) {
      imageSources.push(pokemon.sprites.front_shiny);
    }
  }

  // Normal version (always as fallback)
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

// Fetch complete type details including damage relations
export async function fetchTypeDetail(type: string): Promise<TypeDetailResponse | null> {
  try {
    const typeData = await apiCall<TypeDetailResponse>(`${API_CONFIG.BASE_URL}/type/${type}`);
    return typeData;
  } catch (error) {
    console.error(`Error fetching ${type} type details:`, error);
    return null;
  }
}

// Fetch Pokemon by type with support for primary/secondary typing
export async function fetchPokemonByTypeWithSlots(type: string): Promise<{
  primary: Pokemon[];
  secondary: Pokemon[];
}> {
  try {
    const typeData = await apiCall<TypeDetailResponse>(`${API_CONFIG.BASE_URL}/type/${type}`);
    
    // Separate Pokemon by slot (1 = primary, 2 = secondary)
    const primaryEntries = typeData.pokemon.filter(entry => entry.slot === 1);
    const secondaryEntries = typeData.pokemon.filter(entry => entry.slot === 2);
    
    // Fetch Pokemon data for each group
    const [primaryPromises, secondaryPromises] = await Promise.all([
      primaryEntries.map((entry) => {
        const pokemonId = entry.pokemon.url.split('/').filter(Boolean).pop();
        if (!pokemonId) {
          throw new Error('Invalid Pokemon URL format');
        }
        return fetchPokemonBasic(pokemonId);
      }),
      secondaryEntries.map((entry) => {
        const pokemonId = entry.pokemon.url.split('/').filter(Boolean).pop();
        if (!pokemonId) {
          throw new Error('Invalid Pokemon URL format');
        }
        return fetchPokemonBasic(pokemonId);
      })
    ]);
    
    const [primaryList, secondaryList] = await Promise.all([
      Promise.all(primaryPromises),
      Promise.all(secondaryPromises)
    ]);
    
    return {
      primary: primaryList.sort((a, b) => a.id - b.id),
      secondary: secondaryList.sort((a, b) => a.id - b.id)
    };
  } catch (error) {
    console.error(`Error fetching ${type} type Pokemon:`, error);
    return { primary: [], secondary: [] };
  }
}

// Legacy function - fetch all Pokemon of a type (backwards compatibility)
export async function fetchPokemonByType(type: string): Promise<Pokemon[]> {
  try {
    const { primary, secondary } = await fetchPokemonByTypeWithSlots(type);
    return [...primary, ...secondary].sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error(`Error fetching ${type} type Pokemon:`, error);
    return [];
  }
}
