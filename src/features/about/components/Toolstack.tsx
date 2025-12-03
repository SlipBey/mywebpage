'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { TOOLS } from '../data/tools'
import { groupStagger, fadeInUpSm } from '@/lib/animations'
import AnimatedSection from '@/components/AnimatedSection'

export default function Toolstack() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full blur-3xl
                   bg-linear-to-tr from-sky-300/20 to-cyan-300/15"
      />
      <SectionTitle>{t('about.tools.title')}</SectionTitle>

      <div className="mt-5 glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 p-4 sm:p-5">
        <motion.div
          variants={groupStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {TOOLS.map(({ key, label, Icon }) => (
            <motion.div
              key={key}
              variants={fadeInUpSm}
              className="
                group flex items-center gap-2 rounded-xl px-3 py-2
                bg-white/70 dark:bg-white/6 backdrop-blur
                ring-1 ring-slate-900/10 dark:ring-white/10
                hover:-translate-y-0.5
              "
            >
              <span
                className="
                  inline-grid place-items-center size-8 rounded-lg
                  bg-black/5 dark:bg-white/10
                  ring-1 ring-slate-900/10 dark:ring-white/10
                "
              >
                <Icon className="size-4 text-slate-800 dark:text-slate-200" />
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {label}
              </span>

              <span
                aria-hidden
                className="
                  pointer-events-none absolute -inset-px rounded-xl opacity-0
                  group-hover:opacity-100 transition
                  bg-[radial-gradient(40%_60%_at_0%_0%,rgba(56,189,248,0.16),transparent_60%)]
                "
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-4 h-px w-full rounded bg-linear-to-r from-sky-500/0 via-sky-500/25 to-sky-500/0 dark:from-white/0 dark:via-white/12 dark:to-white/0" />
      </div>
    </AnimatedSection>
  )
}
