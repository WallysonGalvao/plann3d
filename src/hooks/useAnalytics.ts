import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

import { initializeGA, trackPageView } from '@/lib/analytics'

/**
 * Hook to initialize Google Analytics and track page views
 * Use this in your root layout component
 */
export function useAnalytics(): void {
  const location = useLocation()

  // Initialize GA on mount
  useEffect(() => {
    initializeGA()
  }, [])

  // Track page views on route change
  useEffect(() => {
    // Get page title from document
    const title = document.title

    // Track the page view
    trackPageView(location.pathname, title)
  }, [location.pathname])
}
