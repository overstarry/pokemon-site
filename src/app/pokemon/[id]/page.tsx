import type { Metadata } from 'next';
import { fetchPokemonDetail, fetchPokemonSpecies, getPokemonImageUrl, formatPokemonId, getPokemonDescription } from '@/lib/api';
import PokemonDetailClient from './PokemonDetailClient';

export const runtime = 'edge';

// Generate dynamic metadata for each Pokemon page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const pokemon = await fetchPokemonDetail(id);
    const species = await fetchPokemonSpecies(pokemon.species.url);
    const description = getPokemonDescription(species);
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const pokemonTypes = pokemon.types.map(t => t.type.name).join('/');

    return {
      title: `${pokemonName} - Pokémon #${formatPokemonId(pokemon.id)} | PokeVerse`,
      description: `Discover ${pokemonName}, a ${pokemonTypes} type Pokémon. ${description.slice(0, 120)}${description.length > 120 ? '...' : ''}`,
      keywords: [
        pokemon.name,
        pokemonName,
        'pokemon',
        'pokedex',
        'pokédex',
        'pokemon database',
        'pokemon encyclopedia',
        'pokemon stats',
        'pokemon information',
        'pokemon guide',
        ...pokemon.types.map(t => `${t.type.name} type pokemon`),
        ...pokemon.types.map(t => `${t.type.name} pokemon list`),
        ...pokemon.abilities.map(a => a.ability.name),
        ...pokemon.abilities.map(a => `pokemon with ${a.ability.name}`),
        `pokemon ${pokemon.id}`,
        `pokemon number ${pokemon.id}`,
        `generation pokemon`,
        `${pokemonName} pokemon`,
        `${pokemonName} stats`,
        `${pokemonName} abilities`,
        `${pokemonName} evolution`,
        'nintendo pokemon',
        'game freak pokemon'
      ],
      openGraph: {
        title: `${pokemonName} - Pokémon #${formatPokemonId(pokemon.id)}`,
        description: description.slice(0, 200),
        images: [
          {
            url: getPokemonImageUrl(pokemon, false),
            width: 475,
            height: 475,
            alt: `${pokemonName} official artwork`,
          }
        ],
        type: 'article',
        siteName: 'PokeVerse',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${pokemonName} - Pokémon #${formatPokemonId(pokemon.id)}`,
        description: description.slice(0, 200),
        images: [getPokemonImageUrl(pokemon, false)],
      },
      alternates: {
        canonical: `/pokemon/${id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for Pokemon:', id, error);
    return {
      title: 'Pokémon Not Found | PokeVerse',
      description: 'The requested Pokémon could not be found. Please check the Pokémon ID and try again.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function PokemonDetailPage() {
  return <PokemonDetailClient />;
}
