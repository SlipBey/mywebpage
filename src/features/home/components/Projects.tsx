'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GlassBtn } from '@/components/ui/Buttons'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'
import SectionTitle from '@/components/SectionTitle'
import { PROJECTS } from '@/lib/projects'

export default function ProjectsPreview() {
  const { t } = useI18n()

  const items = PROJECTS.filter((p) => p.status === 'active')

  return (
    <AnimatedSection as="section">
      <div className="mb-5 flex items-center justify-between gap-4">
        <SectionTitle>{t('home.projects.title')}</SectionTitle>

        <GlassBtn href="/projects">{t('home.projects.viewAll')}</GlassBtn>
      </div>

      <div className="mb-6 h-px w-full rounded bg-linear-to-r from-sky-500/0 via-sky-500/25 to-sky-500/0 dark:from-white/0 dark:via-white/15 dark:to-white/0" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((p, idx) => {
          const key = (p as any).key ?? p.key
          const title = t(`projects.items.${key}.title`)
          const desc = t(`projects.items.${key}.short`)

          const cover = p.images?.[0]
          return (
            <Link key={idx} href={`/projects/${p.key}`} className="group">
              <article
                className="
                  relative flex items-stretch gap-4 overflow-hidden rounded-2xl
                  bg-white/70 dark:bg-white/8 backdrop-blur-md
                  ring-1 ring-slate-900/10 dark:ring-white/12
                  shadow-[0_8px_32px_-16px_rgba(2,6,23,0.25)]
                  hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(2,6,23,0.35)]
                  transition-transform duration-200
                "
              >
                <div className="relative w-32 min-h-32 md:w-40 shrink-0 overflow-hidden">
                  <Image
                    src={cover?.src ?? '/images/placeholder.jpg'}
                    alt={cover?.alt ?? String(title)}
                    fill
                    sizes="(max-width:768px) 128px, 160px"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
                </div>

                <div className="flex min-w-0 flex-col justify-center pr-4 py-3">
                  <h3 className="text-[16px] md:text-[17px] font-extrabold tracking-[-0.01em] text-slate-900 dark:text-white line-clamp-1">
                    {title}
                  </h3>

                  <p className="mt-1 text-[13px] leading-normal text-slate-600 dark:text-white/80 line-clamp-2">
                    {desc}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="
                          rounded-full px-2 py-[3px] text-[11px] font-semibold
                          text-sky-800/90 dark:text-cyan-100/95
                          bg-sky-50/80 dark:bg-white/8
                          ring-1 ring-sky-600/20 dark:ring-white/15
                          group-hover:ring-sky-600/30 dark:group-hover:ring-white/25 transition
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(2,6,23,0.06)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(40%_60%_at_0%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(40%_60%_at_100%_100%,rgba(103,232,249,0.14),transparent_60%)]" />
              </article>
            </Link>
          )
        })}
      </div>
    </AnimatedSection>
  )
}
