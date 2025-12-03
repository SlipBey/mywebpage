'use client'

import AnimatedSection from '@/components/AnimatedSection'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { motion } from 'framer-motion'
import { fadeInUpSm } from '@/lib/animations'

export default function FilmSoon() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section">
      <SectionTitle>{t('home.works.tabs.film')}</SectionTitle>

      <motion.div
        variants={fadeInUpSm}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-4 glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 p-5"
      >
        <div className="text-lg font-semibold">
          {t('home.works.film.soonTitle')}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {t('home.works.film.soonHint')}
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
