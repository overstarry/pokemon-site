import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PokeVerse - Pokémon Encyclopedia',
    short_name: 'PokeVerse',
    description: 'Complete Pokémon database with detailed information about all Pokémon species, stats, abilities, and evolution chains.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    categories: ['games', 'entertainment', 'reference'],
    lang: 'en',
    dir: 'ltr',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'PokeVerse Pokémon Encyclopedia'
      },
      {
        src: '/screenshot-narrow.png', 
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'PokeVerse Mobile View'
      }
    ],
    shortcuts: [
      {
        name: 'Daily Pokémon',
        short_name: 'Daily',
        description: 'Discover your daily Pokémon',
        url: '/daily',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'Random Pokémon',
        short_name: 'Random',
        description: 'Find a random Pokémon',
        url: '/random',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'Pokémon Types',
        short_name: 'Types',
        description: 'Browse by type',
        url: '/types',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      },
      {
        name: 'Guides',
        short_name: 'Guides',
        description: 'Pokémon guides and tips',
        url: '/guides',
        icons: [{ src: '/icon-96x96.png', sizes: '96x96' }]
      }
    ]
  }
}