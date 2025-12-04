'use client'

import * as React from 'react'
import Link from 'next/link'

type AnchorProps = React.ComponentProps<'a'> & {
  href?: string
  external?: boolean
}

function merge(...parts: string[]) {
  return parts.filter(Boolean).join(' ')
}

function BaseButton({
  as = 'a',
  href,
  className,
  ...rest
}: AnchorProps & { as?: 'a' | 'link'; className?: string }) {
  const common = rest as any
  if (as === 'link' && href) {
    return (
      <Link
        href={href}
        prefetch={false}
        target="_blank"
        rel="noreferrer"
        {...common}
        className={className}
      />
    )
  }
  return <a href={href} {...common} className={className} />
}

export function PrimaryBtn({
  className = '',
  href,
  external,
  ...rest
}: AnchorProps) {
  const cls = merge(
    'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white',
    'shadow-sm [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] hover:brightness-[1.06] active:brightness-95 transition',
    'focus:outline-none focus:ring-2 focus:ring-emerald-300/60 dark:focus:ring-emerald-400/40',
    className
  )
  return (
    <BaseButton
      as={href && !external && href.startsWith('/') ? 'link' : 'a'}
      href={href}
      className={cls}
      {...rest}
    />
  )
}

export function GlassBtn({
  className = '',
  href,
  external,
  ...rest
}: AnchorProps) {
  const cls = merge(
    'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold',
    'text-slate-800 dark:text-white ring-1 ring-slate-900/10 dark:ring-white/15',
    'bg-white/70 dark:bg-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/15 transition',
    'focus:outline-none focus:ring-2 focus:ring-sky-300/60 dark:focus:ring-cyan-400/40',
    className
  )
  return (
    <BaseButton
      as={href && !external && href.startsWith('/') ? 'link' : 'a'}
      href={href}
      className={cls}
      {...rest}
    />
  )
}
