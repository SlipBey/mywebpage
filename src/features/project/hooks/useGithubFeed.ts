import { useEffect, useState } from 'react'
import axios from 'axios'

export type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export function useGithubFeed(limit = 8, username = 'SlipBey') {
  const [items, setItems] = useState<GithubRepo[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        setLoading(true)
        setError(null)

        const qs = new URLSearchParams({
          username,
          max: String(limit)
        })

        const { data } = await axios.get<GithubRepo[]>(`/api/github/repos`)

        if (!alive) return

        setItems(Array.isArray(data) ? data : [])
      } catch (e: any) {
        if (!alive) return
        setError(e?.message || 'GitHub fetch error')
        setItems([])
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [limit, username])

  return { items, loading, error }
}
