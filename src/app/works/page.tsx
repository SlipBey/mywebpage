import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { tServer } from '@/lib/i18n/i18nServer'
import WorksPageClient from '@/features/works/PageClient'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: await tServer('home.works.title'),
    description: await tServer('works.description'),
    alternates: { canonical: '/works' }
  })
}

export default function Page() {
  return <WorksPageClient />
}
