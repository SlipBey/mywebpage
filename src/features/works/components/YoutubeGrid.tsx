'use client'

import { motion } from 'framer-motion'
import { staggerTight } from '@/lib/animations'
import AnimatedSection from '@/components/AnimatedSection'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { FiYoutube } from 'react-icons/fi'

import { useYoutubeFeed } from '../hooks/useYoutubeFeed'
import YoutubeCard from './YoutubeCard'
import YoutubeSkeleton from './YoutubeSkeleton'

export default function YoutubeGrid({ limit = 6 }: { limit?: number }) {
  const { t } = useI18n()
  const { items, loading } = useYoutubeFeed(limit)
  const nf = new Intl.NumberFormat('tr-TR')

  const isEmpty = !loading && (items?.length ?? 0) === 0

  return (
    <AnimatedSection as="section">
      <SectionTitle>
        <div className="flex items-center gap-2">
          <FiYoutube />
          <h2 className="text-xl sm:text-2xl font-bold">
            {t('works.youtube.title')}
          </h2>
        </div>
      </SectionTitle>

      {loading && <YoutubeSkeleton count={limit} />}

      {isEmpty && (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {t('works.youtube.empty')}
        </p>
      )}

      {!!items?.length && (
        <motion.div
          variants={staggerTight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: '-10% 0px' }}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((v) => (
            <YoutubeCard
              key={v.id}
              vid={v}
              viewsLabel={t('works.youtube.watch')}
              numberFormat={nf}
            />
          ))}
        </motion.div>
      )}
    </AnimatedSection>
  )
}
