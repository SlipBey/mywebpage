import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import AppShell from '@/components/layout/AppShell'
import { buildMetadata, CONFIG } from '@/lib/seo'
import { ToasterClient } from '@/components/layout/Toaster'

export const metadata: Metadata = buildMetadata();
export const viewport = { themeColor: CONFIG.SEO.themeColor };

const ui = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '600', '700']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="tr"
      dir="ltr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={ui.variable}
    >
      <body>
        <AppShell>{children}</AppShell>
        <ToasterClient />
      </body>
    </html>
  )
}
