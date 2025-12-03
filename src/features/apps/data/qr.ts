export const QR_CFG = {
  sizeMin: 160,
  sizeMax: 512,
  quietZone: 16,
  maxLogoScale: 0.22,
  minLogoScale: 0.1,
  accept: 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml',
  default: {
    mode: 'url' as 'url' | 'text',
    url: 'https://www.slipyme.com',
    text: '',
    size: 240,
    fg: '#000000',
    bg: '#ffffff',
    logoRadius: 10,
    logoScale: 0.1
  }
}

export const QR_UI = {
  tabBar:
    'inline-flex rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 bg-white/5',
  tabBtn:
    'inline-flex items-center justify-center px-3 py-1.5 text-sm font-semibold ' +
    'data-[active=true]:text-sky-700 dark:data-[active=true]:text-sky-300 ' +
    'data-[active=true]:bg-linear-to-r data-[active=true]:from-sky-500/20 data-[active=true]:to-cyan-500/20 ' +
    'hover:bg-white/10 transition',
  field:
    'rounded-xl px-3 py-2 bg-white/70 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10',
  softBtn:
    'rounded-xl px-3 py-2 ring-1 ring-black/5 dark:ring-white/10 bg-white/5 hover:bg-white/10 transition',
  primBtn:
    'rounded-xl px-5 py-2.5 font-semibold text-white [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] hover:brightness-[1.06] active:brightness-95 transition',
  card: 'rounded-xl p-3 ring-1 ring-black/5 dark:ring-white/10 bg-white/5',
  previewWrap:
    'inline-block rounded-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden bg-white',
  range: 'accent-emerald-500',
  sub: 'text-xs opacity-60'
}
