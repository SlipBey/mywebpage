import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import HomePageClient from '@/features/home/PageClient'
import { tServer } from '@/lib/i18n/i18nServer'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    description: await tServer('home.description'),
    alternates: { canonical: '/' }
  })
}

export default function Page() {
  return <HomePageClient />
}
