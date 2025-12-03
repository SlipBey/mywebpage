'use client'

import AnimatedSection from '@/components/AnimatedSection'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'
import MusicPlatformsRow from '@/features/works/components/MusicPlatformsRow'
import MusicReleases from '@/features/works/components/MusicReleases'

export default function MusicSection() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section">
      <SectionTitle>{t('home.works.tabs.music')}</SectionTitle>

      <MusicPlatformsRow className="mt-3" />

      <MusicReleases limit={8} />
    </AnimatedSection>
  )
}
