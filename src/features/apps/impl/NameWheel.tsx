'use client'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import {
  WHEEL_COLORS,
  WHEEL_STYLE,
  SPIN_PHYSICS,
  WHEEL_GEOM
} from '../data/namewheel'

type TickState = { wobble: number; at: number }

export default function NameWheel() {
  const { t } = useI18n()

  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState('')

  const [angle, _setAngle] = useState(0)
  const angleRef = useRef(0)
  const setAngle = (v: number | ((p: number) => number)) => {
    const next = typeof v === 'function' ? (v as any)(angleRef.current) : v
    angleRef.current = next
    _setAngle(next)
  }
  const velRef = useRef(0)
  const animRef = useRef<number | null>(null)
  const spinningRef = useRef(false)
  const [spinning, setSpinning] = useState(false)
  const lastSegRef = useRef<number>(-1)
  const tickRef = useRef<TickState>({ wobble: 0, at: 0 })

  const [winner, setWinner] = useState<string | null>(null)

  const pegShakeRef = useRef(0)
  const shakeDecay = () => {
    pegShakeRef.current *= 0.8
    if (pegShakeRef.current > 0.3) requestAnimationFrame(shakeDecay)
  }

  const cRef = useRef<HTMLCanvasElement>(null)

  const draw = () => {
    const c = cRef.current!
    const ctx = c.getContext('2d')!
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const BASE = WHEEL_GEOM.base
    c.width = BASE * dpr
    c.height = BASE * dpr
    c.style.width = 'min(100%, 520px)'
    c.style.height = 'auto'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const w = c.width / dpr
    const h = c.height / dpr
    const cx = w / 2
    const cy = h / 2
    const r = WHEEL_GEOM.radius

    ctx.clearRect(0, 0, w, h)

    ctx.beginPath()
    ctx.arc(cx, cy, r + 18, 0, Math.PI * 2)
    ctx.strokeStyle = WHEEL_STYLE.ringStroke
    ctx.lineWidth = WHEEL_STYLE.ringWidth
    ctx.stroke()

    const n = Math.max(1, items.length)

    for (let i = 0; i < n; i++) {
      const a0 = angleRef.current + (i * 2 * Math.PI) / n
      const a1 = angleRef.current + ((i + 1) * 2 * Math.PI) / n

      const [cA, cB] = WHEEL_COLORS[i % WHEEL_COLORS.length]
      const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
      grad.addColorStop(0, i % 2 ? cA : WHEEL_STYLE.sliceAltFill)
      grad.addColorStop(1, cB)

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, a0, a1)
      ctx.closePath()
      ctx.fillStyle = grad
      ctx.fill()

      ctx.strokeStyle = WHEEL_STYLE.separatorStroke
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate((a0 + a1) / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#fff'
      ctx.font = '15px system-ui, -apple-system, Segoe UI, Roboto, Arial'
      ctx.fillText(items[i] || '', r - 14, 4)
      ctx.restore()
    }

    if (items.length >= 2) {
      const n = items.length
      for (let i = 0; i < n; i++) {
        const borderA = angleRef.current + (i * 2 * Math.PI) / n
        const radOuter = r + WHEEL_STYLE.pegOuterOffset + pegShakeRef.current
        const radInner = r + WHEEL_STYLE.pegInnerOffset + pegShakeRef.current

        const woodGrad = ctx.createLinearGradient(
          cx + Math.cos(borderA) * radInner,
          cy + Math.sin(borderA) * radInner,
          cx + Math.cos(borderA) * radOuter,
          cy + Math.sin(borderA) * radOuter
        )
        woodGrad.addColorStop(0, WHEEL_STYLE.woodGradA)
        woodGrad.addColorStop(1, WHEEL_STYLE.woodGradB)

        ctx.beginPath()
        ctx.arc(
          cx,
          cy,
          radOuter,
          borderA - WHEEL_STYLE.pegWidthDeg,
          borderA + WHEEL_STYLE.pegWidthDeg
        )
        ctx.arc(
          cx,
          cy,
          radInner,
          borderA + WHEEL_STYLE.pegWidthDeg,
          borderA - WHEEL_STYLE.pegWidthDeg,
          true
        )
        ctx.closePath()
        ctx.fillStyle = woodGrad
        ctx.fill()

        ctx.strokeStyle = WHEEL_STYLE.pegShadow
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    const wob = tickRef.current.wobble
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(wob)
    ctx.translate(-cx, -cy)
    ctx.fillStyle = WHEEL_GEOM.pointerColor
    ctx.beginPath()
    ctx.moveTo(cx, cy - r - 26)
    ctx.lineTo(cx - 14, cy - r + 6)
    ctx.lineTo(cx + 14, cy - r + 6)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  useEffect(() => {
    draw()
  }, [items, angle])

  const spin = () => {
    if (items.length < 2 || spinningRef.current) return
    spinningRef.current = true
    setSpinning(true)
    setWinner(null)

    const power =
      SPIN_PHYSICS.powerMin +
      Math.random() * (SPIN_PHYSICS.powerMax - SPIN_PHYSICS.powerMin)
    const extra =
      SPIN_PHYSICS.minExtra +
      Math.random() * (SPIN_PHYSICS.maxExtra - SPIN_PHYSICS.minExtra)

    velRef.current = (extra / 60) * power

    const frame = () => {
      setAngle((prev) => prev + velRef.current)
      const nextAngle = angleRef.current

      if (items.length >= 2) {
        const n = items.length
        const top =
          (((-Math.PI / 2 - nextAngle) % (2 * Math.PI)) + 2 * Math.PI) %
          (2 * Math.PI)
        const seg = Math.floor((top / (2 * Math.PI)) * n)
        if (seg !== lastSegRef.current) {
          lastSegRef.current = seg

          tickRef.current = {
            wobble: SPIN_PHYSICS.tickWobble,
            at: performance.now()
          }
          const decay = () => {
            const now = performance.now()
            const dt = (now - tickRef.current.at) / SPIN_PHYSICS.tickDecayMs
            tickRef.current.wobble = Math.max(
              0,
              SPIN_PHYSICS.tickWobble * (1 - dt)
            )
            draw()
            if (tickRef.current.wobble > 0.006) requestAnimationFrame(decay)
          }
          requestAnimationFrame(decay)

          pegShakeRef.current = SPIN_PHYSICS.tickShakePx
          shakeDecay()
        }
      }

      velRef.current *= SPIN_PHYSICS.friction

      if (Math.abs(velRef.current) > SPIN_PHYSICS.minVelocity) {
        animRef.current = requestAnimationFrame(frame)
      } else {
        spinningRef.current = false
        setSpinning(false)
        velRef.current = 0

        const n = Math.max(1, items.length)
        const topNow =
          (((-Math.PI / 2 - (angleRef.current % (2 * Math.PI))) %
            (2 * Math.PI)) +
            2 * Math.PI) %
          (2 * Math.PI)
        const seg = Math.floor((topNow / (2 * Math.PI)) * n)
        setWinner(items[seg] ?? null)
      }
    }

    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(frame)
  }

  useEffect(
    () => () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    },
    []
  )

  const add = () => {
    const v = input.trim()
    if (!v) return
    setItems((s) => [...s, v])
    setInput('')
  }
  const removeAt = (i: number) => setItems((s) => s.filter((_, ix) => ix !== i))
  const clear = () => {
    setItems([])
    setAngle(0)
    lastSegRef.current = -1
    setWinner(null)
  }

  return (
    <AppPanel stageClassName="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('apps.namewheel.placeholder')}
          className="flex-1 min-w-48 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />
        <button
          onClick={add}
          className="px-3 py-2 rounded-xl ring-1 ring-black/5 dark:ring-white/10"
        >
          {t('apps.common.add')}
        </button>
        <button
          onClick={clear}
          className="px-3 py-2 rounded-xl ring-1 ring-black/5 dark:ring-white/10"
        >
          {t('apps.common.clear')}
        </button>
        <button
          onClick={spin}
          className="rounded-xl px-4 py-2 font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] disabled:opacity-60"
          disabled={spinning || items.length < 2}
        >
          {t('apps.namewheel.spin')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.length === 0 ? (
          <div className="text-sm opacity-70">{t('apps.namewheel.empty')}</div>
        ) : (
          items.map((it, i) => (
            <span
              key={`${it}-${i}`}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
            >
              {it}
              <button
                onClick={() => removeAt(i)}
                className="text-red-400 hover:underline"
                title={t('apps.common.remove')}
              >
                {t('apps.common.remove')}
              </button>
            </span>
          ))
        )}
      </div>

      <div className="flex justify-center">
        {' '}
        <div className="mt-2 inline-block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden bg-white/5">
          <canvas ref={cRef} width={WHEEL_GEOM.base} height={WHEEL_GEOM.base} />
        </div>
      </div>
    </AppPanel>
  )
}
