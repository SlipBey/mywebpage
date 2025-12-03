import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { tServer } from '@/lib/i18n/i18nServer'
import ContactPageClient from '@/features/contact/PageClient'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: await tServer('contact.title'),
    description: await tServer('contact.description'),
    alternates: { canonical: '/contact' }
  })
}

export default function Page() {
  return <ContactPageClient />
}
