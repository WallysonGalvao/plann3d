/**
 * Centralized navigation configuration
 * Used by Header, Footer, and any navigation-related components
 */

/**
 * Navigation link keys for i18n
 * These are used with t() function to get translated labels
 */
export const NAV_LINK_KEYS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.projects', href: '/projects' },
  { key: 'nav.tools', href: '/tools' },
  { key: 'nav.faq', href: '/faq' },
  { key: 'nav.contact', href: '/contact' },
] as const

/**
 * Social media links configuration
 * Icons are defined inline in footer.tsx to avoid circular dependencies
 */
export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/plan.3ds',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@Plann3D',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@plan3ds',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/plan3ds',
  },
] as const

/**
 * Pages that should have transparent header with white text when at top
 */
export const TRANSPARENT_HEADER_PAGES = ['/', '/tools', '/faq'] as const
