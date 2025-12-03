import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { tServer } from '@/lib/i18n/i18nServer'
import ProjectPageClient from '@/features/project/PageClient'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: await tServer('project.title'),
    description: await tServer('project.description'),
    alternates: { canonical: '/projects' }
  })
}

export default function Page() {
  return <ProjectPageClient />
}
