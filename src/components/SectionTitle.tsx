'use client'

import type { JSX } from 'react'
import clsx from 'clsx'

export default function SectionTitle({
  as = 'h2',
  children,
  className
}: {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
  className?: string
}) {
  const Tag = as as any
  return (
    <div className="relative inline-block section-title-glow">
      <Tag
        className={clsx(
          'text-2xl md:text-3xl font-extrabold tracking-tight',
          'text-slate-900 dark:text-white',
          'dark:drop-shadow-[0_1px_0_rgba(0,0,0,.55)]',
          className
        )}
      >
        {children}
      </Tag>
      <div
        className="mt-1 h-0.5 w-24 rounded-full
 bg-linear-to-r from-sky-500 via-cyan-400 to-emerald-400
 shadow-[0_0_14px_3px_rgba(56,189,248,.35)]"
      />
    </div>
  )
}
