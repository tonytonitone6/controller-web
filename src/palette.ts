import type React from 'react';
/**
 * 與 index.css @theme 中定義的 Tailwind 調色盤對應
 */
export type PaletteColor =
	| 'primary-100'
	| 'primary-200'
	| 'primary-300'
	| 'primary-400'
	| 'primary-500'
	| 'primary-600'
	| 'primary-700'
	| 'gray-100'
	| 'gray-200'
	| 'gray-300'
	| 'gray-400'
	| 'gray-500'
	| 'gray-600'
	| 'gray-700'
	| 'gray-800'
	| 'gray-900'
	| 'status-red'
	| 'status-yellow'
	| 'status-green'
	| 'viz-1'
	| 'viz-2'
	| 'viz-3'
	| 'viz-4'
	| 'viz-5'
	| 'viz-6'
	| 'viz-7'
	| 'viz-8'
	| 'viz-9'
	| 'viz-10'
	| 'viz-11'
	| 'viz-12'
	| 'viz-13';

export const PALETTE_GROUPS: { label: string; colors: PaletteColor[] }[] = [
	{
		label: 'Primary',
		colors: [
			'primary-100',
			'primary-200',
			'primary-300',
			'primary-400',
			'primary-500',
			'primary-600',
			'primary-700',
		],
	},
	{
		label: 'Gray',
		colors: [
			'gray-100',
			'gray-200',
			'gray-300',
			'gray-400',
			'gray-500',
			'gray-600',
			'gray-700',
			'gray-800',
			'gray-900',
		],
	},
	{ label: 'Status', colors: ['status-red', 'status-yellow', 'status-green'] },
	{
		label: 'Viz',
		colors: [
			'viz-1',
			'viz-2',
			'viz-3',
			'viz-4',
			'viz-5',
			'viz-6',
			'viz-7',
			'viz-8',
			'viz-9',
			'viz-10',
			'viz-11',
			'viz-12',
			'viz-13',
		],
	},
];

export const PALETTE_COLORS: PaletteColor[] = PALETTE_GROUPS.flatMap(
	(g) => g.colors,
);

/** 依調色盤名稱取得 CSS 變數值，用於 inline style */
export function getPaletteStyle(color: PaletteColor): React.CSSProperties {
	return { backgroundColor: `var(--color-${color})` };
}
