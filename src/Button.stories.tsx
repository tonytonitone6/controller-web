import type { Meta, StoryObj } from '@storybook/react'

function Button({ label, variant = 'light' }: { label: string; variant?: 'light' | 'dark' }) {
  return (
    <button
      className={`px-4 py-2 rounded transition-colors duration-300 ${
        variant === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      {label}
    </button>
  )
}

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['light', 'dark'] },
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
