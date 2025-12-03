'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import clsx from 'clsx'

type Cell = {
  r: number
  c: number
  mine: boolean
  open: boolean
  flag: boolean
  n: number
}

const makeBoard = (rows: number, cols: number, mines: number) => {
  const grid: Cell[] = Array.from({ length: rows * cols }, (_, i) => ({
    r: Math.floor(i / cols),
    c: i % cols,
    mine: false,
    open: false,
    flag: false,
    n: 0
  }))

  let left = mines
  while (left > 0) {
    const idx = Math.floor(Math.random() * grid.length)
    if (!grid[idx].mine) {
      grid[idx].mine = true
      left--
    }
  }

  const nbrs = (r: number, c: number) => {
    const L: Cell[] = []
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue
        const rr = r + dr,
          cc = c + dc
        if (rr >= 0 && rr < rows && cc >= 0 && cc < cols)
          L.push(grid[rr * cols + cc])
      }
    return L
  }

  grid.forEach(
    (cell) => (cell.n = nbrs(cell.r, cell.c).filter((x) => x.mine).length)
  )
  return { grid, rows, cols, mines, nbrs }
}

type Level = 'easy' | 'med' | 'hard'
const levelCfg: Record<Level, readonly [number, number, number]> = {
  easy: [9, 9, 10],
  med: [16, 16, 40],
  hard: [16, 30, 99]
} as const

export default function Minesweeper() {
  const { t } = useI18n()
  const [level, setLevel] = useState<Level>('easy')

  const [state, setState] = useState(() => {
    const [r, c, m] = levelCfg['easy']
    return makeBoard(r, c, m)
  })
  const { grid, rows, cols, mines, nbrs } = state

  const [lost, setLost] = useState(false)
  const [won, setWon] = useState(false)

  const BASE_CELL = 30
  const BASE_GAP = 8
  const PAD = 24

  const viewportRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const natural = useMemo(() => {
    const width = cols * BASE_CELL + (cols - 1) * BASE_GAP + PAD
    const height = rows * BASE_CELL + (rows - 1) * BASE_GAP + PAD
    return { width, height }
  }, [rows, cols])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const measure = () => {
      const availW = el.clientWidth
      const availH = Math.max(0, el.clientHeight || window.innerHeight * 0.4)
      const s = Math.min(
        1,
        Math.min(availW / natural.width, availH / natural.height)
      )
      setScale(s)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('orientationchange', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', measure)
    }
  }, [natural.width, natural.height])

  useEffect(() => {
    const [r, c, m] = levelCfg[level]
    setLost(false)
    setWon(false)
    setState(makeBoard(r, c, m))
  }, [level])

  const reset = () => {
    const [r, c, m] = levelCfg[level]
    setLost(false)
    setWon(false)
    setState(makeBoard(r, c, m))
  }

  const idx = (r: number, c: number) => r * cols + c

  const openCell = (r: number, c: number) => {
    if (lost || won) return
    const g = [...grid]
    const cell = g[idx(r, c)]
    if (cell.open || cell.flag) return

    cell.open = true

    if (cell.mine) {
      setLost(true)
    } else if (cell.n === 0) {
      const q = [[r, c]]
      const seen = new Set([idx(r, c)])
      while (q.length) {
        const [rr, cc] = q.pop()!
        nbrs(rr, cc).forEach((nc) => {
          const k = idx(nc.r, nc.c)
          if (!seen.has(k) && !nc.mine && !g[k].open) {
            g[k].open = true
            seen.add(k)
            if (nc.n === 0) q.push([nc.r, nc.c])
          }
        })
      }
    }

    const unopened = g.filter((x) => !x.open).length
    if (unopened === mines) setWon(true)

    setState({ ...state, grid: g })
  }

  const toggleFlag = (r: number, c: number) => {
    if (lost || won) return
    const g = [...grid]
    const cell = g[idx(r, c)]
    if (cell.open) return
    cell.flag = !cell.flag
    setState({ ...state, grid: g })
  }

  const flags = useMemo(() => grid.filter((c) => c.flag).length, [grid])
  const remain = mines - flags

  const numColor = (n: number) =>
    n === 1
      ? 'text-sky-400'
      : n === 2
        ? 'text-emerald-400'
        : n === 3
          ? 'text-rose-400'
          : n === 4
            ? 'text-indigo-400'
            : n === 5
              ? 'text-orange-400'
              : n >= 6
                ? 'text-fuchsia-400'
                : ''

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div
          role="tablist"
          aria-label={t('apps.minesweeper.title')}
          className="inline-flex rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/5"
        >
          {(['easy', 'med', 'hard'] as const).map((m) => {
            const active = level === m
            return (
              <button
                key={m}
                role="tab"
                aria-selected={active}
                onClick={() => setLevel(m)}
                className={[
                  'px-3 py-1.5 text-sm font-semibold outline-none',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
              >
                {m === 'easy'
                  ? t('apps.minesweeper.easy')
                  : m === 'med'
                    ? t('apps.minesweeper.medium')
                    : t('apps.minesweeper.hard')}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
            {t('apps.minesweeper.remaining')}:{' '}
            <span className="tabular-nums">{remain}</span>
          </div>
          <button
            onClick={reset}
            className="rounded-xl px-3 py-1.5 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            {t('apps.minesweeper.refresh')}
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={clsx('flex items-center w-full', {
          'md:justify-center': level != 'hard'
        })}
      >
        <div
          className="mt-1"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
          }}
        >
          <div
            className="inline-grid rounded-2xl p-3 ring-1 ring-black/10 dark:ring-white/10 bg-white/5"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${BASE_CELL}px)`,
              gap: `${BASE_GAP}px`,
              width: natural.width,
              height: natural.height
            }}
          >
            {grid.map((cell, i) => (
              <button
                key={i}
                onClick={() => openCell(cell.r, cell.c)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  toggleFlag(cell.r, cell.c)
                }}
                className={[
                  `h-[${BASE_CELL}px] w-[${BASE_CELL}px]`,
                  'rounded-lg grid place-items-center select-none font-bold text-[13px]',
                  'ring-1 ring-black/10 dark:ring-white/10 shadow-sm transition',
                  cell.open
                    ? 'bg-white/10'
                    : 'bg-white/5 hover:bg-white/10 active:scale-[.98]'
                ].join(' ')}
                style={{ height: BASE_CELL, width: BASE_CELL }}
                aria-label={cell.mine ? 'mine' : `n${cell.n}`}
              >
                {cell.open ? (
                  cell.mine ? (
                    '💣'
                  ) : (
                    <span className={numColor(cell.n)}>{cell.n || ''}</span>
                  )
                ) : cell.flag ? (
                  '🚩'
                ) : (
                  ''
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-1 text-sm opacity-85">
        {lost
          ? t('apps.minesweeper.lose')
          : won
            ? t('apps.minesweeper.win')
            : t('apps.minesweeper.flagHint')}
      </div>
    </AppPanel>
  )
}
