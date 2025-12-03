import { useEffect, useState } from 'react'
import api from '@/lib/api'

export type YtItem = {
  id: string
  title: string
  publishedAt: string
  thumbnail: string
  views?: number
}

export function useYoutubeFeed(limit = 6) {
  const [items, setItems] = useState<YtItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const { data } = await api.get<{ data: { youtube: YtItem[] } }>(
          '/api/social/feeds'
        )
        if (!alive) return
        setItems((data?.data?.youtube ?? []).slice(0, limit))
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
