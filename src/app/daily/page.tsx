'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageLayout, PageContainer, PageTitle } from '@/components/layout';
import { Button, Card, CardContent, Loading, ErrorMessage, Breadcrumb } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS, DEFAULT_CONFIG } from '@/constants/pokemon';
import { getPokemonImageUrl, formatPokemonId, hasShinyVersion } from '@/lib/api';
// import { formatDateForDisplay } from '@/lib/daily';
import { useDailyPokemon } from '@/hooks';
import { cn } from '@/lib/utils';

// Generate breadcrumb navigation
function generateDailyBreadcrumbs() {
  return [
    { label: 'Home', href: '/' },
    { label: 'Daily Pokémon', href: '/daily' },
  ];
}

export default function DailyPokemonPage() {
  const { pokemon, loading, error, refetch } = useDailyPokemon();
  const [showShiny, setShowShiny] = useState(false);

  return (
    <PageLayout>
      <PageContainer>
        {/* Breadcrumb navigation */}
        <Breadcrumb items={generateDailyBreadcrumbs()} />

        {/* Page title */}
        <PageTitle
          title="Daily Pokémon"
        />

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center">
            <Loading size="lg" />
          </div>
        )}

        {/* Error state */}
        {error && (
          <ErrorMessage
            message={error.message}
            onRetry={refetch}
          />
        )}

        {/* Pokemon display */}
        {pokemon && !loading && (
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                {/* Pokemon Number */}
                <div className="text-muted-foreground text-lg font-mono mb-2">
                  {formatPokemonId(pokemon.id)}
                </div>

                {/* Pokemon Name */}
                <h2 className="text-4xl font-bold text-card-foreground mb-6 capitalize">
                  {pokemon.name}
                </h2>

                {/* Pokemon Image */}
                <div className="relative w-80 h-80 mx-auto mb-6">
                  <Image
                    src={getPokemonImageUrl(pokemon, showShiny)}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    sizes={DEFAULT_CONFIG.DETAIL_IMAGE_SIZE}
                  />
                </div>

                {/* Pokemon Types */}
                <div className="flex justify-center gap-2 mb-6">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={cn(
                        'px-4 py-2 rounded-full text-white font-medium text-sm',
                        TYPE_COLORS[typeInfo.type.name as keyof typeof TYPE_COLORS] || 'bg-gray-500'
                      )}
                    >
                      {TYPE_TRANSLATIONS[typeInfo.type.name as keyof typeof TYPE_TRANSLATIONS] || typeInfo.type.name}
                    </span>
                  ))}
                </div>

                {/* Pokemon Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-card-foreground/80">
                  <div>
                    <span className="text-muted-foreground">Height:</span>
                    <span className="ml-2 font-medium">{pokemon.height ? (pokemon.height / 10) : 'Unknown'} m</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="ml-2 font-medium">{pokemon.weight ? (pokemon.weight / 10) : 'Unknown'} kg</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="md">
                    <Link href={`/pokemon/${pokemon.id}`}>
                      📖 View Details
                    </Link>
                  </Button>

                  {hasShinyVersion(pokemon) && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setShowShiny(!showShiny)}
                    >
                      ✨ {showShiny ? 'Normal Form' : 'Shiny Form'}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="md"
                    onClick={refetch}
                  >
                    🔄 Refresh
                  </Button>
                </div>
              </CardContent>
            </Card>


          </div>
        )}
      </PageContainer>
    </PageLayout>
  );
}
