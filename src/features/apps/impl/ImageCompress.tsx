'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'

export default function ImageCompress() {
  const { t } = useI18n()

  const [file, setFile] = useState<File | null>(null)
  const [quality, setQuality] = useState(0.8)
  const [width, setWidth] = useState<number | ''>('')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [outUrl, setOutUrl] = useState<string>('')

  const outSizeKb = useMemo(
    () =>
      outUrl ? Math.max(0, Math.round((outUrl.length * 3) / 4 / 1024)) : 0,
    [outUrl]
  )
  const ratio =
    file && outSizeKb > 0 ? Math.round((outSizeKb * 1024 * 100) / file.size) : 0

  useEffect(() => {
    if (!file) {
      setOutUrl('')
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const w = typeof width === 'number' && width > 0 ? width : img.width
      const h = Math.round(img.height * (w / img.width))

      const c = canvasRef.current
      if (!c) return

      c.width = w
      c.height = h

      const ctx = c.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)

      try {
        setOutUrl(c.toDataURL('image/jpeg', quality))
      } catch {
        setOutUrl(c.toDataURL('image/jpeg'))
      }
    }

    img.src = url

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file, quality, width])

  const download = () => {
    if (!outUrl) return
    const a = document.createElement('a')
    a.href = outUrl
    a.download = 'compressed.jpg'
    a.click()
  }

  const resetWidth = () => setWidth('')

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <button
            type="button"
            onClick={openFilePicker}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white
                       [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]
                       hover:brightness-[1.06] active:brightness-95 transition"
          >
            {t('apps.imgcompress.file')}
          </button>
          <span className="text-xs sm:text-sm opacity-70 line-clamp-1 max-w-[180px] sm:max-w-[260px]">
            {file ? file.name : t('apps.imgcompress.noFile')}
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm">
          {t('apps.imgcompress.width')} (px):
          <input
            type="number"
            min={32}
            max={8192}
            value={width as any}
            onChange={(e) =>
              setWidth(e.target.value ? Number(e.target.value) : '')
            }
            className="w-24 rounded-md px-2 py-1 bg-white/70 dark:bg-white/10
                       ring-1 ring-black/5 dark:ring-white/10 text-xs sm:text-sm"
          />
          <button
            type="button"
            onClick={resetWidth}
            className="rounded-lg px-2.5 py-1 text-xs font-semibold
                       ring-1 ring-black/5 dark:ring-white/10 hover:bg-white/10"
          >
            {t('apps.imgcompress.original')}
          </button>
        </label>

        <label className="flex items-center gap-2 text-sm">
          {t('apps.imgcompress.quality')}
          <input
            aria-label={t('apps.imgcompress.quality')}
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="accent-emerald-500"
          />
          <span className="w-10 text-right text-xs sm:text-sm">
            {Math.round(quality * 100)}%
          </span>
        </label>

        <button
          type="button"
          onClick={download}
          disabled={!outUrl}
          className="rounded-xl px-4 py-2 font-semibold text-white
                     [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]
                     disabled:opacity-60"
        >
          {t('apps.imgcompress.download')}
        </button>
      </div>

      {file && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-ice rounded-2xl p-3 ring-1 ring-black/5 dark:ring-white/10">
            <div className="text-sm opacity-70 mb-2">
              {t('apps.imgcompress.preview')}
            </div>
            <div className="max-h-[60vh] overflow-auto rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white">
              <canvas ref={canvasRef} className="block max-w-full h-auto" />
            </div>
          </div>

          <div className="glass-ice rounded-2xl p-4 ring-1 ring-black/5 dark:ring-white/10">
            <div className="space-y-2 text-sm">
              <div className="font-semibold">{t('apps.imgcompress.stats')}</div>
              <div>
                {t('apps.imgcompress.source')}:{' '}
                <b>{(file.size / 1024).toFixed(1)} KB</b>
              </div>
              {outUrl && (
                <>
                  <div>
                    {t('apps.imgcompress.output')}:{' '}
                    <b>{outSizeKb.toLocaleString()} KB</b>
                  </div>
                  <div className="opacity-80">
                    {t('apps.imgcompress.ratio')}: <b>{ratio}%</b>
                  </div>
                </>
              )}
              <div className="opacity-70">{t('apps.imgcompress.hint')}</div>
            </div>
          </div>
        </div>
      )}
    </AppPanel>
  )
}
