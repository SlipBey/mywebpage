'use client'

import clsx from 'clsx'
import { useI18n } from '@/lib/i18n/I18nProvider'
import type { DomainItem } from '@/features/about/data/domains'

type Props = {
  item: DomainItem
  clamp?: boolean
  className?: string
}

export default function DomainCard({ item, clamp = false, className }: Props) {
  const { t } = useI18n()
  const { Icon, chipKey } = item

  return (
    <article
      tabIndex={0}
      className={clsx(
        'group glass-ice rounded-2xl ring-1 ring-slate-900/10 dark:ring-white/10',
        'p-5 flex items-start gap-4 transition transform hover:-translate-y-0.5',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
        'hover:shadow-lg/40 shadow-sm',
        className
      )}
      aria-labelledby={`${chipKey}-title`}
    >
      <span
        className={clsx(
          'inline-grid place-items-center size-11 shrink-0 rounded-xl',
          'bg-white/75 dark:bg-white/5 backdrop-blur',
          'ring-1 ring-slate-900/10 dark:ring-white/10'
        )}
      >
        <Icon className="size-5 text-slate-800 dark:text-slate-200" />
      </span>

      <div className="min-w-0">
        <h3
          id={`${chipKey}-title`}
          className="font-semibold text-slate-900 dark:text-white text-base leading-6"
        >
          {t(`${chipKey}.title`)}
        </h3>

        <p
          className={clsx(
            'mt-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300',
            clamp && 'line-clamp-2'
          )}
        >
          {t(`${chipKey}.desc`)}
        </p>
      </div>
    </article>
  )
}
