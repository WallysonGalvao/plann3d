'use client'

import { useTranslation } from 'react-i18next'

/**
 * Skip Links Component
 * Provides keyboard users with quick navigation to main content areas.
 * These links are visually hidden until focused.
 */
export function SkipLinks() {
  const { t } = useTranslation()

  const skipLinks = [
    { href: '#main-content', label: t('accessibility.skipToMain', { defaultValue: 'Pular para conteúdo principal' }) },
    { href: '#main-navigation', label: t('accessibility.skipToNav', { defaultValue: 'Pular para navegação' }) },
    { href: '#footer', label: t('accessibility.skipToFooter', { defaultValue: 'Pular para rodapé' }) },
  ]

  return (
    <nav aria-label="Skip links" className="skip-links">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="skip-link"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
