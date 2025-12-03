'use client'

import Link from 'next/link'
import { PrimaryBtn } from '@/components/ui/Buttons'
import AnimatedSection from '@/components/AnimatedSection'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function AppsCta() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section">
      <div
        className="
          glass-ice rounded-2xl px-6 py-7 ring-1
          ring-slate-900/10 dark:ring-white/10
          relative overflow-hidden
        "
      >
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 rounded-2xl
            bg-[radial-gradient(80%_120%_at_0%_0%,rgba(56,189,248,0.14),transparent_60%),radial-gradient(90%_140%_at_100%_100%,rgba(103,232,249,0.12),transparent_60%)]
            dark:bg-[radial-gradient(80%_120%_at_0%_0%,rgba(88,164,160,0.14),transparent_60%),radial-gradient(90%_140%_at_100%_100%,rgba(79,143,139,0.12),transparent_60%)]
          "
        />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              {t('home.appsCta.title')}
            </h3>
            <p className="mt-1 text-slate-800/85 dark:text-slate-200/85">
              {t('home.appsCta.subtitle')}
            </p>
          </div>

          <div className="flex gap-2">
            <PrimaryBtn href="/apps">{t('home.appsCta.viewApps')}</PrimaryBtn>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 dark:ring-white/5 mix-blend-soft-light"
        />
      </div>
    </AnimatedSection>
  )
}
