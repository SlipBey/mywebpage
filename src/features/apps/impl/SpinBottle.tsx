'use client'
import { useState } from 'react'
import AppPanel from '../components/AppPanel'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { TbBottle } from 'react-icons/tb'

type ModePlayer = string

export default function SpinBottle() {
  const { t } = useI18n()
  const [player, setPlayer] = useState('')
  const [players, setPlayers] = useState<ModePlayer[]>([])
  const [asker, setAsker] = useState<ModePlayer | undefined>()
  const [answerer, setAnswerer] = useState<ModePlayer | undefined>()
  const [angle, setAngle] = useState(0)

  const add = () => {
    const v = player.trim()
    if (!v) return
    if (players.includes(v)) return
    setPlayers((p) => [...p, v])
    setPlayer('')
  }

  const remove = (name: string) => {
    setPlayers((p) => p.filter((x) => x !== name))
    if (asker === name) setAsker(undefined)
    if (answerer === name) setAnswerer(undefined)
  }

  const spin = () => {
    if (players.length < 2) return

    const i1 = Math.floor(Math.random() * players.length)
    let i2 = Math.floor(Math.random() * players.length)
    if (i2 === i1) i2 = (i2 + 1) % players.length

    const askerName = players[i1]
    const answererName = players[i2]

    setAsker(askerName)
    setAnswerer(answererName)

    const n = players.length
    const step = 360 / n

    const targetAngle = i2 * step

    setAngle((prev) => {
      const current = ((prev % 360) + 360) % 360
      let delta = targetAngle - current
      if (delta < 0) delta += 360
      const spins = 2 + Math.floor(Math.random() * 2)
      return prev + spins * 360 + delta
    })
  }

  return (
    <AppPanel stageClassName="space-y-3">
      <div className="flex gap-2">
        <input
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder={t('apps.spin.placeholder')}
          className="flex-1 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />
        <button
          onClick={add}
          className="rounded-xl px-4 py-2 font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
        >
          {t('apps.common.add')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {players.length === 0 && (
          <span className="opacity-60 text-sm">
            {t('apps.spin.playersEmpty')}
          </span>
        )}
        {players.map((p) => (
          <span
            key={p}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/10"
          >
            {p}
            <button
              onClick={() => remove(p)}
              className="text-red-400 hover:underline"
            >
              {t('apps.common.remove')}
            </button>
          </span>
        ))}
      </div>

      <div className="grid place-items-center py-6">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64">
          {players.map((p, idx) => {
            const n = players.length
            if (n === 0) return null

            const step = (2 * Math.PI) / n
            const angleRad = idx * step - Math.PI / 2
            const radius = 40
            const x = 50 + radius * Math.cos(angleRad)
            const y = 50 + radius * Math.sin(angleRad)

            const isAsker = p === asker
            const isAnswerer = p === answerer

            let colorClass =
              'bg-white/10 text-sm px-2.5 py-1 rounded-xl ring-1 ring-white/10 backdrop-blur'
            if (isAnswerer)
              colorClass =
                'bg-emerald-500/90 text-white text-sm px-2.5 py-1 rounded-xl ring-1 ring-emerald-300/70 shadow-md shadow-emerald-500/30'
            else if (isAsker)
              colorClass =
                'bg-sky-500/90 text-white text-sm px-2.5 py-1 rounded-xl ring-1 ring-sky-300/70 shadow-md shadow-sky-500/30'

            return (
              <div
                key={p}
                className="absolute whitespace-nowrap"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <span className={colorClass}>{p}</span>
              </div>
            )
          })}

          <div
            className="absolute left-1/2 top-1/2 grid place-items-center rounded-full p-6 bg-gray-300 dark:bg-gray-700 text-5xl opacity-90 shadow-[0_10px_40px_rgba(15,23,42,0.5)] transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`
            }}
          >
            <TbBottle />
          </div>
        </div>
      </div>

      <button
        onClick={spin}
        className="rounded-xl px-4 py-2 font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
      >
        {t('apps.spin.spin')}
      </button>

      <div className="rounded-xl p-3 ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
        <div>
          {t('apps.spin.asker')}: <b>{asker ?? '-'}</b>
        </div>
        <div>
          {t('apps.spin.answerer')}: <b>{answerer ?? '-'}</b>
        </div>
      </div>
    </AppPanel>
  )
}
