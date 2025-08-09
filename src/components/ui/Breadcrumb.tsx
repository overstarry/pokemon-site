import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex items-center space-x-2 text-white/80 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-white/40" aria-hidden="true">
                /
              </span>
            )}
            {item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-white transition-colors duration-200 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Utility function to generate common breadcrumb patterns
export function generatePokemonBreadcrumbs(pokemonName?: string, pokemonId?: number) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Database', href: '/pokemon' },
  ];

  if (pokemonName && pokemonId) {
    breadcrumbs.push({
      label: `${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} (#${pokemonId})`,
    });
  }

  return breadcrumbs;
}

export function generateRandomBreadcrumbs() {
  return [
    { label: 'Home', href: '/' },
    { label: 'Random Pokémon' },
  ];
}
