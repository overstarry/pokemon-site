import { getPokemonImageUrl, getPokemonDescription, formatPokemonId } from '@/lib/api';
import type { Pokemon, PokemonDetail, PokemonSpeciesDetail } from '@/types/pokemon';

interface PokemonStructuredDataProps {
  pokemon: Pokemon | PokemonDetail;
  species?: PokemonSpeciesDetail;
}

export function PokemonStructuredData({ pokemon, species }: PokemonStructuredDataProps) {
  const description = species ? getPokemonDescription(species) : `${pokemon.name} is a Pokémon with unique abilities and characteristics.`;
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Type guard to check if pokemon is PokemonDetail
  const isPokemonDetail = (p: Pokemon | PokemonDetail): p is PokemonDetail => {
    return 'base_experience' in p && 'stats' in p && 'abilities' in p;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Thing",
    "name": pokemonName,
    "alternateName": [
      pokemon.name,
      `Pokémon #${pokemon.id}`,
      `#${formatPokemonId(pokemon.id)}`
    ],
    "description": description,
    "image": {
      "@type": "ImageObject",
      "url": getPokemonImageUrl(pokemon, false),
      "width": 475,
      "height": 475,
      "caption": `${pokemonName} official artwork`
    },
    "identifier": {
      "@type": "PropertyValue",
      "name": "Pokédex Number",
      "value": pokemon.id.toString()
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Height",
        "value": `${(pokemon.height || 0) / 10} m`,
        "unitText": "meters"
      },
      {
        "@type": "PropertyValue",
        "name": "Weight",
        "value": `${(pokemon.weight || 0) / 10} kg`,
        "unitText": "kilograms"
      },
      {
        "@type": "PropertyValue",
        "name": "Base Experience",
        "value": isPokemonDetail(pokemon) ? pokemon.base_experience?.toString() || "Unknown" : "Unknown"
      },
      {
        "@type": "PropertyValue",
        "name": "Types",
        "value": pokemon.types.map(t => t.type.name).join(", ")
      },
      ...(isPokemonDetail(pokemon) ? [
        {
          "@type": "PropertyValue",
          "name": "Abilities",
          "value": pokemon.abilities.map(a => a.ability.name).join(", ")
        },
        {
          "@type": "PropertyValue",
          "name": "Base Stats Total",
          "value": pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0).toString()
        }
      ] : [])
    ],
    "category": "Pokémon",
    "keywords": [
      pokemon.name,
      pokemonName,
      "pokemon",
      "pokédex",
      ...pokemon.types.map(t => `${t.type.name} pokemon`),
      ...(isPokemonDetail(pokemon) ? pokemon.abilities.map(a => a.ability.name) : []),
      `pokemon ${pokemon.id}`,
      "nintendo",
      "game freak"
    ].join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `/pokemon/${pokemon.id}`
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "PokéDex",
      "description": "Complete Pokémon Encyclopedia and Database"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  title: string;
  description: string;
  url?: string;
}

export function WebsiteStructuredData({ title, description }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title || "PokéDex",
    "alternateName": ["Pokemon Database", "Pokémon Encyclopedia"],
    "description": description || "Complete Pokémon database with detailed information about all Pokémon species, their stats, abilities, and characteristics.",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://pokemon.jasminides.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "https://pokemon.jasminides.com"}/pokemon?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Pokémon Database",
      "description": "Complete list of all Pokémon with detailed information",
      "numberOfItems": "1000+"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PokéDex",
      "description": "Pokémon Information Database"
    },
    "inLanguage": "en-US",
    "keywords": "pokemon, pokédex, pokemon database, pokemon encyclopedia, pokemon stats, pokemon abilities, nintendo, game freak"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${process.env.NEXT_PUBLIC_BASE_URL || "https://pokemon.jasminides.com"}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  );
}
