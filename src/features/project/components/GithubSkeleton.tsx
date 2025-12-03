'use client'

type Props = {
  count?: number
}

export default function GithubSkeleton({ count = 8 }: Props) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            relative flex flex-col overflow-hidden rounded-2xl
            bg-white/70 dark:bg-white/8 backdrop-blur-md
            ring-1 ring-slate-900/10 dark:ring-white/12
            shadow-[0_8px_32px_-16px_rgba(2,6,23,0.25)]
            animate-pulse
          "
        >
          <div className="p-4 space-y-3">
            <div className="h-4 w-1/2 rounded bg-white/20 dark:bg-white/10" />
            <div className="h-3 w-4/5 rounded bg-white/15 dark:bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/15 dark:bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/15 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
