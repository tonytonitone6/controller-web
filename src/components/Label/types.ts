export type SemanticColor = 'primary' | 'secondary' | 'destructive';
export type PaletteColor = 'orange' | 'yellow' | 'green' | 'purple';

export type LabelColorScheme = SemanticColor | PaletteColor;
export type LabelVariant = 'soft' | 'outline' | 'solid';
export type LabelShape = 'default' | 'pill' | 'round';
export type LabelSize = 'sm' | 'md' | 'lg';

export type ColorTokens = {
	soft: string;
	outline: string;
	solid: string;
};
