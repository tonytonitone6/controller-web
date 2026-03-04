import type { Meta, StoryObj } from '@storybook/react'
import Button from './components/Button'
import { PALETTE_GROUPS, PALETTE_COLORS } from './palette'

const colorOptions = [...PALETTE_COLORS] as const
const colorMapping: Record<string, typeof PALETTE_COLORS[number] | undefined> = {
  ...Object.fromEntries(PALETTE_COLORS.map((c) => [c, c])),
}

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // variant: { control: 'radio', options: ['light', 'dark'] },
    color: {
      control: 'select',
      options: colorOptions,
      mapping: colorMapping,
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Light: Story = {
  args: { label: 'Light mode', variant: 'light' },
}

export const Dark: Story = {
  args: { label: 'Dark mode', variant: 'dark' },
}

export const PaletteColor: Story = {
  args: {
    label: 'Palette Color',
    color: "gray-100",
  },
}

export const AllPaletteColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {PALETTE_GROUPS.map(group => (
        <div key={group.label}>
          <p className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.colors.map(color => (
              <Button key={color} label={color} color={color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
