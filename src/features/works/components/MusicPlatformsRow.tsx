'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MEDIA_PROFILES } from '../data/media'
import { fadeInUpSm, groupStagger } from '@/lib/animations'

type Props = {
  className?: string
}

export default function MusicPlatformsRow({ className = '' }: Props) {
  return (
    <motion.div
      variants={groupStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px' }}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {MEDIA_PROFILES.map((p, idx) => {
        const Icon = p.icon
        return (
          <motion.div key={idx} variants={fadeInUpSm}>
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 h-10 px-3 rounded-xl
                text-white font-semibold text-sm
                bg-linear-to-r from-[#68a4a0] to-[#4f8f8b]
                shadow-sm hover:shadow-md
                transition-transform hover:-translate-y-px
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                active:translate-y-0
              "
            >
              <Icon className="text-[16px]" aria-hidden />
              <span className="whitespace-nowrap">{p.label}</span>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
