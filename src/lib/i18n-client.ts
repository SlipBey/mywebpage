'use client'
import tr from '@/i18n/tr'
import en from '@/i18n/en'

export type Locale = 'tr' | 'en'
const dicts = { tr, en } as const

let current: Locale = 'tr'
export function setLocale(l: Locale) {
  current = l
}
export function getLocale(): Locale {
  return current
}
export function getDict() {
  return dicts[current]
}

export function t(key: string): any {
  const parts = key.split('.')
  let cur: any = getDict()
  for (const p of parts) cur = cur?.[p]
  return cur
}
export function tm(keys: string[]) {
  return keys.map(t)
}
