import type {
  ColorTokens,
  SemanticColor,
  PaletteColor,
  LabelSize,
  LabelShape,
} from './types';

export const semanticColors: Record<SemanticColor, ColorTokens> = {
  primary: {
    soft: 'bg-primary-500/30 text-primary-500 border-transparent',
    outline: 'bg-transparent text-primary-500 border-primary-400',
    solid: 'bg-primary-500 text-white border-primary-500',
  },
  secondary: {
    soft: 'bg-label-secondary text-primary-500 border-transparent',
    outline: 'bg-transparent text-gray-600 border-gray-400',
    solid: 'bg-gray-500 text-white border-gray-500',
  },
  destructive: {
    soft: 'bg-status-red/30 text-status-red border-transparent',
    outline: 'bg-transparent text-red-600 border-red-400',
    solid: 'bg-red-500 text-white border-red-500',
  },
  outline: {
    soft: 'bg-label-outline text-primary-500 label-gradient-border',
    outline: 'bg-label-outline text-primary-500 label-gradient-border',
    solid: 'bg-label-outline text-primary-500 label-gradient-border',
  },
};

export const paletteColors: Record<PaletteColor, ColorTokens> = {
  orange: {
    soft: 'bg-status-red/30 text-label-orange border-transparent',
    outline: 'bg-transparent text-orange-600 border-orange-400',
    solid: 'bg-orange-500 text-white border-orange-500',
  },
  yellow: {
    soft: 'bg-label-yellow/30 text-label-yellow border-transparent',
    outline: 'bg-transparent text-yellow-600 border-yellow-400',
    solid: 'bg-yellow-500 text-white border-yellow-500',
  },
  green: {
    soft: 'bg-status-green/30 text-status-green border-transparent',
    outline: 'bg-transparent text-green-600 border-green-400',
    solid: 'bg-green-500 text-white border-green-500',
  },
  purple: {
    soft: 'bg-label-purple/30 text-label-purple border-transparent',
    outline: 'bg-transparent text-purple-600 border-purple-400',
    solid: 'bg-purple-500 text-white border-purple-500',
  },
};

export const sizeStyles: Record<
  LabelSize,
  { container: string; icon: string }
> = {
  sm: { container: 'px-2 py-1 text-xs gap-1', icon: 'w-3 h-3' },
  md: { container: 'px-2 py-1 text-xs gap-1.5', icon: 'w-3.5 h-3.5' },
  lg: { container: 'px-2 py-1 text-sm gap-1.5', icon: 'w-4 h-4' },
};

export const shapeStyles: Record<LabelShape, string> = {
  default: 'rounded-md',
  pill: 'rounded-full',
  round: 'rounded-full aspect-square !px-0 justify-center',
};
