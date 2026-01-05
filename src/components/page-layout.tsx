import Footer from '@/components/footer'
import Header from '@/components/header.tsx'
import { SkipLinks } from '@/components/ui/skip-links'
import { useAnalytics } from '@/hooks/useAnalytics'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

export interface PageLayoutProps {
  /** Page content */
  children: React.ReactNode
  /** Additional class names for the main element */
  className?: string
  /** Whether to add default top padding (for pages with hero below header) */
  withTopPadding?: boolean
}

// ============================================
// COMPONENT
// ============================================

/**
 * Consistent page layout wrapper with Header and Footer
 * Ensures all pages have the same structure and styling
 * Includes accessibility features: skip links, landmark IDs
 */
export function PageLayout({ children, className, withTopPadding = true }: PageLayoutProps) {
  // Initialize analytics and track page views
  useAnalytics()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip Links for keyboard navigation */}
      <SkipLinks />

      <Header />
      <main
        id="main-content"
        className={cn(withTopPadding && 'pt-20', className)}
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
