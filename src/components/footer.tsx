import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import logo from '@/assets/logo.svg'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/plan.3ds',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@plan3ds',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@plan3ds',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      ),
    },
    {
      label: 'Behance',
      href: 'https://www.behance.net/plan3ds',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7.5h4c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5H3z" />
          <path d="M3 12.5h4.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5H3z" />
          <path d="M3 4.5v15" />
          <path d="M15.5 6h6" />
          <path d="M13.5 14c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5c-2.2 0-4-1.4-4.7-3.5" />
          <path d="M13.5 14h7.5" />
        </svg>
      ),
    },
  ]

  // const navLinks = [
  //   { label: t('nav.work'), href: '#projects' },
  //   { label: t('nav.process'), href: '/process' },
  //   { label: t('nav.studio'), href: '/studio' },
  //   { label: t('nav.contact'), href: '/contact' },
  // ]

  // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 border-t border-white/5">

  return (
    <footer className="px-6 lg:px-12 pb-4 bg-[#0B0F17]">
      {/* Main Footer Content */}
      <div className="flex flex-row items-center justify-between pt-12 border-t border-white/5">
        {/* Column 1: Logo, Description, Social */}
        <div className="lg:col-span-5 space-y-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="PLANN3D Logo"
              className="w-8 h-10 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
            />
            <span className="text-lg font-semibold tracking-tight transition-all duration-300 group-hover:text-primary">
              PLANN3D
            </span>
          </Link>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            {t('footer.description')}
          </p>

          {/* Social Icons */}
          <div className="flex gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation */}
        {/* <div className="lg:col-span-3">
          <h4 className="font-semibold mb-6">{t('footer.navigation')}</h4>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div> */}

        {/* Column 3: Contact */}
        <div className="lg:col-span-4">
          <h4 className="font-semibold mb-6">{t('footer.contact')}</h4>
          <div className="space-y-4 flex flex-col">
            <a
              href={`mailto:${t('footer.email')}`}
              className="block text-sm text-white/50 hover:text-white transition-all duration-300 link-underline hover:translate-x-1"
            >
              {t('footer.email')}
            </a>
            <a
              href={`tel:${t('footer.phone')}`}
              className="block text-sm text-white/50 hover:text-white transition-all duration-300 link-underline hover:translate-x-1"
            >
              {t('footer.phone')}
            </a>
            <div className="pt-2">
              <p className="text-sm text-white/50">{t('footer.addressLine1')}</p>
              <p className="text-sm text-white/50">{t('footer.addressLine2')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/40">{t('footer.copyright', { year: currentYear })}</p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-xs text-white/40 hover:text-white transition-all duration-300 link-underline"
          >
            {t('footer.privacy')}
          </a>
          <a
            href="#"
            className="text-xs text-white/40 hover:text-white transition-all duration-300 link-underline"
          >
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
