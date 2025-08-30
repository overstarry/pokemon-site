import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Breadcrumb, Card, CardContent, TypeIcon } from '@/components/ui';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';
import type { PokemonTypeName } from '@/types/pokemon';

export const metadata: Metadata = {
  title: 'Understanding Type Effectiveness - Pokémon Battle Guide | PokeVerse',
  description: 'Master Pokémon type matchups and effectiveness. Learn which types are strong or weak against each other for better battle strategy.',
  keywords: [
    'pokemon type effectiveness',
    'pokemon type chart',
    'pokemon weaknesses',
    'pokemon strengths',
    'type matchups',
    'super effective pokemon',
    'not very effective pokemon',
    'pokemon battle strategy',
    'type advantages pokemon'
  ],
  openGraph: {
    title: 'Understanding Type Effectiveness - Pokémon Guide',
    description: 'Master Pokémon type matchups for better battle strategy',
    type: 'article',
  },
  alternates: {
    canonical: '/guides/type-effectiveness-basics',
  },
};

const EFFECTIVENESS_EXAMPLES = [
  {
    attacker: 'fire' as PokemonTypeName,
    defender: 'grass' as PokemonTypeName,
    effectiveness: 'Super Effective (2x damage)',
    explanation: 'Fire burns grass easily'
  },
  {
    attacker: 'water' as PokemonTypeName,
    defender: 'fire' as PokemonTypeName,
    effectiveness: 'Super Effective (2x damage)',
    explanation: 'Water extinguishes fire'
  },
  {
    attacker: 'grass' as PokemonTypeName,
    defender: 'water' as PokemonTypeName,
    effectiveness: 'Super Effective (2x damage)',
    explanation: 'Plants absorb water to grow'
  },
  {
    attacker: 'electric' as PokemonTypeName,
    defender: 'water' as PokemonTypeName,
    effectiveness: 'Super Effective (2x damage)',
    explanation: 'Electricity conducts through water'
  }
];

