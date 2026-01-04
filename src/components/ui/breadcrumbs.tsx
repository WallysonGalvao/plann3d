import { Link } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  /** Display label */
  label: string
  /** Link href (optional - last item typically has no href) */
  href?: string
  /** Icon to display (optional) */
  icon?: React.ReactNode
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items */
  items: Array<BreadcrumbItem>
  /** Additional CSS classes */
  className?: string
  /** Show home icon on first item */
  showHomeIcon?: boolean
}

/**
 * Breadcrumbs navigation component for internal pages.
 * Helps users understand their location and navigate back.
 */
export function Breadcrumbs({ items, className, showHomeIcon = true }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isFirst = index === 0
          const isLast = index === items.length - 1
          const showIcon = isFirst && showHomeIcon

          return (
            <li key={index} className="flex items-center gap-2">
              {/* Separator (not on first item) */}
              {!isFirst && (
                <ChevronRight
                  size={14}
                  className="text-muted-foreground/50"
                  aria-hidden="true"
                />
              )}

              {/* Breadcrumb item */}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {showIcon && <Home size={14} />}
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5',
                    isLast ? 'text-foreground font-medium' : 'text-muted-foreground',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {showIcon && <Home size={14} />}
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
