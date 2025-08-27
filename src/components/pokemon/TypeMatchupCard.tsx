import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import type { TypeDamageRelations } from '@/types/pokemon';

interface TypeMatchupCardProps {
  damageRelations: TypeDamageRelations;
  typeName: string;
}

export function TypeMatchupCard({ damageRelations, typeName }: TypeMatchupCardProps) {
  const renderQuickReference = (
    types: Array<{ name: string }>,
    title: string,
    description: string,
    bgColor: string
  ) => {
    if (types.length === 0) return null;

    return (
      <div className={`p-4 rounded-lg ${bgColor}`}>
        <h4 className="font-semibold text-foreground mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          {types.slice(0, 6).map((type) => {
            const typeKey = type.name as keyof typeof TYPE_COLORS;
            return (
              <Link
                key={type.name}
                href={`/types/${type.name}`}
                className={`
                  px-2 py-1 rounded text-white text-xs font-medium capitalize
                  hover:opacity-80 transition-opacity
                  ${TYPE_COLORS[typeKey] || 'bg-gray-400'}
                `}
              >
                {TYPE_TRANSLATIONS[typeKey] || type.name}
              </Link>
            );
          })}
          {types.length > 6 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{types.length - 6} more
            </span>
          )}
        </div>
      </div>
    );
  };

  const strongAgainst = damageRelations.double_damage_to;
  const weakTo = damageRelations.double_damage_from;
  const resists = damageRelations.half_damage_from;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Quick Battle Reference
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Key type matchups for {typeName} type Pokémon in battle
        </p>

        <div className="space-y-4">
          {renderQuickReference(
            strongAgainst,
            'Strong Against',
            `${typeName} moves deal 2× damage to these types`,
            'bg-green-50 dark:bg-green-900/20'
          )}

          {renderQuickReference(
            weakTo,
            'Weak To',
            `${typeName} Pokémon take 2× damage from these types`,
            'bg-red-50 dark:bg-red-900/20'
          )}

          {renderQuickReference(
            resists,
            'Resists',
            `${typeName} Pokémon take ½× damage from these types`,
            'bg-blue-50 dark:bg-blue-900/20'
          )}

          {strongAgainst.length === 0 && weakTo.length === 0 && resists.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No significant type advantages or disadvantages
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}