# PokeVerse - Pokémon Encyclopedia

![PokeVerse Homepage](https://github.com/user-attachments/assets/cb78594a-261e-44b5-b1c4-210bbae28ee0)

A comprehensive and modern Pokémon encyclopedia built with Next.js 15, featuring detailed information about all Pokémon species, types, abilities, and evolution chains. Explore the amazing world of Pokémon with an intuitive and responsive interface.

## ✨ Features

- **Complete Pokémon Database** - Browse Pokémon from all generations with detailed information
- **Daily Pokémon** - Discover a unique daily Pokémon personalized for each user
- **Random Discovery** - Find random Pokémon for spontaneous exploration
- **Type System Explorer** - Learn about all 18 Pokémon types and their effectiveness relationships
- **Search & Filter** - Find specific Pokémon by name or ID with smart search functionality
- **Evolution Chains** - Discover evolution requirements and relationships
- **Responsive Design** - Mobile-first design that works beautifully on all devices
- **Dark/Light Mode** - Automatic theme switching with system preference detection
- **SEO Optimized** - Complete metadata, structured data, and sitemap for search engines
- **Performance Focused** - Optimized images, lazy loading, and fast page loads

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Data Source**: [PokéAPI](https://pokeapi.co/) for comprehensive Pokémon data
- **Image Optimization**: Next.js Image component with multiple fallback sources
- **State Management**: React hooks and context (no external state library)
- **Build Tool**: Turbopack for fast development builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/overstarry/pokemon-site.git
cd pokemon-site
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── daily/             # Daily Pokémon feature
│   ├── pokemon/           # Pokémon database and detail pages
│   ├── random/            # Random Pokémon discovery
│   └── types/             # Pokémon type system explorer
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (header, footer, etc.)
│   ├── pokemon/          # Pokémon-specific components
│   ├── seo/              # SEO and structured data components
│   └── ui/               # General UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and API client
├── types/                # TypeScript type definitions
├── constants/            # Application constants and configuration
└── styles/               # Global styles and design tokens
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## 🌟 Key Features Implementation

### Daily Pokémon System
- Generates unique daily Pokémon per user using deterministic algorithms
- Persistent user identification with localStorage fallback
- Consistent experience across sessions

### API Integration
- Comprehensive error handling with custom `PokemonApiError` class
- Smart caching and fallback mechanisms
- Graceful degradation for network failures

### Image Optimization
- Multi-tier fallback system for Pokémon images
- CDN optimization and proper loading states
- Support for both regular and shiny variants

### SEO & Performance
- Complete metadata and Open Graph implementation
- Structured data for rich search results
- Robots.txt and sitemap generation
- Image optimization and lazy loading

## 🚀 Deployment

The application is optimized for deployment on [Vercel](https://vercel.com), but can be deployed to any platform that supports Next.js.

### Deploy on Vercel

1. Push your code to a GitHub repository
2. Connect your repository to [Vercel](https://vercel.com/new)
3. Vercel will automatically detect the Next.js framework and deploy

### Environment Variables

No environment variables are required for basic functionality. The application uses public APIs and falls back gracefully.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Data**: Powered by [PokéAPI](https://pokeapi.co/) - the RESTful Pokémon API
- **Images**: Official Pokémon artwork sourced via [PokéAPI](https://pokeapi.co/), which provides images from [Pokémon Database](https://pokemondb.net/) and [Bulbapedia](https://bulbapedia.bulbagarden.net/). All Pokémon images are © 1995–2024 Nintendo, Creatures Inc., GAME FREAK Inc. and are used here under fair use for non-commercial, educational purposes.
- **Framework**: Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for the beautiful design system

---

**Explore the amazing world of Pokémon and discover your favorite companions!** 🐾
