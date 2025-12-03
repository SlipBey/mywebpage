'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import {
  bgFade,
  fadeInUpSm,
  softDropText,
  floatZoom,
  groupStagger
} from '@/lib/animations'
import { PrimaryBtn } from '@/components/ui/Buttons'
import { FiArrowLeft, FiHome } from 'react-icons/fi'

export default function NotFoundPage() {
  const { t } = useI18n()

  return (
    <main className="section-y">
      <AnimatedSection
        as="section"
        mode="view"
        variants={fadeInUpSm}
        className="relative max-w-3xl mx-auto glass-ice rounded-2xl
                   ring-1 ring-slate-900/10 dark:ring-white/10
                   overflow-hidden"
      >
        <motion.div
          aria-hidden
          variants={bgFade}
          className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full blur-3xl
                     bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
        />

        <motion.div
          variants={groupStagger}
          className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row gap-8 items-center"
        >
          <div className="flex-1 space-y-4">
            <motion.div
              variants={softDropText}
              className="inline-flex items-center gap-2 text-xs font-semibold
                         text-sky-700/80 dark:text-sky-300/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600/80 dark:bg-sky-300/90" />
              {t('notFound.badge')}
            </motion.div>

            <motion.h1
              variants={softDropText}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              {t('notFound.title')}
            </motion.h1>

            <motion.p
              variants={fadeInUpSm}
              className="text-sm sm:text-base text-slate-700/90 dark:text-slate-300/85 max-w-xl"
            >
              {t('notFound.description')}
            </motion.p>

            <motion.p
              variants={fadeInUpSm}
              className="text-xs sm:text-sm text-slate-500 dark:text-slate-400"
            >
              {t('notFound.hint')}
            </motion.p>

            <motion.div
              variants={fadeInUpSm}
              className="mt-4 flex flex-wrap gap-3"
            >
              <PrimaryBtn href="/" className="inline-flex items-center gap-2">
                <FiHome className="size-4" />
                <span>{t('notFound.actions.home')}</span>
              </PrimaryBtn>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold
                           rounded-xl px-4 py-2
                           ring-1 ring-slate-900/10 dark:ring-white/10
                           bg-white/70 dark:bg-white/5 backdrop-blur
                           text-slate-800 dark:text-slate-100
                           hover:bg-white/85 dark:hover:bg-white/10 transition"
              >
                <FiArrowLeft className="size-4" />
                <span>{t('notFound.actions.projects')}</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={floatZoom}
            className="w-full max-w-[220px] md:max-w-[260px] self-stretch
                       rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10
                       bg-linear-to-br from-white/70 to-white/5 dark:from-white/10 dark:to-white/0
                       flex flex-col items-center justify-center gap-2 px-6 py-8"
          >
            <div className="relative">
              <span className="absolute inset-0 blur-2xl bg-linear-to-tr from-cyan-400/25 to-sky-400/15" />
              <span
                className="relative text-6xl sm:text-7xl font-black tracking-tight
                               bg-clip-text text-transparent
                               bg-linear-to-r from-sky-400 via-cyan-300 to-emerald-300"
              >
                404
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {t('notFound.label')}
            </p>
          </motion.div>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset
                     ring-white/30 dark:ring-white/5 mix-blend-soft-light"
        />
      </AnimatedSection>
    </main>
  )
}
