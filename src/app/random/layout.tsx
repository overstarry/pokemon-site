import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Random Pokémon Generator | PokeVerse',
  description: 'Discover random Pokémon with our Pokémon generator! Get surprised with different Pokémon species, their stats, abilities, and characteristics. Perfect for exploring new Pokémon.',
  keywords: [
    'random pokemon',
    'pokemon generator',
    'random pokemon picker',
    'pokemon surprise',
    'discover pokemon',
    'pokemon randomizer',
    'pokemon finder',
    'explore pokemon',
    'pokemon discovery',
    'nintendo',
    'game freak'
  ],
  openGraph: {
    title: 'Random Pokémon Generator | PokeVerse',
    description: 'Discover random Pokémon with our Pokémon generator! Get surprised with different Pokémon species and their characteristics.',
    type: 'website',
    siteName: 'PokeVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Pokémon Generator | PokeVerse',
    description: 'Discover random Pokémon with our Pokémon generator!',
  },
  alternates: {
    canonical: '/random',
  },
};

export default function RandomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
