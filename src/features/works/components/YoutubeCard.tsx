'use client'

import Link from 'next/link'
import Image from 'next/image'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { fadeInUpSm } from '@/lib/animations'
import { FiEye } from 'react-icons/fi'
import type { YtItem } from '../hooks/useYoutubeFeed'

export interface YoutubeCardProps {
  vid: YtItem
  viewsLabel: string
  numberFormat?: Intl.NumberFormat
}

export default memo(function YoutubeCard({
  vid,
  viewsLabel,
  numberFormat = new Intl.NumberFormat('tr-TR')
}: YoutubeCardProps) {
  const dateStr = vid.publishedAt
    ? new Date(vid.publishedAt).toLocaleDateString('tr-TR')
    : ''
  const thumb =
    vid.thumbnail || `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`

  return (
    <motion.article
      variants={fadeInUpSm}
      className="
        group relative overflow-hidden rounded-2xl
        backdrop-blur
        ring-1 ring-slate-900/10 dark:ring-white/10
        bg-white/70 dark:bg-white/5
        shadow-sm dark:shadow-none
        transition hover:-translate-y-0.5
        hover:shadow-[0_18px_60px_-20px_rgba(56,189,248,.35)]
        dark:hover:shadow-[0_18px_60px_-22px_rgba(56,189,248,.22)]
      "
    >
      <Link
        href={`https://www.youtube.com/watch?v=${vid.id}`}
        target="_blank"
        className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
      >
        <div className="relative">
          <Image
            src={thumb}
            alt={vid.title}
            width={1280}
            height={720}
            loading="lazy"
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-cyan-500/10 via-transparent to-transparent dark:from-cyan-400/15"
          />

          {dateStr && (
            <span
              className="
                absolute top-2 right-2 text-[11px] px-2 py-1 rounded-md
                bg-white/85 text-slate-900 ring-1 ring-slate-900/10
                dark:bg-black/55 dark:text-white dark:ring-white/10
                backdrop-blur
              "
            >
              {dateStr}
            </span>
          )}
        </div>

        <div className="relative p-3 text-slate-900 dark:text-slate-100">
          <div className="absolute -top-3 left-3 right-3 h-px bg-linear-to-r from-transparent via-slate-900/15 to-transparent dark:via-white/25" />
          <h3 className="text-[15px] font-semibold leading-snug line-clamp-2">
            {vid.title}
          </h3>

          <div className="mt-2 flex items-center justify-between text-[11px]">
            {Number.isFinite(vid.views) ? (
              <span
                className="
                  inline-flex items-center gap-1.5 rounded-md px-2 py-1
                  bg-white/90 text-slate-900 ring-1 ring-slate-900/10
                  dark:bg-white/10 dark:text-white dark:ring-white/15
                  backdrop-blur
                "
              >
                <FiEye className="h-3.5 w-3.5" aria-hidden />
                {numberFormat.format(vid.views!)} {viewsLabel}
              </span>
            ) : (
              <span />
            )}

            <span
              aria-hidden
              className="pointer-events-none rounded-full w-2 h-2 bg-cyan-400/80 shadow-[0_0_28px_8px_rgba(56,189,248,.45)] opacity-0 group-hover:opacity-100 transition"
            />
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-400/25 opacity-0 group-hover:opacity-100 transition"
        />
      </Link>
    </motion.article>
  )
})
