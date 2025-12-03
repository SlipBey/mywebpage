'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/I18nProvider'

export type HomeWorksTabKey = 'youtube' | 'music' | 'film'

export interface HomeWorksTabsProps {
  tab: HomeWorksTabKey
  onChange: (t: HomeWorksTabKey) => void
}

const TABS: HomeWorksTabKey[] = ['youtube', 'music', 'film']

type PillStyle = { left: number; width: number }

export default function HomeWorksTabs({ tab, onChange }: HomeWorksTabsProps) {
  const { t } = useI18n()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [pill, setPill] = useState<PillStyle>({ left: 0, width: 0 })

  const recalc = () => {
    const wrap = wrapRef.current
    if (!wrap) return

    const activeKey = tab
    const btn = wrap.querySelector<HTMLButtonElement>(
      `button[data-tab="${activeKey}"]`
    )
    if (!btn) return

    const wrapRect = wrap.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()

    setPill({
      left: btnRect.left - wrapRect.left,
      width: btnRect.width
    })
  }

  useLayoutEffect(() => {
    recalc()
  }, [tab])

  useEffect(() => {
    const handler = () => recalc()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div
      ref={wrapRef}
      className="
        relative inline-flex items-center gap-1
        rounded-2xl px-1.5 py-1
        bg-white/70 dark:bg-white/5
        ring-1 ring-slate-900/10 dark:ring-white/10
        backdrop-blur shadow-sm
        dark:shadow-[0_0_15px_rgba(56,189,248,0.18)]
        overflow-hidden
      "
    >
      <motion.div
        className="
          absolute top-1 bottom-1 rounded-xl
          bg-linear-to-r from-[#68a4a0] to-[#4f8f8b]
          shadow-[0_0_22px_-6px_rgba(56,189,248,0.6)]
        "
        animate={{ left: pill.left, width: pill.width }}
        transition={{ type: 'spring', stiffness: 480, damping: 38 }}
      />

      {TABS.map((key) => (
        <button
          key={key}
          type="button"
          data-tab={key}
          onClick={() => onChange(key)}
          data-active={tab === key}
          className="
            relative z-10 rounded-xl px-4 py-1.5 mx-px
            text-sm font-semibold
            text-slate-100/80 dark:text-slate-200
            transition-colors
            data-[active=true]:text-white
          "
        >
          {key === 'youtube' && t('home.works.tabs.youtube')}
          {key === 'music' && t('home.works.tabs.music')}
          {key === 'film' && t('home.works.tabs.film')}
        </button>
      ))}
    </div>
  )
}
