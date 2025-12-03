'use client'

import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { SOCIALS } from '@/lib/socials'
import { CHIPS } from '@/features/home/data/chips'
import { FiMail } from 'react-icons/fi'
import { motion } from 'framer-motion'
import {
  fadeIn,
  fadeInUp,
  fadeInUpSm,
  softDropText,
  floatZoom,
  waterlineAnim,
  groupStagger,
  staggerTight,
  bgFade
} from '@/lib/animations'
import { CONTACT_SUBJECTS } from '../data/subjects'
import ContactForm from './ContactForm'

export default function ContactSection() {
  const { t } = useI18n()

  const subjectOptions = CONTACT_SUBJECTS.map((s) => ({
    value: s.value,
    label: t(s.labelKey)
  }))

  return (
    <AnimatedSection as="section" mode="view" variants={fadeInUpSm}>
      <div>
        <div className="relative glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/80 dark:bg-white/5 backdrop-blur">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
            variants={bgFade}
          />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8 justify-between">
              <motion.div className="space-y-5" variants={groupStagger}>
                <motion.h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  variants={softDropText}
                >
                  {t('contact.sidebar.title')}
                </motion.h2>

                <motion.p
                  className="text-sm text-slate-700/90 dark:text-slate-300/85"
                  variants={fadeIn}
                >
                  {t('contact.sidebar.subtitle')}
                </motion.p>

                <motion.div
                  className="mt-3 flex flex-wrap gap-2"
                  variants={staggerTight}
                >
                  {CHIPS.map((c) => (
                    <motion.span
                      key={c}
                      variants={fadeInUpSm}
                      className="px-3 py-1.5 rounded-xl text-sm font-semibold
                                 text-slate-800 dark:text-slate-200/90
                                 ring-1 ring-slate-900/10 dark:ring-white/10
                                 bg-white/75 dark:bg-white/5 backdrop-blur"
                    >
                      {c}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-4 grid grid-cols-2 gap-3"
                  variants={groupStagger}
                >
                  <motion.div
                    className="rounded-xl bg-black/5 dark:bg-white/5 px-4 py-3 text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-xl font-bold">10+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t('home.contact.stats.years')}
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-xl bg-black/5 dark:bg-white/5 px-4 py-3 text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-xl font-bold">30+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t('home.contact.stats.projects')}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div className="mt-4 space-y-3" variants={groupStagger}>
                  <motion.div
                    variants={fadeInUpSm}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide"
                  >
                    {t('contact.sidebar.socialsTitle')}
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap items-center gap-3"
                    variants={staggerTight}
                  >
                    {SOCIALS.map((s) => (
                      <motion.div key={s.href} variants={fadeInUpSm}>
                        <Link
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-grid place-items-center size-10 rounded-xl
                                     ring-1 ring-slate-900/10 dark:ring-white/10
                                     bg-white/75 dark:bg-white/5 backdrop-blur
                                     hover:bg-white/85 dark:hover:bg-white/10 transition"
                        >
                          <s.icon className="size-5 text-slate-800 dark:text-slate-200" />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div className="mt-4" variants={floatZoom}>
                  <Link
                    href="mailto:berkant@slipyme.com"
                    className="rounded-xl px-4 py-3 ring-1 ring-slate-900/10 dark:ring-white/10
                               bg-white/75 dark:bg-white/5 backdrop-blur
                               hover:bg-white/85 dark:hover:bg-white/10 transition
                               flex flex-col md:flex-row items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <FiMail className="size-4 opacity-70" />
                      <span className="text-sm">berkant@slipyme.com</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t('contact.sidebar.response')}
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={waterlineAnim}>
                <ContactForm subjectOptions={subjectOptions} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
