'use client'

import type { JSX } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

type TriggerMode = 'view' | 'mount' | 'both'

type AnimatedSectionProps = {
  as?: keyof JSX.IntrinsicElements
  id?: string
  className?: string
  children: React.ReactNode
  variants?: Variants
  mode?: TriggerMode
  viewportAmount?: number
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }
  }
}

export default function AnimatedSection({
  as = 'section',
  id,
  className,
  children,
  variants,
  mode = 'view',
  viewportAmount = 0.15
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [hasShown, setHasShown] = useState<boolean>(mode === 'mount')

  const inView = useInView(ref, {
    amount: viewportAmount,
    once: mode !== 'both'
  })

  useEffect(() => {
    if (mode === 'mount') return

    if (inView) {
      setHasShown(true)
    } else if (mode === 'both') {
      setHasShown(false)
    }
  }, [inView, mode])

  const MotionTag: any = (motion as any)[as] ?? motion.section
  const finalVariants = variants ?? defaultVariants

  const animateState: 'hidden' | 'show' =
    mode === 'mount' ? 'show' : hasShown ? 'show' : 'hidden'

  return (
    <MotionTag
      id={id}
      ref={ref}
      className={className}
      variants={finalVariants}
      initial="hidden"
      animate={animateState}
    >
      {children}
    </MotionTag>
  )
}
