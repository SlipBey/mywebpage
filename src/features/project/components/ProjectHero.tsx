'use client'

import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { PROJECTS } from '@/lib/projects'
import { motion } from 'framer-motion'
import { bgFade, fadeInUpSm, floatZoom, groupStagger } from '@/lib/animations'
import { PrimaryBtn } from '@/components/ui/Buttons'

export default function ProjectHero() {
  const { t } = useI18n()
  const total = PROJECTS.length

  return (
    <AnimatedSection
      as="section"
      id="projects-hero"
      className="relative overflow-hidden glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10"
      mode="view"
      variants={fadeInUpSm}
    >
      <motion.div
        aria-hidden
        variants={bgFade}
        className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full blur-3xl bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
      />

      <motion.div
        variants={groupStagger}
        className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-start gap-6"
      >
        <div className="flex-1">
          <motion.div
            variants={fadeInUpSm}
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700/80 dark:text-sky-300/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-600/80 dark:bg-sky-300/90" />
            {t('project.badge')}
          </motion.div>

          <motion.h1
            variants={fadeInUpSm}
            className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            {t('project.title')}
          </motion.h1>

          <motion.p
            variants={fadeInUpSm}
            className="mt-3 text-slate-700/90 dark:text-slate-300/85 max-w-2xl"
          >
            {t('project.description')}
          </motion.p>

          <motion.div
            variants={fadeInUpSm}
            className="mt-5 flex flex-wrap gap-2"
          >
            <span className="px-3 py-1 text-xs font-semibold rounded-full ring-1 ring-slate-900/10 dark:ring-white/10 bg-black/5 dark:bg-white/5">
              {t('project.total')} {total}
            </span>
            <PrimaryBtn
              href="#github-projects"
              className="px-3! py-1! text-xs! rounded-full!"
            >
              GitHub
            </PrimaryBtn>
          </motion.div>
        </div>

        <motion.div
          variants={floatZoom}
          className="relative w-full max-w-[360px] self-stretch rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 blur-3xl bg-linear-to-tr from-cyan-300/15 to-sky-300/10" />
          <div className="h-full w-full bg-linear-to-br from-white/60 to-white/10 dark:from-white/5 dark:to-white/0" />
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 dark:ring-white/5 mix-blend-soft-light"
      />
    </AnimatedSection>
  )
}
