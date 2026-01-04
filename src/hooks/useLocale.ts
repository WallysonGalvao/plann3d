import { useTranslation } from 'react-i18next'

import type { SupportedLocale } from '@/types/project'

/**
 * Hook to get the current locale in a type-safe way
 * Normalizes the language code to a SupportedLocale
 *
 * @returns The current locale as 'pt' or 'en'
 */
export const useLocale = (): SupportedLocale => {
  const { i18n } = useTranslation()
  const lang = i18n.language.split('-')[0] || 'pt'
  return (lang === 'en' ? 'en' : 'pt') as SupportedLocale
}
