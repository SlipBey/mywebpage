'use client'

import { motion } from 'framer-motion'
import { staggerTight } from '@/lib/animations'
import YoutubeCard from '@/features/works/components/YoutubeCard'
import YoutubeSkeleton from '@/features/works/components/YoutubeSkeleton'
import type { YtItem } from '@/features/works/hooks/useYoutubeFeed'

interface HomeWorksYoutubeFeedProps {
  items: YtItem[] | null
  loading: boolean
  viewsLabel: string
  emptyText: string
  numberFormat: Intl.NumberFormat
}

export default function HomeWorksYoutubeFeed({
  items,
  loading,
  viewsLabel,
  emptyText,
  numberFormat
}: HomeWorksYoutubeFeedProps) {
  const isEmpty = !loading && (items?.length ?? 0) === 0

  if (loading && !items) {
    return <YoutubeSkeleton count={6} />
  }

  if (isEmpty) {
    return (
      <div
        className="rounded-2xl p-6 text-sm
                   bg-white/70 dark:bg-white/5 backdrop-blur
                   ring-1 ring-slate-900/10 dark:ring-white/10
                   text-slate-800 dark:text-white/80"
      >
        {emptyText}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <motion.div
      variants={staggerTight}
      initial="hidden"
      animate="show"
      className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((vid) => (
        <YoutubeCard
          key={vid.id}
          vid={vid}
          viewsLabel={viewsLabel}
          numberFormat={numberFormat}
        />
      ))}
    </motion.div>
  )
}
