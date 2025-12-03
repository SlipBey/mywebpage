'use client'

import SectionTitle from '@/components/SectionTitle'
import { motion } from 'framer-motion'
import { groupStagger, fadeInUpSm } from '@/lib/animations'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { FOCUS } from '../data/focus'
import AnimatedSection from '@/components/AnimatedSection'

export default function Focus() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full blur-3xl
                   bg-linear-to-br from-sky-400/20 via-cyan-300/20 to-transparent"
      />
      <SectionTitle>{t('about.focus.title')}</SectionTitle>

      <div className="mt-5 glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 p-4 sm:p-5">
        <motion.div
          variants={groupStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: '-15% 0px -15% 0px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {FOCUS.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.key}
                variants={fadeInUpSm}
                className="
                  group relative overflow-hidden rounded-2xl p-4
                  bg-white/70 dark:bg-white/6 backdrop-blur
                  ring-1 ring-slate-900/10 dark:ring-white/10
                   hover:-translate-y-0.5
                  shadow-[0_8px_32px_-16px_rgba(2,6,23,0.22)]
                  hover:shadow-[0_16px_40px_-20px_rgba(2,6,23,0.30)]
                "
              >
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute inset-y-0 left-0 w-1.5
                    bg-linear-to-b from-sky-400/70 to-cyan-400/70
                    opacity-90
                  "
                />
                <span
                  aria-hidden
                  className="
                    pointer-events-none absolute -inset-px rounded-2xl opacity-0
                    group-hover:opacity-100 transition
                    bg-[radial-gradient(40%_60%_at_0%_0%,rgba(56,189,248,0.16),transparent_60%),radial-gradient(40%_60%_at_100%_100%,rgba(103,232,249,0.12),transparent_60%)]
                  "
                />
                <div className="relative z-10 flex gap-3">
                  <div
                    className="
                      shrink-0 inline-grid place-items-center size-10 rounded-xl
                      bg-black/5 dark:bg-white/10
                      ring-1 ring-slate-900/10 dark:ring-white/10
                    "
                  >
                    <Icon className="size-5 text-slate-800 dark:text-slate-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {t(`about.focus.items.${f.key}.title`)}
                    </div>
                    <p className="mt-1 text-sm text-slate-700/90 dark:text-slate-300/85">
                      {t(`about.focus.items.${f.key}.desc`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
