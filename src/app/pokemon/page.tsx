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
  } = usePokemonSearch(18);

  return (
    <PageLayout>

      <PageContainer className="py-8">
        <PageTitle
          title="Pokemon Database"
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
            <span className="text-foreground/80">Show:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-4 py-2 rounded-full bg-muted/20 backdrop-blur-sm border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={9} className="bg-background text-foreground">9</option>
              <option value={18} className="bg-background text-foreground">18</option>
              <option value={27} className="bg-background text-foreground">27</option>
              <option value={36} className="bg-background text-foreground">36</option>
              <option value={45} className="bg-background text-foreground">45</option>
            </select>
          </div>

          <Button asChild size="md">
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
