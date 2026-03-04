import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './components/Card'
import { PALETTE_GROUPS, PALETTE_COLORS } from './palette'

const colorOptions = [...PALETTE_COLORS] as const
const colorMapping = Object.fromEntries(PALETTE_COLORS.map(c => [c, c]))

const meta: Meta<typeof Card> = {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    accentColor: { control: 'select', options: colorOptions, mapping: colorMapping },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'This is a description for the card component.',
  },
}

export const WithAccent: Story = {
  args: {
    title: 'Accented Card',
    description: 'This card has a colored top strip accent.',
    accentColor: 'primary-500',
  },
}

export const AllPaletteColors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {PALETTE_GROUPS.map(group => (
        <div key={group.label}>
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{group.label}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {group.colors.map(color => (
              <Card
                key={color}
                title={color}
                description="Palette accent color"
                accentColor={color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
