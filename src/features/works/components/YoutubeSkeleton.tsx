'use client'

export default function YoutubeSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="
            overflow-hidden rounded-2xl backdrop-blur
            ring-1 ring-slate-900/10 dark:ring-white/10
            bg-white/70 dark:bg-white/5
          "
        >
          <div className="aspect-video w-full animate-pulse bg-slate-200/60 dark:bg-white/10" />
          <div className="p-3 space-y-2">
            <div className="h-3 w-5/6 rounded bg-slate-300/60 dark:bg-white/10 animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-slate-300/50 dark:bg-white/10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
