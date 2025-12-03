'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'

type Align = 'left' | 'center' | 'right'
type Format = 'png' | 'jpeg'

export default function MemeMaker() {
  const { t } = useI18n()

  const [file, setFile] = useState<File | null>(null)
  const [top, setTop] = useState(t('apps.meme.topDefault'))
  const [bottom, setBottom] = useState(t('apps.meme.bottomDefault'))
  const [size, setSize] = useState(768)
  const [format, setFormat] = useState<Format>('png')
  const [uppercase, setUppercase] = useState(true)
  const [align, setAlign] = useState<Align>('center')
  const [stroke, setStroke] = useState(0.75)
  const [margin, setMargin] = useState(0.04)

  const cRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [url, setUrl] = useState('')

  const previewStyle = useMemo(
    () => ({ width: 'min(100%, 720px)', height: 'auto' }),
    []
  )

  const drawLabel = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    baseline: CanvasTextBaseline
  ) => {
    const content = uppercase ? text.toUpperCase() : text
    const words = content.split(/\s+/)
    const lines: string[] = []
    let line = ''

    for (const w of words) {
      const test = line ? line + ' ' + w : w
      const m = ctx.measureText(test)
      if (m.width > maxWidth && line) {
        lines.push(line)
        line = w
      } else {
        line = test
      }
    }
    if (line) lines.push(line)

    const lineHeight = Math.round(size / 10.5)
    ctx.textBaseline = baseline

    let yy = y
    if (baseline === 'top') {
      for (let i = 0; i < lines.length; i++) {
        if (stroke > 0) ctx.strokeText(lines[i], x, yy)
        ctx.fillText(lines[i], x, yy)
        yy += lineHeight
      }
    } else if (baseline === 'bottom') {
      for (let i = lines.length - 1; i >= 0; i--) {
        if (stroke > 0) ctx.strokeText(lines[i], x, yy)
        ctx.fillText(lines[i], x, yy)
        yy -= lineHeight
      }
    } else {
      if (stroke > 0) ctx.strokeText(lines.join('\n'), x, yy)
      ctx.fillText(lines.join('\n'), x, yy)
    }
  }

  const redraw = () => {
    const c = cRef.current
    if (!c) return

    c.width = size
    c.height = size

    const ctx = c.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, size, size)

    const drawText = () => {
      const marginPx = Math.round(size * margin)
      ctx.font = `bold ${Math.round(
        size / 12
      )}px Impact, system-ui, Segoe UI, Arial, sans-serif`
      ctx.lineJoin = 'round'
      ctx.miterLimit = 2
      ctx.fillStyle = '#fff'
      ctx.strokeStyle = '#000'
      ctx.lineWidth = Math.max(1, Math.round((size / 100) * stroke))

      if (align === 'left') ctx.textAlign = 'left'
      else if (align === 'right') ctx.textAlign = 'right'
      else ctx.textAlign = 'center'

      const x =
        align === 'left'
          ? marginPx
          : align === 'right'
            ? size - marginPx
            : size / 2

      const maxW =
        align === 'center' ? size - marginPx * 2 : size - marginPx * 1.5

      drawLabel(ctx, top, x, marginPx, maxW, 'top')
      drawLabel(ctx, bottom, x, size - marginPx, maxW, 'bottom')
    }

    if (!file) {
      drawText()
      setUrl(
        c.toDataURL(`image/${format}`, format === 'jpeg' ? 0.92 : undefined)
      )
      return
    }

    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      const r = Math.max(size / img.width, size / img.height)
      const w = img.width * r
      const h = img.height * r
      const dx = (size - w) / 2
      const dy = (size - h) / 2

      ctx.drawImage(img, dx, dy, w, h)
      drawText()

      setUrl(
        c.toDataURL(`image/${format}`, format === 'jpeg' ? 0.92 : undefined)
      )

      URL.revokeObjectURL(objectUrl)
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
    }

    img.src = objectUrl
  }

  useEffect(() => {
    redraw()
  }, [file, top, bottom, size, format, uppercase, align, stroke, margin])

  const download = () => {
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = `meme.${format === 'jpeg' ? 'jpg' : 'png'}`
    a.click()
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <AppPanel stageClassName="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
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
            {t('apps.meme.chooseImage')}
          </button>
          <span className="text-xs sm:text-sm opacity-70 line-clamp-1 max-w-[180px] sm:max-w-[260px]">
            {file ? file.name : t('apps.meme.noFile')}
          </span>
        </div>

        <input
          value={top}
          onChange={(e) => setTop(e.target.value)}
          placeholder={t('apps.meme.top')}
          className="min-w-48 flex-1 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />
        <input
          value={bottom}
          onChange={(e) => setBottom(e.target.value)}
          placeholder={t('apps.meme.bottom')}
          className="min-w-48 flex-1 rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
        />

        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
          {(['png', 'jpeg'] as const).map((f) => {
            const active = format === f
            return (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={[
                  'px-3 py-1.5 text-sm font-semibold',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
              >
                {f.toUpperCase()}
              </button>
            )
          })}
        </div>

        <label className="flex items-center gap-2 text-sm">
          {t('apps.meme.size')}
          <input
            type="number"
            min={256}
            max={2048}
            step={64}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-24 rounded-md px-2 py-1 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10"
          />
        </label>

        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white/5">
          {(['left', 'center', 'right'] as const).map((a) => {
            const active = align === a
            return (
              <button
                key={a}
                onClick={() => setAlign(a)}
                className={[
                  'px-3 py-1.5 text-sm font-semibold',
                  active
                    ? 'bg-linear-to-r from-sky-400/20 to-cyan-400/20 text-sky-700 dark:text-sky-300'
                    : 'hover:bg-white/10'
                ].join(' ')}
                title={t(`apps.meme.align.${a}` as const)}
              >
                {t(`apps.meme.align.${a}` as const)}
              </button>
            )
          })}
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          {t('apps.meme.uppercase')}
        </label>

        <label className="flex items-center gap-2 text-sm">
          {t('apps.meme.stroke')}
          <input
            type="range"
            min={0}
            max={2}
            step={0.05}
            value={stroke}
            onChange={(e) => setStroke(Number(e.target.value))}
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          {t('apps.meme.margin')}
          <input
            type="range"
            min={0.02}
            max={0.12}
            step={0.005}
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
          />
        </label>

        <button
          onClick={download}
          disabled={!url}
          className="rounded-xl px-4 py-2 font-semibold text-white
                     [background:linear-gradient(180deg,#68a4a0,#4f8f8b)]
                     disabled:opacity-60"
        >
          {t('apps.meme.download')}
        </button>
      </div>

      <div className="mt-1 inline-block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden bg-white">
        <canvas ref={cRef} style={previewStyle} />
      </div>
    </AppPanel>
  )
}
