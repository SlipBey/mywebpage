'use client'

import AnimatedSection from '@/components/AnimatedSection'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'
import DomainCard from './DomainCard'
import { DOMAIN_ITEMS } from '@/features/about/data/domains'

export default function Domains() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" id="domains">
      <SectionTitle>{t('about.domains.title')}</SectionTitle>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {DOMAIN_ITEMS.map((item) => (
          <DomainCard key={item.key} item={item} />
        ))}
      </div>
    </AnimatedSection>
  )
}
