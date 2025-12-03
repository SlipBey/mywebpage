'use client'

import { motion } from 'framer-motion'
import { bgFade, floatZoom, softDropText } from '@/lib/animations'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AnimatedSection from '@/components/AnimatedSection'
import { PrimaryBtn } from '@/components/ui/Buttons'

export default function AboutCta() {
  const { t } = useI18n()

  return (
    <AnimatedSection>
      <div className="md:max-w-5xl mx-auto">
        <div className="relative glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/80 dark:bg-white/5 backdrop-blur">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
            variants={bgFade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          />
          <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <motion.h3
              className="text-2xl font-extrabold tracking-tight"
              variants={softDropText}
            >
              {t('about.cta.title')}
            </motion.h3>
            <motion.div variants={floatZoom}>
              <PrimaryBtn href="/contact">{t('about.cta.button')}</PrimaryBtn>
            </motion.div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 dark:ring-white/5 mix-blend-soft-light"
          />
        </div>
      </div>
    </AnimatedSection>
  )
}
