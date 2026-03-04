import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/index.css'

export const globalTypes = {
  theme: {
    description: 'Light / Dark 模式（會切換調色盤）',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
}

export const initialGlobals = {
  theme: 'light',
}

function ThemeWrapper({
  theme,
  children,
}: {
  theme: string
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])
  return React.createElement(React.Fragment, null, children)
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context?.globals?.theme ?? 'light'
      return React.createElement(
        ThemeWrapper,
        { key: theme, theme, children: React.createElement(Story) }
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        // 只對 background/backgroundColor 用顏色選擇器，不改「color」arg（我們用 select 選調色盤名稱）
        color: /(background|backgroundColor|textColor)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
