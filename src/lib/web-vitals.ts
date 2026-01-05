import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals'

// Send metrics to analytics endpoint
function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }

  // Send to analytics in production
  if (import.meta.env.PROD) {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      })
    }

    // Optional: Send to custom analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
    })

    // Use sendBeacon if available for better reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/vitals', body)
    } else {
      fetch('/api/analytics/vitals', {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(console.error)
    }
  }
}

/**
 * Initialize Web Vitals monitoring
 * Call this once in your app entry point
 */
export function initWebVitals() {
  // Core Web Vitals
  onCLS(sendToAnalytics) // Cumulative Layout Shift
  onINP(sendToAnalytics) // Interaction to Next Paint (replaces FID)
  onLCP(sendToAnalytics) // Largest Contentful Paint

  // Other important metrics
  onFCP(sendToAnalytics) // First Contentful Paint
  onTTFB(sendToAnalytics) // Time to First Byte
}

/**
 * Report a single metric immediately
 * Useful for debugging specific pages
 */
export function reportWebVital(metric: Metric) {
  sendToAnalytics(metric)
}
