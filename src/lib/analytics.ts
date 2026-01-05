/**
 * Google Analytics 4 Integration
 *
 * To use, set your GA4 Measurement ID in the environment variable:
 * VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * Or replace GA_MEASUREMENT_ID below with your ID.
 */

// GA4 Measurement ID - Replace with your own or use env variable
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

// Check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  return Boolean(GA_MEASUREMENT_ID) && typeof window !== 'undefined'
}

// Get the GA Measurement ID
export const getGAMeasurementId = (): string => GA_MEASUREMENT_ID

/**
 * Initialize Google Analytics
 * Call this in your root component or layout
 */
export function initializeGA(): void {
  if (!isAnalyticsEnabled()) {
    console.info('[Analytics] GA4 not configured. Set VITE_GA_MEASUREMENT_ID to enable.')
    return
  }

  // Load gtag.js script dynamically
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: Array<unknown>): void {
    window.dataLayer.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  })

  console.info('[Analytics] GA4 initialized:', GA_MEASUREMENT_ID)
}

/**
 * Track a page view
 */
export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled() || !window.gtag) return

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  })
}

/**
 * Track a custom event
 */
export function trackEvent(action: string, category: string, label?: string, value?: number): void {
  if (!isAnalyticsEnabled() || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string): void {
  trackEvent('form_submission', 'engagement', formName)
}

/**
 * Track project view
 */
export function trackProjectView(projectId: string, projectTitle: string): void {
  trackEvent('view_project', 'engagement', projectTitle, undefined)
  trackEvent('select_content', 'project', projectId)
}

/**
 * Track gallery open
 */
export function trackGalleryOpen(projectId: string): void {
  trackEvent('gallery_open', 'engagement', projectId)
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent('cta_click', 'conversion', `${ctaName}_${location}`)
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: Array<unknown>
    gtag: (...args: Array<unknown>) => void
  }
}
