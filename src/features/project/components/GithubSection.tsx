'use client'

import { FiGithub } from 'react-icons/fi'

import AnimatedSection from '@/components/AnimatedSection'
import SectionTitle from '@/components/SectionTitle'
import { useI18n } from '@/lib/i18n/I18nProvider'

import GithubGrid from './GithubGrid'
import { GlassBtn } from '@/components/ui/Buttons'

export default function GithubSection() {
  const { t } = useI18n()

  return (
    <AnimatedSection as="section" id="github-projects" className="space-y-5">
      <SectionTitle>
        <div className="flex items-center gap-2">
          <FiGithub />
          <h2 className="text-xl sm:text-2xl font-bold">
            {t('project.github.title')}
          </h2>
        </div>
      </SectionTitle>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {t('project.github.pinnedTitle')}
        </span>

        <GlassBtn href="/github">{t('project.github.moreOnGithub')}</GlassBtn>
      </div>

      <GithubGrid limit={8} username="SlipBey" />
    </AnimatedSection>
  )
}
