import React from 'react';
import { Card, CardContent } from '@/components/ui';
import type { TypeName } from '@/types/pokemon';

interface TypeLanguageNamesProps {
  typeName: string;
  names: TypeName[];
}

// Language display configuration
const LANGUAGE_CONFIG: Record<string, { label: string; flag: string; priority: number }> = {
  'en': { label: 'English', flag: '🇺🇸', priority: 1 },
  'ja': { label: 'Japanese', flag: '🇯🇵', priority: 2 },
  'ko': { label: 'Korean', flag: '🇰🇷', priority: 3 },
  'zh-Hans': { label: 'Chinese (Simplified)', flag: '🇨🇳', priority: 4 },
  'zh-Hant': { label: 'Chinese (Traditional)', flag: '🇹🇼', priority: 5 },
  'fr': { label: 'French', flag: '🇫🇷', priority: 6 },
  'de': { label: 'German', flag: '🇩🇪', priority: 7 },
  'es': { label: 'Spanish', flag: '🇪🇸', priority: 8 },
  'it': { label: 'Italian', flag: '🇮🇹', priority: 9 },
  'ja-Hrkt': { label: 'Japanese (Hiragana)', flag: '🇯🇵', priority: 10 },
};

export function TypeLanguageNames({ typeName, names }: TypeLanguageNamesProps) {
  // Filter and sort names by priority
  const sortedNames = names
    .filter(name => LANGUAGE_CONFIG[name.language.name])
    .sort((a, b) => {
      const priorityA = LANGUAGE_CONFIG[a.language.name]?.priority || 999;
      const priorityB = LANGUAGE_CONFIG[b.language.name]?.priority || 999;
      return priorityA - priorityB;
    })
    .slice(0, 8); // Show top 8 languages

  if (sortedNames.length <= 1) {
    return null; // Don't show if only English or no translations
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {typeName} in Other Languages
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          How &quot;{typeName}&quot; type is written in different languages
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sortedNames.map((nameEntry) => {
            const langConfig = LANGUAGE_CONFIG[nameEntry.language.name];
            if (!langConfig) return null;
            
            return (
              <div
                key={nameEntry.language.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{langConfig.flag}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {langConfig.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {nameEntry.language.name}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-foreground">
                  {nameEntry.name}
                </div>
              </div>
            );
          })}
        </div>
        
        {names.length > sortedNames.length && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            +{names.length - sortedNames.length} more languages available
          </p>
        )}
      </CardContent>
    </Card>
  );
}