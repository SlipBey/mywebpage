import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { tServer } from '@/lib/i18n/i18nServer'
import {
  APP_SLUGS,
  getI18nKeysBySlug
} from '@/features/apps/data/registry.server'
import AppDetailPageClient from '@/features/apps/detail/PageClient'

export async function generateStaticParams() {
  return APP_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const keys = getI18nKeysBySlug(slug)
  if (!keys) return {}
  return buildMetadata({
    title: await tServer(keys.titleKey),
    description: await tServer(keys.descKey),
    alternates: { canonical: `/apps/${slug}` }
  })
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const keys = getI18nKeysBySlug(slug)
  if (!keys) notFound()
  return (
    <AppDetailPageClient
      slug={slug}
      titleKey={keys.titleKey}
      descKey={keys.descKey}
    />
  )
}
