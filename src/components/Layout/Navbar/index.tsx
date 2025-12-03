'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGES } from '@/lib/pages'
import Image from 'next/image'
import SlidingPill from './SlidingPill'

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { t, lang, setLang } = useI18n()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const desktopWrapRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  const [activeEl, setActiveEl] = useState<HTMLAnchorElement | null>(null)
  useEffect(() => {
    const act = PAGES.find((p) => isActive(p.href))
    setActiveEl(act ? (linkRefs.current[act.href] ?? null) : null)
  }, [pathname, mounted])

  return (
    <header className="sticky top-4 z-50">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="rounded-xl px-4 sm:px-6 py-3 flex gap-3 flex-row lg:items-center justify-between shadow-[0_10px_30px_-12px_rgba(2,6,23,0.25)] bg-white/90 dark:bg-white/5 ring-1 ring-slate-900/10 dark:ring-white/10 backdrop-blur-md"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative h-8 w-8">
            {mounted && (
              <Image
                src={
                  theme === 'dark' ? '/images/logo.png' : '/images/logo2.png'
                }
                alt="SlipBey"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            )}
          </div>
          <span className="text-lg lg:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            <span className="text-sky-600">Slip</span>Bey
          </span>
        </Link>

        <div
          ref={desktopWrapRef}
          className="relative hidden lg:flex flex-wrap gap-2 lg:gap-3 font-semibold text-sm"
        >
          <SlidingPill container={desktopWrapRef.current} activeEl={activeEl} />

          {PAGES.map((p, idx) => {
            const active = isActive(p.href)
            return (
              <Link
                key={idx}
                href={p.href}
                ref={(el) => {
                  linkRefs.current[p.href] = el
                }}
                data-active={active ? 'true' : 'false'}
                className={[
                  'relative z-10 rounded-lg px-3 py-2 transition-colors',
                  active
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-700/90 dark:text-slate-200/90 hover:text-slate-900 dark:hover:text-white'
                ].join(' ')}
              >
                {t(p.key)}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 ring-1 ring-slate-900/10 bg-white/80 backdrop-blur dark:text-slate-200 dark:hover:text-white dark:ring-white/10 dark:bg-white/5 transition"
            aria-label="Dil değiştir"
            title="Dil değiştir"
          >
            {lang?.toUpperCase() === 'TR' ? 'EN' : 'TR'}
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 ring-1 ring-slate-900/10 bg-white/80 backdrop-blur dark:text-slate-200 dark:hover:text-white dark:ring-white/10 dark:bg-white/5 transition"
              aria-label="Tema değiştir"
              title="Tema değiştir"
            >
              {theme === 'dark' ? '☀︎' : '🌙'}
            </button>
          )}

          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 ring-1 ring-slate-900/10 bg-white/80 backdrop-blur dark:text-slate-200 dark:hover:text-white dark:ring-white/10 dark:bg-white/5 transition"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menüyü aç/kapat"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 lg:hidden overflow-hidden rounded-xl bg-white/90 dark:bg-white/5 ring-1 ring-slate-900/10 dark:ring-white/10 backdrop-blur-md"
          >
            <div className="flex flex-col p-2">
              {PAGES.map((p, idx) => {
                const active = isActive(p.href)
                return (
                  <Link
                    key={idx}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className={[
                      'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                      active
                        ? 'text-slate-900 dark:text-white bg-sky-300/25 dark:bg-sky-400/15 ring-1 ring-sky-700/10 dark:ring-white/10'
                        : 'text-slate-700/90 dark:text-slate-200/90 hover:text-slate-900 dark:hover:text-white'
                    ].join(' ')}
                  >
                    {t(p.key)}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
