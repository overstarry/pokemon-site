'use client';

export const runtime = 'edge';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Button, Card, CardContent, Loading, ErrorMessage } from '@/components/ui';
import { PokemonImage } from '@/components/ui/PokemonImage';
import { TYPE_COLORS, TYPE_TRANSLATIONS, STAT_TRANSLATIONS, DEFAULT_CONFIG } from '@/constants/pokemon';
import { getPokemonImageUrl, formatPokemonId, getPokemonDescription } from '@/lib/api';
import { usePokemonDetail } from '@/hooks';
import { cn } from '@/lib/utils';

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { pokemon, species, loading, error } = usePokemonDetail(id);
  const [showShiny, setShowShiny] = useState(false);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading
            text="Loading..."
            size="lg"
          />
        </div>
      </PageLayout>
    );
  }

  if (error || !pokemon) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <ErrorMessage
            title={error?.message || 'Pokemon not found'}
            message="Please check if the Pokemon ID is correct"
            showRetry={false}
          />
          <div className="mt-4">
            <Button asChild>
              <Link href="/pokemon">
                Back to Pokédex
              </Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const description = species ? getPokemonDescription(species) : 'No description available';

  return (
    <PageLayout>

      <PageContainer className="py-8">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="outline">
            <Link href="/pokemon">
              ← Back to Pokédex
            </Link>
          </Button>

          <div className="flex gap-2">
            {pokemon.id > 1 && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/pokemon/${pokemon.id - 1}`}>
                  ← Previous
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" size="sm">
              <Link href={`/pokemon/${pokemon.id + 1}`}>
                Next →
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Card variant="glass" className="overflow-hidden">
          <CardContent className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Image and Basic Info */}
            <div className="text-center">
              <div className="mb-4">
                <span className="text-white/60 text-lg font-mono">
                  {formatPokemonId(pokemon.id)}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white mb-6 capitalize">
                {pokemon.name}
              </h1>

              {/* Pokemon Image */}
              <div className="relative w-80 h-80 mx-auto mb-6">
                <PokemonImage
                  src={getPokemonImageUrl(pokemon, showShiny)}
                  alt={pokemon.name}
                  pokemonId={pokemon.id}
                  fill
                  sizes={DEFAULT_CONFIG.DETAIL_IMAGE_SIZE}
                  priority
                />
              </div>

              {/* Shiny Toggle */}
              <div className="mb-6">
                <Button
                  onClick={() => setShowShiny(!showShiny)}
                  variant={showShiny ? 'primary' : 'outline'}
                >
                  ✨ {showShiny ? 'Normal Form' : 'Shiny Form'}
                </Button>
              </div>

              {/* Types */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className={cn(
                      'text-white font-bold py-2 px-4 rounded-full text-lg',
                      TYPE_COLORS[type.type.name as keyof typeof TYPE_COLORS] || 'bg-gray-400'
                    )}
                  >
                    {TYPE_TRANSLATIONS[type.type.name as keyof typeof TYPE_TRANSLATIONS] || type.type.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-white/90 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Right Column - Stats and Details */}
            <div className="space-y-6">
              {/* Basic Stats */}
              <Card variant="glass" className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/60">Height</span>
                    <p className="text-white font-bold text-lg">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <span className="text-white/60">Weight</span>
                    <p className="text-white font-bold text-lg">{pokemon.weight / 10} kg</p>
                  </div>
                  <div>
                    <span className="text-white/60">Base Experience</span>
                    <p className="text-white font-bold text-lg">{pokemon.base_experience}</p>
                  </div>
                </div>
              </Card>

              {/* Abilities */}
              <Card variant="glass" className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Abilities</h3>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={cn(
                        'py-1 px-3 rounded-full text-sm font-bold',
                        ability.is_hidden
                          ? 'bg-purple-500 text-white'
                          : 'bg-blue-500 text-white'
                      )}>
                        {ability.ability.name}
                      </span>
                      {ability.is_hidden && (
                        <span className="text-white/60 text-sm">(Hidden Ability)</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Base Stats */}
              <Card variant="glass" className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white/80 font-medium">
                          {STAT_TRANSLATIONS[stat.stat.name as keyof typeof STAT_TRANSLATIONS] || stat.stat.name}
                        </span>
                        <span className="text-white font-bold">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(stat.base_stat / 255 * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold text-lg">
                        {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </PageLayout>
  );
}
