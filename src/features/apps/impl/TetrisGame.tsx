'use client'

import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { useEffect, useRef } from 'react'
import AppPanel from '../components/AppPanel'

const Tetris = dynamic<any>(
  () =>
    import('react-simple-tetris') as unknown as Promise<{
      default: React.ComponentType<any>
    }>,
  { ssr: false }
)

export default function TetrisGame() {
  const { t } = useI18n()
  const areaRef = useRef<HTMLDivElement | null>(null)

  const preventScrollKeysCapture = (e: React.KeyboardEvent) => {
    const k = e.key
    if (
      k === ' ' ||
      k === 'ArrowUp' ||
      k === 'ArrowDown' ||
      k === 'ArrowLeft' ||
      k === 'ArrowRight' ||
      k === 'PageUp' ||
      k === 'PageDown' ||
      k === 'Home' ||
      k === 'End'
    ) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const preventOnButton = (e: React.KeyboardEvent) => {
    const k = e.key
    if (k === ' ' || k.startsWith('Arrow')) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => e.preventDefault()

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <AppPanel stageClassName="space-y-4">
      <div
        ref={areaRef}
        tabIndex={0}
        onKeyDownCapture={preventScrollKeysCapture}
      >
        <Tetris>
          {({
            HeldPiece,
            Gameboard,
            PieceQueue,
            points,
            linesCleared,
            state,
            controller
          }: {
            HeldPiece: React.ComponentType
            Gameboard: React.ComponentType
            PieceQueue: React.ComponentType
            points: number
            linesCleared: number
            state: 'READY' | 'PLAYING' | 'PAUSED' | 'LOST' | string
            controller: {
              moveLeft(): void
              moveRight(): void
              flipClockwise(): void
              hardDrop(): void
              hold(): void
              resume(): void
              pause(): void
              restart(): void
            }
          }) => (
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-8 text-sm md:text-base font-medium text-emerald-300">
                <span>
                  {t('apps.tetris.points')}: {points}
                </span>
                <span>
                  {t('apps.tetris.lines')}: {linesCleared}
                </span>
              </div>

              <div className="flex gap-4 justify-center items-start">
                <div className="hidden md:block">
                  <HeldPiece />
                </div>
                <Gameboard />
                <div className="hidden md:block">
                  <PieceQueue />
                </div>
              </div>

              {state === 'PAUSED' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white/10 ring-1 ring-white/20 rounded-xl p-6 text-center space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {t('apps.tetris.paused')}
                    </h3>
                    <button
                      onClick={controller.resume}
                      onKeyDown={preventOnButton}
                      className="rounded-lg px-4 py-2 text-white font-semibold [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] hover:brightness-105 transition"
                    >
                      {t('apps.tetris.resume')}
                    </button>
                  </div>
                </div>
              )}

              {state === 'LOST' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white/10 ring-1 ring-white/20 rounded-xl p-6 text-center space-y-4">
                    <h3 className="text-lg font-semibold text-white">
                      {t('apps.tetris.lost')}
                    </h3>
                    <button
                      onClick={controller.restart}
                      onKeyDown={preventOnButton}
                      className="rounded-lg px-4 py-2 text-white font-semibold [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] hover:brightness-105 transition"
                    >
                      {t('apps.tetris.restart')}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <button
                  onClick={controller.moveLeft}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 text-sm font-medium dark:text-white bg-white/10 hover:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 transition active:scale-95"
                >
                  {t('apps.tetris.controls.left')}
                </button>
                <button
                  onClick={controller.moveRight}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 text-sm font-medium dark:text-white bg-white/10 hover:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 transition active:scale-95"
                >
                  {t('apps.tetris.controls.right')}
                </button>
                <button
                  onClick={controller.flipClockwise}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 text-sm font-medium dark:text-white bg-white/10 hover:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 transition active:scale-95"
                >
                  {t('apps.tetris.controls.rotate')}
                </button>
                <button
                  onClick={controller.hardDrop}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 text-sm font-medium dark:text-white bg-white/10 hover:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 transition active:scale-95"
                >
                  {t('apps.tetris.controls.drop')}
                </button>
                <button
                  onClick={controller.hold}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 text-sm font-medium dark:text-white bg-white/10 hover:bg-white/20 ring-1 ring-black/10 dark:ring-white/10 transition active:scale-95"
                >
                  {t('apps.tetris.controls.hold') ?? 'Tut'}
                </button>

                {state === 'PAUSED' ? (
                  <button
                    onClick={controller.resume}
                    onKeyDown={preventOnButton}
                    className="rounded-xl px-3 py-2 font-medium text-white bg-blue-500 hover:bg-blue-600 transition"
                  >
                    {t('apps.tetris.resume')}
                  </button>
                ) : (
                  <button
                    onClick={controller.pause}
                    onKeyDown={preventOnButton}
                    className="rounded-xl px-3 py-2 font-medium text-white bg-amber-500 hover:bg-amber-600 transition"
                  >
                    {t('apps.tetris.pause')}
                  </button>
                )}

                <button
                  onClick={controller.restart}
                  onKeyDown={preventOnButton}
                  className="rounded-xl px-3 py-2 font-medium text-white bg-red-500 hover:bg-red-600 transition"
                >
                  {t('apps.tetris.restart')}
                </button>
              </div>
            </div>
          )}
        </Tetris>
      </div>
    </AppPanel>
  )
}
