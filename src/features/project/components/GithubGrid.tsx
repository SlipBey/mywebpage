'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { staggerTight, fadeInUpSm } from '@/lib/animations'

import { useGithubFeed } from '../hooks/useGithubFeed'
import GithubSkeleton from './GithubSkeleton'
import GithubCard from './GithubCard'

type Props = {
  limit?: number
  username?: string
}

export default function GithubGrid({ limit = 8, username = 'SlipBey' }: Props) {
  const { t, lang } = useI18n()
  const { items, loading, error } = useGithubFeed(limit, username)

  const locale = lang === 'tr' ? 'tr-TR' : 'en-US'
  const repos = items ?? []

  return (
    <>
      {error && (
        <div className="mt-3 text-sm text-amber-600 dark:text-amber-400">
          GitHub: {error}
        </div>
      )}

      {loading && !error && <GithubSkeleton count={limit} />}

      {!loading && repos.length > 0 && (
        <motion.ul
          variants={staggerTight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2, margin: '-10% 0px' }}
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {repos.map((r) => (
            <motion.div key={r.id} variants={fadeInUpSm}>
              <GithubCard
                repo={r}
                updatedLabel={t('project.github.updated')}
                locale={locale}
              />
            </motion.div>
          ))}
        </motion.ul>
      )}
    </>
  )
}
