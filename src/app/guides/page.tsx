import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { WebsiteStructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Pokémon Guides & Tips - Complete Training Guide | PokeVerse',
  description: 'Master Pokémon with our comprehensive guides covering catching tips, type effectiveness, evolution strategies, battle tactics, and team building advice.',
  keywords: [
    'pokemon guides',
    'pokemon tips',
    'pokemon strategy',
    'pokemon training',
    'pokemon battle guide',
    'pokemon type effectiveness',
    'pokemon evolution guide',
    'pokemon catching tips',
    'pokemon team building',
    'pokemon competitive guide',
    'pokemon beginner guide',
    'pokemon advanced strategies'
  ],
  openGraph: {
    title: 'Pokémon Guides & Tips | PokeVerse',
    description: 'Master Pokémon with our comprehensive guides and expert tips',
    type: 'website',
  },
  alternates: {
    canonical: '/guides',
  },
};

const GUIDE_CATEGORIES = [
  {
    title: 'Beginner Guides',
    description: 'Start your Pokémon journey with essential tips and basics',
    icon: '🌟',
    guides: [
      {
        title: 'Getting Started with Pokémon',
        slug: 'getting-started',
        description: 'Essential tips for new Pokémon trainers',
        readTime: '5 min read'
      },
      {
        title: 'Understanding Type Effectiveness',
        slug: 'type-effectiveness-basics',
        description: 'Master the rock-paper-scissors of Pokémon battles',
        readTime: '8 min read'
      },
      {
        title: 'Your First Pokémon Team',
        slug: 'first-pokemon-team',
        description: 'Building a balanced team for beginners',
        readTime: '10 min read'
      }
    ]
  },
  {
    title: 'Battle Strategy',
    description: 'Advanced tactics and competitive strategies',
    icon: '⚔️',
    guides: [
      {
        title: 'Advanced Type Matchups',
        slug: 'advanced-type-matchups',
        description: 'Deep dive into complex type interactions',
        readTime: '12 min read'
      },
      {
        title: 'Status Effects & Conditions',
        slug: 'status-effects-guide',
        description: 'Master sleep, poison, paralysis, and more',
        readTime: '15 min read'
      },
      {
        title: 'Competitive Team Building',
        slug: 'competitive-team-building',
        description: 'Build teams for tournament play',
        readTime: '20 min read'
      }
    ]
  },
  {
    title: 'Training & Evolution',
    description: 'Optimize your Pokémon\'s growth and evolution',
    icon: '📈',
    guides: [
      {
        title: 'Evolution Strategies',
        slug: 'evolution-strategies',
        description: 'When and how to evolve your Pokémon',
        readTime: '12 min read'
      },
      {
        title: 'Understanding Stats & IVs',
        slug: 'stats-and-ivs',
        description: 'Maximize your Pokémon\'s potential',
        readTime: '18 min read'
      },
      {
        title: 'Move Selection Guide',
        slug: 'move-selection',
        description: 'Choose the best moves for any situation',
        readTime: '14 min read'
      }
    ]
  },
  {
    title: 'Catching & Discovery',
    description: 'Tips for finding and catching Pokémon',
    icon: '🎯',
    guides: [
      {
        title: 'Catching Rare Pokémon',
        slug: 'catching-rare-pokemon',
        description: 'Strategies for finding elusive species',
        readTime: '10 min read'
      },
      {
        title: 'Shiny Hunting Guide',
        slug: 'shiny-hunting',
        description: 'Increase your odds of finding shiny Pokémon',
        readTime: '16 min read'
      },
      {
        title: 'Legendary Encounter Tips',
        slug: 'legendary-encounters',
        description: 'Prepare for legendary Pokémon battles',
        readTime: '12 min read'
      }
    ]
  }
];

export default function GuidesPage() {
  return (
    <PageLayout>
      <WebsiteStructuredData 
        title="Pokémon Guides & Tips | PokeVerse"
        description="Comprehensive Pokémon guides covering battle strategy, training, evolution, and catching tips for trainers of all levels."
      />
      
      <PageContainer className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Pokémon Guides & Tips
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Master the world of Pokémon with our comprehensive guides. From beginner basics 
            to advanced competitive strategies, we've got everything you need to become a Pokémon Champion.
          </p>
        </div>

        <div className="space-y-12">
          {GUIDE_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.guides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                    <Card className="h-full hover:border-secondary/50 transition-all duration-200 group-hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {guide.description}
                          </p>
                          <div className="pt-2">
                            <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded-full">
                              {guide.readTime}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-secondary/5 rounded-lg">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Put your knowledge to the test! Explore our complete Pokémon database 
            and start building your dream team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pokemon"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Browse All Pokémon →
            </Link>
            <Link 
              href="/daily"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-secondary/10 transition-colors font-medium"
            >
              Discover Daily Pokémon
            </Link>
          </div>
        </div>
      </PageContainer>
    </PageLayout>
  );
}