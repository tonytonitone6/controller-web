import type { PaletteColor } from '../../palette'
import { getPaletteStyle } from '../../palette'

export interface ButtonProps {
  label: string
  variant?: 'light' | 'dark'
  color?: PaletteColor
  className?: string
  onClick?: () => void
}

export function Button({
  label,
  variant = 'light',
  color,
  className = '',
  onClick,
}: ButtonProps) {
  const style = color ? getPaletteStyle(color) : undefined
  const hasTextColor = /text-[\w-]+/.test(className)
  const baseClass = color
    ? hasTextColor
      ? ''
      : variant === 'light'
        ? 'text-white'
        : 'text-gray-900 dark:text-gray-100'
    : variant === 'light'
      ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900'
      : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
  return (
    <button
      type="button"
      style={style}
      className={`px-4 py-2 rounded transition-colors duration-300 ${baseClass} ${className}`.trim()}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
