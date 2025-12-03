import { cookies } from 'next/headers'
import { dict, type Lang } from '@/lib/i18n/dict'

async function pickLang(): Promise<Lang> {
  const store = await cookies()
  const c = store.get('lang')?.value as Lang | undefined
  return c === 'en' ? 'en' : 'tr'
}

export async function tServer(
  key: string,
  args?: Record<string, string>
): Promise<string> {
  const lang = await pickLang()
  let s = dict[key]?.[lang] ?? key
  if (args)
    for (const [k, v] of Object.entries(args))
      s = s.replaceAll(`{${k}}`, String(v))
  return s
}
