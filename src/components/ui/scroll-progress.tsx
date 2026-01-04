'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

import { cn } from '@/lib/utils'

export interface ScrollProgressProps {
  /** Additional CSS classes for the container */
  className?: string
  /** Progress bar color (uses primary by default) */
  color?: string
  /** Height of the progress bar */
  height?: number
  /** Whether to show the progress bar */
  show?: boolean
}

/**
 * Scroll progress indicator bar fixed at the top of the page.
 * Shows reading progress as user scrolls through content.
 */
export function ScrollProgress({
  className,
  color,
  height = 3,
  show = true,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (!show) return null

  return (
    <motion.div
      className={cn('fixed top-0 left-0 right-0 z-100 origin-left', className)}
      style={{
        scaleX,
        height,
        backgroundColor: color || 'hsl(var(--primary))',
      }}
      aria-hidden="true"
    />
  )
}
