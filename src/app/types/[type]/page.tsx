import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { TypeEffectivenessChart } from '@/components/pokemon/TypeEffectivenessChart';
import { TypeMatchupCard } from '@/components/pokemon/TypeMatchupCard';
import { TypeMoveRecommendations } from '@/components/pokemon/TypeMoveRecommendations';
import { TypeLanguageNames } from '@/components/pokemon/TypeLanguageNames';
import { TypePokemonGrid } from '@/components/pokemon/TypePokemonGrid';
import { Breadcrumb } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import { fetchPokemonByTypeWithSlots, fetchTypeDetail } from '@/lib/api';
import type { Pokemon, TypeDetailResponse } from '@/types/pokemon';

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
  
  // Fetch type details and Pokemon data
  let typeDetails: TypeDetailResponse | null = null;
  let pokemonData: { primary: Pokemon[]; secondary: Pokemon[] } = { primary: [], secondary: [] };
  
  try {
    [typeDetails, pokemonData] = await Promise.all([
      fetchTypeDetail(type).catch(() => null),
      fetchPokemonByTypeWithSlots(type).catch(() => ({ primary: [], secondary: [] }))
    ]);
  } catch (error) {
    console.error('Error fetching type data:', error);
    // Keep the null/empty defaults
  }
  
  // const totalPokemon = pokemonData.primary.length + pokemonData.secondary.length;

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
            {capitalizedType} Type
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Complete guide to {capitalizedType} type Pokémon, including type effectiveness, 
            battle strategies, and comprehensive Pokémon database.
          </p>
          
          {/* Generation Info */}
          {typeDetails?.generation && (
            <div className="text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                Introduced in {typeDetails.generation.name.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          )}
        </div>

        {/* Type Effectiveness Section */}
        {typeDetails?.damage_relations && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Type Effectiveness
              </h2>
              <p className="text-muted-foreground">
                Understanding {capitalizedType} type advantages and weaknesses in battle
              </p>
            </div>
            
            <div className="mb-8">
              <TypeEffectivenessChart 
                damageRelations={typeDetails.damage_relations}
                typeName={capitalizedType}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TypeMatchupCard 
                damageRelations={typeDetails.damage_relations}
                typeName={capitalizedType}
              />
              
              {typeDetails.moves && (
                <TypeMoveRecommendations
                  typeName={capitalizedType}
                  damageRelations={typeDetails.damage_relations}
                  moves={typeDetails.moves}
                />
              )}
            </div>
          </div>
        )}

        {/* Language Names Section */}
        {typeDetails?.names && (
          <div className="mb-12">
            <TypeLanguageNames
              typeName={capitalizedType}
              names={typeDetails.names}
            />
          </div>
        )}

        {/* Pokemon Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {capitalizedType} Type Pokémon
            </h2>
            <p className="text-muted-foreground">
              Complete list of Pokémon with {capitalizedType} typing
            </p>
          </div>
          
          <TypePokemonGrid
            primaryPokemon={pokemonData.primary}
            secondaryPokemon={pokemonData.secondary}
            typeName={capitalizedType}
          />
        </div>
        {/* Back to Types Link */}
        <div className="text-center">
          <Link 
            href="/types" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            ← Explore All Types
          </Link>
        </div>
      </PageContainer>
    </PageLayout>
  );
}