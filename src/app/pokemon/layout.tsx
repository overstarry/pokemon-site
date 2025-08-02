import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Pokédex - All Pokémon Database | PokéDex',
  description: 'Browse the complete Pokédex with all Pokémon from every generation. Search, filter, and discover detailed information about your favorite Pokémon including stats, abilities, types, and evolution chains.',
  keywords: [
    'pokemon',
    'pokedex',
    'pokédex',
    'pokemon database',
    'pokemon list',
    'pokemon search',
    'pokemon encyclopedia',
    'all pokemon',
    'pokemon generations',
    'pokemon stats',
    'pokemon abilities',
    'pokemon types',
    'nintendo',
    'game freak'
  ],
  openGraph: {
    title: 'Complete Pokédex - All Pokémon Database',
    description: 'Browse the complete Pokédex with all Pokémon from every generation. Search and discover detailed information about your favorite Pokémon.',
    type: 'website',
    siteName: 'PokéDex',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Pokédex - All Pokémon Database',
    description: 'Browse the complete Pokédex with all Pokémon from every generation.',
  },
  alternates: {
    canonical: '/pokemon',
  },
};

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
