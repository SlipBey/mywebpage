import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import AboutPageClient from '@/features/about/PageClient'
import { tServer } from '@/lib/i18n/i18nServer'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: await tServer('about.title'),
    description: await tServer('about.description'),
    alternates: { canonical: '/about' }
  })
}

export default function Page() {
  return <AboutPageClient />
}
