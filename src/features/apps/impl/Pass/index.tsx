'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { strengthMeta, usePassGen } from './usePassGen'
import { FiCopy } from 'react-icons/fi'
import AppPanel from '../../components/AppPanel'

export default function PassGen() {
  const { t } = useI18n()
  const {
    pwd,
    len,
    upper,
    digit,
    symbol,
    score,
    strengthPercent,
    setLen,
    setUpper,
    setDigit,
    setSymbol,
    generate,
    copy
  } = usePassGen({
    initialLength: 18,
    initialUpper: true,
    initialDigit: true,
    initialSymbol: true
  })

  const meta = strengthMeta(score)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copy()
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }
  }

  return (
    <AppPanel stageClassName="space-y-5">
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={pwd}
          className="flex-1 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10
                     ring-1 ring-black/5 dark:ring-white/10 text-sm md:text-base
                     selection:bg-emerald-200/60 dark:selection:bg-emerald-500/30"
          aria-label={t('apps.items.pass.title')}
        />
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-medium
                     ring-1 ring-black/5 dark:ring-white/10 hover:opacity-90 transition"
          aria-label={t('apps.common.copy')}
          title={t('apps.common.copy')}
        >
          <FiCopy className="text-base" />
          {copied ? t('apps.pass.copied') : t('apps.common.copy')}
        </button>
      </div>

      <div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
          <div
            className="h-full transition-[width] duration-300"
            style={{ width: `${strengthPercent}%`, background: meta.color }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs opacity-80">
          <span />
          <span>{t(`apps.pass.strength.${meta.key}`)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium opacity-90">
            {t('apps.pass.length')}
          </span>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={50}
              value={len}
              onChange={(e) => setLen(Number(e.target.value))}
              className="flex-1 accent-emerald-500"
            />
            <input
              type="number"
              min={1}
              max={50}
              value={len}
              onChange={(e) => {
                const v = Number(e.target.value)
                setLen(Number.isFinite(v) ? Math.max(1, Math.min(50, v)) : 1)
              }}
              className="w-16 rounded-md px-2 py-1 bg-white/70 dark:bg-white/10
                         ring-1 ring-black/5 dark:ring-white/10 text-sm text-center"
            />
          </div>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={upper}
              onChange={(e) => setUpper(e.target.checked)}
              className="size-4 accent-emerald-500"
            />
            <span className="text-sm">{t('apps.pass.upper')}</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={digit}
              onChange={(e) => setDigit(e.target.checked)}
              className="size-4 accent-emerald-500"
            />
            <span className="text-sm">{t('apps.pass.digit')}</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={symbol}
              onChange={(e) => setSymbol(e.target.checked)}
              className="size-4 accent-emerald-500"
            />
            <span className="text-sm">{t('apps.pass.symbol')}</span>
          </label>
        </div>
      </div>

      <div>
        <button
          onClick={generate}
          className="rounded-xl px-4 py-2 font-semibold text-white
                     [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]
                     hover:brightness-[1.06] active:brightness-95 transition"
        >
          {t('apps.pass.generate')}
        </button>
      </div>
    </AppPanel>
  )
}
