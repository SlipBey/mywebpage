'use client'

import { findProject } from '@/lib/projects'
import ProjectDetailHero from './components/ProjectDetailHero'
import ProjectDetailBody from './components/ProjectDetailBody'

export default function ProjectDetailPageClient({ slug }: { slug: string }) {
  const p = findProject(slug)!

  return (
    <>
      <ProjectDetailHero project={p} />
      <ProjectDetailBody project={p} />
    </>
  )
}
