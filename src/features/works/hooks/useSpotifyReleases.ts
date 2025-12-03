'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export type SpotifyItem = {
  id: string
  name: string
  releaseDate: string
  totalTracks: number
  type: string
  image: string | null
  spotifyUrl: string | null
}

type SpotifyResponse = {
  updatedAt: string
  items: SpotifyItem[]
}

export function useSpotifyReleases(limit = 8) {
  const [items, setItems] = useState<SpotifyItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const { data } = await api.get<SpotifyResponse>('/api/music/spotify', {
          params: { limit }
        })

        console.warn(data)

        if (!alive) return
        setItems(data?.items ?? [])
      } catch {
        if (alive) setItems([])
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [limit])

  return { items, loading }
}
