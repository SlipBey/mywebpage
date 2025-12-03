'use client'
import { useMemo, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import { DICE_DEFAULTS, DICE_FACES, DICE_UI as UI } from '../data/dice'

type SizeKey = keyof typeof DICE_DEFAULTS.iconSize

const FACES = [1, 2, 3, 4, 5, 6] as const
type DieFace = (typeof FACES)[number]

export default function DiceRoller() {
  const { t } = useI18n()
  const [count, setCount] = useState<number>(DICE_DEFAULTS.startCount)
  const [size, setSize] = useState<SizeKey>('md')
  const [rolls, setRolls] = useState<DieFace[]>([])
  const [rolling, setRolling] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const total = useMemo(() => rolls.reduce((a, b) => a + b, 0), [rolls])

  const clamp = (n: number) =>
    Math.max(0, Math.min(DICE_DEFAULTS.maxCount, Math.round(n)))

  const doRoll = () => {
    if (rolling) return
    const n = clamp(count || 0)
    setRolling(true)

    btnRef.current?.classList.remove('animate-[wiggle_320ms_ease-in-out]')
    btnRef.current?.offsetHeight
    btnRef.current?.classList.add('animate-[wiggle_320ms_ease-in-out]')

    window.setTimeout(() => {
      const r: DieFace[] = Array.from({ length: n }, () => {
        const idx = Math.floor(Math.random() * FACES.length)
        return FACES[idx]
      })
      setRolls(r)
      setRolling(false)
    }, 220)
  }

  const clear = () => setRolls([])

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
          {DICE_DEFAULTS.quickCounts.map((q) => (
            <button
              key={q}
              onClick={() => setCount(q)}
              className={UI.tabBtn}
              data-active={count === q}
              title={t('apps.dice.quick', { n: q })}
            >
              {q}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl px-2 py-1 ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
          <button
            onClick={() => setCount((v) => clamp(v - 1))}
            className={UI.softBtn}
            aria-label={t('apps.common.decrease')}
          >
            –
          </button>
          <input
            type="number"
            min={0}
            max={DICE_DEFAULTS.maxCount}
            value={count}
            onChange={(e) => setCount(clamp(Number(e.target.value)))}
            placeholder={t('apps.dice.count')}
            className="w-20 rounded-lg px-2 py-1 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 text-center"
          />
          <button
            onClick={() => setCount((v) => clamp(v + 1))}
            className={UI.softBtn}
            aria-label={t('apps.common.increase')}
          >
            +
          </button>
        </div>

        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
          {(Object.keys(DICE_DEFAULTS.iconSize) as SizeKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setSize(k)}
              className={UI.tabBtn}
              data-active={size === k}
            >
              {t(`apps.dice.size.${k}` as const)}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm opacity-80">
            {t('apps.dice.total')}: <b>{total}</b>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          ref={btnRef}
          onClick={doRoll}
          disabled={rolling || clamp(count) === 0}
          className={UI.primaryBtn + ' disabled:opacity-60'}
        >
          {t('apps.dice.roll')}
        </button>
        <button onClick={clear} className={UI.softBtn}>
          {t('apps.common.clear')}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {rolls.length === 0 ? (
          <div className="opacity-60 text-sm">{t('apps.dice.empty')}</div>
        ) : (
          rolls.map((v, i) => {
            const Icon = DICE_FACES[v]
            const sz = DICE_DEFAULTS.iconSize[size]
            return (
              <span
                key={`${v}-${i}`}
                className="inline-flex items-center justify-center rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white/5 px-2 py-1"
                title={`${t('apps.dice.face')} ${v}`}
              >
                <Icon className={sz} />
              </span>
            )
          })
        )}
      </div>

      <style jsx global>{`
        @keyframes wiggle {
          0% {
            transform: rotate(0);
          }
          25% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-2deg);
          }
          100% {
            transform: rotate(0);
          }
        }
      `}</style>
    </AppPanel>
  )
}
