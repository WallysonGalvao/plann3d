import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'


const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'IG', href: '#' },
    { label: 'LI', href: '#' },
    { label: 'BE', href: '#' },
  ]

  const navLinks = [
    { label: t('nav.work'), href: '#projects' },
    { label: t('nav.process'), href: '/process' },
    { label: t('nav.studio'), href: '/studio' },
    { label: t('nav.contact'), href: '/contact' },
  ]

  return (
    <footer className="py-20 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            {t('contactSection.title')}{' '}
            <span className="text-gradient">{t('contactSection.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {t('contactSection.description')}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              {t('contactSection.startProject')}
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 border-t border-white/5">
          {/* Column 1: Logo, Description, Social */}
          <div className="lg:col-span-5 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">P3</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                PLANN3D
              </span>
            </Link>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded border border-white/20 flex items-center justify-center text-xs font-medium text-white/60 hover:text-white hover:border-white/40 transition-all"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3">
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
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <a
                href={`mailto:${t('footer.email')}`}
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {t('footer.email')}
              </a>
              <a
                href={`tel:${t('footer.phone')}`}
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {t('footer.phone')}
              </a>
              <div className="pt-2">
                <p className="text-sm text-white/50">
                  {t('footer.addressLine1')}
                </p>
                <p className="text-sm text-white/50">
                  {t('footer.addressLine2')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
