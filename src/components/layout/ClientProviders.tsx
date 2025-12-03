'use client'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/lib/i18n/I18nProvider'

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
