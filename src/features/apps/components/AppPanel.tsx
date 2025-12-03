'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'
import { panelVariants } from '@/lib/animations'

type Props = React.PropsWithChildren<{
  stageClassName?: string
}>

export default function AppPanel({ stageClassName, children }: Props) {
  return (
    <motion.section
      variants={panelVariants}
      initial="hidden"
      animate="show"
      className="glass-ice rounded-2xl p-6 md:p-8 ring-1 ring-black/5 dark:ring-white/10"
    >
      <div
        className={
          'mx-auto w-full max-w-5xl rounded-2xl bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 p-4 sm:p-5 md:p-6 ' +
          (stageClassName ?? '')
        }
      >
        {children}
      </div>
    </motion.section>
  )
}
