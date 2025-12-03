import NotFoundPage from '@/features/common/NotFoundPage'
import { tServer } from '@/lib/i18n/i18nServer'
import { buildMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ alternates: { canonical: '/' } })
}

export default function NotFound() {
  return <NotFoundPage />
}
