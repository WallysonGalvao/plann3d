import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Mail, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

/**
 * Custom 404 Not Found page with premium design.
 * Provides helpful navigation options for lost users.
 */
export function NotFoundPage() {
  const { t } = useTranslation()

  const quickLinks = [
    { href: '/', label: t('notFound.links.home'), icon: Home },
    { href: '/projects', label: t('notFound.links.projects'), icon: Search },
    { href: '/contact', label: t('notFound.links.contact'), icon: Mail },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-8"
        >
          <span className="text-[12rem] md:text-[16rem] font-serif font-bold leading-none text-foreground/5 select-none">
            404
          </span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
              <Search size={48} className="text-primary" />
            </div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          {t('notFound.title')}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-lg text-muted-foreground mb-12 max-w-md mx-auto"
        >
          {t('notFound.description')}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home size={18} />
              {t('notFound.goHome')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/projects">
              <ArrowLeft size={18} />
              {t('notFound.viewProjects')}
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeInUp}>
          <p className="text-sm text-muted-foreground mb-4">
            {t('notFound.quickLinks')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm text-foreground transition-colors duration-200"
              >
                <link.icon size={14} />
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
