import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Pokémon | PokeVerse',
  description: 'Discover your daily Pokémon! Get a unique Pokémon every day with detailed stats, abilities, and information. Your personalized daily Pokémon experience.',
  keywords: [
    'daily pokemon',
    'pokemon of the day',
    'daily pokemon challenge',
    'pokemon calendar',
    'unique daily pokemon',
    'pokemon discovery',
    'daily pokemon generator',
    'pokemon routine',
    'nintendo',
    'game freak'
  ],
  openGraph: {
    title: 'Daily Pokémon | PokeVerse',
    description: 'Discover your daily Pokémon! Get a unique Pokémon every day with detailed information.',
    type: 'website',
    siteName: 'PokeVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Pokémon | PokeVerse',
    description: 'Discover your daily Pokémon! Get a unique Pokémon every day.',
  },
  alternates: {
    canonical: '/daily',
  },
};

export default function DailyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}