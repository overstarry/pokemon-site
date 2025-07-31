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
      url: `${baseUrl}/random`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.7,
    },
  ]

  // Generate Pokemon detail pages
  // Including more Pokemon (up to 1010 which covers most generations)
  // But limiting to first 500 to keep sitemap manageable
  const pokemonPages = Array.from({ length: 500 }, (_, i) => ({
    url: `${baseUrl}/pokemon/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...pokemonPages]
}
