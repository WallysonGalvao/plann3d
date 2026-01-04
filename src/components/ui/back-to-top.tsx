'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export interface BackToTopProps {
  /** Scroll threshold to show the button (in pixels) */
  threshold?: number
  /** Additional CSS classes */
  className?: string
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-10',
  md: 'size-12',
  lg: 'size-14',
}

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
}

/**
 * Floating "Back to Top" button that appears after scrolling.
 * Smoothly scrolls to the top when clicked.
 */
export function BackToTop({ threshold = 400, className, size = 'md' }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full',
            'bg-primary text-primary-foreground shadow-lg shadow-primary/20',
            'hover:bg-primary/90 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
            sizeClasses[size],
            className,
          )}
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={iconSizes[size]} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
