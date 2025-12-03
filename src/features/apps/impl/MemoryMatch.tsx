'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import { EMOJIS } from '../data/memory'

type Card = { id: number; v: string; open: boolean; done: boolean }

const fmt = (ms: number) => {
  const sec = Math.floor(ms / 1000)
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0')
  const s = (sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function MemoryMatch() {
  const { t } = useI18n()

  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const dims = size === 'sm' ? [4, 3] : size === 'md' ? [4, 4] : [6, 4]
  const total = dims[0] * dims[1]

  const [cards, setCards] = useState<Card[]>([])
  const [moves, setMoves] = useState(0)

  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const runningRef = useRef(false)
  const startedRef = useRef(false)
  const baseRef = useRef(0)
  const startAtRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  const rafLoop = () => {
    if (!runningRef.current || startAtRef.current == null) return
    const now = performance.now()
    setElapsed(baseRef.current + (now - startAtRef.current))
    rafRef.current = requestAnimationFrame(rafLoop)
  }

  const begin = () => {
    if (runningRef.current) return
    startAtRef.current = performance.now()
    runningRef.current = true
    setRunning(true)
    rafRef.current = requestAnimationFrame(rafLoop)
  }

  const pause = () => {
    if (!runningRef.current || startAtRef.current == null) return
    const now = performance.now()
    baseRef.current += now - startAtRef.current
    startAtRef.current = null
    runningRef.current = false
    setRunning(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setElapsed(baseRef.current)
  }

  const resetTimer = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    runningRef.current = false
    setRunning(false)
    startAtRef.current = null
    baseRef.current = 0
    setElapsed(0)
    startedRef.current = false
  }

  const make = () => {
    const pick = [...EMOJIS].slice(0, total / 2)
    const arr: Card[] = [...pick, ...pick]
      .sort(() => Math.random() - 0.5)
      .map((v, i) => ({ id: i, v, open: false, done: false }))
    setMoves(0)
    setCards(arr)
    resetTimer()
  }

  useEffect(make, [size])
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    []
  )

  const open = (i: number) => {
    const c = [...cards]
    if (c[i].open || c[i].done) return

    if (!startedRef.current) {
      startedRef.current = true
      begin()
    }

    c[i].open = true
    setCards(c)

    const openIdx = c
      .map((x, ix) => (x.open && !x.done ? ix : -1))
      .filter((ix) => ix !== -1)

    if (openIdx.length === 2) {
      setTimeout(() => {
        const [a, b] = openIdx
        const d = [...c]
        if (d[a].v === d[b].v) d[a].done = d[b].done = true
        d[a].open = d[b].open = false
        setMoves((m) => m + 1)
        setCards(d)
      }, 320)
    }
  }

  const done = useMemo(
    () => cards.length > 0 && cards.every((c) => c.done),
    [cards]
  )

  useEffect(() => {
    if (done && startedRef.current) pause()
  }, [done])

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/5">
          {(
            [
              { k: 'sm', label: '4×3' },
              { k: 'md', label: '4×4' },
              { k: 'lg', label: '6×4' }
            ] as const
          ).map((m) => {
            const active = size === m.k
            return (
              <button
                key={m.k}
                onClick={() => setSize(m.k)}
                className={[
                  'px-3 py-1.5 text-sm font-semibold',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
              >
                {m.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm opacity-80">
            {t('apps.memory.moves')}: <b>{moves}</b>
          </span>
          <span className="text-sm opacity-80">
            {t('apps.memory.time')}: <b>{fmt(elapsed)}</b>
          </span>

          <button
            onClick={() => (runningRef.current ? pause() : begin())}
            disabled={!startedRef.current && running === false}
            className="rounded-xl px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50 [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
            title={!startedRef.current ? t('apps.memory.startHint') : ''}
          >
            {running ? t('apps.memory.pause') : t('apps.memory.resume')}
          </button>

          <button
            onClick={make}
            className="rounded-xl px-3 py-1.5 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            {t('apps.memory.refresh')}
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="mt-2 inline-grid"
          style={{ gridTemplateColumns: `repeat(${dims[0]}, 72px)`, gap: 10 }}
        >
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => open(c.id)}
              className={[
                'size-[72px] rounded-xl ring-1 ring-black/10 dark:ring-white/10 grid place-items-center text-2xl transition',
                c.done
                  ? 'bg-emerald-500/30'
                  : c.open
                    ? 'bg-white/15'
                    : 'bg-white/5 hover:-translate-y-0.5 hover:bg-white/10'
              ].join(' ')}
            >
              {c.open || c.done ? c.v : '•'}
            </button>
          ))}
        </div>
      </div>

      {done && (
        <div className="mt-3">
          <div className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]">
            {t('apps.memory.finished')} · {t('apps.memory.time')}:{' '}
            {fmt(elapsed)} 🎉
          </div>
        </div>
      )}
    </AppPanel>
  )
}
