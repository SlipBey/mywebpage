'use client'

import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppRunner from './AppRunner'
import Link from 'next/link'

export default function AppDetailPageClient({
  slug,
  titleKey,
  descKey
}: {
  slug: string
  titleKey: string
  descKey: string
}) {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" className="space-y-6">
      <div className="glass-ice rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10">
        <nav className="mb-2 text-sm opacity-70">
          <Link href="/apps" className="hover:underline">
            {t('common.nav.apps')}
          </Link>{' '}
          <span>›</span> <span className="font-medium">{t(titleKey)}</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          {t(titleKey)}
        </h1>
        <p className="mt-2 text-slate-700/90 dark:text-slate-300/85">
          {t(descKey)}
        </p>
      </div>
      <AppRunner slug={slug} />
    </AnimatedSection>
  )
}
