import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

import { pageTransition } from '@/lib/motion-variants'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * Wrapper component for page transitions
 * Use this to wrap page content for smooth enter/exit animations
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Fade only transition - more subtle
 */
export function FadeTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
