'use client'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { dict, type Lang } from '@/lib/i18n/dict'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, args?: Record<string, string | number>) => string
}

const I18nCtx = createContext<Ctx | null>(null)

export function I18nProvider({
  children,
  defaultLang = 'tr' as Lang
}: {
  children: React.ReactNode
  defaultLang?: Lang
}) {
  const [lang, setLang] = useState<Lang>(defaultLang)
  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (key, args) => {
        let s = dict[key]?.[lang] ?? key
        if (args)
          for (const [k, v] of Object.entries(args))
            s = s.replaceAll(`{${k}}`, String(v))
        return s
      }
    }),
    [lang]
  )
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
