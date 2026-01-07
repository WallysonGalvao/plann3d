import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

export interface OptimizedImageProps {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Image width (for aspect ratio calculation) */
  width?: number
  /** Image height (for aspect ratio calculation) */
  height?: number
  /** Additional CSS classes */
  className?: string
  /** If true, disables lazy loading (use for above-the-fold images) */
  priority?: boolean
  /** Placeholder type during loading */
  placeholder?: 'blur' | 'skeleton' | 'none'
  /** Blur data URL for blur placeholder (low-res base64 image) */
  blurDataURL?: string
  /** Sizes attribute for responsive images */
  sizes?: string
  /** Callback when image finishes loading */
  onLoad?: () => void
  /** Object fit mode */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  /** Enable hover scale animation */
  hoverScale?: number
  /** Transition duration for hover effects */
  hoverDuration?: number
}

/**
 * Optimized image component with lazy loading, placeholders, and smooth transitions.
 * Use priority={true} for above-the-fold images (hero, first visible content).
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  sizes,
  onLoad,
  objectFit = 'cover',
  hoverScale,
  hoverDuration = 0.8,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [src])

  // Check if image is already loaded (from cache) after mount
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalHeight > 0) {
      setIsLoaded(true)
      onLoad?.()
    }
  }, [src, onLoad])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  // Determine object-fit class
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  }[objectFit]

  // Show skeleton while loading
  const showSkeleton = placeholder === 'skeleton' && !isLoaded && !hasError

  // Show blur placeholder
  const showBlur = placeholder === 'blur' && blurDataURL && !isLoaded && !hasError

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Skeleton placeholder */}
      {showSkeleton && (
        <div
          className="absolute inset-0 animate-pulse bg-muted"
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined,
          }}
        />
      )}

      {/* Blur placeholder */}
      {showBlur && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className={cn('absolute inset-0 h-full w-full scale-110 blur-lg', objectFitClass)}
        />
      )}

      {/* Main image */}
      {hoverScale ? (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          whileHover={{ scale: hoverScale }}
          transition={{ duration: hoverDuration, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            'h-full w-full transition-opacity duration-500',
            objectFitClass,
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'hidden',
          )}
        />
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'h-full w-full transition-opacity duration-500',
            objectFitClass,
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'hidden',
          )}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
