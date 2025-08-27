import React from 'react';
import { Card, CardContent } from '@/components/ui';
import type { TypeDamageRelations } from '@/types/pokemon';

interface TypeMoveRecommendationsProps {
  typeName: string;
  damageRelations: TypeDamageRelations;
  moves: Array<{ name: string; url: string }>;
}

// Common powerful moves by type (curated list for better UX)
const RECOMMENDED_MOVES_BY_TYPE: Record<string, string[]> = {
  fire: ['flamethrower', 'fire-blast', 'overheat', 'fire-punch', 'heat-wave'],
  water: ['surf', 'hydro-pump', 'scald', 'water-pulse', 'aqua-jet'],
  grass: ['solar-beam', 'leaf-storm', 'energy-ball', 'grass-knot', 'bullet-seed'],
  electric: ['thunderbolt', 'thunder', 'volt-switch', 'thunder-punch', 'wild-charge'],
  psychic: ['psychic', 'psybeam', 'future-sight', 'zen-headbutt', 'psycho-cut'],
  ice: ['ice-beam', 'blizzard', 'ice-punch', 'avalanche', 'icicle-crash'],
  dragon: ['dragon-pulse', 'dragon-claw', 'outrage', 'draco-meteor', 'dragon-rush'],
  dark: ['dark-pulse', 'crunch', 'night-slash', 'sucker-punch', 'knock-off'],
  fighting: ['close-combat', 'focus-blast', 'drain-punch', 'brick-break', 'mach-punch'],
  poison: ['sludge-bomb', 'poison-jab', 'toxic', 'venoshock', 'acid'],
  ground: ['earthquake', 'earth-power', 'dig', 'bulldoze', 'mud-shot'],
  flying: ['air-slash', 'hurricane', 'aerial-ace', 'fly', 'wing-attack'],
  bug: ['bug-buzz', 'x-scissor', 'u-turn', 'silver-wind', 'leech-life'],
  rock: ['stone-edge', 'rock-slide', 'power-gem', 'ancient-power', 'rock-tomb'],
  ghost: ['shadow-ball', 'shadow-claw', 'hex', 'night-shade', 'ominous-wind'],
  steel: ['iron-head', 'meteor-mash', 'steel-wing', 'bullet-punch', 'flash-cannon'],
  fairy: ['moonblast', 'dazzling-gleam', 'play-rough', 'draining-kiss', 'fairy-wind'],
  normal: ['hyper-beam', 'body-slam', 'quick-attack', 'double-edge', 'tackle'],
};

export function TypeMoveRecommendations({ typeName, damageRelations, moves }: TypeMoveRecommendationsProps) {
  const typeKey = typeName.toLowerCase();
  const recommendedMoveNames = RECOMMENDED_MOVES_BY_TYPE[typeKey] || [];
  
  // Filter actual moves that exist in the type's move list
  const availableMoves = moves
    .filter(move => recommendedMoveNames.includes(move.name))
    .slice(0, 6); // Show top 6 moves

  // Format move names for display
  const formatMoveName = (moveName: string) => {
    return moveName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get types that this type is super effective against
  const superEffectiveAgainst = damageRelations.double_damage_to;
  
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Recommended {typeName} Moves
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Powerful {typeName} type moves to consider for your team
        </p>

        {availableMoves.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {availableMoves.map((move) => (
              <div
                key={move.name}
                className="p-3 rounded-lg bg-secondary/20 border border-secondary/30"
              >
                <div className="font-medium text-foreground">
                  {formatMoveName(move.name)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {typeName} Type Move
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 mb-6">
            <p className="text-muted-foreground">
              Move recommendations not available for {typeName} type
            </p>
          </div>
        )}

        {/* Type Effectiveness Strategy */}
        {superEffectiveAgainst.length > 0 && (
          <div className="border-t border-secondary/30 pt-4">
            <h4 className="font-semibold text-foreground mb-3">
              Strategic Usage
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Use {typeName} type moves to counter:
            </p>
            <div className="flex flex-wrap gap-2">
              {superEffectiveAgainst.slice(0, 4).map((type) => (
                <span
                  key={type.name}
                  className="px-2 py-1 rounded text-xs bg-green-500 text-white font-medium capitalize"
                >
                  {type.name}
                </span>
              ))}
              {superEffectiveAgainst.length > 4 && (
                <span className="px-2 py-1 text-xs text-muted-foreground">
                  +{superEffectiveAgainst.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Coverage Suggestion */}
        <div className="border-t border-secondary/30 pt-4 mt-4">
          <h4 className="font-semibold text-foreground mb-2">
            Team Building Tip
          </h4>
          <p className="text-xs text-muted-foreground">
            Consider pairing {typeName} type moves with complementary types that cover {typeName}&apos;s weaknesses
            {damageRelations.double_damage_from.length > 0 && 
              ` (weak to ${damageRelations.double_damage_from.slice(0, 2).map(t => t.name).join(', ')})`
            }.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}