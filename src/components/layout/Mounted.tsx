'use client'

import { useEffect, useState, PropsWithChildren } from 'react'

export default function Mounted({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return children
}
