import Footer from '@/components/footer'
import Header from '@/components/header'
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
 */
export function PageLayout({ children, className, withTopPadding = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className={cn(withTopPadding && 'pt-20', className)}>{children}</main>
      <Footer />
    </div>
  )
}
