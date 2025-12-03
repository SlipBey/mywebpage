'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { fadeInUpSm, floatZoom, staggerTight } from '@/lib/animations'
import Image from 'next/image'
import Link from 'next/link'
import { FiYoutube, FiMusic, FiFilm } from 'react-icons/fi'

export default function WorksHero() {
  const { t } = useI18n()

  const pills = [
    { k: 'youtube', icon: <FiYoutube className="size-4" /> },
    { k: 'music', icon: <FiMusic className="size-4" /> },
    { k: 'film', icon: <FiFilm className="size-4" /> }
  ]

  return (
    <AnimatedSection
      as="section"
      className="
        relative overflow-hidden glass-ice rounded-2xl p-6 sm:p-10
        ring-1 ring-slate-900/10 dark:ring-white/10
        flex flex-col lg:flex-row items-stretch gap-8
      "
    >
      <motion.div
        className="flex-1 flex flex-col justify-center"
        variants={staggerTight}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex items-center gap-2 text-sm font-semibold text-sky-700/80 dark:text-sky-300/90 mb-2"
          variants={fadeInUpSm}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-600/80 dark:bg-sky-300/90" />
          {t('home.works.title')}
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          variants={fadeInUpSm}
        >
          {t('works.heroTitle')}
        </motion.h1>

        <motion.p
          variants={fadeInUpSm}
          className="mt-3 text-slate-700/90 dark:text-slate-300/85 leading-relaxed"
        >
          {t('works.heroDesc')}
        </motion.p>

        <motion.ul
          className="mt-5 flex flex-wrap gap-2"
          variants={staggerTight}
          initial="hidden"
          animate="show"
        >
          {pills.map((p) => (
            <motion.li
              key={p.k}
              variants={fadeInUpSm}
              className="
                inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold
                bg-white/70 dark:bg-white/6 backdrop-blur
                ring-1 ring-slate-900/10 dark:ring-white/10
              "
            >
              {p.icon}
              {t(`home.works.tabs.${p.k}`)}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="relative w-full max-w-[380px] mx-auto lg:mx-0"
        variants={floatZoom}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 -z-10 blur-3xl bg-linear-to-br from-sky-300/20 to-cyan-300/10" />
        <div className="rounded-3xl overflow-hidden ring-1 ring-slate-900/10 dark:ring-white/10">
          <Image
            src="/images/works-hero-cover.png"
            alt="Works"
            width={640}
            height={640}
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
