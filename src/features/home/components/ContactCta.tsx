'use client'

import Link from 'next/link'
import { PrimaryBtn } from '@/components/ui/Buttons'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { SOCIALS } from '@/lib/socials'
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
import { CHIPS } from '../data/chips'

export default function ContactCta() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" mode="view" variants={fadeInUpSm}>
      <div className="md:max-w-5xl mx-auto">
        <div className="relative glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/80 dark:bg-white/5 backdrop-blur">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full blur-3xl
                       bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
            variants={bgFade}
          />

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <motion.div className="lg:col-span-2" variants={groupStagger}>
                <motion.h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                  variants={softDropText}
                >
                  {t('home.contact.title')}
                </motion.h2>

                <motion.p
                  className="mt-2 text-slate-700/90 dark:text-slate-300/85"
                  variants={fadeIn}
                >
                  {t('home.contact.subtitle')}
                </motion.p>

                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
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
                  className="mt-5 flex flex-wrap items-center gap-3"
                  variants={staggerTight}
                >
                  {SOCIALS.map((s) => (
                    <motion.div key={s.href} variants={fadeInUpSm}>
                      <Link
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
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

                <motion.div className="mt-6" variants={waterlineAnim}>
                  <PrimaryBtn href="/contact">
                    {t('home.contact.cta')}
                  </PrimaryBtn>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-3"
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

                <motion.div className="col-span-2" variants={floatZoom}>
                  <Link
                    href="mailto:berkant@slipyme.com"
                    className="rounded-xl px-4 py-3 ring-1 ring-slate-900/10 dark:ring-white/10
                               bg-white/75 dark:bg-white/5 backdrop-blur
                               hover:bg-white/85 dark:hover:bg-white/10 transition
                               flex flex-col md:flex-row items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <FiMail className="size-4 opacity-70" />
                      <span className="text-sm">berkant@slipyme.com</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {t('home.contact.mailHint')}
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
