'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { SOCIALS } from '@/lib/socials'
import { FiHeart } from 'react-icons/fi'
import { useTheme } from 'next-themes'

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn, fadeInUpSm, staggerTight } from '@/lib/animations'

export default function Footer() {
  const { t } = useI18n()
  const { theme } = useTheme()

  return (
    <AnimatedSection as="footer" mode="view" variants={fadeInUpSm}>
      <div className="relative glass-ice ring-1 ring-slate-900/10 dark:ring-white/10 rounded-2xl overflow-hidden">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-14 -left-14 h-48 w-48 rounded-full blur-3xl
                     bg-linear-to-br from-sky-400/20 via-cyan-400/15 to-transparent"
          variants={fadeIn}
        />

        <div className="px-6 py-8 sm:px-8">
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            variants={staggerTight}
          >
            <motion.div className="flex items-center gap-3" variants={fadeInUp}>
              <div className="relative h-9 w-9 overflow-hidden rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/70 dark:bg-white/10">
                <Image
                  src={
                    theme === 'dark' ? '/images/logo.png' : '/images/logo2.png'
                  }
                  alt={t('footer.brandAlt')}
                  fill
                  sizes="36px"
                  className="object-contain p-1.5"
                  priority
                />
              </div>
              <div className="text-lg font-extrabold tracking-tight">
                SlipBey
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2"
              variants={staggerTight}
            >
              {SOCIALS.map((s, i) => (
                <motion.span
                  key={s.href}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={s.href}
                    target="_blank"
                    prefetch={false}
                    rel="noopener noreferrer"
                    className="inline-grid place-items-center size-10 rounded-xl
                               ring-1 ring-slate-900/10 dark:ring-white/10
                               bg-white/75 dark:bg-white/5 backdrop-blur
                               hover:bg-white/85 dark:hover:bg-white/10 transition"
                  >
                    <s.icon className="size-5 text-slate-800 dark:text-slate-200" />
                  </Link>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="my-6 h-px w-full rounded bg-linear-to-r from-sky-500/0 via-sky-500/25 to-sky-500/0 dark:from-white/0 dark:via-white/15 dark:to-white/0"
            variants={fadeIn}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
            <motion.p
              className="text-sm leading-relaxed text-slate-700/90 dark:text-slate-300/85"
              variants={fadeInUp}
            >
              {t('footer.about')}
            </motion.p>

            <div className="flex md:justify-end">
              <motion.div variants={fadeInUp} transition={{ delay: 0.06 }}>
                <Link
                  href="mailto:berkant@slipyme.com"
                  className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm
                             ring-1 ring-slate-900/10 dark:ring-white/10
                             bg-white/75 dark:bg-white/5 backdrop-blur
                             hover:bg-white/85 dark:hover:bg-white/10 transition"
                >
                  <span className="opacity-70">✉</span>
                  berkant@slipyme.com
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-6 text-xs text-slate-600 dark:text-slate-400 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            variants={fadeIn}
          >
            <div className="flex flex-wrap items-center gap-1">
              © {new Date().getFullYear()} All Rights Reserved. Made with
              <FiHeart className=" text-red-600" /> by
              <Link
                href="/github"
                prefetch={false}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 dark:text-blue-300"
              >
                SlipBey.
              </Link>
            </div>
            <div>
              This is a{' '}
              <Link
                href="https://www.slipyme.com"
                className="text-sky-600 dark:text-sky-300"
                target="_blank"
              >
                Slipyme Company
              </Link>{' '}
              product.
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
