'use client';


import Link from 'next/link';
import { PageLayout, PageContainer, PageTitle } from '@/components/layout';
import { Button, SearchInput } from '@/components/ui';
import { usePokemonSearch } from '@/hooks';
import PokemonGrid from '@/components/PokemonGrid';

export default function PokemonPage() {
  const {
    searchTerm,
    setSearchTerm,
    limit,
    setLimit,
    isSearching
  } = usePokemonSearch(50);

  return (
    <PageLayout>

      <PageContainer className="py-8">
        <PageTitle
          title="Pokédex"
          subtitle="Explore all Pokémon and discover your favorites"
        />

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            loading={isSearching}
            placeholder="Search Pokémon..."
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-white/80">Show:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value={20} className="bg-gray-800">20</option>
              <option value={50} className="bg-gray-800">50</option>
              <option value={100} className="bg-gray-800">100</option>
              <option value={151} className="bg-gray-800">151 (Gen I)</option>
            </select>
          </div>

          <Button asChild>
            <Link href="/random">
              🎲 Random Pokémon
            </Link>
          </Button>
        </div>

        {/* Pokemon Grid */}
        <PokemonGrid limit={limit} searchTerm={searchTerm} />
      </PageContainer>
    </PageLayout>
  );
}
