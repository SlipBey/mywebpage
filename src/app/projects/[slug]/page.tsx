import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { PROJECTS, findProject } from '@/lib/projects'
import ProjectDetailPageClient from '@/features/project/detail/PageClient'
import { tServer } from '@/lib/i18n/i18nServer'

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.key }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = findProject(slug)
  if (!p) return {}
  return buildMetadata({
    title: await tServer(`projects.items.${p.key}.title`),
    description: await tServer(`projects.items.${p.key}.description`),
    alternates: { canonical: `/projects/${p.key}` }
  })
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = findProject(slug)
  if (!p) return notFound()

  return <ProjectDetailPageClient slug={p.key} />
}
