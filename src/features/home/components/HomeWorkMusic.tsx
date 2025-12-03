'use client'

import MusicPlatformsRow from '@/features/works/components/MusicPlatformsRow'
import MusicReleases from '@/features/works/components/MusicReleases'

export default function HomeWorksMusic() {
  return (
    <div className="space-y-4">
      <MusicPlatformsRow />
      <MusicReleases limit={3} showEmptyState />
    </div>
  )
}
