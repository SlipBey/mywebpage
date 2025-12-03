'use client'

import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'
import StatusBadge from '@/features/project/components/StatusBadge'
import { ProjectItem, formatYears } from '@/lib/projects'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { fadeInUpSm, staggerTight } from '@/lib/animations'
import { useI18n } from '@/lib/i18n/I18nProvider'
import Link from 'next/link'
import { PrimaryBtn, GlassBtn } from '@/components/ui/Buttons'

export default function ProjectDetailHero({
  project
}: {
  project: ProjectItem
}) {
  const { t } = useI18n()

  return (
    <AnimatedSection
      as="section"
      className="glass-ice rounded-2xl p-6 sm:p-7 ring-1 ring-slate-900/10 dark:ring-white/10"
      mode="view"
      variants={fadeInUpSm}
    >
      <motion.div variants={staggerTight}>
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/70 dark:bg-white/10">
            <Image
              src={project.logo}
              alt={`${project.key} logo`}
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="flex-1 min-w-0">
            <motion.h1
              variants={fadeInUpSm}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            >
              {t(`projects.items.${project.key}.title`)}
            </motion.h1>
            <motion.div
              variants={fadeInUpSm}
              className="mt-0.5 text-sm text-slate-500 dark:text-slate-400"
            >
              {formatYears(project.years)}
            </motion.div>
          </div>

          <motion.div variants={fadeInUpSm} className="mt-1">
            <StatusBadge status={project.status} />
          </motion.div>
        </div>

        <motion.p
          variants={fadeInUpSm}
          className="mt-4 text-slate-700/90 dark:text-slate-300/85 leading-relaxed"
        >
          {t(`projects.items.${project.key}.short`)}
        </motion.p>

        {project.tags?.length ? (
          <motion.ul
            variants={fadeInUpSm}
            className="mt-3 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 text-[11px] font-semibold rounded-md
                           bg-black/5 dark:bg-white/6
                           text-slate-700 dark:text-slate-200
                           ring-1 ring-slate-900/10 dark:ring-white/10"
              >
                {tag}
              </li>
            ))}
          </motion.ul>
        ) : null}

        {project.links && (
          <motion.div
            variants={fadeInUpSm}
            className="mt-4 flex items-center gap-3"
          >
            {project.links.site && (
              <PrimaryBtn
                href={project.links.site}
                target="_blank"
                rel="noreferrer"
              >
                <FiExternalLink /> Web
              </PrimaryBtn>
            )}
            {project.links.github && (
              <GlassBtn
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub /> Github
              </GlassBtn>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatedSection>
  )
}
