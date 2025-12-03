'use client'
import { useMemo, useState } from 'react'
import AppPanel from '../components/AppPanel'
import { useI18n } from '@/lib/i18n/I18nProvider'

const uuidv4 = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

export default function UUIDMaker() {
  const { t } = useI18n()
  const [count, setCount] = useState<number>(0)
  const [list, setList] = useState<string[]>([])

  const make = () => {
    const n = Math.max(1, Math.min(1000, count || 1))
    setList(Array.from({ length: n }, uuidv4))
  }
  const clear = () => setList([])

  const text = useMemo(() => list.join('\n'), [list])

  return (
    <AppPanel stageClassName="space-y-3">
      <div className="flex gap-2">
        <input
          type="number"
          min={1}
          max={1000}
          placeholder={t('apps.uuid.countPlaceholder')}
          value={count || ''}
          onChange={(e) => setCount(Number(e.target.value))}
          className="rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />
        <button
          onClick={make}
          className="rounded-xl px-3 py-2 font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]"
        >
          {t('apps.uuid.create')}
        </button>
        <button
          onClick={clear}
          className="rounded-xl px-3 py-2 ring-1 ring-black/5 dark:ring-white/10"
        >
          {t('apps.common.clear')}
        </button>
      </div>

      <textarea
        readOnly
        value={text}
        rows={10}
        className="w-full rounded-xl p-3 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
      />
      {list.length === 0 && (
        <div className="opacity-60 text-sm">{t('apps.uuid.empty')}</div>
      )}
    </AppPanel>
  )
}
