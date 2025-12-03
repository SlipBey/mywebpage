'use client'

import { GlassBtn, PrimaryBtn } from '@/components/ui/Buttons'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { motion } from 'framer-motion'
import { fadeInUpSm } from '@/lib/animations'

export type HomeWorksSoonType = 'music' | 'film'

export interface HomeWorksSoonProps {
  type: HomeWorksSoonType
}

export default function HomeWorksSoon({ type }: HomeWorksSoonProps) {
  const { t } = useI18n()

  const title =
    type === 'music'
      ? t('home.works.music.soonTitle')
      : t('home.works.film.soonTitle')

  const hint =
    type === 'music'
      ? t('home.works.music.soonHint')
      : t('home.works.film.soonHint')

  return (
    <motion.div
      className="
        rounded-2xl p-6
        bg-white/70 dark:bg-white/5
        ring-1 ring-slate-900/10 dark:ring-white/10
        backdrop-blur
      "
      variants={fadeInUpSm}
      initial="hidden"
      animate="show"
    >
      <div className="mb-1 font-semibold text-slate-900 dark:text-white">
        {title}
      </div>

      <div className="text-sm text-slate-700/80 dark:text-white/80">{hint}</div>

      {type === 'music' && (
        <div className="mt-3 flex flex-wrap gap-2">
          <GlassBtn href="https://open.spotify.com/" target="_blank">
            {t('home.works.music.spotify')}
          </GlassBtn>
          <PrimaryBtn href="/contact">
            {t('home.works.music.contact')}
          </PrimaryBtn>
        </div>
      )}
    </motion.div>
  )
}
