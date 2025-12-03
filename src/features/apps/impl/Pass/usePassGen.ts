'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

async function tryZxcvbn(pwd: string): Promise<number | null> {
  try {
    // @ts-ignore
    const mod = await import('zxcvbn')
    const fn = (mod as any).default ?? (mod as any)
    const res = fn(pwd)
    return typeof res?.score === 'number' ? res.score : null
  } catch {
    return null
  }
}

function fallbackScore(
  pwd: string,
  opts: { upper: boolean; digit: boolean; symbol: boolean }
) {
  let s = 0
  if (pwd.length >= 8) s++
  if (pwd.length >= 12) s++
  if (opts.upper) s++
  if (opts.digit) s++
  if (opts.symbol) s++
  return Math.max(0, Math.min(4, s))
}

const SYM = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`

export type PassGenOptions = {
  initialLength?: number
  initialUpper?: boolean
  initialDigit?: boolean
  initialSymbol?: boolean
}

export function usePassGen(opts: PassGenOptions = {}) {
  const [len, setLen] = useState<number>(opts.initialLength ?? 18)
  const [upper, setUpper] = useState<boolean>(opts.initialUpper ?? true)
  const [digit, setDigit] = useState<boolean>(opts.initialDigit ?? true)
  const [symbol, setSymbol] = useState<boolean>(opts.initialSymbol ?? true)
  const [pwd, setPwd] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  const generate = useCallback(() => {
    let pool = 'abcdefghijklmnopqrstuvwxyz'
    if (upper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (digit) pool += '0123456789'
    if (symbol) pool += SYM
    if (!pool) {
      setPwd('')
      return
    }

    const rand = (n: number) => Math.floor(Math.random() * n)
    const next = Array.from(
      { length: len },
      () => pool[rand(pool.length)]
    ).join('')

    setPwd(next)
  }, [len, upper, digit, symbol])

  useEffect(() => {
    generate()
  }, [])

  useEffect(() => {
    let alive = true
    ;(async () => {
      const z = await tryZxcvbn(pwd)
      const s = z ?? fallbackScore(pwd, { upper, digit, symbol })
      if (alive) setScore(s)
    })()
    return () => {
      alive = false
    }
  }, [pwd, upper, digit, symbol])

  const strengthPercent = useMemo(() => (score * 100) / 4, [score])

  const copy = useCallback(async () => {
    if (!pwd) return false

    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        'writeText' in navigator.clipboard
      ) {
        await navigator.clipboard.writeText(pwd)
        return true
      }
    } catch (err) {
      console.warn('Clipboard API failed, falling back to execCommand', err)
    }

    try {
      if (typeof document === 'undefined') return false

      const ta = document.createElement('textarea')
      ta.value = pwd
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      ta.style.top = '0'
      document.body.appendChild(ta)

      const selection = document.getSelection()
      const originalRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

      ta.select()
      const ok = document.execCommand('copy')

      if (originalRange && selection) {
        selection.removeAllRanges()
        selection.addRange(originalRange)
      }

      document.body.removeChild(ta)
      return ok
    } catch (err) {
      console.error('Fallback copy failed', err)
      return false
    }
  }, [pwd])

  return {
    pwd,
    len,
    upper,
    digit,
    symbol,
    score,
    strengthPercent,

    setLen,
    setUpper,
    setDigit,
    setSymbol,

    generate,
    copy
  }
}

export function strengthMeta(score: number) {
  if (score <= 0) return { key: 'tooWeak', color: '#64748b' }
  if (score === 1) return { key: 'weak', color: '#dc2626' }
  if (score === 2) return { key: 'medium', color: '#f59e0b' }
  if (score === 3) return { key: 'strong', color: '#10b981' }
  return { key: 'veryStrong', color: '#059669' }
}
