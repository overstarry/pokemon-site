# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build the production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- Run tests: Check for test scripts in package.json or test files (currently has unit tests in `src/lib/__tests__/`)

## Project Architecture

This is a Next.js 15 Pokémon encyclopedia application using the App Router pattern with TypeScript, Tailwind CSS, and PWA capabilities.

### Core Architecture

**API Integration**: Uses PokeAPI (https://pokeapi.co/api/v2) as the data source with comprehensive error handling and fallback mechanisms in `src/lib/api.ts`. The app handles network failures gracefully and provides detailed error messages through the custom `PokemonApiError` class.

**Type System**: Complete TypeScript definitions in `src/types/pokemon.ts` covering both PokeAPI raw responses and normalized application data structures. Includes component props, hook return types, and error interfaces for all 18 Pokémon types.

**Data Flow**: 
- API layer (`src/lib/api.ts`) handles all external data fetching with comprehensive error handling
- Custom hooks (`src/hooks/`) manage state and data fetching logic:
  - `usePokemon` - Pokemon list data fetching with pagination
  - `usePokemonDetail` - Individual Pokemon details with species info
  - `useDailyPokemon` - Deterministic daily Pokemon generation using user fingerprinting
  - `useRandomPokemon` - Random Pokemon discovery
- Components consume data through these hooks for separation of concerns

**PWA Support**: Full Progressive Web App implementation with:
- Service Worker (`public/sw.js`) for offline caching of API data, images, and pages
- Web App Manifest (`src/app/manifest.ts`) with app icons, shortcuts, and install prompts
- Offline page (`src/app/offline/page.tsx`) for graceful degradation
- Background sync and push notification infrastructure

**Theme System**: Uses a custom ThemeProvider for dark/light mode switching with system preference detection and persistence.

### Key Features

**Daily Pokémon**: Unique daily Pokémon per user using deterministic generation based on user ID and date (`src/lib/daily.ts`). Creates consistent daily experiences across sessions using localStorage with browser fingerprint fallback for privacy-conscious users.

**Guides System**: Comprehensive educational content in `/guides/` with structured SEO-optimized articles covering:
- Beginner guides (getting started, type effectiveness basics, first team building)
- Battle strategy (advanced matchups, status effects, competitive team building)
- Training & evolution (stats, IVs, move selection, evolution timing)
- Catching & discovery (rare Pokémon, shiny hunting, legendary encounters)

**SEO Optimization**: Comprehensive metadata, structured data (Schema.org), robots.txt, and dynamic sitemap generation covering all 1025+ Pokémon pages, type pages, and guide content.

**Image Optimization**: Multi-tier fallback system for Pokémon images with CDN backup through `getPokemonImageUrl()`. Supports both regular and shiny variants with proper loading states.

**Type System Integration**: Complete implementation of all 18 Pokémon types with effectiveness charts, damage calculations, and detailed type-specific pages showing primary/secondary typing distinctions.

**Responsive Design**: Mobile-first approach using Tailwind CSS with consistent spacing and typography systems.

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
  - `/guides/` - Educational content and strategy guides
  - `/pokemon/` - Pokémon database and detail pages
  - `/types/` - Type system explorer with effectiveness charts
  - `/daily/`, `/random/` - Special discovery features
  - `/offline/` - PWA offline fallback page
- `src/components/` - Reusable UI components organized by domain (layout, pokemon, seo, ui)
- `src/hooks/` - Custom React hooks for data fetching and state management
- `src/lib/` - Utility functions, API client, and business logic
  - `api.ts` - Complete PokeAPI integration with error handling
  - `daily.ts` - Daily Pokémon generation algorithms
- `src/types/` - TypeScript type definitions covering all PokeAPI responses
- `src/constants/` - Application constants, type colors, and configuration
- `src/styles/` - Design tokens and global styles
- `public/` - Static assets including PWA service worker and icons

### Important Implementation Details

**Error Handling**: Custom `PokemonApiError` class with specific HTTP status code handling. All API calls include comprehensive error boundaries and user-friendly fallback states.

**Image Loading**: Multi-tier fallback system prioritizing official artwork, then sprites, then CDN backups. Handles both regular and shiny variants with proper aspect ratios and loading states.

**Search**: Direct name/ID search with input sanitization converting spaces to hyphens for PokeAPI compatibility. Validates queries and handles special characters safely.

**Caching Strategy**: Service Worker implements:
- Network-first for API requests with cache fallback
- Cache-first for images with background updates  
- Stale-while-revalidate for navigation requests
- Separate cache buckets for different content types

**Daily Pokémon Algorithm**: Uses deterministic hashing of user ID + date to ensure:
- Same Pokémon per user per day across sessions/devices
- Different Pokémon for different users on same day
- Proper distribution across 1025 available Pokémon
- Privacy-preserving fallback using browser fingerprinting

**Type Effectiveness System**: Complete implementation of 18x18 type chart with:
- Damage multiplier calculations (2x, 1x, 0.5x, 0x)
- Visual effectiveness charts and explanations
- Primary/secondary type handling for dual-type Pokémon
- STAB (Same Type Attack Bonus) calculations

**State Management**: Uses React hooks and context for theme state. No external state management library - data fetching handled through custom hooks with built-in caching and error states.

**Styling**: Tailwind CSS with design tokens in `src/styles/design-tokens.ts`. Type-specific colors, gradients, and stat color mappings defined in `src/constants/pokemon.ts` for consistent theming across components.

**Performance**: Uses Next.js Image optimization, lazy loading, Turbopack for development builds, and comprehensive PWA caching for optimal user experience.

The codebase follows strict TypeScript practices, comprehensive error handling, accessibility best practices, and responsive design patterns throughout.