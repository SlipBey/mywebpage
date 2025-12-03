'use client'

import Image from 'next/image'
import { PrimaryBtn, GlassBtn } from '@/components/ui/Buttons'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { motion } from 'framer-motion'
import { itemFade, listStagger } from '@/lib/animations'
import { SOCIALS } from '../../../lib/socials'
import { SKILLS } from '../data/skills'
import Link from 'next/link'

export default function Hero() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section">
      <div className="md:flex md:items-stretch md:gap-6">
        <div className="relative glass-ice rounded-2xl p-6 md:p-8 flex-1 min-w-0 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl
                       bg-linear-to-br from-sky-400/25 via-cyan-400/20 to-transparent"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2
                       bg-linear-to-r from-transparent via-sky-300/30 to-transparent dark:via-white/12"
            initial={{ x: 0 }}
            animate={{ x: ['0%', '180%'] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: 0.4
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10"
          />

          <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-700/80 dark:text-sky-300/90 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600/80 dark:bg-sky-300/90" />
                {t('about.hero.role')}
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-slate-50">
                {t('home.hero.name')}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIALS.map((s, idx) => (
                <Link
                  key={idx}
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
              ))}
            </div>
          </div>

          <p className="mt-3 text-base md:text-lg text-slate-700/90 dark:text-slate-300/85 relative z-10">
            {t('home.hero.subtitle')}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 relative z-10">
            <PrimaryBtn href="/about">
              <span className="text-base">＋</span>
              {t('home.hero.ctas.about')}
            </PrimaryBtn>

            <GlassBtn href="/projects">{t('home.hero.ctas.projects')}</GlassBtn>
          </div>

          <div className="mt-6 space-y-3 relative z-10">
            {(['software', 'creative', 'ops'] as const).map((grp) => (
              <div key={grp}>
                <div className="mb-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400/80">
                  {t(`home.hero.groups.${grp}`)}
                </div>

                <motion.ul
                  className="flex flex-wrap gap-2"
                  variants={listStagger}
                  initial="hidden"
                  animate="show"
                >
                  {SKILLS.filter((s) => s.group === grp).map(
                    ({ labelKey, icon: Icon }) => (
                      <motion.li
                        key={labelKey}
                        variants={itemFade}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                       text-slate-800 dark:text-slate-200/90 ring-1 ring-slate-900/10 dark:ring-white/10
                       bg-white/75 dark:bg-white/5 backdrop-blur"
                      >
                        <Icon className="h-4 w-4" />
                        {t(labelKey)}
                      </motion.li>
                    )
                  )}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block shrink-0 basis-[300px] sm:basis-[340px] md:basis-[360px] lg:basis-[380px] xl:basis-[420px]">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-tr from-sky-300/20 to-cyan-300/10 dark:from-sky-300/15 dark:to-cyan-300/10 blur-2xl" />
          <div className="glass-ice rounded-3xl p-2 h-full shadow-[0_20px_60px_-20px_rgba(2,6,23,0.25)]">
            <div className="relative w-full h-full overflow-hidden rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10">
              <Image
                src="/images/slipbey.png"
                alt={t('home.hero.name')}
                fill
                className="object-cover object-[50%_15%] brightness-95 contrast-110 dark:brightness-100 dark:contrast-100"
                sizes="(max-width: 1024px) 40vw, 420px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
