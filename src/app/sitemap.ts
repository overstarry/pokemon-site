import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use environment variable for base URL, fallback to production URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pokemon.jasminides.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pokemon`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/types`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/random`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.7,
    },
  ]

  // Generate Pokemon detail pages
  // Including all known Pokemon (up to 1025 which covers all current generations)
  // Using different priorities for different generations for better SEO
  const pokemonPages = Array.from({ length: 1025 }, (_, i) => {
    const pokemonId = i + 1;
    let priority = 0.6;
    
    // Higher priority for popular Pokemon (Gen 1 & iconic ones)
    if (pokemonId <= 151) priority = 0.8; // Gen 1
    else if (pokemonId <= 251) priority = 0.7; // Gen 2
    else if (pokemonId <= 386) priority = 0.65; // Gen 3
    
    return {
      url: `${baseUrl}/pokemon/${pokemonId}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    };
  })

  // Generate Pokemon type pages
  const pokemonTypes = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
    'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
  ];

  const typePages = pokemonTypes.map(type => ({
    url: `${baseUrl}/types/${type}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [...staticPages, ...typePages, ...pokemonPages]
}
