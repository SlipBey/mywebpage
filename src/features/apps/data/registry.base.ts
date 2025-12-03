export type AppCategory = 'tool' | 'game' | 'fun' | 'utility'

export type AppSlug =
  | 'random-picker'
  | 'dice'
  | 'tetris'
  | 'qr'
  | 'spin-bottle'
  | 'password'
  | 'uuid'
  | 'color-utils'
  | 'minesweeper'
  | 'tictactoe'
  | 'snake'
  | 'memory-match'
  | 'image-compress'
  | 'unit-convert'
  | 'meme-maker'
  | 'name-wheel'

export type AppBareMeta = {
  slug: AppSlug
  i18nKey: `apps.items.${string}`
  category: AppCategory
}

export const APPS_BARE: readonly AppBareMeta[] = [
  {
    slug: 'random-picker',
    i18nKey: 'apps.items.randomPicker',
    category: 'tool'
  },
  { slug: 'dice', i18nKey: 'apps.items.dice', category: 'game' },
  { slug: 'tetris', i18nKey: 'apps.items.tetris', category: 'game' },
  { slug: 'qr', i18nKey: 'apps.items.qr', category: 'tool' },
  { slug: 'spin-bottle', i18nKey: 'apps.items.spin', category: 'fun' },
  { slug: 'password', i18nKey: 'apps.items.pass', category: 'tool' },
  { slug: 'uuid', i18nKey: 'apps.items.uuid', category: 'utility' },
  { slug: 'color-utils', i18nKey: 'apps.items.color', category: 'tool' },

  { slug: 'minesweeper', i18nKey: 'apps.items.minesweeper', category: 'game' },
  { slug: 'tictactoe', i18nKey: 'apps.items.tictactoe', category: 'game' },
  { slug: 'snake', i18nKey: 'apps.items.snake', category: 'game' },
  { slug: 'memory-match', i18nKey: 'apps.items.memory', category: 'game' },

  {
    slug: 'image-compress',
    i18nKey: 'apps.items.imgcompress',
    category: 'tool'
  },
  { slug: 'unit-convert', i18nKey: 'apps.items.unit', category: 'tool' },

  { slug: 'meme-maker', i18nKey: 'apps.items.meme', category: 'fun' },
  { slug: 'name-wheel', i18nKey: 'apps.items.namewheel', category: 'fun' }
] as const

export const APP_SLUGS = APPS_BARE.map((a) => a.slug) as readonly AppSlug[]
