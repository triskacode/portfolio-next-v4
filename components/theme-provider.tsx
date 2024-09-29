'use client'

import type { ThemeProviderProps } from 'next-themes/dist/types'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps): React.JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export interface Theme {
  icon: React.ReactNode
  label: string
}

export const themeList: Record<string, Theme> = {
  dark: {
    icon: <MoonIcon />,
    label: 'Change Theme to Dark',
  },
  light: {
    icon: <SunIcon />,
    label: 'Change Theme to Light',
  },
  system: {
    icon: <MonitorIcon />,
    label: 'Change Theme to System',
  },
} as const
