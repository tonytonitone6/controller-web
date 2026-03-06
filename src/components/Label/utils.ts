import { semanticColors, paletteColors } from './spec';
import type {
  LabelColorScheme,
  LabelVariant,
  PaletteColor,
  SemanticColor,
} from './types';

export function getColorClasses(
  colorScheme: LabelColorScheme,
  variant: LabelVariant,
): string {
  const tokens =
    semanticColors[colorScheme as SemanticColor] ??
    paletteColors[colorScheme as PaletteColor] ??
    semanticColors.secondary;

  return tokens[variant];
}
