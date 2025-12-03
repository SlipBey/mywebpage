'use client'

import FilmSoon from './components/FilmSoon'
import MusicSection from './components/MusicSection'
import WorksHero from './components/WorksHero'
import YoutubeGrid from './components/YoutubeGrid'

export default function WorksPageClient() {
  return (
    <>
      <WorksHero />
      <YoutubeGrid />
      <MusicSection />
      <FilmSoon />
    </>
  )
}
