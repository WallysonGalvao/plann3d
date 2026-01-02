import { Link, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LanguageSwitcher from './language-switcher'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t('nav.work'), href: '/', hash: 'projects', isRoute: true },
    { label: t('nav.process'), href: '/process', isRoute: true },
    { label: t('nav.studio'), href: '/studio', isRoute: true },
    { label: t('nav.contact'), href: '/contact', isRoute: true },
  ]

  const isActive = (href: string, hash?: string) => {
    if (hash) {
      return (
        location.pathname === '/' &&
        typeof window !== 'undefined' &&
        window.location.hash === `#${hash}`
      )
    }
    return location.pathname === href
  }

  const handleNavClick = (hash?: string) => {
    if (hash && typeof window !== 'undefined') {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
              <span className="text-sm font-bold">F</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              FONTENELLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  hash={link.hash}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full',
                    isActive(link.href, link.hash)
                      ? 'text-foreground bg-background/80'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => handleNavClick(link.hash)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="nav" size="default" asChild>
              <Link to="/contact">{t('nav.letsTalk')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  hash={link.hash}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    isActive(link.href, link.hash)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  onClick={() => handleNavClick(link.hash)}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-4" asChild>
                <Link to="/contact">{t('nav.letsTalk')}</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
