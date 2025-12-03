'use client'
import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'

const toRgb = (hex: string) => {
  const h = hex.replace('#', '')
  const n = Number.parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  )
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
const toHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')

function contrastRatio(hex1: string, hex2: string) {
  const l = (hex: string) => {
    const { r, g, b } = toRgb(hex)
    const sr = [r, g, b].map((v) => {
      let x = v / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * sr[0] + 0.7152 * sr[1] + 0.0722 * sr[2]
  }
  const L1 = l(hex1),
    L2 = l(hex2)
  const [a, b] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (a + 0.05) / (b + 0.05)
}

export default function ColorPicker() {
  const { t } = useI18n()
  const [fg, setFg] = useState('#111827')
  const [bg, setBg] = useState('#ffffff')
  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg])
  const okAA = ratio >= 4.5

  const invert = () => {
    const x = fg
    setFg(bg)
    setBg(x)
  }

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">{t('apps.color.fg')}</span>
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
          />
          <input
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm opacity-80">{t('apps.color.bg')}</span>
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
          />
          <input
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            className="rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          />
        </label>
      </div>

      <div
        className="mt-2 rounded-xl p-4 ring-1 ring-black/5 dark:ring-white/10"
        style={{ background: bg, color: fg }}
      >
        <div className="font-semibold mb-1">{t('apps.color.previewTitle')}</div>
        <p className="text-sm">{t('apps.color.previewDesc')}</p>
        <button className="mt-3 rounded-xl px-4 py-2 bg-white/60 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10">
          {t('apps.color.button')}
        </button>
      </div>

      <div className="mt-1 flex items-center gap-3">
        <div
          className={`text-sm font-semibold ${okAA ? 'text-emerald-600' : 'text-amber-600'}`}
        >
          {t('apps.color.contrast')}: {ratio.toFixed(2)}{' '}
          {okAA ? '(AA ✓)' : `(${t('apps.color.low')})`}
        </div>
        <button
          onClick={invert}
          className="rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        >
          {t('apps.color.invert')}
        </button>
      </div>
    </AppPanel>
  )
}
