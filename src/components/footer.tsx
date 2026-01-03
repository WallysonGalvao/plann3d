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

  return (
    <footer className="relative px-6 lg:px-12 pb-6 bg-[#0B0F17] overflow-hidden">
      {/* Decorative background element */}
      <span className="absolute -right-20 -bottom-32 text-[20rem] font-serif font-normal text-white/[0.015] pointer-events-none select-none">
        P3
      </span>

      {/* Top gradient divider */}
      <div className="divider-fade w-full mb-12" />

      {/* Main Footer Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16">
        {/* Column 1: Logo, Description, Social */}
        <div className="space-y-6 w-full lg:w-auto">
          {/* Logo with premium styling */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img
                src={logo}
                alt="PLANN3D Logo"
                className="w-10 h-12 transition-all duration-500 group-hover:opacity-80 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight transition-all duration-300 group-hover:text-primary block">
                PLANN3D
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Studio
              </span>
            </div>
          </Link>

          {/* Description with serif accent */}
          <p className="text-sm text-white/50 leading-relaxed max-w-sm">
            {/* <span className="font-serif italic text-white/70">Transforming</span>{' '} */}
            {t('footer.description')}
          </p>

          {/* Social Icons - Glass style */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glow-hover w-11 h-11 rounded-xl flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Contact - Glass card */}
        <div className=" rounded-2xl p-6 lg:p-8 w-full lg:w-auto lg:min-w-[280px]">
          <h4 className="font-semibold mb-6 text-lg">
            <span className="font-serif italic font-normal text-white">{t('footer.contact').split(' ')[0]}</span>{' '}
            {t('footer.contact').split(' ').slice(1).join(' ')}
          </h4>
          <div className="space-y-4">
            <a
              href={`mailto:${t('footer.email')}`}
              className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all duration-300 group"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              {t('footer.email')}
            </a>
            <a
              href={`tel:${t('footer.phone')}`}
              className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-all duration-300 group"
            >
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              {t('footer.phone')}
            </a>
            <div className="flex items-start gap-3 pt-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-white/60">{t('footer.addressLine1')}</p>
                <p className="text-sm text-white/60">{t('footer.addressLine2')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 pt-10 mt-10 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/30 text-center md:text-left">
          © {currentYear} PLANN3D. {t('footer.copyright', { year: '' })}
        </p>
        <div className="flex gap-8">
          <a
            href="#"
            className="text-xs text-white/30 hover:text-white transition-all duration-300 link-premium"
          >
            {t('footer.privacy')}
          </a>
          <a
            href="#"
            className="text-xs text-white/30 hover:text-white transition-all duration-300 link-premium"
          >
            {t('footer.terms')}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
