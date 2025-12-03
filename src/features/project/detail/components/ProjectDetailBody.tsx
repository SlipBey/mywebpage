'use client'

import AnimatedSection from '@/components/AnimatedSection'
import ImageCarousel from '@/features/project/components/ImageCarousel'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { ProjectItem } from '@/lib/projects'
import { motion } from 'framer-motion'
import { fadeInUpSm, floatZoom, staggerTight } from '@/lib/animations'

export default function ProjectBody({ project }: { project: ProjectItem }) {
  const { t } = useI18n()

  const paragraph = t(
    `projects.items.${project.key}.description`
  ) as unknown as string[]

  return (
    <AnimatedSection
      as="section"
      className="space-y-24"
      mode="view"
      variants={fadeInUpSm}
    >
      <motion.div variants={staggerTight} className="space-y-24">
        <motion.div
          variants={fadeInUpSm}
          className="glass-ice rounded-2xl p-6 ring-1 ring-slate-900/10 dark:ring-white/10 space-y-3"
        >
          {paragraph.map((txt, i) => (
            <p
              key={i}
              className="text-slate-700/90 dark:text-slate-300/85 leading-relaxed"
            >
              {txt}
            </p>
          ))}
        </motion.div>

        <motion.div variants={floatZoom}>
          <ImageCarousel items={project.images} />
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
