'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { AppMeta } from '../data/registry.client'
import { HiOutlineArrowRight } from 'react-icons/hi'

export function AppCard({ app }: { app: AppMeta }) {
  const { t } = useI18n()
  const Icon = app.icon

  return (
    <Link
      href={`/apps/${app.slug}`}
      className="
        group relative flex flex-col justify-between rounded-2xl
        p-4 md:p-5
        ring-1 ring-black/5 dark:ring-white/10
        bg-white/70 dark:bg-white/5 backdrop-blur
        hover:-translate-y-0.5 hover:shadow-lg
        transition duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60
      "
    >
      <div className="flex items-start gap-3">
        <div
          className="
            grid place-items-center size-11 md:size-12 shrink-0
            rounded-xl
            bg-white/90 dark:bg-zinc-900/70
            ring-1 ring-black/5 dark:ring-white/10
            shadow-sm
            group-hover:shadow
          "
        >
          <Icon className="size-5 md:size-6 opacity-90" />
        </div>

        <div className="min-w-0">
          <h3
            className="
              text-[15px] md:text-base font-semibold tracking-tight truncate
              text-zinc-900 dark:text-zinc-100
            "
          >
            {t(`${app.i18nKey}.title`)}
          </h3>
          <p
            className="
              mt-1 text-sm leading-snug line-clamp-2
              text-zinc-600 dark:text-zinc-300/90
            "
          >
            {t(`${app.i18nKey}.desc`)}
          </p>
        </div>
      </div>

      <div
        className="
          mt-4 flex justify-end
          text-sm
          text-sky-700 dark:text-sky-300
        "
      >
        <HiOutlineArrowRight
          className="
            size-4 md:size-5
            translate-x-0 group-hover:translate-x-0.5
            opacity-60 group-hover:opacity-100
            transition
          "
          aria-hidden
        />
      </div>

      <span
        aria-hidden
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          ring-1 ring-black/5 dark:ring-white/10
          mask-[linear-gradient(#000,transparent)]
          opacity-0 group-hover:opacity-100 transition
        "
      />
      <span
        aria-hidden
        className="
          pointer-events-none absolute -inset-px rounded-2xl
          opacity-0 group-hover:opacity-100 transition
          bg-[linear-gradient(180deg,rgba(56,189,248,0.18),rgba(34,211,238,0.18))]
          mix-blend-overlay
        "
      />
    </Link>
  )
}
