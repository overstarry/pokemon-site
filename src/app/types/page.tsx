import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Pokémon Types - Complete Type Guide | PokeVerse',
  description: 'Explore all 18 Pokémon types including Fire, Water, Grass, Electric and more. Complete guide to Pokémon type effectiveness, strengths, and weaknesses.',
  keywords: [
    'pokemon types',
    'pokemon type chart',
    'fire type pokemon',
    'water type pokemon',
    'grass type pokemon',
    'electric type pokemon',
    'psychic type pokemon',
    'fighting type pokemon',
    'poison type pokemon',
    'ground type pokemon',
    'flying type pokemon',
    'bug type pokemon',
    'rock type pokemon',
    'ghost type pokemon',
    'dragon type pokemon',
    'dark type pokemon',
    'steel type pokemon',
    'fairy type pokemon',
    'pokemon type effectiveness',
    'pokemon type guide',
    'type matchups pokemon'
  ],
  openGraph: {
    title: 'Pokémon Types - Complete Type Guide | PokeVerse',
    description: 'Explore all 18 Pokémon types and discover which Pokémon belong to each type category.',
    type: 'website',
  },
  alternates: {
    canonical: '/types',
  },
};

// All Pokemon types
const POKEMON_TYPES = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
  'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
] as const;

export default function PokemonTypesPage() {
  return (
    <PageLayout>
      <WebsiteStructuredData 
        title="Pokémon Types Guide | PokeVerse"
        description="Complete guide to all 18 Pokémon types with detailed information about type effectiveness and Pokémon lists."
      />
      
      <PageContainer className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pokémon Types
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover all 18 Pokémon types and explore the unique characteristics, 
            strengths, and weaknesses that define each type category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {POKEMON_TYPES.map((type) => (
            <Link 
              key={type} 
              href={`/types/${type}`}
              className="group block"
            >
              <Card className="h-full hover:border-secondary/50 transition-all duration-200 group-hover:shadow-lg">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div 
                    className={`
                      w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl
                      group-hover:scale-110 transition-transform duration-200
                      ${TYPE_COLORS[type] || 'bg-gray-400'}
                    `}
                  >
                    {TYPE_TRANSLATIONS[type]?.[0]?.toUpperCase() || type[0].toUpperCase()}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 capitalize">
                    {TYPE_TRANSLATIONS[type] || type}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Explore all {TYPE_TRANSLATIONS[type] || type} type Pokémon
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/pokemon" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Browse All Pokémon →
          </Link>
        </div>
      </PageContainer>
    </PageLayout>
  );
}