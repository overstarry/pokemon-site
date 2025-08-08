# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for faster builds
- `npm run build` - Build the production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- Run tests: `npm test` (check if test scripts exist in package.json or look for test files)

## Project Architecture

This is a Next.js 15 Pokémon encyclopedia application using the App Router pattern with TypeScript and Tailwind CSS.

### Core Architecture

**API Integration**: Uses PokeAPI (https://pokeapi.co/api/v2) as the data source with comprehensive error handling and fallback mechanisms in `src/lib/api.ts`. The app handles network failures gracefully and provides detailed error messages.

**Type System**: Complete TypeScript definitions in `src/types/pokemon.ts` covering both PokeAPI raw responses and normalized application data structures. Includes component props, hook return types, and error interfaces.

**Data Flow**: 
- API layer (`src/lib/api.ts`) handles all external data fetching with comprehensive error handling
- Custom hooks (`src/hooks/`) manage state and data fetching logic
- Components consume data through these hooks for separation of concerns

**Theme System**: Uses a custom ThemeProvider for dark/light mode switching with system preference detection.

### Key Features

**Daily Pokémon**: Unique daily Pokémon per user using deterministic generation based on user ID and date (`src/lib/daily.ts`). Creates consistent daily experiences across sessions.

**SEO Optimization**: Comprehensive metadata, structured data, robots.txt, and sitemap generation for search engine optimization.

**Image Optimization**: Next.js Image component with multiple fallback sources and proper CDN configuration for Pokémon images.

**Responsive Design**: Mobile-first approach using Tailwind CSS with consistent spacing and typography systems.

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components organized by domain (layout, pokemon, seo, ui)
- `src/hooks/` - Custom React hooks for data fetching and state management
- `src/lib/` - Utility functions, API client, and business logic
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants, colors, and configuration

### Important Implementation Details

**Error Handling**: Custom `PokemonApiError` class with specific error messages and status codes. Components display user-friendly error states.

**Image Loading**: Multi-tier fallback system for Pokémon images with CDN backup and proper loading states.

**Search**: Direct name/ID search with input sanitization and validation.

**State Management**: Uses React hooks and context for theme state. No external state management library.

**Styling**: Tailwind CSS with design tokens in `src/styles/design-tokens.ts` for consistent theming.

**Performance**: Uses Next.js Image optimization, lazy loading, and Turbopack for development performance.

The codebase follows strict TypeScript practices, comprehensive error handling, and responsive design patterns throughout.