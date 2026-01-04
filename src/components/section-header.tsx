import { motion } from 'framer-motion'

import { fadeInUp } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

export interface SectionHeaderProps {
  /** Small label text shown above the title (e.g., "PORTFOLIO", "SERVICES") */
  label?: string
  /** Main title - first word will be styled as serif italic */
  title: string
  /** Optional description text below the title */
  description?: string
  /** Alignment of the content */
  align?: 'left' | 'center'
  /** Whether the section is in view (for animation) */
  isInView?: boolean
  /** Additional class names */
  className?: string
  /** Right side content (e.g., "View All" link) */
  rightContent?: React.ReactNode
}

// ============================================
// COMPONENT
// ============================================

/**
 * Reusable SectionHeader component with consistent styling
 * Features:
 * - Premium label with uppercase tracking
 * - Title with serif italic accent on first word
 * - Optional description
 * - Optional right-aligned content
 * - Fade-in animation support
 */
export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  isInView = true,
  className,
  rightContent,
}: SectionHeaderProps) {
  const titleParts = title.split(' ')
  const firstWord = titleParts[0]
  const restOfTitle = titleParts.slice(1).join(' ')

  const hasRightContent = !!rightContent

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={cn(
        'mb-16',
        hasRightContent && 'flex flex-col md:flex-row md:items-end md:justify-between gap-6',
        align === 'center' && !hasRightContent && 'text-center max-w-2xl mx-auto',
        className,
      )}
    >
      <div>
        {label && <span className="label-premium mb-4 inline-block">{label}</span>}

        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
          <span className="font-serif italic font-normal text-muted-foreground">
            {firstWord}{' '}
          </span>
          {restOfTitle}
        </h2>

        {description && (
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">{description}</p>
        )}
      </div>

      {rightContent}
    </motion.div>
  )
}