const RESIST_EXAMPLES = [
  {
    attacker: 'fire' as PokemonTypeName,
    defender: 'water' as PokemonTypeName,
    effectiveness: 'Not Very Effective (0.5x damage)',
    explanation: 'Water resists fire attacks'
  },
  {
    attacker: 'grass' as PokemonTypeName,
    defender: 'fire' as PokemonTypeName,
    effectiveness: 'Not Very Effective (0.5x damage)',
    explanation: 'Fire resists grass attacks'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Guides', href: '/guides' },
  { label: 'Type Effectiveness Basics', href: '/guides/type-effectiveness-basics' },
];

export default function TypeEffectivenessGuide() {
  return (
    <PageLayout>
      <WebsiteStructuredData 
        title="Understanding Type Effectiveness - Pokémon Battle Guide | PokeVerse"
        description="Complete guide to Pokémon type effectiveness and battle matchups for strategic advantage."
      />
      
      <PageContainer className="py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Understanding Type Effectiveness
            </h1>
            <p className="text-lg text-muted-foreground">
              Master the rock-paper-scissors of Pokémon battles
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>📖 8 min read</span>
              <span>🎯 Beginner Level</span>
              <span>⚔️ Battle Strategy</span>
            </div>
          </header>

          <div className="prose max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">The Foundation of Battle Strategy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Type effectiveness is the most important concept in Pokémon battles. Understanding which types 
                are strong or weak against others will dramatically improve your battle performance and help 
                you make strategic decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Think of it like an advanced rock-paper-scissors game with 18 different options instead of 3. 
                Each type has specific advantages and disadvantages against other types.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">How Type Effectiveness Works</h2>
              
              <div className="grid gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-600">Super Effective (2x Damage)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When a move is &quot;super effective,&quot; it deals double damage. This is your best-case scenario 
                      for offense and what you want to avoid on defense.
                    </p>
                    <div className="space-y-3">
                      {EFFECTIVENESS_EXAMPLES.map((example, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TypeIcon type={example.attacker} size="sm" />
                            <span className="text-2xl">→</span>
                            <TypeIcon type={example.defender} size="sm" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{example.effectiveness}</div>
                            <div className="text-sm text-muted-foreground">{example.explanation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-600">Not Very Effective (0.5x Damage)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When a move is &quot;not very effective,&quot; it deals half damage. You want to avoid using 
                      these matchups offensively, but they&apos;re great for defensive switching.
                    </p>
                    <div className="space-y-3">
                      {RESIST_EXAMPLES.map((example, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TypeIcon type={example.attacker} size="sm" />
                            <span className="text-2xl">→</span>
                            <TypeIcon type={example.defender} size="sm" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{example.effectiveness}</div>
                            <div className="text-sm text-muted-foreground">{example.explanation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-600">No Effect (0x Damage)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Some type combinations completely negate damage. For example, Ground-type moves 
                      have no effect on Flying-type Pokémon, and Ghost-type moves don&apos;t affect Normal-type Pokémon.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Key Type Relationships to Remember</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">🔥 Fire Type</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strong Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Grass (burns easily)</li>
                          <li>• Bug (insects vulnerable to fire)</li>
                          <li>• Ice (melts ice)</li>
                          <li>• Steel (melts metal)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Weak Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Water (extinguishes fire)</li>
                          <li>• Ground (smothers fire)</li>
                          <li>• Rock (rock doesn&apos;t burn)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">💧 Water Type</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strong Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Fire (extinguishes flames)</li>
                          <li>• Ground (erodes earth)</li>
                          <li>• Rock (water erosion)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Weak Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Electric (conducts electricity)</li>
                          <li>• Grass (plants absorb water)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">🌿 Grass Type</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">Strong Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Water (absorbs water)</li>
                          <li>• Ground (roots break earth)</li>
                          <li>• Rock (plants grow through cracks)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-red-600 mb-2">Weak Against:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Fire (burns plants)</li>
                          <li>• Ice (freezes plants)</li>
                          <li>• Poison (toxic to plants)</li>
                          <li>• Flying (birds eat plants)</li>
                          <li>• Bug (insects eat plants)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Practical Battle Tips</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">🎯 Offensive Strategy</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Always aim for super effective moves when possible</li>
                      <li>• Switch to a Pokémon with type advantage before attacking</li>
                      <li>• Consider the opponent&apos;s types before choosing your move</li>
                      <li>• Don&apos;t just use your strongest move - use the most effective one</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">🛡️ Defensive Strategy</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Switch to Pokémon that resist incoming attacks</li>
                      <li>• Use dual-types strategically (they can resist more types)</li>
                      <li>• Predict opponent moves based on type advantages</li>
                      <li>• Don&apos;t stay in bad matchups - switching is often the right choice</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">⚡ Advanced Tips</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Dual-type Pokémon can have complex effectiveness (multiply the modifiers)</li>
                      <li>• Some abilities can change type effectiveness</li>
                      <li>• STAB (Same Type Attack Bonus) gives 1.5x damage for matching types</li>
                      <li>• Critical hits ignore defensive stat changes</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Practice Makes Perfect</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Don&apos;t worry about memorizing every type interaction immediately. Start with the basics 
                and gradually learn more complex matchups through practice. The most important thing is 
                to start thinking strategically about type advantages in every battle.
              </p>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">🧠 Memory Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Many type interactions are logical (fire burns grass, water beats fire)</li>
                    <li>• Focus on learning one type thoroughly at a time</li>
                    <li>• Practice with your favorite Pokémon&apos;s types first</li>
                    <li>• Use our type chart tools to quickly check interactions</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Ready for More Advanced Strategy?</h2>
              
              <div className="grid gap-4 mb-8">
                <Link href="/guides/advanced-type-matchups" className="group">
                  <Card className="hover:border-secondary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">⚔️</span>
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            Advanced Type Matchups
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Deep dive into complex dual-type interactions
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
                            Use type knowledge to create balanced teams
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/types" className="group">
                  <Card className="hover:border-secondary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">
                            Explore All Types
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Browse complete type information and Pokémon lists
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