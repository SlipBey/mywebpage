export type ProjectStatus = 'active' | 'inactive' | 'wip'

export type ProjectLink = {
  site?: string
  github?: string
}

export type ProjectImage = {
  src: string
  alt?: string
}

export type ProjectItem = {
  key: string
  status: ProjectStatus
  years: { start: number; end?: number }
  logo: string
  images: ProjectImage[]
  tags?: string[]
  links?: ProjectLink
  featured?: boolean
}

export const PROJECTS: ProjectItem[] = [
  {
    key: 'slipyme',
    status: 'active',
    years: { start: 2021 },
    logo: '/images/projects/slipyme/logo.png',
    images: [
      { src: '/images/projects/slipyme/1.png' },
      { src: '/images/projects/slipyme/2.png' },
      { src: '/images/projects/slipyme/3.png' },
      { src: '/images/projects/slipyme/4.png' },
      { src: '/images/projects/slipyme/5.png' },
      { src: '/images/projects/slipyme/6.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'Framer Motion',
      'Express.JS'
    ],
    links: {
      site: 'https://www.slipyme.com',
      github: 'https://github.com/SlipBey/slipyme'
    },
    featured: true
  },
  {
    key: 'oguzhanPortfolio',
    status: 'active',
    years: { start: 2023 },
    logo: '/images/projects/oguzhan/logo.png',
    images: [
      { src: '/images/projects/oguzhan/1.png' },
      { src: '/images/projects/oguzhan/2.png' },
      { src: '/images/projects/oguzhan/3.png' },
      { src: '/images/projects/oguzhan/4.png' }
    ],
    tags: ['Next.JS', 'Typescript', 'Tailwindcss', 'Framer Motion'],
    links: {
      site: 'https://www.oguzhantanitmis.com/',
      github: 'https://github.com/SlipBey/oguzhan-portfolio'
    }
  },
  {
    key: 'game2048',
    status: 'active',
    years: { start: 2023 },
    logo: '/images/projects/2048/logo.png',
    images: [
      { src: '/images/projects/2048/1.png' },
      { src: '/images/projects/2048/2.png' },
      { src: '/images/projects/2048/3.png' },
      { src: '/images/projects/2048/4.png' }
    ],
    tags: ['Next.JS', 'Typescript', 'Tailwindcss'],
    links: {
      site: 'https://2048-oyunu.vercel.app/',
      github: 'https://github.com/SlipBey/2048-game'
    }
  },
  {
    key: 'enderbot',
    status: 'inactive',
    years: { start: 2021, end: 2022 },
    logo: '/images/projects/enderbot/logo.png',
    images: [
      { src: '/images/projects/enderbot/1.png' },
      { src: '/images/projects/enderbot/2.png' }
    ],
    tags: ['Next.JS', 'Typescript', 'Tailwindcss'],
    links: { github: 'https://github.com/SlipBey/enderbot-site' }
  },
  {
    key: 'slipyapp',
    status: 'inactive',
    years: { start: 2023 },
    logo: '/images/projects/slipyapp/logo.png',
    images: [
      { src: '/images/projects/slipyapp/1.png' },
      { src: '/images/projects/slipyapp/2.png' },
      { src: '/images/projects/slipyapp/3.png' },
      { src: '/images/projects/slipyapp/4.png' },
      { src: '/images/projects/slipyapp/5.png' },
      { src: '/images/projects/slipyapp/6.png' },
      { src: '/images/projects/slipyapp/7.png' },
      { src: '/images/projects/slipyapp/8.png' },
      { src: '/images/projects/slipyapp/9.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'React Native',
      'Postgresql',
      'Express.JS'
    ]
  },
  {
    key: 'kutuphaneTakip',
    status: 'inactive',
    years: { start: 2023, end: 2023 },
    logo: '/images/projects/kutuphane/logo.png',
    images: [
      { src: '/images/projects/kutuphane/1.png' },
      { src: '/images/projects/kutuphane/2.png' },
      { src: '/images/projects/kutuphane/3.png' },
      { src: '/images/projects/kutuphane/4.png' }
    ],
    tags: ['React Native', 'Postgresql', 'Express.JS']
  },
  {
    key: 'akilliSera',
    status: 'inactive',
    years: { start: 2023, end: 2023 },
    logo: '/images/projects/sera/logo.png',
    images: [{ src: '/images/projects/sera/1.png' }],
    tags: ['React Native', 'Postgresql', 'Express.JS', 'Raspberry Pi']
  },
  {
    key: 'akilliMama',
    status: 'inactive',
    years: { start: 2023, end: 2023 },
    logo: '/images/projects/mama/logo.png',
    images: [{ src: '/images/projects/mama/1.png' }],
    tags: ['React Native', 'Express.JS', 'Arduino']
  },
  {
    key: 'marpel',
    status: 'active',
    years: { start: 2020 },
    logo: '/images/projects/marpel/logo.png',
    images: [
      { src: '/images/projects/marpel/1.png' },
      { src: '/images/projects/marpel/2.png' },
      { src: '/images/projects/marpel/3.png' },
      { src: '/images/projects/marpel/4.png' },
      { src: '/images/projects/marpel/5.png' },
      { src: '/images/projects/marpel/6.png' },
      { src: '/images/projects/marpel/7.png' },
      { src: '/images/projects/marpel/8.png' },
      { src: '/images/projects/marpel/9.png' },
      { src: '/images/projects/marpel/10.png' },
      { src: '/images/projects/marpel/11.png' },
      { src: '/images/projects/marpel/12.png' },
      { src: '/images/projects/marpel/13.png' },
      { src: '/images/projects/marpel/14.png' },
      { src: '/images/projects/marpel/15.png' },
      { src: '/images/projects/marpel/16.png' },
      { src: '/images/projects/marpel/17.png' },
      { src: '/images/projects/marpel/18.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'Framer Motion',
      'Express.JS'
    ],
    links: { site: 'https://www.marpel.net' },
    featured: true
  },
  {
    key: 'cafus',
    status: 'wip',
    years: { start: 2025 },
    logo: '/images/projects/cafus/logo.png',
    images: [
      { src: '/images/projects/cafus/1.png' },
      { src: '/images/projects/cafus/2.png' },
      { src: '/images/projects/cafus/3.png' },
      { src: '/images/projects/cafus/4.png' },
      { src: '/images/projects/cafus/5.png' },
      { src: '/images/projects/cafus/6.png' },
      { src: '/images/projects/cafus/7.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'Framer Motion',
      '.NET',
      'Postgresql',
      'Tauri'
    ]
  },
  {
    key: 'akilliGorevAtama',
    status: 'wip',
    years: { start: 2025 },
    logo: '/images/projects/gorev/logo.png',
    images: [
      { src: '/images/projects/gorev/1.png' },
      { src: '/images/projects/gorev/2.png' },
      { src: '/images/projects/gorev/3.png' },
      { src: '/images/projects/gorev/4.png' },
      { src: '/images/projects/gorev/5.png' },
      { src: '/images/projects/gorev/6.png' },
      { src: '/images/projects/gorev/7.png' }
    ],
    tags: ['Next.JS', 'Typescript', 'Tailwindcss', '.NET', 'ML.NET', 'AI']
  },
  {
    key: 'marpelNetwork',
    status: 'wip',
    years: { start: 2025 },
    logo: '/images/projects/marpelnetwork/logo.png',
    images: [
      { src: '/images/projects/marpelnetwork/1.png' },
      { src: '/images/projects/marpelnetwork/2.png' },
      { src: '/images/projects/marpelnetwork/3.png' },
      { src: '/images/projects/marpelnetwork/4.png' },
      { src: '/images/projects/marpelnetwork/5.png' },
      { src: '/images/projects/marpelnetwork/6.png' },
      { src: '/images/projects/marpelnetwork/7.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'Framer Motion',
      'Express.JS'
    ]
  },
  {
    key: 'webErp',
    status: 'wip',
    years: { start: 2025 },
    logo: '/images/projects/erp/logo.png',
    images: [
      { src: '/images/projects/erp/1.gif' },
      { src: '/images/projects/erp/2.gif' },
      { src: '/images/projects/erp/3.gif' },
      { src: '/images/projects/erp/4.gif' },
      { src: '/images/projects/erp/5.gif' },
      { src: '/images/projects/erp/1.png' },
      { src: '/images/projects/erp/2.png' },
      { src: '/images/projects/erp/3.png' }
    ],
    tags: [
      'Next.JS',
      'Typescript',
      'Tailwindcss',
      'Framer Motion',
      '.NET',
      'Postgresql',
      'Tauri'
    ]
  }
]

export const findProject = (slug: string) =>
  PROJECTS.find((p) => p.key === slug)

export const featuredProjects = () => PROJECTS.filter((p) => p.featured)

export function formatYears(y: { start: number; end?: number }) {
  return y.end ? `${y.start} – ${y.end}` : `${y.start}`
}
