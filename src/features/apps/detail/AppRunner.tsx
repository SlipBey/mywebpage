'use client'

import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { getApp } from '../data/registry.client'

export default function AppRunner({ slug }: { slug: string }) {
  const { t } = useI18n()
  const meta = getApp(slug)
  if (!meta) {
    return (
      <AnimatedSection
        as="section"
        className="glass-ice rounded-2xl p-6 ring-1 ring-black/5 dark:ring-white/10"
      >
        <div className="font-semibold">{t('apps.common.notFound')}</div>
      </AnimatedSection>
    )
  }
  const Comp = meta.Component
  return <Comp />
}
