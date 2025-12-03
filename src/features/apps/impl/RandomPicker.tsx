'use client'
import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import {
  RANDOM_PICKER_DEFAULTS,
  RANDOM_PICKER_UI as UI
} from '../data/randomPicker'

type Mode = 'single' | 'bulk'

export default function RandomPicker() {
  const { t } = useI18n()

  const [mode, setMode] = useState<Mode>('single')
  const [name, setName] = useState('')
  const [bulk, setBulk] = useState('')

  const [list, setList] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)

  const [allowRepeats, setAllowRepeats] = useState(
    RANDOM_PICKER_DEFAULTS.allowRepeats
  )
  const [copied, setCopied] = useState(false)

  const canPick = useMemo(() => list.length > 0, [list.length])
  const counts = useMemo(
    () => ({ list: list.length, history: history.length }),
    [list.length, history.length]
  )

  const normalizeLines = (raw: string) =>
    raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

  const addSingle = () => {
    const v = name.trim()
    if (!v) return
    setList((p) => [...p, v])
    setName('')
  }

  const addBulk = () => {
    const items = normalizeLines(bulk)
    if (!items.length) return
    const merged = [...list, ...items]
    setList(RANDOM_PICKER_DEFAULTS.shuffleOnAdd ? shuffle(merged) : merged)
    setBulk('')
  }

  const remove = (i: number) => setList((p) => p.filter((_, idx) => idx !== i))
  const clearList = () => setList([])
  const clearHistory = () => setHistory([])

  const dedupe = () => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const it of list)
      if (!seen.has(it)) {
        seen.add(it)
        out.push(it)
      }
    setList(out)
  }

  const shuffle = <T,>(arr: T[]) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  const pick = () => {
    if (!canPick) return
    const idx = Math.floor(Math.random() * list.length)
    const w = list[idx]

    setWinner(w)
    setCopied(false)
    setHistory((p) => [w, ...p].slice(0, RANDOM_PICKER_DEFAULTS.maxHistory))

    if (!allowRepeats) setList((p) => p.filter((_, i) => i !== idx))
  }

  const copyWinner = async () => {
    if (!winner) return
    try {
      await navigator.clipboard.writeText(winner)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {}
  }

  return (
    <AppPanel stageClassName="space-y-5">
      <div className={UI.barClass}>
        {(['single', 'bulk'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={UI.tabClass}
            data-active={mode === m}
          >
            {t(`apps.randomPicker.modes.${m}` as const)}
          </button>
        ))}
      </div>

      {mode === 'single' ? (
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSingle()}
            placeholder={t('apps.randomPicker.placeholderSingle')}
            className="flex-1 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          />
          <button onClick={addSingle} className={UI.primBtnClass}>
            {t('apps.common.add')}
          </button>
        </div>
      ) : (
        <>
          <textarea
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            placeholder={t('apps.randomPicker.placeholderBulk')}
            rows={6}
            className="w-full rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={addBulk} className={UI.primBtnClass}>
              {t('apps.common.add')}
            </button>
            <button
              onClick={() => setBulk((s) => normalizeLines(s).join('\n'))}
              className={UI.softBtnClass}
            >
              {t('apps.randomPicker.trim')}
            </button>
          </div>
        </>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setList((p) => shuffle(p))}
          disabled={list.length < 2}
          className={UI.softBtnClass}
        >
          {t('apps.randomPicker.shuffle')}
        </button>
        <button
          onClick={dedupe}
          disabled={list.length < 2}
          className={UI.softBtnClass}
        >
          {t('apps.randomPicker.dedupe')}
        </button>

        <label className="ml-2 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={allowRepeats}
            onChange={(e) => setAllowRepeats(e.target.checked)}
          />
          {t('apps.randomPicker.allowRepeats')}
        </label>

        <span className="ml-auto text-sm opacity-80">
          {t('apps.randomPicker.counts')}:&nbsp;
          <b>{counts.list}</b> {t('apps.randomPicker.items')} ·{' '}
          <b>{counts.history}</b> {t('apps.randomPicker.picks')}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {list.length === 0 && (
          <div className="opacity-60 text-sm">
            {t('apps.randomPicker.empty')}
          </div>
        )}
        {list.map((n, i) => (
          <span
            key={`${n}-${i}`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          >
            <span className="truncate max-w-[36ch]">{n}</span>
            <button
              onClick={() => remove(i)}
              className="text-red-400 hover:underline"
              title={t('apps.common.remove')}
            >
              {t('apps.common.remove')}
            </button>
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button disabled={!canPick} onClick={pick} className={UI.primBtnClass}>
          {t('apps.randomPicker.pickWinner')}
        </button>
        <button
          onClick={clearList}
          className="rounded-xl px-4 py-2 font-semibold text-white bg-red-500/90 hover:bg-red-500"
        >
          {t('apps.common.clear')}
        </button>
        <button onClick={clearHistory} className={UI.softBtnClass}>
          {t('apps.randomPicker.clearHistory')}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-semibold">{t('apps.randomPicker.winner')}</div>

          {winner ? (
            <div className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]">
              {winner}
              <button
                onClick={copyWinner}
                className="underline underline-offset-2"
              >
                {t('apps.common.copy')}
              </button>
            </div>
          ) : (
            <span className="opacity-60 text-sm">
              {t('apps.randomPicker.noWinner')}
            </span>
          )}

          {copied && (
            <span className="inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-semibold text-white bg-emerald-500/90">
              {t('apps.common.copied')}
            </span>
          )}
        </div>

        <div>
          <div className="font-semibold mb-1">
            {t('apps.randomPicker.history')}
          </div>
          <div className="rounded-xl p-3 ring-1 ring-black/5 dark:ring-white/10 bg-white/5 min-h-12">
            {history.length === 0 ? (
              <span className="opacity-60 text-sm">
                {t('apps.randomPicker.noHistory')}
              </span>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {history.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AppPanel>
  )
}
