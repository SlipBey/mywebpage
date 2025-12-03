'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '@/lib/i18n/I18nProvider'
import AppPanel from '../components/AppPanel'
import { QR_CFG, QR_UI } from '../data/qr'

type Mode = 'url' | 'text'

export default function QrMaker() {
  const { t } = useI18n()

  const [mode, setMode] = useState<Mode>(QR_CFG.default.mode)
  const [url, setUrl] = useState(QR_CFG.default.url)
  const [text, setText] = useState(QR_CFG.default.text)
  const [size, setSize] = useState(QR_CFG.default.size)

  const [fg, setFg] = useState(QR_CFG.default.fg)
  const [bg, setBg] = useState(QR_CFG.default.bg)

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoScale, setLogoScale] = useState(QR_CFG.default.logoScale)
  const [logoRadius, setLogoRadius] = useState(QR_CFG.default.logoRadius)

  const [hadError, setHadError] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const data = useMemo(
    () => (mode === 'url' ? url.trim() : text),
    [mode, url, text]
  )

  useEffect(() => {
    if (!logoFile) {
      if (logoUrl) URL.revokeObjectURL(logoUrl)
      setLogoUrl(null)
      return
    }
    const obj = URL.createObjectURL(logoFile)
    setLogoUrl(obj)
    return () => URL.revokeObjectURL(obj)
  }, [logoFile])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    c.width = c.height = size
    const ctx = c.getContext('2d')
    if (!ctx) return

    const paintBg = () => {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, size, size)
    }

    ;(async () => {
      try {
        setHadError(false)
        const { QRCode } = await import('./_tinyqr')
        paintBg()

        const qr = new QRCode(data || ' ')
        const cells: boolean[][] = qr.modules
        const n = cells.length

        const inner = size - QR_CFG.quietZone * 2
        const cell = Math.floor(inner / n)
        const offset = Math.floor((size - cell * n) / 2)

        ctx.fillStyle = fg
        for (let y = 0; y < n; y++) {
          for (let x = 0; x < n; x++) {
            if (cells[y][x])
              ctx.fillRect(offset + x * cell, offset + y * cell, cell, cell)
          }
        }

        if (logoUrl) {
          await drawRoundedLogo(ctx, logoUrl, size, logoScale, logoRadius)
        }
      } catch {
        setHadError(true)
        paintBg()
        ctx.fillStyle = '#111827'
        ctx.font = '14px system-ui, -apple-system, Segoe UI'
        ctx.fillText(t('apps.qr.fallback'), 12, Math.floor(size / 2))
      }
    })()
  }, [data, size, fg, bg, logoUrl, logoScale, logoRadius, t])

  const onPickFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null
    if (f && !f.type.startsWith('image/')) return
    setLogoFile(f)
  }

  const onRemoveLogo = () => {
    setLogoFile(null)
    setLogoScale(QR_CFG.minLogoScale)
    setLogoRadius(QR_CFG.default.logoRadius)
  }

  const onDownload = () => {
    const el = canvasRef.current
    if (!el) return
    const a = document.createElement('a')
    a.href = el.toDataURL('image/png')
    a.download = 'qr.png'
    a.click()
  }

  return (
    <AppPanel stageClassName="space-y-5">
      <div className={QR_UI.tabBar}>
        {(['url', 'text'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={QR_UI.tabBtn}
            data-active={mode === m}
          >
            {m === 'url' ? t('apps.qr.tabUrl') : t('apps.qr.tabText')}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className={
            mode === 'text' ? 'sm:col-span-2 grid gap-1' : 'grid gap-1'
          }
        >
          <span className="text-sm opacity-80">
            {mode === 'url' ? t('apps.qr.url') : t('apps.qr.text')}
          </span>
          <input
            value={mode === 'url' ? url : text}
            onChange={(e) =>
              mode === 'url' ? setUrl(e.target.value) : setText(e.target.value)
            }
            placeholder={mode === 'url' ? 'https://...' : t('apps.qr.text')}
            className={QR_UI.field}
          />
        </label>

        <label className="grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-80">{t('apps.qr.size')}</span>
            <span className={QR_UI.sub}>{size}px</span>
          </div>
          <input
            type="range"
            min={QR_CFG.sizeMin}
            max={QR_CFG.sizeMax}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className={QR_UI.range}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">{t('apps.qr.fg')}</span>
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="h-9 w-full rounded-md overflow-hidden"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm opacity-80">{t('apps.qr.bg')}</span>
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="h-9 w-full rounded-md overflow-hidden"
            />
          </label>
        </div>

        <div className="sm:col-span-2 grid gap-2">
          <span className="text-sm opacity-80">{t('apps.qr.fileLogo')}</span>
          <div className="flex items-center gap-3">
            <label
              className={`${QR_UI.softBtn} cursor-pointer inline-flex items-center gap-2`}
            >
              <input
                type="file"
                accept={QR_CFG.accept}
                onChange={onPickFile}
                className="hidden"
              />
              <span>{t('apps.qr.chooseFile')}</span>
            </label>

            {logoFile ? (
              <>
                <img
                  src={logoUrl!}
                  alt="logo preview"
                  className="h-10 w-10 rounded-lg ring-1 ring-black/5 dark:ring-white/10 object-cover"
                />
                <button onClick={onRemoveLogo} className={QR_UI.softBtn}>
                  {t('apps.common.remove')}
                </button>
                <span className="text-sm opacity-70">{logoFile.name}</span>
              </>
            ) : (
              <span className="text-sm opacity-60">{t('apps.qr.noFile')}</span>
            )}
          </div>
        </div>

        {logoFile && (
          <>
            <label className="grid gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Logo Scale (%)</span>
                <span className={QR_UI.sub}>
                  {Math.round(logoScale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={Math.round(QR_CFG.minLogoScale * 100)}
                max={Math.round(QR_CFG.maxLogoScale * 100)}
                value={Math.round(logoScale * 100)}
                onChange={(e) =>
                  setLogoScale(
                    clamp(
                      Number(e.target.value) / 100,
                      QR_CFG.minLogoScale,
                      QR_CFG.maxLogoScale
                    )
                  )
                }
                className={QR_UI.range}
              />
            </label>

            <label className="grid gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-80">Logo Radius (px)</span>
                <span className={QR_UI.sub}>{logoRadius}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                value={logoRadius}
                onChange={(e) => setLogoRadius(Number(e.target.value))}
                className={QR_UI.range}
              />
            </label>
          </>
        )}
      </div>

      <div className="grid place-items-center">
        <div className={QR_UI.previewWrap}>
          <canvas
            ref={canvasRef}
            className="bg-white dark:bg-white w-full max-w-xs aspect-square rounded-2xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onDownload} className={QR_UI.primBtn}>
          {t('apps.qr.download')}
        </button>
        {hadError && (
          <span className="text-sm opacity-75">{t('apps.qr.fallback')}</span>
        )}
      </div>
    </AppPanel>
  )
}

async function drawRoundedLogo(
  ctx: CanvasRenderingContext2D,
  src: string,
  size: number,
  scale: number,
  radius: number
) {
  const img = await loadImage(src)
  const w = Math.floor(
    size * clamp(scale, QR_CFG.minLogoScale, QR_CFG.maxLogoScale)
  )
  const x = Math.floor((size - w) / 2)
  const y = Math.floor((size - w) / 2)

  const pad = 6
  roundRect(
    ctx,
    x - pad,
    y - pad,
    w + pad * 2,
    w + pad * 2,
    Math.max(radius, 4)
  )
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  ctx.save()
  roundRect(ctx, x, y, w, w, radius)
  ctx.clip()
  ctx.drawImage(img, x, y, w, w)
  ctx.restore()
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + rr, y)
  ctx.arcTo(x + w, y, x + w, y + h, rr)
  ctx.arcTo(x + w, y + h, x, y + h, rr)
  ctx.arcTo(x, y + h, x, y, rr)
  ctx.arcTo(x, y, x + w, y, rr)
  ctx.closePath()
}
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))
