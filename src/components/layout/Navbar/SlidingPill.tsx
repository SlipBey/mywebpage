'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Rect = { left: number; width: number; top: number; height: number }

export default function SlidingPill({
  container,
  activeEl,
  borderRadius = 8
}: {
  container: HTMLElement | null
  activeEl: HTMLElement | null
  borderRadius?: number
}) {
  const [rect, setRect] = useState<Rect | null>(null)

  useEffect(() => {
    if (!container || !activeEl) return

    const measure = () => {
      const left = activeEl.offsetLeft
      const top = activeEl.offsetTop
      setRect({
        left,
        top,
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight
      })
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(container)
    ro.observe(activeEl)

    return () => {
      ro.disconnect()
    }
  }, [container, activeEl])

  if (!rect) return null

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
      className="absolute z-0 bg-sky-300/35 dark:bg-sky-400/20 ring-1 ring-sky-700/10 dark:ring-white/10"
      style={{ borderRadius }}
    />
  )
}
