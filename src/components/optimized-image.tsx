import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  /** Source image path (without extension) */
  src: string
  /** Alternative text for accessibility */
  alt: string
  /** Optional CSS classes */
  className?: string
  /** Image width (for responsive images) */
  width?: number
  /** Image height (for responsive images) */
  height?: number
  /** Loading strategy: lazy, eager */
  loading?: 'lazy' | 'eager'
  /** Sizes attribute for responsive images */
  sizes?: string
  /** Priority loading (disables lazy loading) */
  priority?: boolean
  /** Callback when image loads */
  onLoad?: () => void
  /** Callback when image fails to load */
  onError?: () => void
}

/**
 * OptimizedImage component with modern format support (AVIF, WebP)
 *
 * Automatically serves next-gen formats when available with fallback to original.
 * Uses native lazy loading and responsive images via srcset.
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/hero"
 *   alt="Hero background"
 *   width={1920}
 *   height={1080}
 *   sizes="100vw"
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Extract file path without extension
  const basePath = src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')

  // Determine original format from src
  const originalFormat = src.match(/\.(jpg|jpeg|png|webp|avif)$/i)?.[1] || 'jpg'

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  // Generate srcset for different sizes (1x, 2x, 3x)
  const generateSrcSet = (format: string) => {
    if (!width) return undefined

    const sizes = [
      { size: width, suffix: '' },
      { size: width * 1.5, suffix: '@1.5x' },
      { size: width * 2, suffix: '@2x' },
    ]

    return sizes
      .map(({ size, suffix }) => `${basePath}${suffix}.${format} ${size}w`)
      .join(', ')
  }

  return (
    <picture className={cn('block', className)}>
      {/* AVIF format (best compression, newest) */}
      <source
        type="image/avif"
        srcSet={generateSrcSet('avif') || `${basePath}.avif`}
        sizes={sizes}
      />

      {/* WebP format (good compression, wide support) */}
      <source
        type="image/webp"
        srcSet={generateSrcSet('webp') || `${basePath}.webp`}
        sizes={sizes}
      />

      {/* Original format (fallback) */}
      <img
        src={`${basePath}.${originalFormat}`}
        srcSet={generateSrcSet(originalFormat)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100',
          hasError && 'opacity-50',
          className,
        )}
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : undefined,
        }}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            aspectRatio: width && height ? `${width} / ${height}` : undefined,
          }}
        />
      )}
    </picture>
  )
}
