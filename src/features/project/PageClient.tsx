'use client'

import GithubSection from './components/GithubSection'
import ProjectHero from './components/ProjectHero'
import ProjectsGrid from './components/ProjectsGrid'

export default function ProjectPageClient() {
  return (
    <>
      <ProjectHero />
      <ProjectsGrid />
      <GithubSection />
    </>
  )
}
