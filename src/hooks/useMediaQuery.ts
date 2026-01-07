import { useState, useEffect, useCallback } from 'react'

// ============================================
// BREAKPOINTS (Tailwind CSS defaults)
// ============================================

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

// ============================================
// HOOK
// ============================================

interface MediaQueryState {
  /** Under 640px */
  isMobile: boolean
  /** 640px - 1023px */
  isTablet: boolean
  /** 1024px and above */
  isDesktop: boolean
  /** Device supports touch */
  isTouchDevice: boolean
  /** Current viewport width */
  width: number
  /** Current viewport height */
  height: number
}

/**
 * Hook for responsive breakpoints with SSR support
 *
 * @example
 * ```tsx
 * const { isMobile, isDesktop, isTouchDevice } = useMediaQuery()
 *
 * return (
 *   <div>
 *     {isMobile ? <MobileNav /> : <DesktopNav />}
 *   </div>
 * )
 * ```
 */
export function useMediaQuery(): MediaQueryState {
  const [state, setState] = useState<MediaQueryState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    width: 1024,
    height: 768,
  })

  const updateState = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    setState({
      isMobile: width < BREAKPOINTS.sm,
      isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
      isDesktop: width >= BREAKPOINTS.lg,
      isTouchDevice,
      width,
      height,
    })
  }, [])

  useEffect(() => {
    // Initial update
    updateState()

    // Debounced resize handler
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateState, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [updateState])

  return state
}

// ============================================
// UTILITY HOOKS
// ============================================

/**
 * Hook for matching a specific media query string
 *
 * @example
 * ```tsx
 * const isLargeScreen = useMatchMedia('(min-width: 1280px)')
 * ```
 */
export function useMatchMedia(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Hook for checking if viewport is at or above a breakpoint
 *
 * @example
 * ```tsx
 * const isAboveMd = useBreakpoint('md') // true if >= 768px
 * ```
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`
  return useMatchMedia(query)
}
