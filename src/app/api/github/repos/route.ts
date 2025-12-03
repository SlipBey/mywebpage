import { NextResponse } from 'next/server'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username') || 'SlipBey'
  const maxParam = searchParams.get('max')
  const max = maxParam ? Math.min(Number(maxParam) || 8, 30) : 8

  const url = `https://api.github.com/users/${username}/repos`

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'slipbey-site'
    }

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return NextResponse.json(
        { error: `GitHub ${res.status}`, details: text || undefined },
        { status: res.status }
      )
    }

    const data = (await res.json()) as Repo[]

    const sorted = [...data].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    const sliced = sorted.slice(0, max)

    return NextResponse.json(sliced, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=1800'
      }
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: 'GitHub fetch error', details: err?.message },
      { status: 500 }
    )
  }
}
