'use client'
import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import { UNITS, CAT_META, type Cat } from '../data/units'

export default function UnitConvert() {
  const { t } = useI18n()

  const [cat, setCat] = useState<Cat>('length')
  const [val, setVal] = useState<number>(1)
  const [from, setFrom] = useState<string>(UNITS.length[0].k)

  const onChangeCat = (c: Cat) => {
    setCat(c)
    setFrom(UNITS[c][0].k)
  }

  const base = useMemo(() => {
    const unit = UNITS[cat].find((u) => u.k === from)
    const n = Number(val)
    if (!unit || !Number.isFinite(n)) return NaN
    return unit.toBase(n)
  }, [cat, val, from])

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="inline-flex rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/5">
        {(Object.keys(CAT_META) as Cat[]).map((c) => {
          const active = cat === c
          return (
            <button
              key={c}
              onClick={() => onChangeCat(c)}
              className={[
                'px-3 py-1.5 text-sm font-semibold',
                active
                  ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                  : 'hover:bg-white/10'
              ].join(' ')}
            >
              {t(CAT_META[c].labelKey)}
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm opacity-80">{t('apps.unit.value')}</label>
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-36 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />

        <label className="text-sm opacity-80">{t('apps.unit.from')}</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        >
          {UNITS[cat].map((u) => (
            <option key={u.k} value={u.k}>
              {t(u.nameKey)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {UNITS[cat].map((u) => {
          const out = Number.isFinite(base) ? u.fromBase(base) : NaN
          return (
            <div
              key={u.k}
              className="rounded-2xl p-3 ring-1 ring-black/10 dark:ring-white/10 bg-white/5"
            >
              <div className="text-sm opacity-80">{t(u.nameKey)}</div>
              <div className="text-lg font-semibold">
                {Number.isFinite(out)
                  ? out.toLocaleString(undefined, { maximumFractionDigits: 6 })
                  : '—'}
              </div>
            </div>
          )
        })}
      </div>
    </AppPanel>
  )
}
