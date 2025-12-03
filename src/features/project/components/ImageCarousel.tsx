'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'
import type { ProjectImage } from '@/lib/projects'
import { useLightbox } from '@/components/LightboxProvider'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type Props = {
  items: ProjectImage[]
}

export default function ImageCarousel({ items }: Props) {
  const { open } = useLightbox()
  const [idx, setIdx] = useState(0)

  const safeItems = useMemo(
    () => (Array.isArray(items) ? items.filter(Boolean) : []),
    [items]
  )

  if (!safeItems.length) return null

  const goTo = (next: number) => {
    if (!safeItems.length) return
    const clamped = Math.min(Math.max(next, 0), safeItems.length - 1)
    setIdx(clamped)
  }

  const progress = ((idx + 1) / safeItems.length) * 100

  return (
    <div className="glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-slate-100/90 dark:bg-black/80 border border-slate-200/70 dark:border-slate-800/70 shadow-[0_18px_45px_rgba(15,23,42,0.35)]">
          <div className="relative w-full aspect-video lg:aspect-21/9">
            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(-${idx * 100}%)`,
                transition: 'transform 260ms ease-out'
              }}
            >
              {safeItems.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className="relative inline-flex h-full w-full shrink-0 items-center justify-center p-3 sm:p-5 lg:p-7"
                  onClick={() => open(safeItems, i)}
                  aria-label={`Görseli büyüt (${i + 1}/${safeItems.length})`}
                >
                  <div className="relative h-full w-full rounded-xl bg-slate-900/95 dark:bg-black">
                    <Image
                      src={img.src}
                      alt={img.alt ?? `project-image-${i + 1}`}
                      fill
                      sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 900px, 100vw"
                      quality={95}
                      priority={i === 0}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {safeItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(idx - 1)}
                disabled={idx === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full
                           bg-slate-950/85 dark:bg-black/85 text-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.7)]
                           backdrop-blur-sm ring-1 ring-white/60 dark:ring-slate-900/80
                           hover:bg-slate-900 dark:hover:bg-black disabled:opacity-35 disabled:hover:bg-slate-950/85
                           transition"
                aria-label="Önceki görsel"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                onClick={() => goTo(idx + 1)}
                disabled={idx === safeItems.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full
                           bg-slate-950/85 dark:bg-black/85 text-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.7)]
                           backdrop-blur-sm ring-1 ring-white/60 dark:ring-slate-900/80
                           hover:bg-slate-900 dark:hover:bg-black disabled:opacity-35 disabled:hover:bg-slate-950/85
                           transition"
                aria-label="Sonraki görsel"
              >
                <FiChevronRight />
              </button>
            </>
          )}
        </div>

        {safeItems.length > 1 && (
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-slate-200/90 dark:bg-slate-800/70 overflow-hidden">
              <div
                className="h-full rounded-full bg-sky-500/90 dark:bg-cyan-300 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {safeItems.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === idx
                      ? 'w-5 bg-sky-500/90 dark:bg-cyan-300'
                      : 'w-2 bg-slate-400/70 dark:bg-slate-500/70'
                  }`}
                  aria-label={`${i + 1}. görsele git`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
