import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import PokemonGrid from '@/components/PokemonGrid';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';

export default function Home() {
  return (
    <PageLayout>
      {/* Website Structured Data for SEO */}
      <WebsiteStructuredData
        title="PokeVerse - Pokémon Encyclopedia"
        description="Explore the amazing world of Pokémon and discover your favorite companions"
      />

      {/* Hero Section */}
      <PageContainer className="py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
            Discover Pokémon
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Explore the amazing world of Pokémon, discover your favorites, and learn about their types, abilities, and evolution forms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/pokemon">
                Start Exploring
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/daily">
                Today&apos;s Pokémon
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/random">
                Random Pokémon
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>

      {/* Featured Pokemon Section */}
      <PageContainer className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Featured Pokémon
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover popular Pokémon from the database
          </p>
        </div>
        <PokemonGrid limit={8} />
      </PageContainer>

      {/* Features Section */}
      <section className="bg-subtle py-20">
        <PageContainer>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Complete Database</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse Pokémon from all generations and learn detailed information
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Type System</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn type matchups and strategic advantages
                </p>
              </CardContent>
            </Card>
            <Card variant="elevated" className="text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Evolution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Discover evolution chains and requirements
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>
    </PageLayout>
  );
}
