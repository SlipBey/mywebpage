import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://slip.slipyme.com'
  const pages = ['', '/about', '/projects', '/apps', '/works', '/contact']
  const now = new Date()
  return pages.map((p) => ({
    url: base + p,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.6
  }))
}
