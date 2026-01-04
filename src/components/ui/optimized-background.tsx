import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'

import { cn } from '@/lib/utils'

export interface OptimizedBackgroundProps {
  /** Image source URL */
  src: string
  /** Alt text for accessibility (describes the background context) */
  alt: string
  /** Container CSS classes */
  className?: string
  /** Image CSS classes */
  imageClassName?: string
  /** If true, disables lazy loading (use for hero sections) */
  priority?: boolean
  /** Enable hover scale animation */
  hoverScale?: number
  /** Transition duration for hover effects */
  hoverDuration?: number
  /** Children elements to render on top of the background */
  children?: React.ReactNode
}

/**
 * Optimized background image component that replaces inline backgroundImage styles.
 * Uses a real <img> element positioned absolutely for better performance and lazy loading.
 * 
 * Benefits over backgroundImage:
 * - Native lazy loading support
 * - Better LCP (Largest Contentful Paint) metrics
 * - Proper image caching and preloading
 * - Screen reader accessible
 */
export function OptimizedBackground({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  hoverScale,
  hoverDuration = 0.7,
  children,
}: OptimizedBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      {/* Background image */}
      {hoverScale ? (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          whileHover={{ scale: hoverScale }}
          transition={{ duration: hoverDuration, ease: 'easeOut' }}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      )}

      {/* Content overlay */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}
