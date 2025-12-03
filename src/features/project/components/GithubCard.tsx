'use client'

import Link from 'next/link'
import { FiStar, FiGitBranch } from 'react-icons/fi'
import type { GithubRepo } from '../hooks/useGithubFeed'

type Props = {
  repo: GithubRepo
  updatedLabel: string
  locale: string
}

export default function GithubCard({ repo, updatedLabel, locale }: Props) {
  return (
    <li
      className="
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-white/70 dark:bg-white/8 backdrop-blur-md
        ring-1 ring-slate-900/10 dark:ring-white/12
        shadow-[0_8px_32px_-16px_rgba(2,6,23,0.25)]
        hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(2,6,23,0.35)]
        transition-transform duration-200
      "
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={repo.html_url}
            target="_blank"
            className="font-semibold hover:underline line-clamp-1"
          >
            {repo.name}
          </Link>

          {repo.language && (
            <span
              className="
                rounded-full px-2 py-[3px] text-[11px] font-semibold
                text-sky-800/90 dark:text-cyan-100/95
                bg-sky-50/80 dark:bg-white/8
                ring-1 ring-sky-600/20 dark:ring-white/15
              "
            >
              {repo.language}
            </span>
          )}
        </div>

        {repo.description && (
          <p className="text-sm text-slate-700/90 dark:text-slate-300/85 line-clamp-2">
            {repo.description}
          </p>
        )}

        <div className="mt-1 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <FiStar className="opacity-80" /> {repo.stargazers_count}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiGitBranch className="opacity-80" /> {repo.forks_count}
          </span>
        </div>

        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {updatedLabel} {new Date(repo.updated_at).toLocaleDateString(locale)}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(2,6,23,0.06)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition
                   bg-[radial-gradient(40%_60%_at_0%_0%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(40%_60%_at_100%_100%,rgba(103,232,249,0.14),transparent_60%)]"
      />
    </li>
  )
}
