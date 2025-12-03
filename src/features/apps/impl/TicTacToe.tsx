'use client'
import { useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'

type P = 'X' | 'O' | null
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
] as const

const winnerOf = (b: P[]) => {
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a] as 'X' | 'O'
  }
  return b.every(Boolean) ? 'draw' : null
}

export default function TicTacToe() {
  const { t } = useI18n()

  const [board, setBoard] = useState<P[]>(Array(9).fill(null))
  const [bot, setBot] = useState<'off' | 'smart'>('smart')
  const [turn, setTurn] = useState<P>('X')

  const win = useMemo(() => winnerOf(board), [board])

  const winningLine = useMemo<number[] | null>(() => {
    for (const [a, c, d] of lines) {
      if (board[a] && board[a] === board[c] && board[a] === board[d])
        return [a, c, d]
    }
    return null
  }, [board])

  const play = (i: number) => {
    if (win || board[i]) return
    const b = [...board]
    b[i] = turn
    setBoard(b)
    const next = turn === 'X' ? 'O' : 'X'
    setTurn(next)

    if (!winnerOf(b) && bot === 'smart' && turn === 'X') {
      setTimeout(() => botMove(b), 120)
    }
  }

  const botMove = (b: P[]) => {
    const empty = b
      .map((v, i) => [v, i] as const)
      .filter(([v]) => !v)
      .map(([, i]) => i)

    for (const i of empty) {
      const tB = [...b]
      tB[i] = 'O'
      if (winnerOf(tB) === 'O') {
        setBoard(tB)
        setTurn('X')
        return
      }
    }

    for (const i of empty) {
      const tB = [...b]
      tB[i] = 'X'
      if (winnerOf(tB) === 'X') {
        b[i] = 'O'
        setBoard([...b])
        setTurn('X')
        return
      }
    }

    const order = [4, 0, 2, 6, 8, 1, 3, 5, 7]
    for (const i of order) {
      if (!b[i]) {
        b[i] = 'O'
        setBoard([...b])
        setTurn('X')
        return
      }
    }
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setTurn('X')
  }

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div
          role="tablist"
          aria-label={t('apps.items.tictactoe.title')}
          className="inline-flex rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/5"
        >
          {(['off', 'smart'] as const).map((m) => {
            const active = bot === m
            return (
              <button
                key={m}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  ;(reset(), setBot(m))
                }}
                className={[
                  'px-3 py-1.5 text-sm font-semibold outline-none',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
              >
                {m === 'off'
                  ? t('apps.tictactoe.twoPlayer')
                  : t('apps.tictactoe.smartBot')}
              </button>
            )
          })}
        </div>

        <button
          onClick={reset}
          className="rounded-xl px-3 py-1.5 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
        >
          {t('apps.tictactoe.refresh')}
        </button>
      </div>

      <div className="flex items-center justify-center">
        {' '}
        <div className="mt-1 w-full max-w-[280px]">
          <div className="grid grid-cols-3 gap-3">
            {board.map((v, i) => {
              const inWin = winningLine?.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => play(i)}
                  className={[
                    'aspect-square rounded-2xl grid place-items-center select-none text-4xl font-extrabold tracking-tight',
                    'ring-1 ring-black/10 dark:ring-white/10 shadow-sm transition',
                    v
                      ? 'bg-white/10'
                      : 'bg-white/5 hover:bg-white/10 active:scale-[.98]',
                    inWin ? 'outline outline-sky-400/60' : ''
                  ].join(' ')}
                >
                  <span
                    className={
                      v === 'X'
                        ? 'text-sky-400'
                        : v === 'O'
                          ? 'text-emerald-400'
                          : ''
                    }
                  >
                    {v ?? ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-1 text-sm opacity-85">
        {win
          ? win === 'draw'
            ? t('apps.tictactoe.draw')
            : `${t('apps.tictactoe.winner')}: ${win}`
          : `${t('apps.tictactoe.turn')}: ${turn}`}
      </div>
    </AppPanel>
  )
}
