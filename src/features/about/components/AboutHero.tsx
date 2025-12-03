'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PrimaryBtn } from '@/components/ui/Buttons'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AnimatedSection from '@/components/AnimatedSection'
import { motion } from 'framer-motion'
import { fadeInUpSm, floatZoom, staggerTight } from '@/lib/animations'

export default function AboutHero() {
  const { t } = useI18n()
  const descParagraphs = String(t('about.hero.desc')).split('\n\n')
  const stats = t('about.hero.stats') as unknown as { k: string; v: string }[]

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
          {t('about.hero.role')}
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight"
          variants={fadeInUpSm}
        >
          {t('about.hero.title')}
        </motion.h1>

        <div className="mt-4 space-y-3 text-slate-700/90 dark:text-slate-300/85 leading-relaxed">
          {descParagraphs.map((p, i) => (
            <motion.p key={i} variants={fadeInUpSm}>
              {p}
            </motion.p>
          ))}
        </div>

        <motion.ul
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
          variants={staggerTight}
        >
          {stats.map((s) => (
            <motion.li
              key={s.k}
              variants={fadeInUpSm}
              className="rounded-xl bg-black/5 dark:bg-white/5 px-4 py-3 text-center"
            >
              <div className="text-xl font-bold">{s.v}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {s.k}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="mt-8" variants={fadeInUpSm}>
          <PrimaryBtn href="/projects">{t('about.hero.cta')}</PrimaryBtn>
        </motion.div>
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
            src="/images/slipbey.png"
            alt="SlipBey"
            width={600}
            height={600}
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
