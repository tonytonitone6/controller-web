import type { PaletteColor } from '../../palette'

export interface CardProps {
  title: string
  description?: string
  accentColor?: PaletteColor
}

export function Card({ title, description, accentColor }: CardProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {accentColor && (
        <div
          style={{ backgroundColor: `var(--color-${accentColor})` }}
          className="h-2 w-full"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  )
}
