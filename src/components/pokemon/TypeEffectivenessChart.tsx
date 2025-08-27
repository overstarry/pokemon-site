import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { TYPE_COLORS, TYPE_TRANSLATIONS } from '@/constants/pokemon';
import type { TypeDamageRelations } from '@/types/pokemon';

interface TypeEffectivenessChartProps {
  damageRelations: TypeDamageRelations;
  typeName: string;
}

export function TypeEffectivenessChart({ damageRelations, typeName }: TypeEffectivenessChartProps) {
  const renderTypeList = (types: Array<{ name: string }>, multiplier: string, colorClass: string) => {
    if (types.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-white text-sm font-bold ${colorClass}`}>
            {multiplier}
          </span>
          <span className="text-sm text-muted-foreground">
            {multiplier === '2×' && 'Super effective against'}
            {multiplier === '½×' && 'Not very effective against'}
            {multiplier === '0×' && 'No effect against'}
            {multiplier === '2× from' && 'Takes super effective damage from'}
            {multiplier === '½× from' && 'Resists damage from'}
            {multiplier === '0× from' && 'Immune to'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const typeKey = type.name as keyof typeof TYPE_COLORS;
            return (
              <div
                key={type.name}
                className={`
                  px-3 py-1 rounded-full text-white text-sm font-medium capitalize
                  ${TYPE_COLORS[typeKey] || 'bg-gray-400'}
                `}
              >
                {TYPE_TRANSLATIONS[typeKey] || type.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Attacking */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {typeName} Attacking
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Damage effectiveness when using {typeName} type moves
          </p>
          
          {renderTypeList(damageRelations.double_damage_to, '2×', 'bg-green-500')}
          {renderTypeList(damageRelations.half_damage_to, '½×', 'bg-orange-500')}
          {renderTypeList(damageRelations.no_damage_to, '0×', 'bg-gray-500')}
          
          {damageRelations.double_damage_to.length === 0 && 
           damageRelations.half_damage_to.length === 0 && 
           damageRelations.no_damage_to.length === 0 && (
            <p className="text-muted-foreground italic">
              No special effectiveness when attacking
            </p>
          )}
        </CardContent>
      </Card>

      {/* Defending */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {typeName} Defending
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Damage received from other types
          </p>
          
          {renderTypeList(damageRelations.double_damage_from, '2× from', 'bg-red-500')}
          {renderTypeList(damageRelations.half_damage_from, '½× from', 'bg-blue-500')}
          {renderTypeList(damageRelations.no_damage_from, '0× from', 'bg-gray-500')}
          
          {damageRelations.double_damage_from.length === 0 && 
           damageRelations.half_damage_from.length === 0 && 
           damageRelations.no_damage_from.length === 0 && (
            <p className="text-muted-foreground italic">
              No special resistances or weaknesses
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}