'use client'

import { PROJECTS, formatYears } from '@/lib/projects'
import Link from 'next/link'
import { PrimaryBtn, GlassBtn } from '@/components/ui/Buttons'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeInUpSm, staggerTight } from '@/lib/animations'
import StatusBadge from './StatusBadge'
import { FiCode, FiExternalLink, FiGithub } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n/I18nProvider'
import SectionTitle from '@/components/SectionTitle'

function sortProjects() {
  return [...PROJECTS].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    const ay = a.years.end ?? a.years.start
    const by = b.years.end ?? b.years.start
    return by - ay
  })
}

export default function ProjectsGrid() {
  const items = sortProjects()
  const { t } = useI18n()

  const L = {
    site: t('project.labels.site'),
    github: t('project.labels.github')
  }

  return (
    <section className="space-y-5">
      <SectionTitle>
        <div className="flex items-center gap-2">
          <FiCode />
          <h2 className="text-xl sm:text-2xl font-bold">
            {t('common.nav.projects')}
          </h2>
        </div>
      </SectionTitle>

      <motion.div
        variants={staggerTight}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
      >
        {items.map((p, index) => {
          const base = `projects.items.${p.key}`
          const title = t(`${base}.title`)
          const short = t(`${base}.short`)
          const firstImg = p.images?.[0]

          return (
            <motion.div
              key={p.key}
              variants={fadeInUpSm}
              className="group glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10 overflow-hidden flex flex-col"
            >
              <Link href={`/projects/${p.key}`} className="relative block">
                <motion.div
                  className="aspect-16/10 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'tween', duration: 0.25 }}
                >
                  {firstImg && (
                    <Image
                      src={firstImg.src}
                      alt={title}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      priority={index < 2}
                      className="object-cover"
                    />
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                               bg-[radial-gradient(40%_60%_at_0%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(40%_60%_at_100%_100%,rgba(103,232,249,0.14),transparent_60%)]"
                  />
                </motion.div>
              </Link>

              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-900/10 dark:ring-white/10 bg-white/60 dark:bg-white/5">
                    <Image
                      src={p.logo}
                      alt={`${title} logo`}
                      fill
                      sizes="40px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/projects/${p.key}`}
                      className="font-semibold hover:underline line-clamp-1"
                    >
                      {title}
                    </Link>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {formatYears(p.years)}
                    </div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <p className="text-sm text-slate-700/90 dark:text-slate-300/85">
                  {short}
                </p>

                {!!p.tags?.length && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((lbl) => (
                      <span
                        key={lbl}
                        className="px-2 py-0.5 text-xs font-semibold rounded-md
                                   ring-1 ring-slate-900/10 dark:ring-white/10
                                   bg-black/5 dark:bg-white/5"
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>
                )}

                {(p.links?.site || p.links?.github) && (
                  <div className="flex items-center gap-2 pt-1">
                    {p.links?.site && (
                      <PrimaryBtn
                        href={p.links.site}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiExternalLink /> {L.site}
                      </PrimaryBtn>
                    )}
                    {p.links?.github && (
                      <GlassBtn
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiGithub /> {L.github}
                      </GlassBtn>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
