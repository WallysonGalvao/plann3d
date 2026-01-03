import { Link, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from './language-switcher'
import { ThemeSwitcher } from './theme-switcher'

import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { menuItemVariants, mobileMenuVariants } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const { theme } = useTheme()

  console.warn('🚀 Header Component Rendering')

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Debug effect to log theme changes
  useEffect(() => {
    console.warn('🔄 Header State Changed:', {
      pathname: location.pathname,
      isScrolled,
      hasTransparentHeader: ['/', '/tools', '/faq'].includes(location.pathname),
      mounted,
      theme,
    })
  }, [location.pathname, isScrolled, mounted, theme])

  // Track scroll direction for hide/show behavior
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setIsScrolled(latest > 50)

    // Hide header when scrolling down past 100px, show when scrolling up
    if (latest > 100 && latest > previous) {
      setIsHidden(true)
    } else {
      setIsHidden(false)
    }
  })

  const navLinks = [
    { label: t('nav.home'), href: '/', isRoute: true },
    { label: t('nav.projects'), href: '/projects', isRoute: true },
    { label: t('nav.tools'), href: '/tools', isRoute: true },
    { label: t('nav.faq'), href: '/faq', isRoute: true },
    { label: t('nav.contact'), href: '/contact', isRoute: true },
  ]

  const isActive = (href: string) => {
    return location.pathname === href
  }

  // Pages that should have transparent header with white text when at top
  const hasTransparentHeader = ['/', '/tools', '/faq'].includes(location.pathname)
  const shouldUseWhiteText = !isScrolled && hasTransparentHeader

  // Get the correct foreground color based on theme
  const getForegroundColor = () => {
    const willReturn = shouldUseWhiteText
      ? '#ffffff'
      : !mounted
        ? 'oklch(0.98 0.02 250)'
        : theme === 'light'
          ? 'oklch(0.15 0.02 250)'
          : 'oklch(0.98 0.02 250)'

    if (shouldUseWhiteText) return '#ffffff'
    // If not mounted yet, default to dark theme color to match server render
    if (!mounted) return 'oklch(0.98 0.02 250)'
    // For light theme, use dark text. For dark theme, use light text
    return theme === 'light' ? 'oklch(0.15 0.02 250)' : 'oklch(0.98 0.02 250)'
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isHidden && !isMobileMenuOpen ? -100 : 0,
        backgroundColor:
          isScrolled || !hasTransparentHeader ? 'var(--color-background)' : 'rgba(0, 0, 0, 0)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={logo}
              alt="PLANN3D Logo"
              className="w-10 h-12"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
            <motion.span
              className="text-lg font-semibold tracking-tight transition-colors"
              style={{
                color: getForegroundColor(),
              }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              PLANN3D
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full',
                    isActive(link.href)
                      ? 'text-foreground bg-background/80'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Button & Language/Theme Switcher */}
          <div
            className="hidden md:flex items-center gap-2 transition-colors"
            style={{
              color: getForegroundColor(),
            }}
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="nav" size="default" asChild>
                <Link to="/contact">{t('nav.letsTalk')}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden flex items-center gap-2 transition-colors"
            style={{
              color: getForegroundColor(),
            }}
          >
            <ThemeSwitcher />
            <LanguageSwitcher />
            <motion.button
              className="p-2 transition-colors"
              style={{
                color: getForegroundColor(),
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden border-t border-border/50"
            >
              <motion.div
                className="flex flex-col gap-4 py-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1,
                    },
                  },
                }}
              >
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={menuItemVariants}>
                    <Link
                      to={link.href}
                      className={cn(
                        'text-lg font-medium transition-all duration-300 link-underline block py-2',
                        isActive(link.href)
                          ? 'text-primary'
                          : 'text-foreground/80 hover:text-foreground hover:translate-x-2',
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={menuItemVariants}>
                  <Button variant="hero" size="lg" className="mt-4 w-full" asChild>
                    <Link to="/contact">{t('nav.letsTalk')}</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
