'use client'

import { ProjectStatus } from '@/lib/projects'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useI18n()

  const cls: Record<ProjectStatus, string> = {
    active: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300',
    inactive: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
    wip: 'bg-amber-500/15 text-amber-600 dark:text-amber-300'
  }

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ring-white/10 ${cls[status]}`}
    >
      {t(`project.status.${status}`)}
    </span>
  )
}
