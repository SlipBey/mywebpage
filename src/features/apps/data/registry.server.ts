import { APPS_BARE, APP_SLUGS } from './registry.base'
export { APP_SLUGS }

export const getI18nKeysBySlug = (slug: string) => {
  const a = APPS_BARE.find((x) => x.slug === slug)
  return a
    ? { titleKey: `${a.i18nKey}.title`, descKey: `${a.i18nKey}.desc` }
    : null
}
