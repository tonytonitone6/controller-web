import type { PaletteColor } from '../../palette'
import { getPaletteStyle } from '../../palette'

export interface BadgeProps {
  label: string
  color?: PaletteColor
  size?: 'sm' | 'md'
}

export function Badge({ label, color, size = 'sm' }: BadgeProps) {
  const style = color ? getPaletteStyle(color) : undefined
  console.log(size)
  // sm要比md小
  const sizeClass = size === 'md'
    ? 'px-5 py-1'
    : 'px-10 py-0.5'

  const colorClass = color
    ? 'text-gray-900'
    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'

  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${colorClass}`}
    >
      {label}
    </span>
  )
}
