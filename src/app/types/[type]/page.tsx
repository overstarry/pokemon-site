import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageLayout, PageContainer } from '@/components/layout';
import { StaggeredContainer } from '@/components/ui/AnimatedContainer';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { Card, CardContent, Breadcrumb } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import { fetchPokemonByType } from '@/lib/api';
import type { Pokemon } from '@/types/pokemon';

// Valid Pokemon types
const VALID_TYPES = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 
  'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
] as const;

type PokemonType = typeof VALID_TYPES[number];

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type: type,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  
  if (!VALID_TYPES.includes(type as PokemonType)) {
    return {
      title: 'Type Not Found | PokeVerse',
      description: 'The requested Pokémon type could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const typeName = TYPE_TRANSLATIONS[type as PokemonType] || type;
  const capitalizedType = typeName.charAt(0).toUpperCase() + typeName.slice(1);

  return {
    title: `${capitalizedType} Type Pokémon - Complete List | PokeVerse`,
    description: `Discover all ${capitalizedType} type Pokémon with detailed stats, abilities, and evolution information. Complete database of ${capitalizedType} type Pokémon from all generations.`,
    keywords: [
      `${type} type pokemon`,
      `${type} pokemon list`,
      `${type} type pokemon database`,
      `best ${type} type pokemon`,
      `strongest ${type} pokemon`,
      `${type} pokemon stats`,
      `${type} pokemon guide`,
      `all ${type} pokemon`,
      `${typeName} pokemon`,
      `pokemon ${type} type`,
      'pokemon types',
      'pokemon database',
      'pokemon encyclopedia'
    ],
    openGraph: {
      title: `${capitalizedType} Type Pokémon | PokeVerse`,
      description: `Complete list of all ${capitalizedType} type Pokémon with stats and evolution information.`,
      type: 'website',
    },
    alternates: {
      canonical: `/types/${type}`,
    },
  };
}

export default async function PokemonTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  
  if (!VALID_TYPES.includes(type as PokemonType)) {
    notFound();
  }

  const typeName = TYPE_TRANSLATIONS[type as PokemonType] || type;
  const capitalizedType = typeName.charAt(0).toUpperCase() + typeName.slice(1);
  
  let pokemonList: Pokemon[];
  try {
    pokemonList = await fetchPokemonByType(type);
  } catch (error) {
    console.error('Error fetching Pokemon by type:', error);
    pokemonList = [];
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Types', href: '/types' },
    { label: capitalizedType, href: `/types/${type}` },
  ];

  return (
    <PageLayout>
      <PageContainer className="py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div 
              className={`
                w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl
                ${TYPE_COLORS[type as PokemonType] || 'bg-gray-400'}
              `}
            >
              {typeName[0]?.toUpperCase()}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {capitalizedType} Type Pokémon
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover all {capitalizedType} type Pokémon with their unique abilities, 
            stats, and evolution chains. Complete database from all generations.
          </p>
          
          {pokemonList.length > 0 && (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {pokemonList.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {capitalizedType} type Pokémon found
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pokemon Grid */}
        {pokemonList.length > 0 ? (
          <StaggeredContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          </StaggeredContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No {capitalizedType} type Pokémon found. Please try again later.
            </p>
          </div>
        )}
      </PageContainer>
    </PageLayout>
  );
}