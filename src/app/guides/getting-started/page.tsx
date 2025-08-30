import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Breadcrumb, Card, CardContent, TypeIcon } from '@/components/ui';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';
import type { PokemonTypeName } from '@/types/pokemon';

export const metadata: Metadata = {
  title: 'Getting Started with Pokémon - Beginner\'s Complete Guide | PokeVerse',
  description: 'Essential tips and strategies for new Pokémon trainers. Learn the basics of catching, training, and battling with your first Pokémon team.',
  keywords: [
    'pokemon beginner guide',
    'getting started pokemon',
    'pokemon basics',
    'first pokemon',
    'pokemon tutorial',
    'new trainer guide',
    'pokemon fundamentals',
    'pokemon starter guide'
  ],
  openGraph: {
    title: 'Getting Started with Pokémon - Beginner\'s Guide',
    description: 'Essential tips for new Pokémon trainers to start their journey',
    type: 'article',
  },
  alternates: {
    canonical: '/guides/getting-started',
  },
};

const STARTER_POKEMON_TYPES: PokemonTypeName[] = ['fire', 'water', 'grass'];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/guides' },
  { label: 'Getting Started', href: '/guides/getting-started' },
];

export default function GettingStartedGuide() {
  return (
    <PageLayout>
      <WebsiteStructuredData 
        title="Getting Started with Pokémon - Beginner's Guide | PokeVerse"
        description="Complete beginner's guide to Pokémon with essential tips for new trainers."
      />
      
      <PageContainer className="py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="text-6xl mb-4">🌟</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Getting Started with Pokémon
            </h1>
            <p className="text-lg text-muted-foreground">
              Your complete guide to beginning your Pokémon journey
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>📖 5 min read</span>
              <span>🎯 Beginner Level</span>
              <span>✨ Essential Tips</span>
            </div>
          </header>

          <div className="prose max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Welcome, New Trainer!</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Starting your Pokémon journey can feel overwhelming with hundreds of species to discover, 
                complex battle mechanics, and endless strategies to learn. This guide will give you the 
                essential foundation you need to begin your adventure with confidence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re completely new to Pokémon or returning after a long break, these fundamentals 
                will set you up for success from day one.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Understanding the Basics</h2>
              
              <div className="grid gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">🎯 What are Pokémon?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Pokémon are fantastic creatures with unique abilities, personalities, and elemental types. 
                      Each Pokémon has specific stats (Attack, Defense, Speed, etc.) that determine their 
                      effectiveness in different situations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">⚔️ Types Matter</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Every Pokémon belongs to one or two types (like Fire, Water, Grass). These types have 
                      strengths and weaknesses against each other, similar to rock-paper-scissors but with 18 different types!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {STARTER_POKEMON_TYPES.map((type) => (
                        <div key={type} className="flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full">
                          <TypeIcon type={type} size="sm" />
                          <span className="text-sm capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">📈 Growth & Evolution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Most Pokémon can evolve into stronger forms as they gain experience. Evolution typically 
                      increases all stats and may change their typing, unlocking new strategies and abilities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your First Steps</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">1️⃣</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Choose Your First Pokémon</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Traditionally, new trainers start with one of three types: Fire, Water, or Grass. 
                          Each has different strengths:
                        </p>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <TypeIcon type="fire" size="sm" />
                            <span><strong>Fire:</strong> High attack power, effective against Grass and Bug types</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <TypeIcon type="water" size="sm" />
                            <span><strong>Water:</strong> Balanced stats, effective against Fire and Ground types</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <TypeIcon type="grass" size="sm" />
                            <span><strong>Grass:</strong> Good defense, effective against Water and Rock types</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">2️⃣</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Build a Balanced Team</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          A good team covers each other&apos;s weaknesses. Aim for:
                        </p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Different types to handle various opponents</li>
                          <li>• A mix of physical and special attackers</li>
                          <li>• At least one Pokémon with good defense</li>
                          <li>• Consider including a fast Pokémon for quick strikes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">3️⃣</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Learn Type Effectiveness</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Understanding which types are effective against others is crucial. Fire beats Grass, 
                          Water beats Fire, Grass beats Water - but there are 18 types total with complex 
                          interactions. Don&apos;t worry about memorizing everything at once!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Essential Tips for New Trainers</h2>
              
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">💡 Tip:</strong> Don&apos;t be afraid to experiment! 
                      Try different Pokémon combinations and see what works for your playstyle.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">💡 Tip:</strong> Focus on having fun rather than 
                      optimal strategies at first. You can always learn advanced tactics later.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">💡 Tip:</strong> Every Pokémon can be viable with 
                      the right strategy. Your favorites can often surprise you!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">What&apos;s Next?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Now that you understand the basics, you&apos;re ready to dive deeper into the world of Pokémon. 
                Consider exploring these topics next:
              </p>
              
              <div className="grid gap-4 mb-8">
                <Link href="/guides/type-effectiveness-basics" className="group">
                  <Card className="hover:border-secondary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔍</span>
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            Understanding Type Effectiveness
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Master the rock-paper-scissors of Pokémon battles
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/guides/first-pokemon-team" className="group">
                  <Card className="hover:border-secondary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👥</span>
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            Building Your First Team
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Create a balanced team for success
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </section>
          </div>
        </article>

        <div className="text-center mt-12">
          <Link 
            href="/guides"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            ← Back to All Guides
          </Link>
        </div>
      </PageContainer>
    </PageLayout>
  );
}