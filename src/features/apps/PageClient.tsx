'use client'

import type React from 'react'
import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import {
  itemFade,
  fadeInUpSm,
  staggerTight,
  floatZoom,
  bgFade,
  groupStagger
} from '@/lib/animations'
import { AppsGrid } from './components/AppsGrid'
import type { AppCategory } from './data/registry.base'
import { APPS } from './data/registry.client'

type UITab = 'all' | AppCategory

export default function AppsPageClient() {
  const { t } = useI18n()

  const tabs = useMemo(
    () =>
      [
        { key: 'all', label: t('apps.tabs.all') },
        { key: 'utility', label: t('apps.tabs.tools') },
        { key: 'game', label: t('apps.tabs.games') },
        { key: 'fun', label: t('apps.tabs.fun') }
      ] as const,
    [t]
  )

  type TabKey = (typeof tabs)[number]['key']

  const [cat, setCat] = useState<UITab>('all')

  const apps = useMemo(
    () => (cat === 'all' ? APPS : APPS.filter((a) => a.category === cat)),
    [cat]
  )

  const onTabsKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const order = tabs.map((t) => t.key) as readonly TabKey[]
      const i = order.indexOf(cat as TabKey)

      if (e.key === 'ArrowRight') {
        setCat(order[(i + 1) % order.length])
      } else if (e.key === 'ArrowLeft') {
        setCat(order[(i - 1 + order.length) % order.length])
      } else if (e.key === 'Home') {
        setCat(order[0])
      } else if (e.key === 'End') {
        setCat(order[order.length - 1])
      }
    },
    [cat, tabs]
  )

  return (
    <>
      <AnimatedSection
        as="section"
        id="works-hero"
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
              className="mb-2 flex items-center gap-2 text-xs font-semibold text-sky-700/80 dark:text-sky-300/90"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600/80 dark:bg-sky-300/90" />
              {t('apps.badge')}
            </motion.div>

            <motion.h1
              variants={fadeInUpSm}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              {t('apps.title')}
            </motion.h1>

            <motion.p
              variants={fadeInUpSm}
              className="mt-3 text-slate-700/90 dark:text-slate-300/85 max-w-2xl"
            >
              {t('apps.description')}
            </motion.p>

            <motion.div
              role="tablist"
              aria-label={t('apps.title')}
              onKeyDown={onTabsKeyDown}
              className="mt-6 inline-flex rounded-xl bg-white/60 p-1 ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10"
              variants={staggerTight}
            >
              {tabs.map((tb) => {
                const active = cat === tb.key
                return (
                  <motion.button
                    key={tb.key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`apps-panel-${tb.key}`}
                    tabIndex={active ? 0 : -1}
                    variants={itemFade}
                    onClick={() => setCat(tb.key)}
                    className={[
                      'relative rounded-lg px-3.5 py-2 text-sm font-semibold transition outline-none',
                      active
                        ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 ring-1 ring-sky-500/30 dark:ring-sky-300/30'
                        : 'hover:bg-white/70 dark:hover:bg-white/10'
                    ].join(' ')}
                  >
                    <span
                      className={active ? 'text-sky-700 dark:text-sky-300' : ''}
                    >
                      {tb.label}
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
          <motion.div
            variants={floatZoom}
            initial="hidden"
            animate="show"
            className="relative w-full max-w-[360px] self-stretch rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 -z-10 blur-3xl bg-linear-to-tr from-cyan-300/20 to-sky-300/10" />
            <div className="h-full w-full bg-linear-to-br from-white/60 to-white/10 dark:from-white/5 dark:to-white/0" />
          </motion.div>
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 dark:ring-white/5 mix-blend-soft-light"
        />
      </AnimatedSection>

      <section id="apps-grid" className="py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            id={`apps-panel-${cat}`}
            role="tabpanel"
            variants={fadeInUpSm}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 6, transition: { duration: 0.16 } }}
          >
            <AppsGrid apps={apps} />
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}
