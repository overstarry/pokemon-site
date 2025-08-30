import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout, PageContainer } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Offline | PokeVerse',
  description: 'You are currently offline. Some features may be limited.',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <PageLayout>
      <PageContainer className="py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              You're Offline
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Don't worry! You can still browse cached Pokémon data and use some features while offline.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Available Offline</h2>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>✅ Previously viewed Pokémon</li>
                  <li>✅ Cached type information</li>
                  <li>✅ Your daily Pokémon</li>
                  <li>✅ Basic navigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">Requires Internet</h2>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>❌ New Pokémon searches</li>
                  <li>❌ Random Pokémon discovery</li>
                  <li>❌ Latest guides and tips</li>
                  <li>❌ Image loading for new content</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Once you're back online, all features will be available again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Return Home
              </Link>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-secondary/10 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </PageLayout>
  );
}