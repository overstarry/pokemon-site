'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PageLayout, PageContainer, PageTitle } from '@/components/layout';
import { Button, Card, CardContent, Loading, ErrorMessage } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS, DEFAULT_CONFIG } from '@/constants/pokemon';
import { getPokemonImageUrl, formatPokemonId } from '@/lib/api';
import { useRandomPokemon } from '@/hooks';
import { cn } from '@/lib/utils';

export default function RandomPokemonPage() {
  const { pokemon, loading, error, fetchRandomPokemon } = useRandomPokemon(true);

  return (
    <PageLayout>

      <PageContainer className="py-16">
        <PageTitle
          title="🎲 Random Pokémon"
          subtitle="Let fate choose an amazing Pokémon companion for you!"
        />

        <div className="text-center mb-12">
          <Button
            onClick={fetchRandomPokemon}
            disabled={loading}
            loading={loading}
            size="lg"
          >
            {loading ? 'Drawing...' : '🎲 Draw Random Pokémon'}
          </Button>
        </div>

        {/* Pokemon Display */}
        {loading && (
          <Loading
            text="Finding an amazing Pokémon for you..."
            size="lg"
          />
        )}

        {error && (
          <ErrorMessage
            message={error.message}
            onRetry={fetchRandomPokemon}
          />
        )}

        {pokemon && !loading && (
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                {/* Pokemon Number */}
                <div className="text-white/60 text-lg font-mono mb-2">
                  {formatPokemonId(pokemon.id)}
                </div>

                {/* Pokemon Name */}
                <h2 className="text-4xl font-bold text-white mb-6 capitalize">
                  {pokemon.name}
                </h2>

                {/* Pokemon Image */}
                <div className="relative w-80 h-80 mx-auto mb-6">
                  <Image
                    src={getPokemonImageUrl(pokemon)}
                    alt={pokemon.name}
                    fill
                    className="object-contain"
                    sizes={DEFAULT_CONFIG.DETAIL_IMAGE_SIZE}
                  />
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

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <Card variant="glass" className="p-4">
                    <div className="text-white/60 mb-1">身高</div>
                    <div className="text-white font-bold text-xl">{pokemon.height ? (pokemon.height / 10) : 0} m</div>
                  </Card>
                  <Card variant="glass" className="p-4">
                    <div className="text-white/60 mb-1">体重</div>
                    <div className="text-white font-bold text-xl">{pokemon.weight ? (pokemon.weight / 10) : 0} kg</div>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="secondary">
                    <Link href={`/pokemon/${pokemon.id}`}>
                      📖 查看详细信息
                    </Link>
                  </Button>
                  <Button
                    onClick={fetchRandomPokemon}
                    variant="primary"
                  >
                    🔄 再抽一次
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fun Facts */}
            <Card className="mt-8 text-center p-6">
              <CardContent>
                <h3 className="text-2xl font-bold text-white mb-4">🎯 Fun Facts</h3>
                <p className="text-white/80 leading-relaxed">
                  Did you know? Over 1000 different Pokémon have been discovered so far!
                  Each Pokémon has unique attributes, abilities, and characteristics.
                  Keep exploring to discover more amazing Pokémon companions!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </PageContainer>
    </PageLayout>
  );
}
