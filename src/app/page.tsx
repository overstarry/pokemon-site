import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';
import PokemonGrid from '@/components/PokemonGrid';

export default function Home() {
  return (
    <PageLayout>

      {/* Hero Section */}
      <PageContainer className="py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to the Pokémon World!
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Explore the amazing world of Pokémon, discover your favorites, and learn about their types, abilities, and evolution forms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/pokemon">
                🔍 Start Exploring
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/random">
                🎲 Random Pokémon
              </Link>
            </Button>
          </div>
        </div>
      </PageContainer>

      {/* Featured Pokemon Section */}
      <PageContainer className="py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Featured Pokémon
          </h3>
          <p className="text-white/80 text-lg">
            Discover the most popular Pokémon
          </p>
        </div>
        <PokemonGrid limit={8} />
      </PageContainer>

      {/* Features Section */}
      <section className="bg-white/10 backdrop-blur-md py-16">
        <PageContainer>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">📚</div>
                <h4 className="text-xl font-bold text-white mb-2">Complete Pokédex</h4>
                <p className="text-white/80">
                  Browse Pokémon from all generations and learn their detailed information
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-xl font-bold text-white mb-2">Type Effectiveness</h4>
                <p className="text-white/80">
                  Learn type matchups and become a master trainer
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-4xl mb-4">🔄</div>
                <h4 className="text-xl font-bold text-white mb-2">Evolution Chain</h4>
                <p className="text-white/80">
                  Explore Pokémon evolution processes and requirements
                </p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>
    </PageLayout>
  );
}
