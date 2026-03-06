import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@component/Badge'
import { PALETTE_GROUPS, PALETTE_COLORS } from '../../palette'

const colorOptions = [...PALETTE_COLORS] as const
const colorMapping = Object.fromEntries(PALETTE_COLORS.map(c => [c, c]))

const meta: Meta<typeof Badge> = {
  title: 'Example/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    color: { control: 'select', options: colorOptions, mapping: colorMapping },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { label: 'Badge' },
}

export const Small: Story = {
  args: { label: 'Small', size: 'sm' },
}

export const WithColor: Story = {
  args: { label: 'primary-500', color: 'primary-500' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['sm', 'md'] as const).map(size => (
        <Badge key={size} label={size} color="primary-500" size={size} />
      ))}
    </div>
  ),
}

export const AllPaletteColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {PALETTE_GROUPS.map(group => (
        <div key={group.label}>
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{group.label}</p>
          <div className="flex flex-wrap gap-4">
            {group.colors.map(color => (
              <div key={color} className="flex flex-col items-center gap-1.5">
                <div
                  style={{ backgroundColor: `var(--color-${color})` }}
                  className="w-10 h-10 rounded-md border border-black/10"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono text-center">{color}</span>
                <Badge label={color} color={color} size="sm" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
