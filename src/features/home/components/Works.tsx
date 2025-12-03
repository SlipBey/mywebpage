'use client'

import { useMemo, useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import { PrimaryBtn } from '@/components/ui/Buttons'
import { useI18n } from '@/lib/i18n/I18nProvider'

import HomeWorksSoon from './HomeWorksSoon'
import HomeWorksTabs, { HomeWorksTabKey } from './HomeWorksTabs'
import HomeWorksYoutubeFeed from './HomeWorksYoutubeFeed'
import { useYoutubeFeed } from '@/features/works/hooks/useYoutubeFeed'
import HomeWorksMusic from './HomeWorkMusic'

export default function Works() {
  const { t, lang } = useI18n()
  const [tab, setTab] = useState<HomeWorksTabKey>('youtube')

  const locale = lang === 'tr' ? 'tr-TR' : 'en-US'
  const nf = useMemo(() => new Intl.NumberFormat(locale), [locale])

  const isYoutube = tab === 'youtube'
  const isMusic = tab === 'music'
  const isFilm = tab === 'film'

  const { items, loading } = useYoutubeFeed(6)

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <SectionTitle>{t('home.works.title')}</SectionTitle>

        <HomeWorksTabs tab={tab} onChange={setTab} />
      </div>

      <div className="mb-6 h-px w-full rounded bg-linear-to-r from-sky-500/0 via-sky-500/25 to-sky-500/0 dark:from-white/0 dark:via-white/15 dark:to-white/0" />

      {isYoutube && (
        <HomeWorksYoutubeFeed
          items={items}
          loading={loading}
          viewsLabel={t('home.works.youtube.views')}
          emptyText={t('home.works.youtube.empty')}
          numberFormat={nf}
        />
      )}

      {isMusic && <HomeWorksMusic />}

      {isFilm && <HomeWorksSoon type="film" />}

      <div className="mt-8 flex justify-center">
        <PrimaryBtn
          href="/works"
          className="transition-transform hover:-translate-y-0.5"
        >
          {t('home.works.seeAll')}
        </PrimaryBtn>
      </div>
    </section>
  )
}
