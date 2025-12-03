'use client'

import { AppCard } from './AppCard'
import type { AppMeta } from '../data/registry.client'

export function AppsGrid({ apps }: { apps: AppMeta[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => (
        <AppCard key={app.slug} app={app} />
      ))}
    </div>
  )
}
