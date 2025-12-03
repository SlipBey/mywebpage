'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { fadeInUpSm, staggerTight } from '@/lib/animations'
import { useSpotifyReleases } from '../hooks/useSpotifyReleases'

type MusicReleasesProps = {
  limit?: number
  showEmptyState?: boolean
}

export default function MusicReleases({
  limit = 8,
  showEmptyState = false
}: MusicReleasesProps) {
  const { t } = useI18n()
  const { items, loading } = useSpotifyReleases(limit)

  const hasItems = !!items && items.length > 0
  const isEmpty = !loading && !hasItems

  const df = useMemo(
    () => new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium' }),
    []
  )

  const formatDate = (s: string) => {
    const d = new Date(s)
    return Number.isNaN(d.getTime()) ? s : df.format(d)
  }

  const getDisplayType = (type: string, totalTracks: number) => {
    if (type === 'single' && totalTracks > 1) {
      return t('works.music.type.ep')
    }
    if (type === 'album') {
      return t('works.music.type.album')
    }
    return t('works.music.type.single')
  }

  if (loading) {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl ring-1 ring-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-3 animate-pulse"
          >
            <div className="aspect-video rounded-xl bg-slate-200/70 dark:bg-slate-700/40 mb-3" />
            <div className="h-3 w-3/4 rounded bg-slate-200/80 dark:bg-slate-600/60 mb-2" />
            <div className="h-3 w-1/2 rounded bg-slate-200/70 dark:bg-slate-600/50" />
          </div>
        ))}
      </div>
    )
  }

  if (isEmpty) {
    if (!showEmptyState) return null

    return (
      <motion.div
        variants={fadeInUpSm}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-4 rounded-2xl ring-1 ring-white/10 p-4 bg-white/70 text-slate-900 backdrop-blur dark:bg-white/5 dark:text-slate-100"
      >
        <div className="flex items-center gap-3">
          <span className="inline-block size-2 rounded-full bg-sky-400/80" />
          <div className="text-sm font-semibold">
            {t('home.works.music.soonTitle')}
          </div>
        </div>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t('home.works.music.soonHint')}
        </div>
      </motion.div>
    )
  }

  if (!hasItems) return null

  return (
    <motion.div
      variants={staggerTight}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '-10% 0px' }}
      className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {items!.map((m) => {
        const displayType = getDisplayType(m.type, m.totalTracks)

        return (
          <motion.a
            key={m.id}
            variants={fadeInUpSm}
            href={m.spotifyUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group text-left rounded-2xl
              ring-1 ring-white/10
              bg-white/70 text-slate-900 backdrop-blur
              dark:bg-white/5 dark:text-slate-100
              overflow-hidden flex flex-col
              shadow-sm hover:shadow-md
              transition-transform hover:-translate-y-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/90
            "
          >
            {m.image && (
              <div className="relative overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={1280}
                  height={720}
                  loading="lazy"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
            )}
            <div className="p-3 flex flex-col gap-1">
              <div className="text-sm font-semibold line-clamp-2">{m.name}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {displayType} • {formatDate(m.releaseDate)}
              </div>
            </div>
          </motion.a>
        )
      })}
    </motion.div>
  )
}
