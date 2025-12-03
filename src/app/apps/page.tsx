import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { tServer } from '@/lib/i18n/i18nServer'
import AppsPageClient from '@/features/apps/PageClient'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: await tServer('apps.title'),
    description: await tServer('apps.description'),
    alternates: { canonical: '/apps' }
  })
}

export default function Page() {
  return <AppsPageClient />
}
