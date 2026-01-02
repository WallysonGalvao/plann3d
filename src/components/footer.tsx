import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'IG', href: '#' },
    { label: 'LI', href: '#' },
    { label: 'BE', href: '#' },
  ]

  const services = [
    { key: 'archViz' },
    { key: 'interiorRendering' },
    { key: 'animation3d' },
    { key: 'virtualReality' },
    { key: 'salesGallery' },
  ]

  return (
    <footer className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
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

          {/* Column 2: Services */}
          <div className="lg:col-span-4">
            <h4 className="font-semibold mb-6">{t('footer.services')}</h4>
            <nav className="flex flex-col gap-3">
              {services.map((service) => (
                <a
                  key={service.key}
                  href="#"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {t(`footer.${service.key}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-3">
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
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
