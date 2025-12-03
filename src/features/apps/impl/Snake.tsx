'use client'

import type React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'

type Pt = { x: number; y: number }
const S = 18,
  W = 20,
  H = 18

export default function Snake() {
  const { t } = useI18n()

  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState<'slow' | 'mid' | 'fast'>('mid')
  const [running, setRunning] = useState(false)
  const [lost, setLost] = useState(false)

  const dirRef = useRef<Pt>({ x: 1, y: 0 })
  const snakeRef = useRef<Pt[]>([
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 4, y: 6 }
  ])
  const foodRef = useRef<Pt>({ x: 12, y: 7 })
  const raf = useRef<number | null>(null)
  const lastRef = useRef<number>(0)
  const touchStartRef = useRef<Pt | null>(null)

  const placeFood = () => {
    while (true) {
      const p = {
        x: Math.floor(Math.random() * W),
        y: Math.floor(Math.random() * H)
      }
      if (!snakeRef.current.some((s) => s.x === p.x && s.y === p.y)) {
        foodRef.current = p
        return
      }
    }
  }

  const draw = () => {
    const c = document.getElementById('snk') as HTMLCanvasElement | null
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0, 0, W * S, H * S)

    ctx.fillStyle = 'rgba(255,255,255,.06)'
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if ((x + y) % 2 === 0) ctx.fillRect(x * S, y * S, S, S)
      }
    }

    ctx.fillStyle = '#e74c3c'
    ctx.fillRect(foodRef.current.x * S, foodRef.current.y * S, S, S)

    ctx.fillStyle = '#68a4a0'
    snakeRef.current.forEach((p) => {
      ctx.fillRect(p.x * S, p.y * S, S, S)
    })
  }

  const changeDir = useCallback((next: Pt) => {
    const cur = dirRef.current
    if (
      (next.x === cur.x && next.y === cur.y) ||
      (next.x === -cur.x && next.y === -cur.y)
    ) {
      return
    }
    dirRef.current = next
  }, [])

  const tick = (now: number) => {
    const step = speed === 'slow' ? 120 : speed === 'mid' ? 80 : 55

    if (now - lastRef.current >= step) {
      lastRef.current = now

      const d = dirRef.current
      const s = [...snakeRef.current]
      const head = {
        x: (s[0].x + d.x + W) % W,
        y: (s[0].y + d.y + H) % H
      }

      if (s.some((p) => p.x === head.x && p.y === head.y)) {
        setRunning(false)
        setLost(true)
        draw()
        return
      }

      s.unshift(head)

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((v) => v + 5)
        placeFood()
      } else {
        s.pop()
      }

      snakeRef.current = s
      draw()
    }

    if (running) {
      raf.current = requestAnimationFrame(tick)
    } else {
      raf.current = null
    }
  }

  const reset = () => {
    snakeRef.current = [
      { x: 6, y: 6 },
      { x: 5, y: 6 },
      { x: 4, y: 6 }
    ]
    dirRef.current = { x: 1, y: 0 }
    placeFood()
    setScore(0)
    setLost(false)
    draw()
  }

  useEffect(() => {
    draw()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key
      if (k === 'ArrowUp') changeDir({ x: 0, y: -1 })
      if (k === 'ArrowDown') changeDir({ x: 0, y: 1 })
      if (k === 'ArrowLeft') changeDir({ x: -1, y: 0 })
      if (k === 'ArrowRight') changeDir({ x: 1, y: 0 })
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [changeDir])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current)
      raf.current = null
    }

    if (running) {
      lastRef.current = 0
      raf.current = requestAnimationFrame(tick)
    }
  }, [running, speed])

  useEffect(() => {
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current)
      }
    }
  }, [])

  const handleTouchStart: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = (e) => {
    const start = touchStartRef.current
    if (!start) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    touchStartRef.current = null

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return

    if (Math.abs(dx) > Math.abs(dy)) {
      changeDir(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 })
    } else {
      changeDir(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 })
    }
  }

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white/5">
          {(['slow', 'mid', 'fast'] as const).map((m) => {
            const active = speed === m
            return (
              <button
                key={m}
                onClick={() => setSpeed(m)}
                className={[
                  'px-3 py-1.5 text-sm font-semibold',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
              >
                {t(`apps.snake.speed.${m}` as const)}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm opacity-80">
            {t('apps.snake.score')}: <b>{score}</b>
          </span>
          <button
            onClick={() => setRunning((v) => !v)}
            className="rounded-xl px-3 py-1.5 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            {running ? t('apps.snake.pause') : t('apps.snake.start')}
          </button>
          <button
            onClick={reset}
            className="px-3 py-1.5 text-sm rounded-xl ring-1 ring-black/5 dark:ring-white/10 hover:bg-white/10"
          >
            {t('apps.snake.reset')}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative mt-2 inline-block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
          <canvas
            id="snk"
            width={W * S}
            height={H * S}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          {!running && !lost && (
            <div className="absolute inset-0 grid place-items-center bg-black/20 backdrop-blur-[1px]">
              <div className="glass-ice rounded-xl px-4 py-2 text-sm ring-1 ring-black/5 dark:ring-white/10">
                {t('apps.snake.paused')}
              </div>
            </div>
          )}
          {lost && (
            <div className="absolute inset-0 grid place-items-center bg-black/30">
              <div className="rounded-xl px-4 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]">
                {t('apps.snake.gameOver')}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div />
          <button
            onClick={() => changeDir({ x: 0, y: -1 })}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            ↑
          </button>
          <div />
          <button
            onClick={() => changeDir({ x: -1, y: 0 })}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            ←
          </button>
          <div />
          <button
            onClick={() => changeDir({ x: 1, y: 0 })}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            →
          </button>
          <div />
          <button
            onClick={() => changeDir({ x: 0, y: 1 })}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
          >
            ↓
          </button>
          <div />
        </div>
      </div>

      <div className="text-xs opacity-70">{t('apps.snake.hint')}</div>
    </AppPanel>
  )
}
